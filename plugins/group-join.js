const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
  pattern: "join",
  alias: ["j", "joinlink", "gclink"],
  desc: "Join a group using invite link",
  category: "group",
  react: "⚙️",
  filename: __filename
}, async (conn, mek, m, {
  isCreator,
  q,
  quoted,
  reply
}) => {
  try {
    if (!isCreator) return await reply("🔐 Only bot owner can use this command.");
    
    let link;

    // Check for link in quoted message
    if (quoted && quoted.text) {
      const quotedText = quoted.text;
      const linkMatch = quotedText.match(/chat\.whatsapp\.com\/([a-zA-Z0-9_-]+)/);
      if (linkMatch) link = linkMatch[1];
    }
    
    // Check for link in command text
    if (!link && q) {
      const linkMatch = q.match(/chat\.whatsapp\.com\/([a-zA-Z0-9_-]+)/);
      if (linkMatch) link = linkMatch[1];
    }

    if (!link) {
      return await reply("❌ Please provide a valid WhatsApp group invite link.\nExample: join https://chat.whatsapp.com/ABC123XYZ");
    }

    // Remove any query parameters
    link = link.split('?')[0];

    try {
      await conn.groupAcceptInvite(link);
      await reply("✅ Successfully joined the group!");
    } catch (err) {
      if (err.message?.includes("already") || err.status === 409) {
        await reply("ℹ️ I'm already in this group.");
      } else if (err.message?.includes("reset") || err.message?.includes("expired")) {
        await reply("❌ This link has expired or been reset.");
      } else if (err.message?.includes("invalid") || err.message?.includes("bad-request")) {
        await reply("❌ Invalid group link.");
      } else {
        await reply("❌ Failed to join group: " + (err.message || "Unknown error"));
      }
    }

  } catch (err) {
    console.error(err);
    await reply("❌ An error occurred while processing the command.");
  }
});
