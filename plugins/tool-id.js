// KHAN-MD

const { cmd } = require('../command');

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson, lidToPhone, cleanPN } = require('../lib/functions');


// EXISTING ID COMMAND - DO NOT MODIFY
cmd({
    pattern: "id",
    alias: ["chatid", "lid", "jid", "gjid", "channelid", "newsletter", "cid"],  
    desc: "Get various IDs (chat, user, group, or channel)",
    react: "⚡",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { 
    from, isGroup, reply, sender, fromMe, botNumber2
}) => {
    try {
        // Check if user is asking for channel ID
        if (m.text && m.text.includes('whatsapp.com/channel/')) {
            const match = m.text.match(/whatsapp\.com\/channel\/([\w-]+)/);
            if (!match) return reply("⚠️ *Invalid channel link format.*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx");

            const inviteId = match[1];
            let metadata;
            
            try {
                metadata = await conn.newsletterMetadata("invite", inviteId);
            } catch (e) {
                return reply("❌ Failed to fetch channel metadata. Make sure the link is correct.");
            }

            if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");

            return reply(`> ${metadata.id}`);
        }

        if (isGroup) {
            // Get group JID only (no LID)
            const groupJID = from.includes('@g.us') ? from : `${from}@g.us`;
            return reply(`> *Group JID:* ${groupJID}`);
            
        } else {
            // Private chat (Inbox) - show s.whatsapp.net format
            if (fromMe) {
                // Owner in inbox - show bot's s.whatsapp.net
                const botPN = botNumber2.split('@')[0];
                return reply(`> *Your ID:* ${botPN}@s.whatsapp.net`);
            } else {
                // Others in inbox - convert LID to s.whatsapp.net
                let senderPN = sender.split('@')[0];
                
                if (sender.includes('@lid')) {
                    senderPN = await lidToPhone(conn, sender);
                }
                
                // Format as s.whatsapp.net only
                return reply(`> *Your ID:* ${senderPN}@s.whatsapp.net`);
            }
        }

    } catch (e) {
        console.error("ID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
});

// NEW COMMAND: Get @lid directly without converting to phone number
cmd({
    pattern: "getlid",
    alias: ["lidonly", "rawlid", "mylid"],  
    desc: "Get your LID (@lid) directly without conversion",
    react: "🆔",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { 
    from, isGroup, reply, sender, fromMe, botNumber2, mentionUser
}) => {
    try {
        // Check if mentioning someone to get their LID
        const mentionedUser = mentionUser ? mentionUser[0] : null;
        
        if (mentionedUser) {
            // Get mentioned user's LID
            if (mentionedUser.includes('@lid')) {
                return reply(`> *User LID:* ${mentionedUser}`);
            } else {
                return reply(`⚠️ Mentioned user is not in LID format.`);
            }
        }
        
        if (isGroup) {
            // In group - show sender's LID
            if (sender.includes('@lid')) {
                return reply(`> *Your LID:* ${sender}`);
            } else {
                return reply(`⚠️ You don't have a LID format in this chat.`);
            }
        } else {
            // Private chat
            if (fromMe) {
                // Bot owner in private chat
                if (botNumber2.includes('@lid')) {
                    return reply(`> *Bot LID:* ${botNumber2}`);
                } else {
                    return reply(`> *Bot Number:* ${botNumber2}`);
                }
            } else {
                // Other user in private chat
                if (sender.includes('@lid')) {
                    return reply(`> *Your LID:* ${sender}`);
                } else {
                    return reply(`⚠️ You don't have a LID format. Your current ID: ${sender}`);
                }
            }
        }

    } catch (e) {
        console.error("GetLID Command Error:", e);
        return reply(`⚠️ Error: ${e.message}`);
    }
});
