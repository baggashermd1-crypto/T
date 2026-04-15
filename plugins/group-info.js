const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep } = require('../lib/functions')

cmd({
  pattern: "ginfo",
  alias: ["groupinfo"],
  desc: "Get group information",
  category: "group",
  react: "🥏",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isCreator,
  isBotAdmins,
  isAdmins,
  isGroup,
  reply,
  metadata,
  participants
}) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isBotAdmins) return await reply("❌ I must be admin to fetch group info.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only admins can use this command.");

    const groupData = metadata || await conn.groupMetadata(from);
    
    // Get group admins
    const groupAdmins = participants?.filter(p => p.admin) || [];
    
    // Handle description properly - don't truncate prematurely
    let description = groupData.desc || 'No description';
    
    // Create the main text without truncating description
    let text = `*「 Group Information 」*\n\n`;
    text += `*Name:* ${groupData.subject}\n`;
    text += `*ID:* ${groupData.id}\n`;
    text += `*Participants:* ${groupData.size}\n`;
    text += `*Created:* ${new Date(groupData.creation * 1000).toLocaleString()}\n\n`;
    text += `*Description:*\n${description}\n\n`;
    text += `*Admins (${groupAdmins.length}):*\n`;
    
    groupAdmins.forEach((admin, i) => {
      text += `${i+1}. @${admin.id.split('@')[0]}\n`;
    });

    // Check if message is too long for WhatsApp (max ~4096 characters)
    const MAX_MESSAGE_LENGTH = 4000;
    
    if (text.length > MAX_MESSAGE_LENGTH) {
      // Split into multiple messages if too long
      const chunks = [];
      let currentChunk = "";
      
      // Split by sections to keep formatting
      const sections = text.split('\n\n');
      
      for (const section of sections) {
        if ((currentChunk + section + '\n\n').length > MAX_MESSAGE_LENGTH) {
          chunks.push(currentChunk.trim());
          currentChunk = section + '\n\n';
        } else {
          currentChunk += section + '\n\n';
        }
      }
      
      if (currentChunk) chunks.push(currentChunk.trim());
      
      // Send first chunk with image, rest as text
      let firstChunk = true;
      for (const chunk of chunks) {
        if (firstChunk) {
          try {
            const ppUrl = await conn.profilePictureUrl(from, 'image');
            await conn.sendMessage(from, {
              image: { url: ppUrl },
              caption: chunk,
              mentions: groupAdmins.map(a => a.id)
            }, { quoted: mek });
          } catch {
            await reply(chunk, { mentions: groupAdmins.map(a => a.id) });
          }
          firstChunk = false;
        } else {
          await reply(chunk, { mentions: groupAdmins.map(a => a.id) });
          await sleep(500); // Small delay between messages
        }
      }
    } else {
      // Normal flow for short messages
      try {
        const ppUrl = await conn.profilePictureUrl(from, 'image');
        await conn.sendMessage(from, {
          image: { url: ppUrl },
          caption: text,
          mentions: groupAdmins.map(a => a.id)
        }, { quoted: mek });
      } catch {
        // Send without image if profile picture fails
        await reply(text, { mentions: groupAdmins.map(a => a.id) });
      }
    }

  } catch (err) {
    console.error('Group info error:', err);
    await reply("❌ Failed to fetch group information. Error: " + err.message);
  }
});
