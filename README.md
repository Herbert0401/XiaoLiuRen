# 小六壬时课网站

一个本地可运行的小六壬起课网站，包含：

- 公历自动换算农历月日时辰
- 农历手动起课
- 大安、留连、速喜、赤口、小吉、空亡六宫全览
- 月宫、日宫、时宫三步路径
- 本地规则断语与 DeepSeek 联合解读
- 同一课追问细断

## 本地运行

```bash
npm install
npm start
```

访问 http://localhost:5173。

## DeepSeek

`.env` 中配置：

```bash
DEEPSEEK_API_KEY=your-key
DEEPSEEK_MODEL=deepseek-v4-flash
PORT=5173
```

没有配置 key 时，网站仍会输出本地小六壬底盘和断语。

## Render 部署

这个项目必须部署为 Render **Web Service**，不要部署为 Static Site。

推荐设置：

```bash
Build Command: npm install
Start Command: npm start
```

Environment Variables:

```bash
DEEPSEEK_API_KEY=你的 DeepSeek API key
DEEPSEEK_MODEL=deepseek-v4-flash
```

部署后先打开：

```text
https://你的域名.onrender.com/api/health
```

如果返回 `{"ok":true,"deepSeek":true,...}`，说明 DeepSeek 已配置。  
如果返回 HTML、404，或页面显示“后端未连接”，说明部署成了静态站或 API 没有指向 Node 服务。  
如果返回 `deepSeek:false`，说明 Render 后台还没有配置 `DEEPSEEK_API_KEY`，或配置后没有重新部署。
