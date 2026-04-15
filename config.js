const fs = require('fs');
const path = require('path');
const settings = require('./settings');

if (fs.existsSync(path.resolve('config.env'))) {
  require('dotenv').config({ path: path.resolve('config.env') });
}

// Helper to convert "true"/"false" strings to actual boolean
function convertToBool(text, trueValue = 'true') {
  return text === trueValue;
}


module.exports = {
  // ===== BOT CORE SETTINGS =====
  SESSION_ID: settings.SESSION_ID || process.env.SESSION_ID || "",
  PREFIX: settings.PREFIX || process.env.PREFIX || ".",
  CHATBOT: settings.CHATBOT || process.env.CHATBOT || "off",
  BOT_NAME: settings.BOT_NAME || process.env.BOT_NAME || "TIGER-MD",
  MODE: settings.MODE || process.env.MODE || "private",
  REPO: process.env.REPO || "https://github.com/ali91682640-eng/TIGER-MD",
  PAIRING_CODE: settings.PAIRING_CODE || process.env.PAIRING_CODE || "true",
  BAILEYS: settings.BAILEYS || process.env.BAILEYS || "@whiskeysockets/baileys",

  // ===== OWNER & DEVELOPER SETTINGS =====
  OWNER_NUMBER: settings.OWNER_NUMBER || process.env.OWNER_NUMBER || "923259855436",
  OWNER_NAME: settings.OWNER_NAME || process.env.OWNER_NAME || "𝘽𝘼𝙂𝙂𝘼-𝙎𝙃𝘼𝙍",
  DEV: settings.DEV || process.env.DEV || "923427582273",
  SUDO: settings.SUDO || process.env.SUDO 
    ? (process.env.SUDO || settings.SUDO).split(',').map(s => s.trim()) 
    : ["923427582273@s.whatsapp.net", "923259855436@s.whatsapp.net"],
  BANNED: settings.BANNED || process.env.BANNED 
    ? (process.env.BANNED || settings.BANNED).split(',').map(s => s.trim()) 
    : [],
  STATUS_LIKE_EMOJIS: settings.STATUS_LIKE_EMOJIS || process.env.STATUS_LIKE_EMOJIS 
    ? (process.env.STATUS_LIKE_EMOJIS || settings.STATUS_LIKE_EMOJIS).split(',').map(e => e.trim()) 
    : ["❤️", "🔥", "👍", "😍", "💯"],
  REACT_EMOJIS: settings.REACT_EMOJIS || process.env.REACT_EMOJIS 
    ? (process.env.REACT_EMOJIS || settings.REACT_EMOJIS).split(',').map(e => e.trim()) 
    : ["❤️", "🔥", "👍", "😍", "😂", "😮", "😎", "🥰", "👋", "🤝", "💯", "✨", "⭐", "🎉", "🤗", "😊", "🙌", "💪", "👏", "✅", "🎈", "🎊", "🏆", "⚡", "💫", "👌", "🤙", "💖", "💕", "💗", "👑", "💎", "🌟", "🎯", "🎨", "🎭", "🎪", "🎢", "🎡", "🎠"],
  OWNER_EMOJIS: settings.OWNER_EMOJIS || process.env.OWNER_EMOJIS 
    ? (process.env.OWNER_EMOJIS || settings.OWNER_EMOJIS).split(',').map(e => e.trim()) 
    : ["👑", "💎", "⭐", "✨", "🔥", "💯", "✅", "🎉", "🤖", "⚡", "💫", "🌟", "🏆", "👾", "🚀", "💪", "🎯", "🔱", "♾️", "⚜️"],
  LINK_WARNINGS: settings.LINK_WARNINGS || process.env.LINK_WARNINGS 
    ? (process.env.LINK_WARNINGS || settings.LINK_WARNINGS).split(',').map(s => s.trim()).filter(s => s) 
    : [],
  BAD_WORDS: settings.BAD_WORDS || process.env.BAD_WORDS 
    ? (process.env.BAD_WORDS || settings.BAD_WORDS).split(',').map(s => s.trim().toLowerCase()).filter(s => s) 
    : ["fuck", "phak", "bitch", "bhadwa", "motherfucker"],
  BAD_WORD_WARNINGS: settings.BAD_WORD_WARNINGS || process.env.BAD_WORD_WARNINGS 
    ? (process.env.BAD_WORD_WARNINGS || settings.BAD_WORD_WARNINGS).split(',').map(s => s.trim()).filter(s => s) 
    : [],

  // ===== AUTO-RESPONSE SETTINGS =====
  AUTO_REPLY: settings.AUTO_REPLY || process.env.AUTO_REPLY || "false",
  AUTO_STATUS_REPLY: settings.AUTO_STATUS_REPLY || process.env.AUTO_STATUS_REPLY || "false",
  AUTO_STATUS_MSG: settings.AUTO_STATUS_MSG || process.env.AUTO_STATUS_MSG || "*TIGER-MD VIEWED YOUR STATUS 🤖*",
  READ_MESSAGE: settings.READ_MESSAGE || process.env.READ_MESSAGE || "false",
  REJECT_MSG: settings.REJECT_MSG || process.env.REJECT_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",

  // ===== REACTION SETTINGS =====
  AUTO_REACT: settings.AUTO_REACT || process.env.AUTO_REACT || "false",
  OWNER_REACT: settings.OWNER_REACT || process.env.OWNER_REACT || "false",
  STICKER_NAME: settings.STICKER_NAME || process.env.STICKER_NAME || "TIGER-MD",
  AUTO_STICKER: settings.AUTO_STICKER || process.env.AUTO_STICKER || "false",
  AUTO_VOICE: settings.AUTO_VOICE || process.env.AUTO_VOICE || "false",
  STATUS_SENDER: settings.STATUS_SENDER || process.env.STATUS_SENDER || "true",
  // ===== AUTO PRESENCE SETTINGS =====
  ALWAYS_ONLINE: settings.ALWAYS_ONLINE || process.env.ALWAYS_ONLINE || "false",
  AUTO_TYPING: settings.AUTO_TYPING || process.env.AUTO_TYPING || "false",
  AUTO_RECORDING: settings.AUTO_RECORDING || process.env.AUTO_RECORDING || "false",

  // ===== ANTI LINK SETTINGS =====
  ANTI_LINK: settings.ANTI_LINK || process.env.ANTI_LINK || "true",
  
  // ===== ANTI BAD WORD SETTINGS =====
  ANTI_BAD_WORD: settings.ANTI_BAD_WORD || process.env.ANTI_BAD_WORD || "false",

  // ===== MEDIA & AUTOMATION =====
  MENTION_REPLY: settings.MENTION_REPLY || process.env.MENTION_REPLY || "false",
  MENU_IMAGE_URL: settings.MENU_IMAGE_URL || process.env.MENU_IMAGE_URL || "https://i.ibb.co/0VCDzzFQ/IMG-20260405-WA0251.jpg",
  BOT_MEDIA_URL: settings.BOT_MEDIA_URL || process.env.BOT_MEDIA_URL || "https://i.ibb.co/0VCDzzFQ/IMG-20260405-WA0251.jpg",
  AUTO_DOWNLOADER: settings.AUTO_DOWNLOADER || process.env.AUTO_DOWNLOADER || "false",
  
  // ===== SECURITY & ANTI-FEATURES =====
  ANTI_DELETE: settings.ANTI_DELETE || process.env.ANTI_DELETE || "true",
  ANTI_DELETE_PATH: settings.ANTI_DELETE_PATH || process.env.ANTI_DELETE_PATH || "inbox",
  ANTI_CALL: settings.ANTI_CALL || process.env.ANTI_CALL || "false",
  ANTI_SPAM: settings.ANTI_SPAM || process.env.ANTI_SPAM || "false",
  ANTI_VV: settings.ANTI_VV || process.env.ANTI_VV || "false",
  ANTI_BOT: settings.ANTI_BOT || process.env.ANTI_BOT || "false",
  PM_BLOCKER: settings.PM_BLOCKER || process.env.PM_BLOCKER || "false",
  ANTI_MENTION: settings.ANTI_MENTION || process.env.ANTI_MENTION || "false",
  ANTI_STATUS_MENTION: settings.ANTI_STATUS_MENTION || process.env.ANTI_STATUS_MENTION || "false",
  ANTI_EDIT: settings.ANTI_EDIT || process.env.ANTI_EDIT || "true",
  ANTIEDIT_PATH: settings.ANTIEDIT_PATH || process.env.ANTIEDIT_PATH || "inbox",

  // ===== BOT BEHAVIOR & APPEARANCE =====
  DESCRIPTION: settings.DESCRIPTION || process.env.DESCRIPTION || "*© 𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 𝘽𝘼𝙂𝙂𝘼-𝙎𝙃𝘼𝙍*",
  AUTO_LIKE_STATUS: settings.AUTO_LIKE_STATUS || process.env.AUTO_LIKE_STATUS || "false",
  AUTO_STATUS_SEEN: settings.AUTO_STATUS_SEEN || process.env.AUTO_STATUS_SEEN || "true",
  AUTO_BIO: settings.AUTO_BIO || process.env.AUTO_BIO || "false",
  
// ===== WELCOME & GOODBYE SETTINGS =====
WELCOME: settings.WELCOME || process.env.WELCOME || "false",
GOODBYE: settings.GOODBYE || process.env.GOODBYE || "false",
ADMIN_ACTION: settings.ADMIN_ACTION || process.env.ADMIN_ACTION || "false",

// Custom Welcome Message with your format
WELCOME_MESSAGE: settings.WELCOME_MESSAGE || process.env.WELCOME_MESSAGE || "*_@user joined the group, welcome! 🎉_*",

// Custom Goodbye Message with your format
GOODBYE_MESSAGE: settings.GOODBYE_MESSAGE || process.env.GOODBYE_MESSAGE || "*_@user has left the group, we will miss them! 👋_*",

  VERSION: settings.VERSION || process.env.VERSION || "10.0 Bᴇᴛᴀ",
  TIMEZONE: settings.TIMEZONE || process.env.TIMEZONE || "Asia/Karachi",
};
