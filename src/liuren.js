import { Lunar } from 'lunar-typescript';

export const BRANCHES = [
  { key: 'zi', name: '子', number: 1, range: '23:00-00:59' },
  { key: 'chou', name: '丑', number: 2, range: '01:00-02:59' },
  { key: 'yin', name: '寅', number: 3, range: '03:00-04:59' },
  { key: 'mao', name: '卯', number: 4, range: '05:00-06:59' },
  { key: 'chen', name: '辰', number: 5, range: '07:00-08:59' },
  { key: 'si', name: '巳', number: 6, range: '09:00-10:59' },
  { key: 'wu', name: '午', number: 7, range: '11:00-12:59' },
  { key: 'wei', name: '未', number: 8, range: '13:00-14:59' },
  { key: 'shen', name: '申', number: 9, range: '15:00-16:59' },
  { key: 'you', name: '酉', number: 10, range: '17:00-18:59' },
  { key: 'xu', name: '戌', number: 11, range: '19:00-20:59' },
  { key: 'hai', name: '亥', number: 12, range: '21:00-22:59' }
];

export const TOPICS = [
  { key: 'general', label: '综合' },
  { key: 'career', label: '事业' },
  { key: 'wealth', label: '财运' },
  { key: 'love', label: '感情' },
  { key: 'health', label: '健康' },
  { key: 'travel', label: '出行' },
  { key: 'lost', label: '寻物' },
  { key: 'contract', label: '合作' },
  { key: 'study', label: '学业' }
];

export const PALACES = [
  {
    key: 'daan',
    name: '大安',
    short: '稳',
    verdict: '上吉',
    tone: '安定、守成、可成',
    element: '木',
    spirit: '青龙',
    direction: '东方',
    image: '身未动，事宜守正，主平安、贵助、稳定。',
    timing: '多主缓中有成，宜按既定节奏推进。',
    goodFor: ['求稳', '见贵', '签约前准备', '养护关系', '长期规划'],
    cautions: ['忌急躁冒进', '忌临时改口', '宜守信守约'],
    topics: {
      general: '局面较稳，先守住基本盘，再慢慢加码。',
      career: '适合稳步推进、补齐流程、向可靠的人求助。',
      wealth: '正财与长期积累较佳，投机冲动宜收一收。',
      love: '关系重在安定与陪伴，宜坦诚、少试探。',
      health: '以休养、规律作息和复盘旧问题为先；不替代医疗建议。',
      travel: '出行可行，但宜早做准备，留足余量。',
      lost: '物件多在固定、熟悉、靠近木质或东方意象处。',
      contract: '可谈可签，条款细节先稳住。',
      study: '适合打基础、复习旧题、建立长期节奏。'
    }
  },
  {
    key: 'liulian',
    name: '留连',
    short: '滞',
    verdict: '滞象',
    tone: '拖延、牵绊、反复',
    element: '水',
    spirit: '玄武',
    direction: '北方',
    image: '人未归，事未决，主迟滞、缠绕、信息不明。',
    timing: '多主延后、反复确认，急催反而易乱。',
    goodFor: ['复盘', '等待回音', '排查遗漏', '做备选方案'],
    cautions: ['忌轻信传闻', '忌情绪化催促', '忌拖成坏账'],
    topics: {
      general: '事情暂时黏住了，先查清原因，再决定是否推进。',
      career: '流程、人事或审批可能卡住，宜留证据、补材料。',
      wealth: '回款慢、账目绕，先核对数字与承诺。',
      love: '关系有牵挂也有拖延，别用猜测代替沟通。',
      health: '留意慢性、反复或拖延未处理的问题；不替代医疗建议。',
      travel: '易误点、改期或路线反复，宜备替代方案。',
      lost: '物件多被遮挡、夹带或遗忘在水边、暗处、旧袋中。',
      contract: '不宜仓促定案，先看隐藏条款和责任边界。',
      study: '容易分心或卡在旧难点，适合拆小任务。'
    }
  },
  {
    key: 'suxi',
    name: '速喜',
    short: '喜',
    verdict: '上吉',
    tone: '快讯、喜庆、马上有动静',
    element: '火',
    spirit: '朱雀',
    direction: '南方',
    image: '人即至，信即来，主喜讯、沟通、快速进展。',
    timing: '多主近日、当下、短期见回响。',
    goodFor: ['表白', '发布', '沟通', '催办', '短线行动'],
    cautions: ['忌高兴太早', '忌话说过满', '宜确认落地细节'],
    topics: {
      general: '有快消息，主动表达会更容易打开局面。',
      career: '适合汇报、面试、发布方案，短期反馈较快。',
      wealth: '小财、快钱、消息财可见，但要防冲动消费。',
      love: '适合主动联系、约见、说明心意。',
      health: '状态有起色，但火象也提示别熬夜上火；不替代医疗建议。',
      travel: '适合短途、临时行程，留意票据消息。',
      lost: '物件可能很快找到，多在显眼处、电子设备旁或南方意象处。',
      contract: '谈判有突破，先把口头进展写下来。',
      study: '适合冲刺、口试、表达型任务。'
    }
  },
  {
    key: 'chikou',
    name: '赤口',
    short: '争',
    verdict: '凶象',
    tone: '口舌、冲突、损伤',
    element: '金',
    spirit: '白虎',
    direction: '西方',
    image: '官非口舌，主争执、刀兵、伤损、强硬对立。',
    timing: '多主突发冲突，宜先降温再处理。',
    goodFor: ['止损', '划界限', '依法依规处理', '做风险清单'],
    cautions: ['忌硬碰硬', '忌酒后争执', '忌签模糊条款'],
    topics: {
      general: '先避锋芒，话要短，证据要清。',
      career: '易有争责、投诉或强势对抗，宜书面确认。',
      wealth: '防破财、罚款、争账，先守住现金和凭证。',
      love: '容易吵在一句话上，暂缓逼问与翻旧账。',
      health: '留意磕碰、炎症、牙口咽喉等急性问题；不替代医疗建议。',
      travel: '出行需防争执、违章和小伤，装备检查要细。',
      lost: '物件可能与金属、车辆、工具、争执现场相关。',
      contract: '风险高，条款、违约、付款节点必须看清。',
      study: '考试答辩宜谨慎，别因急躁丢分。'
    }
  },
  {
    key: 'xiaoji',
    name: '小吉',
    short: '合',
    verdict: '吉象',
    tone: '和合、小成、有人相助',
    element: '水',
    spirit: '六合',
    direction: '合方',
    image: '人来喜，事有合，主小成、人和、合作。',
    timing: '多主渐入佳境，先小后大。',
    goodFor: ['约见', '合作', '修复关系', '小额投资', '学习请教'],
    cautions: ['忌贪大', '忌忽略小承诺', '宜以和为贵'],
    topics: {
      general: '有可用的助力，先从小目标拿结果。',
      career: '团队配合、同事支持较好，适合推进协作事项。',
      wealth: '小利可得，适合稳健的小步尝试。',
      love: '关系有和缓机会，适合约会、解释、修补。',
      health: '恢复和调养有利，重在持续；不替代医疗建议。',
      travel: '行程较顺，同行者或熟人可帮忙。',
      lost: '物件可能经由他人提醒找回，留意公共区域。',
      contract: '合作可谈，先做小范围试运行。',
      study: '适合请教、组队、阶段性突破。'
    }
  },
  {
    key: 'kongwang',
    name: '空亡',
    short: '空',
    verdict: '空象',
    tone: '落空、虚耗、无着',
    element: '土',
    spirit: '勾陈',
    direction: '中宫',
    image: '音信稀，事无凭，主落空、失据、虚耗。',
    timing: '多主暂难兑现，宜等条件齐备。',
    goodFor: ['止损', '清理旧账', '断舍离', '重设目标'],
    cautions: ['忌孤注一掷', '忌凭空承诺', '忌追逐虚名'],
    topics: {
      general: '眼前多虚，先验证事实，再决定投入。',
      career: '项目可能缺资源或缺承诺，宜重审优先级。',
      wealth: '防落空、坏账、无效支出，不宜重仓。',
      love: '期待与现实有落差，先看对方实际行动。',
      health: '不要拖延检查或只靠猜测判断；不替代医疗建议。',
      travel: '行程可能取消、扑空或白跑，先确认再出发。',
      lost: '找回概率偏低，先看废弃、遗失、空置之处。',
      contract: '承诺含金量不足，未落纸前不宜投入。',
      study: '目标感不足，先补计划和反馈机制。'
    }
  }
];

const GENERATES = {
  木: '火',
  火: '土',
  土: '金',
  金: '水',
  水: '木'
};

const CONTROLS = {
  木: '土',
  土: '水',
  水: '火',
  火: '金',
  金: '木'
};

function mod(value, base) {
  return ((value % base) + base) % base;
}

function getPalace(index) {
  return PALACES[mod(index, PALACES.length)];
}

export function branchFromHour(hour) {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error('hour must be an integer from 0 to 23');
  }
  const number = hour === 23 ? 1 : Math.floor((hour + 1) / 2) + 1;
  return BRANCHES[number - 1];
}

export function branchFromName(name) {
  return BRANCHES.find((branch) => branch.name === name || branch.key === name);
}

export function calculatePalaces({ lunarMonth, lunarDay, branchNumber }) {
  const monthIndex = mod(lunarMonth - 1, PALACES.length);
  const dayIndex = mod(monthIndex + lunarDay - 1, PALACES.length);
  const hourIndex = mod(dayIndex + branchNumber - 1, PALACES.length);

  return {
    formula: `(${lunarMonth} + ${lunarDay} + ${branchNumber} - 3) mod 6`,
    month: getPalace(monthIndex),
    day: getPalace(dayIndex),
    hour: getPalace(hourIndex),
    indexes: { month: monthIndex, day: dayIndex, hour: hourIndex }
  };
}

export function relationBetween(basePalace, finalPalace) {
  const base = basePalace.element;
  const final = finalPalace.element;
  if (base === final) {
    return {
      name: '比和',
      text: '日宫与时宫同气，事情的内外节奏较一致，成败多看执行力。'
    };
  }
  if (GENERATES[base] === final) {
    return {
      name: '我生事',
      text: '日宫生时宫，自己投入较多，适合主动经营，但要防消耗。'
    };
  }
  if (GENERATES[final] === base) {
    return {
      name: '事生我',
      text: '时宫生日宫，外部条件或他人反馈能帮到你，宜接住助力。'
    };
  }
  if (CONTROLS[base] === final) {
    return {
      name: '我克事',
      text: '日宫克时宫，事情可控但费力，宜用规则、计划和边界推进。'
    };
  }
  return {
    name: '事克我',
    text: '时宫克日宫，外部压力更强，宜先避险、减负、等条件成熟。'
  };
}

export function normalizeInput(rawInput) {
  const input = rawInput || {};
  const mode = input.mode === 'lunar' ? 'lunar' : 'solar';
  const topic = TOPICS.some((item) => item.key === input.topic) ? input.topic : 'general';
  const question = typeof input.question === 'string' ? input.question.trim().slice(0, 1200) : '';

  if (mode === 'lunar') {
    const lunarMonth = Number.parseInt(input.lunarMonth, 10);
    const lunarDay = Number.parseInt(input.lunarDay, 10);
    const branch = branchFromName(input.hourBranch);

    if (!Number.isInteger(lunarMonth) || lunarMonth < 1 || lunarMonth > 12) {
      throw new Error('农历月份需要在 1 到 12 之间');
    }
    if (!Number.isInteger(lunarDay) || lunarDay < 1 || lunarDay > 30) {
      throw new Error('农历日期需要在 1 到 30 之间');
    }
    if (!branch) {
      throw new Error('请选择有效时辰');
    }

    return {
      mode,
      topic,
      question,
      lunar: {
        month: lunarMonth,
        day: lunarDay,
        isLeapMonth: Boolean(input.isLeapMonth),
        monthText: `${input.isLeapMonth ? '闰' : ''}${lunarMonth}月`,
        dayText: `${lunarDay}日`
      },
      time: {
        branch,
        source: 'manual'
      }
    };
  }

  const date = input.datetime ? new Date(input.datetime) : new Date();
  if (Number.isNaN(date.getTime())) {
    throw new Error('请输入有效的公历日期时间');
  }

  const lunar = Lunar.fromDate(date);
  const rawMonth = lunar.getMonth();
  const branch = branchFromHour(date.getHours());

  return {
    mode,
    topic,
    question,
    solar: {
      iso: date.toISOString(),
      localText: formatLocalDateTime(date)
    },
    lunar: {
      year: lunar.getYear(),
      month: Math.abs(rawMonth),
      day: lunar.getDay(),
      isLeapMonth: rawMonth < 0,
      monthText: `${rawMonth < 0 ? '闰' : ''}${lunar.getMonthInChinese()}月`,
      dayText: lunar.getDayInChinese(),
      yearGanzhi: lunar.getYearInGanZhi(),
      monthGanzhi: lunar.getMonthInGanZhi(),
      dayGanzhi: lunar.getDayInGanZhi(),
      timeGanzhi: lunar.getTimeInGanZhi(),
      fullText: lunar.toFullString()
    },
    time: {
      branch,
      source: 'solar-hour'
    }
  };
}

export function buildReading(rawInput) {
  const input = normalizeInput(rawInput);
  const palaces = calculatePalaces({
    lunarMonth: input.lunar.month,
    lunarDay: input.lunar.day,
    branchNumber: input.time.branch.number
  });
  const finalPalace = palaces.hour;
  const topicLabel = TOPICS.find((item) => item.key === input.topic)?.label || '综合';
  const relation = relationBetween(palaces.day, finalPalace);

  return {
    createdAt: new Date().toISOString(),
    input,
    topic: { key: input.topic, label: topicLabel },
    final: finalPalace,
    palaces,
    relation,
    codexReading: {
      headline: `${finalPalace.name}：${finalPalace.tone}`,
      summary: finalPalace.image,
      timing: finalPalace.timing,
      topic: finalPalace.topics[input.topic] || finalPalace.topics.general,
      actions: buildActionList(finalPalace),
      caution: finalPalace.cautions.join('；')
    },
    reference: {
      branches: BRANCHES,
      palaces: PALACES,
      method: '农历月数起大安，月宫起农历日，日宫起占时时辰，顺行六宫。',
      luckyPalaces: ['大安', '速喜', '小吉'],
      difficultPalaces: ['留连', '赤口', '空亡'],
      note: '小六壬流派对五行、方位和细断有差异，本工具以常见六宫时课法为底盘。'
    }
  };
}

export function buildLocalFollowUp(reading, question) {
  const finalPalace = reading?.final || PALACES[0];
  const topicKey = reading?.topic?.key || 'general';
  const topicText = finalPalace.topics?.[topicKey] || finalPalace.topics.general;
  const relationText = reading?.relation?.text || '';
  const cleanQuestion = typeof question === 'string' ? question.trim() : '';

  return {
    title: cleanQuestion ? `围绕「${cleanQuestion.slice(0, 40)}」` : '追问细断',
    answer: [
      `本课落 ${finalPalace.name}，主象为「${finalPalace.tone}」。`,
      topicText,
      relationText,
      `建议取法：${buildActionList(finalPalace).join('；')}。`
    ].filter(Boolean).join('\n'),
    source: 'local'
  };
}

function buildActionList(palace) {
  const first = palace.goodFor.slice(0, 3).join('、');
  return [
    `宜：${first}`,
    `守：${palace.cautions[0]}`,
    palace.verdict.includes('吉') ? '可主动推进，但保留复核节点' : '先控风险，再看下一次回音'
  ];
}

function formatLocalDateTime(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}`
  ].join(' ');
}
