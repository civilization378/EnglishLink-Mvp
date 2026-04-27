# English Link · 任务日志

## 2026-04-27

### Hermes 本地部署完成

完成内容：

- 开启 BIOS 虚拟化。
- 安装 WSL2。
- 安装 Ubuntu。
- 安装 Hermes Agent。
- 配置 DeepSeek API。
- 配置 OpenRouter API。
- 解决 `.env` 文件被污染导致 API Key 长度异常的问题。
- 跑通 OpenRouter + Claude Sonnet 4.6。
- 跑通 DeepSeek V4 Flash。
- 创建 HERMES.md 项目规则文件。
- Hermes 已能按照项目规则读取 English Link 项目并输出分析报告。
- 重新轮换并设置新的 API Key。

### 项目记忆系统开始建立

完成内容：

- 确定三层记忆法：
  1. HERMES.md 作为项目规则。
  2. docs/assistant-memory 作为长期项目记忆。
  3. 后续 English Link Skill 作为自动化工作流能力。
- 准备创建 PROJECT_MEMORY.md、TASK_LOG.md、DECISIONS.md 三个长期记忆文件。

遗留问题：

- 后续需要确认 DeepSeek V4 Pro 在 Hermes 中长期稳定性。
- 后续需要建立 English Link 视频素材工作流。
- 后续可以把 English Link 项目规则沉淀成 Hermes Skill。