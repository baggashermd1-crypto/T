const { cmd } = require("../command");

cmd({
  pattern: "dismissall",
  alias: ["disall"],
  desc: "Remove admin rights from all admins except bot and owner",
  category: "group",
  react: "⚔️",
  filename: __filename
}, async (conn, mek, m, { from, isCreator, isBotAdmins, isAdmins, isGroup, reply, botNumber }) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isBotAdmins) return await reply("❌ I must be admin to use this command.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only group admins or owner can use this command.");

    const groupMetadata = await conn.groupMetadata(from);
    const ownerJid = conn.user.id.split(":")[0] + '@s.whatsapp.net';
    const botJid = botNumber.endsWith('@s.whatsapp.net') ? botNumber : botNumber + '@s.whatsapp.net';

    const admins = groupMetadata.participants
      .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
      .map(p => p.id);

    if (admins.length === 0) return await reply("⚠️ No admins found to dismiss.");

    // Exclude bot and owner
    const targets = admins.filter(jid => jid !== botJid && jid !== ownerJid);

    if (targets.length === 0) return await reply("✅ No eligible admins to dismiss (bot and owner excluded).");

    await conn.groupParticipantsUpdate(from, targets, "demote");

    await reply(`🚫 *Dismissed Successfully All Admins*`, { mentions: targets });

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to dismiss admins. Something went wrong.");
  }
});
