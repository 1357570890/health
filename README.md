# 研途生活健康中枢 (GradHealth Hub)

> 专为高校在读研究生（实验室工位自律模式，类上班作息）量身定制的身心健康、科研日程与跨端实时同步系统。

---

## ☁️ 跨端实时秒级同步：无主控，到哪都能用！

系统彻底摒弃了死板的“主控机/从控机”概念，实现了**去中心化、对称式云端实时同步 (Peer-to-Peer Cloud Sync Engine)**：

```text
┌──────────────────────────────────────────────────────────────┐
│                    📱 手机端 (操场 / 食堂 / 球馆)              │
│       打卡水煮蛋、完成4公里慢跑、勾选羽毛球、添加临时实验待办       │
└──────────────────────────────┬───────────────────────────────┘
                               │ 自动后台防抖静默推送 (Patch)
                               ▼
┌──────────────────────────────────────────────────────────────┐
│            ☁️ 您的个人私密 GitHub Gist (免费高可用云存储)       │
│       { records: [...], tasksByDate: [...], presets: [...] } │
└──────────────────────────────▲───────────────────────────────┘
                               │ 页面切回前台自动拉取 (Pull)
                               │
┌──────────────────────────────┴───────────────────────────────┐
│                    💻 电脑端 (实验室工位 / 宿舍笔记本)          │
│               自动呈现最新完成度、进行科研攻坚与深度复盘         │
└──────────────────────────────────────────────────────────────┘
```

### 为什么这个方案能够做到“到哪都能用”？
1. **完全无服务器依赖 (Serverless)**：借助 GitHub 全球基础设施，免去购买服务器与配置域名的经济与技术门槛，永久免费；
2. **绝对安全与隐私**：存储库为私密（Private），数据 100% 掌握在您自己的 GitHub 账号下，他人不可见；
3. **两端秒级自动流转**：
   - 手机打勾 ➜ 自动后台推送；
   - 回到工位切回电脑标签页 ➜ 自动静默拉取云端，两端数据时刻保持 100% 一致。

---

## 🚀 30秒开启跨端秒级同步指南

### 第1步：生成 GitHub 访问令牌 (Token)
1. 登录 GitHub，点击右上角头像 ➜ **Settings**；
2. 拉到最底部点击 **Developer settings** ➜ **Personal access tokens** ➜ **Tokens (classic)**；
3. 点击 **Generate new token (classic)**，Note 填 `health`，**仅勾选 `gist` 这一项权限**，滑到底部点击绿色 **Generate token** 按钮；
4. 复制生成的以 `ghp_` 开头的令牌字符串。

### 第2步：在网页端一键连接
1. 打开网页，点击右上角的 **`☁️ 未联云`** 按钮；
2. 将复制的 Token 粘贴到输入框中，点击 **`🚀 一键自动创建私密云库并连接`**；
3. 系统将自动在您的 GitHub 上生成私密存储库，右上角变绿显示 **`🟢 已同步`**！

### 第3步：手机端免输入一键配对
1. 在电脑端弹窗中点击 **“复制快速同步串码”**，通过微信/QQ 发送给手机；
2. 手机打开网页，点击右上角 `☁️`，在“粘贴快速同步串码”输入框中粘贴并点击 **导入绑定**；
3. 手机与电脑即刻完成双向实时绑定！

---

## 🌐 一键上线到 GitHub Pages（永久公网域名）

根目录下已内置自动化部署脚本 [`deploy-github.bat`](file:///e:/健康生活/deploy-github.bat)：
1. 在 GitHub 上新建一个空仓库（例如命名为 `health`）；
2. 双击运行 [`deploy-github.bat`](file:///e:/健康生活/deploy-github.bat)，输入仓库地址，一键自动推送；
3. 在 GitHub 仓库的 **Settings ➜ Pages** 中，将 Branch 选为 `main`，点击 Save；
4. 等待1分钟即可获得属于您的永久专属域名（例如 `https://yourname.github.io/health/`），电脑关机手机也能全球访问！

---

## 🏗️ 目录职责树

```text
e:\健康生活/
├── index.html                          # 极简宿主页面 (支持PWA全屏添加到手机主屏幕)
├── deploy-github.bat                   # 一键推送至GitHub Pages自动化脚本
├── install-startup.bat                 # 一键配置Windows开机静默自启常驻
├── start-daemon.vbs                    # 零黑框后台守护启动脚本
├── stop.bat                            # 停止后台服务脚本
├── uninstall-startup.bat               # 卸载开机自启脚本
├── serve.py                            # 多线程本地服务器 (自动探测打印手机局域网IP)
├── README.md                           # 完整架构说明与云同步配置指南
├── EXPERIMENTS.md                      # 踩坑记录与健康防雷实测日志
├── css/
│   └── style.css                       # 移动端触控、呼吸光晕与护眼样式
└── js/
    ├── app.js                          # 核心路由器：统筹四大核心板块
    ├── core/
    │   ├── store.js                    # 本地持久化：多日期任务归档+常用模板库
    │   ├── syncService.js              # 跨端秒级云同步引擎 (GitHub Gist API)
    │   └── utils.js                    # 日期推导、音频合成与环境容灾
    ├── data/
    │   ├── timetableData.js            # 核心数据：7天 × 14时段健康大课表全景矩阵
    │   ├── registry.js                 # 注册表：统一管理所有计划与工具元数据
    │   ├── dietData.js                 # 饮食方案与1:1轮换备选库
    │   ├── exerciseData.js             # 4大工位微拉伸与3+2体能周方案
    │   ├── routineData.js              # 科研作息节律、90分钟睡眠与分段饮水时序
    │   ├── supplementData.js           # 室内研究生微量补剂库
    │   └── mentalData.js               # 导师沟通脱敏与4-7-8呼吸参数
    └── components/
        ├── navBar.js                   # 顶部一级导航（含云同步状态与移动端Dock）
        ├── sync/
        │   └── syncModal.js            # 跨端云同步连接与配置管理弹窗
        ├── daily/
        │   ├── dailyContainer.js       # 今日行动工作台总容器
        │   ├── dateNavigator.js        # 历史多日期回溯导航器
        │   ├── quickPresetsBar.js      # 常用任务闪电直达横条
        │   ├── presetManagerModal.js   # 自建常用模板库管理弹窗
        │   ├── trackModulesView.js     # 分模块多轨独立看板（饮食/运动/科研/提升/习惯）
        │   ├── trackTimelineView.js    # 全天时序混合流水线
        │   └── taskModal.js            # 临时任务添加与编辑弹窗
        ├── timetable/
        │   ├── timetableContainer.js   # 课表容器（全周大表 vs 今日流水）
        │   ├── weeklyTimetable.js      # 大学课表式7天全景矩阵视图
        │   ├── todayTimeline.js        # 今日垂直时序卡片流
        │   └── cellDetailModal.js      # 点击课格弹出的执行标准与避坑浮层
        ├── plans/
        │   ├── planContainer.js        # 计划规程库呈现中心
        │   └── fitnessPlanView.js      # 健身、跑步与羽毛球专项运动指南
        └── tools/
            ├── toolContainer.js        # 工具箱调度中心
            ├── trackerTool.js          # 今日打卡看板
            ├── foodSubTool.js          # 食物1:1自由替换计算器
            ├── waterTool.js            # 工位分段饮水与补剂记录器
            ├── deskTimerTool.js        # 45分钟工位久坐微拉伸番茄钟
            ├── breathingTool.js        # 4-7-8迷走神经呼吸训练仪
            └── backupTool.js           # 健康数据导出与导入中心
```
