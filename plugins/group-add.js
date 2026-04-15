const { cmd } = require("../command");

cmd({
  pattern: "add",
  desc: "Add user to group",
  category: "group",
  filename: __filename,
  react: "➕"
}, async (conn, mek, m, { 
  from, 
  args, 
  quoted,
  mentionedJid,
  isGroup, 
  isBotAdmins, 
  isCreator, 
  reply 
}) => {
  try {
    if (!isGroup) return await reply("⚠️ Group only.");
    if (!isBotAdmins) return await reply("❌ I need admin.");
    if (!isCreator) return await reply("🔐 Owner only.");
    
    // User extraction logic
    let userJid = null;
    
    if (!quoted && (!mentionedJid || mentionedJid.length === 0) && !args[0]) {
      return await reply("❓ Please mention user, quote, or provide number!");
    }
    
    if (mentionedJid && mentionedJid.length > 0) {
      userJid = mentionedJid[0];
    } else if (quoted) {
      userJid = quoted.sender;
    } else if (args[0]) {
      const num = args[0].replace(/[^0-9]/g, '');
      if (num.length >= 10) userJid = num + "@s.whatsapp.net";
    }
    
    if (!userJid) return await reply("⚠️ Couldn't determine user.");
    
    // Add user
    await conn.groupParticipantsUpdate(from, [userJid], "add");
    await reply(`✅ Added!`, { mentions: [userJid] });

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to add user.");
  }
});
