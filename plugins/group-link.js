const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "link",
  alias: ["invite", "gclink", "invitelink"],
  desc: "Get group invite link",
  category: "group",
  react: "🔗",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isGroup,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    
    // Bot must be admin to get invite link
    if (!isBotAdmins) return await reply("❌ I must be admin to get the invite link.");
    
    const inviteCode = await conn.groupInviteCode(from);
    const link = `https://chat.whatsapp.com/${inviteCode}`;
    
    await reply(`🔗 *Group Invite Link:*\n\n${link}`);

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to get group link. I may not have admin permission.");
  }
});
