import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import { buildLocalFollowUp, buildReading } from './src/liuren.js';

const app = express();
const port = Number.parseInt(process.env.PORT || '5173', 10);
const model = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const deepSeekClient = process.env.DEEPSEEK_API_KEY
  ? new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com'
    })
  : null;

app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    deepSeek: Boolean(deepSeekClient),
    model
  });
});

app.post('/api/calculate', async (req, res) => {
  try {
    const reading = buildReading(req.body);
    const wantsAi = req.body?.includeAi !== false;
    const ai = wantsAi ? await createDeepSeekReading(reading) : skippedAi('已关闭 DeepSeek 解读。');
    res.json({ reading, ai });
  } catch (error) {
    res.status(400).json({ error: error.message || '起课失败' });
  }
});

app.post('/api/follow-up', async (req, res) => {
  try {
    const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
    if (!question) {
      res.status(400).json({ error: '请输入追问内容' });
      return;
    }

    const local = buildLocalFollowUp(req.body?.reading, question);
    const ai = await createDeepSeekFollowUp(req.body?.reading, question);
    res.json({ local, ai });
  } catch (error) {
    res.status(400).json({ error: error.message || '追问失败' });
  }
});

app.listen(port, () => {
  console.log(`小六壬网站已启动：http://localhost:${port}`);
});

async function createDeepSeekReading(reading) {
  if (!deepSeekClient) {
    return skippedAi('未检测到 DEEPSEEK_API_KEY，当前显示本地小六壬断语。');
  }

  try {
    const response = await deepSeekClient.chat.completions.create({
      model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            '你是熟悉小六壬时课的中文占断助手。',
            '只输出 JSON，不要输出思维过程，不要宣称确定未来。',
            '必须基于传入的农历月日时、三步落宫、终宫、五行关系和用户问题。',
            '结果用于民俗文化娱乐参考；涉及医疗、法律、投资时必须提醒用户找专业人士。',
            'JSON 字段：title, overview, topicReading, timing, risks, actionPlan, followUpSeeds。'
          ].join('\n')
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: '请结合小六壬底盘输出完整但克制的细断。',
            reading: compactReading(reading)
          })
        }
      ],
      max_tokens: 1800,
      temperature: 0.55
    });
    return normalizeAiJson(response.choices?.[0]?.message?.content);
  } catch (error) {
    return {
      status: 'error',
      message: 'DeepSeek 解读暂时不可用，已保留本地断语。',
      detail: error?.message || 'unknown error'
    };
  }
}

async function createDeepSeekFollowUp(reading, question) {
  if (!deepSeekClient) {
    return skippedAi('未检测到 DEEPSEEK_API_KEY，追问暂由本地断语回答。');
  }

  try {
    const response = await deepSeekClient.chat.completions.create({
      model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            '你是小六壬追问细断助手。',
            '只输出 JSON，不要输出思维过程。',
            '围绕同一底盘回答用户的具体问题，避免重新起课。',
            'JSON 字段：title, answer, practicalSteps, caution。'
          ].join('\n')
        },
        {
          role: 'user',
          content: JSON.stringify({
            question,
            reading: compactReading(reading)
          })
        }
      ],
      max_tokens: 1200,
      temperature: 0.55
    });
    return normalizeAiJson(response.choices?.[0]?.message?.content);
  } catch (error) {
    return {
      status: 'error',
      message: 'DeepSeek 追问暂时不可用。',
      detail: error?.message || 'unknown error'
    };
  }
}

function compactReading(reading) {
  if (!reading) {
    return null;
  }
  return {
    input: reading.input,
    topic: reading.topic,
    final: reading.final,
    palaces: {
      formula: reading.palaces?.formula,
      month: reading.palaces?.month,
      day: reading.palaces?.day,
      hour: reading.palaces?.hour
    },
    relation: reading.relation,
    codexReading: reading.codexReading
  };
}

function normalizeAiJson(content) {
  if (!content) {
    return {
      status: 'empty',
      message: 'DeepSeek 没有返回内容。'
    };
  }

  try {
    return {
      status: 'ok',
      content: JSON.parse(content)
    };
  } catch {
    return {
      status: 'text',
      content
    };
  }
}

function skippedAi(message) {
  return {
    status: 'skipped',
    message
  };
}
