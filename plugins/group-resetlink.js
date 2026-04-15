const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
  pattern: "revoke",
  alias: ["resetlink", "newlink"],
  desc: "Reset group invite link",
  category: "group",
  react: "🔄",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isCreator,
  isBotAdmins,
  isAdmins,
  isGroup,
  reply
}) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isBotAdmins) return await reply("❌ I must be admin to reset link.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only admins can use this command.");

    const newCode = await conn.groupRevokeInvite(from);
    await reply(`*✅ Link Reset Successful!*\n\n🔗 https://chat.whatsapp.com/${newCode}`);

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to reset link.");
  }
});
