const state = {
  mode: 'solar',
  latestReading: null
};

const form = document.querySelector('#readingForm');
const modeInput = document.querySelector('#mode');
const segments = [...document.querySelectorAll('.segment')];
const solarFields = document.querySelector('#solarFields');
const lunarFields = document.querySelector('#lunarFields');
const manualBranchField = document.querySelector('#manualBranchField');
const datetimeInput = document.querySelector('#datetime');
const statusPill = document.querySelector('#deepSeekStatus');
const submitButton = document.querySelector('#submitButton');
const introBoard = document.querySelector('#introBoard');
const resultBoard = document.querySelector('#resultBoard');
const followButton = document.querySelector('#followButton');
const followQuestion = document.querySelector('#followQuestion');
const followResult = document.querySelector('#followResult');

datetimeInput.value = toDateTimeLocal(new Date());
checkHealth();

segments.forEach((button) => {
  button.addEventListener('click', () => setMode(button.dataset.mode));
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await calculate();
});

followButton.addEventListener('click', async () => {
  await askFollowUp();
});

function setMode(mode) {
  state.mode = mode;
  modeInput.value = mode;
  segments.forEach((segment) => segment.classList.toggle('active', segment.dataset.mode === mode));
  solarFields.classList.toggle('hidden', mode !== 'solar');
  lunarFields.classList.toggle('hidden', mode !== 'lunar');
  manualBranchField.classList.toggle('hidden', mode !== 'lunar');
}

async function checkHealth() {
  try {
    const health = await fetchJson('/api/health');
    if (health?.ok !== true || typeof health.deepSeek !== 'boolean') {
      throw new Error('后端健康检查格式不正确');
    }
    statusPill.textContent = health.deepSeek ? `DeepSeek ${health.model}` : 'DeepSeek 未配置';
    statusPill.classList.toggle('ready', health.deepSeek);
    statusPill.classList.toggle('offline', !health.deepSeek);
  } catch {
    statusPill.textContent = '后端未连接';
    statusPill.classList.add('offline');
  }
}

async function calculate() {
  setLoading(true);
  followResult.innerHTML = '';

  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.mode = state.mode;
    payload.includeAi = document.querySelector('#includeAi').checked;
    payload.isLeapMonth = document.querySelector('#isLeapMonth').checked;

    const data = await fetchJson('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    state.latestReading = data.reading;
    renderReading(data.reading, data.ai);
  } catch (error) {
    renderError(error.message);
  } finally {
    setLoading(false);
  }
}

async function askFollowUp() {
  if (!state.latestReading) {
    return;
  }

  const question = followQuestion.value.trim();
  if (!question) {
    followResult.textContent = '请输入追问内容。';
    return;
  }

  followButton.disabled = true;
  followButton.textContent = '细断中';
  followResult.textContent = '';

  try {
    const data = await fetchJson('/api/follow-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        reading: state.latestReading
      })
    });
    renderFollowUp(data);
  } catch (error) {
    followResult.textContent = error.message;
  } finally {
    followButton.disabled = false;
    followButton.textContent = '追问';
  }
}

function renderReading(reading, ai) {
  introBoard.classList.add('hidden');
  resultBoard.classList.remove('hidden');

  const final = reading.final;
  document.querySelector('#resultTopic').textContent = reading.topic.label;
  document.querySelector('#finalName').textContent = final.name;
  document.querySelector('#finalTone').textContent = `${final.verdict}｜${final.tone}`;
  document.querySelector('#finalShort').textContent = final.short;
  document.querySelector('#formulaText').textContent = reading.palaces.formula;

  renderMeta(reading);
  renderTrace(reading);
  renderLocalReading(reading);
  renderAi(ai);
  renderPalaceGrid(reading.reference.palaces);
}

function renderMeta(reading) {
  const input = reading.input;
  const lunar = input.lunar;
  const branch = input.time.branch;
  const chips = [];

  if (input.solar) {
    chips.push(`公历 ${input.solar.localText}`);
  }
  chips.push(`农历 ${lunar.monthText}${lunar.dayText}`);
  chips.push(`${branch.name}时 ${branch.range}`);
  if (lunar.yearGanzhi) {
    chips.push(`${lunar.yearGanzhi}年 ${lunar.monthGanzhi}月 ${lunar.dayGanzhi}日 ${lunar.timeGanzhi}时`);
  }
  if (input.question) {
    chips.push(`问：${input.question}`);
  }

  document.querySelector('#metaStrip').innerHTML = chips.map((chip) => `<span class="meta-chip">${escapeHtml(chip)}</span>`).join('');
}

function renderTrace(reading) {
  const items = [
    ['月宫', reading.palaces.month, `农历 ${reading.input.lunar.month} 月`],
    ['日宫', reading.palaces.day, `农历 ${reading.input.lunar.day} 日`],
    ['时宫', reading.palaces.hour, `${reading.input.time.branch.name} 时，第 ${reading.input.time.branch.number} 位`]
  ];

  document.querySelector('#traceGrid').innerHTML = items.map(([label, palace, note]) => `
    <article class="trace-card">
      <span>${label}</span>
      <strong>${palace.name}</strong>
      <span>${note}</span>
    </article>
  `).join('');
}

function renderLocalReading(reading) {
  const local = reading.codexReading;
  const final = reading.final;
  const html = `
    <p><strong>${escapeHtml(local.headline)}</strong></p>
    <p>${escapeHtml(local.summary)}</p>
    <p>${escapeHtml(local.topic)}</p>
    <p>${escapeHtml(reading.relation.name)}：${escapeHtml(reading.relation.text)}</p>
    <p>${escapeHtml(local.timing)}</p>
    <ul>${local.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join('')}</ul>
    <p>六神 ${escapeHtml(final.spirit)}｜五行 ${escapeHtml(final.element)}｜方位 ${escapeHtml(final.direction)}｜慎：${escapeHtml(local.caution)}</p>
  `;
  document.querySelector('#localReading').innerHTML = html;
}

function renderAi(ai) {
  const badge = document.querySelector('#aiBadge');
  const target = document.querySelector('#aiReading');

  if (!ai) {
    badge.textContent = '无返回';
    target.textContent = '';
    return;
  }

  if (ai.status !== 'ok') {
    badge.textContent = statusLabel(ai.status);
    target.innerHTML = `<p>${escapeHtml(ai.message || ai.content || 'DeepSeek 暂无内容。')}</p>`;
    return;
  }

  badge.textContent = '已返回';
  const content = ai.content;
  target.innerHTML = [
    content.title ? `<p><strong>${escapeHtml(content.title)}</strong></p>` : '',
    content.overview ? `<p>${escapeHtml(content.overview)}</p>` : '',
    content.topicReading ? `<p>${escapeHtml(content.topicReading)}</p>` : '',
    content.timing ? `<p>${escapeHtml(content.timing)}</p>` : '',
    content.risks ? `<p>风险：${escapeHtml(content.risks)}</p>` : '',
    renderList('行动', content.actionPlan),
    renderList('可继续追问', content.followUpSeeds)
  ].filter(Boolean).join('');
}

function renderFollowUp(data) {
  const local = data.local;
  const ai = data.ai;

  if (ai?.status === 'ok') {
    const content = ai.content;
    followResult.innerHTML = [
      content.title ? `<p><strong>${escapeHtml(content.title)}</strong></p>` : '',
      content.answer ? `<p>${escapeHtml(content.answer)}</p>` : '',
      renderList('步骤', content.practicalSteps),
      content.caution ? `<p>慎：${escapeHtml(content.caution)}</p>` : ''
    ].filter(Boolean).join('');
    return;
  }

  followResult.textContent = local?.answer || ai?.message || '暂时没有追问结果。';
}

function renderPalaceGrid(palaces) {
  document.querySelector('#palaceGrid').innerHTML = palaces.map((palace) => `
    <article class="palace-tile" data-key="${palace.key}">
      <h4><span>${palace.name}</span><span>${palace.verdict}</span></h4>
      <p>${palace.tone}</p>
      <p>${palace.spirit}｜${palace.element}｜${palace.direction}</p>
      <p>${palace.image}</p>
    </article>
  `).join('');
}

function renderError(message) {
  introBoard.classList.add('hidden');
  resultBoard.classList.remove('hidden');
  document.querySelector('#resultTopic').textContent = '错误';
  document.querySelector('#finalName').textContent = '未成课';
  document.querySelector('#finalTone').textContent = message;
  document.querySelector('#finalShort').textContent = '!';
  document.querySelector('#metaStrip').innerHTML = '';
  document.querySelector('#traceGrid').innerHTML = '';
  document.querySelector('#localReading').innerHTML = `<p>${escapeHtml(message)}</p>`;
  document.querySelector('#aiReading').innerHTML = '';
  document.querySelector('#palaceGrid').innerHTML = '';
}

function renderList(label, value) {
  if (!value) {
    return '';
  }
  const items = normalizeListItems(value);
  if (!items.length) {
    return '';
  }
  return `<p>${label}：</p><ul>${items.map((item) => `<li>${escapeHtml(String(item))}</li>`).join('')}</ul>`;
}

function normalizeListItems(value) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === 'object') {
        return Object.entries(item).map(([key, entry]) => `${key}：${entry}`).join('；');
      }
      return item;
    });
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).map(([key, entry]) => `${key}：${Array.isArray(entry) ? entry.join('、') : entry}`);
  }
  return String(value).split('\n').filter(Boolean);
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const rawText = await response.text();
  let data;
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    throw new Error('接口未返回 JSON，请确认线上部署的是 Node Web Service');
  }
  if (!response.ok) {
    throw new Error(data.error || '请求失败');
  }
  return data;
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? '起课中' : '算命';
}

function statusLabel(status) {
  const labels = {
    skipped: '未调用',
    error: '失败',
    text: '文本',
    empty: '空返回'
  };
  return labels[status] || status;
}

function toDateTimeLocal(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}`
  ].join('T');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
