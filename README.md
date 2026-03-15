<div align="center">
  <h1>🤖 KYOIMII</h1>
  <p><b>A highly versatile Mod Mail bot packed with a variety of additional features, completely free!</b></p>
  <p>
    <a href="https://discord.js.org/">
      <img src="https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm" alt="discord.js" />
    </a>
    <a href="https://nodejs.org/">
      <img src="https://img.shields.io/badge/node.js-supported-green.svg?logo=node.js" alt="Node.js" />
    </a>
  </p>
</div>

---

## 📖 Overview

**KYOIMII** is a multipurpose Discord bot designed to make server management easier while keeping things fun for members. At its core, it serves as a reliable **Mod Mail** system, allowing users to securely communicate with server staff. But it doesn't stop there—KYOIMII also features extensive moderation tools, fun commands, informative utility commands, and automated entry/exit greetings.

## ✨ Features

- 🛡️ **Mod Mail System**: Seamless communication between users and moderators.
- ⚙️ **Modular Command Handler**: Cleanly organized command categories:
  - `🎉 Fun`: Games, activities, and interaction commands.
  - `ℹ️ Info`: Server, user, and bot information.
  - `🔨 Moderations`: Essential moderation tools to keep your server safe.
- 🕒 **Command Cooldowns**: Built-in timeout systems to prevent chat flooding and spam.
- 👋 **Welcome & Goodbye System**: Automated, randomized greeting and farewell messages customizable per server.
- 🕵️ **Message Snipes & Edits**: Easily catch deleted messages and track ghost edits with dedicated snipe/edit tracking.
- 💾 **Database Integration**: Utilizes `quick.db` for fast, lightweight local storage.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- A Discord Bot Token (Get one from the [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. **Clone the repository or download the files.**
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Configure the bot:**
   - Add your bot token to your environment variables (`process.env.token`) or a `.env` file.
   - Adjust `config.json` to configure your bot's prefix.

4. **Start the bot:**
   ```bash
   node index.js
   ```

## 📂 Project Structure

```text
├── commands/         # Command modules
│   ├── fun/          # Entertainment & fun commands
│   ├── info/         # Information commands
│   └── moderations/  # Mod commands
├── handlers/         # Event & Command handlers
├── index.js          # Core bot entry file
├── config.json       # General configuration (Prefix, etc.)
└── package.json      # Dependencies and bot metadata
```

## 🛠️ Built With

- [Discord.js (v12)](https://github.com/discordjs/discord.js) - The core library to interact with the Discord API.
- [Quick.db](https://github.com/plexidev/quick.db) - Local sqlite database for fast config storage (Welcome channels, etc.).
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool.
- [MS / Pretty-MS](https://www.npmjs.com/package/ms) - Used for precise command cooldowns and timeouts.

---

<div align="center">
  <i>Developed with ❤️ by Awish.</i>
</div>
