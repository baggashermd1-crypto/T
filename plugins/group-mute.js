const config = require('../config')
const { cmd } = require('../command')

cmd({
  pattern: "mute",
  alias: ["close", "lock"],
  desc: "Mute the group (admins only)",
  category: "group",
  react: "🔇",
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
    if (!isBotAdmins) return await reply("❌ I must be admin to mute the group.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only group admins or owner can use this command.");

    await conn.groupSettingUpdate(from, 'announcement');
    await reply("*🔇 Group has been muted!* \nOnly admins can send messages now.");

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to mute group. Something went wrong.");
  }
});
