// JawadTechXD 

const { cmd, commands } = require('../command');
const os = require("os");
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, reply }) => {
    try {
        // ⏳ React - processing
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        // 1000ms delay to ensure react is visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        const totalCmds = commands.length;
        
        const formatUptime = (seconds) => {
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            
            let timeString = '';
            if (days > 0) timeString += `${days} day${days > 1 ? 's' : ''} `;
            if (hours > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
            if (minutes > 0) timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
            if (secs > 0 || timeString === '') timeString += `${secs} second${secs !== 1 ? 's' : ''}`;
            
            return timeString.trim();
        };

        const uptime = formatUptime(process.uptime());

        const status = `╭─〔 *🤖 TIGER-MD STATUS* 〕
│
├─ *🌐 Platform:* Heroku
├─ *📦 Mode:* ${config.MODE || 'private'}
├─ *👑 Owner:* ${config.OWNER_NAME || 'JawadTechX'}
├─ *🔹 Prefix:* ${config.PREFIX || '.'}
├─ *🧩 Version:* 5.0.0 Beta
├─ *📁 Total Commands:* ${totalCmds}
├─ *⏱ Runtime:* ${uptime}
│
╰─ *⚡ Powered by TIGER-MD*`;

        await conn.sendMessage(from, { 
            text: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // 800ms delay before success react
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // ✅ React - success
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Error in alive command:", e);
        // ❌ React - error
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        await reply(`❌ An error occurred: ${e.message}`);
    }
});
