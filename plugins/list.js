// KHAN-MD

const config = require('../config')
const { cmd, commands } = require('../command')
const { runtime } = require('../lib/functions')
const fs = require('fs')
const path = require('path')

cmd({
    pattern: "help",
    alias: ["listcmd", "list", "h", "commands"],
    desc: "Show all available commands with descriptions",
    category: "main",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Count total commands and aliases
        const totalCommands = Object.keys(commands).length
        let aliasCount = 0
        Object.values(commands).forEach(cmd => {
            if (cmd.alias) aliasCount += cmd.alias.length
        })

        // Get unique categories count
        const categories = [...new Set(Object.values(commands).map(c => c.category))]

        let menuText = `╭───『 *${config.BOT_NAME} COMMAND LIST* 』───⳹
│
│ *🛠️ BOT INFORMATION*
│ • 🤖 Bot Name: ${config.BOT_NAME}
│ • 👑 Owner: ${config.OWNER_NAME}
│ • ⚙️ Prefix: [${config.PREFIX}]
│ • 🌐 Platform: Heroku
│ • 📦 Version: 4.0.0
│ • 🕒 Runtime: ${runtime(process.uptime())}
│
│ *📊 COMMAND STATS*
│ • 📜 Total Commands: ${totalCommands}
│ • 🔄 Total Aliases: ${aliasCount}
│ • 🗂️ Categories: ${categories.length}
│
╰────────────────⳹\n`

        // Organize commands by category
        const categorized = {}
        categories.forEach(cat => {
            categorized[cat] = Object.values(commands).filter(c => c.category === cat)
        })

        // Generate menu for each category
        for (const [category, cmds] of Object.entries(categorized)) {
            menuText += `╭───『 *${category.toUpperCase()}* 』───⳹
│ • 📂 Commands: ${cmds.length}
│ • 🔄 Aliases: ${cmds.reduce((a, c) => a + (c.alias ? c.alias.length : 0), 0)}
│
`

            cmds.forEach(c => {
                menuText += `┃▸📄 COMMAND: .${c.pattern}\n`
                menuText += `┃▸❕ ${c.desc || 'No description available'}\n`
                if (c.alias && c.alias.length > 0) {
                    menuText += `┃▸🔹 Aliases: ${c.alias.map(a => `.${a}`).join(', ')}\n`
                }
                if (c.use) {
                    menuText += `┃▸💡 Usage: ${c.use}\n`
                }
                menuText += `│\n`
            })
            
            menuText += `╰────────────────⳹\n`
        }

        menuText += `\n📝 *Note*: Use ${config.PREFIX}help <command> for detailed help\n`
        menuText += `> ${config.DESCRIPTION}`

        // Check if local image exists
        const imagePath = path.join(__dirname, '../lib/khanmd.jpg')
        
        if (fs.existsSync(imagePath)) {
            // Send message with local image
            await conn.sendMessage(
                from,
                {
                    image: fs.readFileSync(imagePath),
                    caption: menuText,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363422931946639@newsletter',
                            newsletterName: config.BOT_NAME,
                            serverMessageId: 143
                        }
                    }
                },
                { quoted: mek }
            )
        } else {
            // If image doesn't exist, send text only
            await conn.sendMessage(
                from,
                {
                    text: `*⚠️ Local image not found*\n\n${menuText}`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363422931946639@newsletter',
                            newsletterName: config.BOT_NAME,
                            serverMessageId: 143
                        }
                    }
                },
                { quoted: mek }
            )
            console.log("Image file not found at:", imagePath)
        }

        // Send audio after menu
        const audioPath = path.join(__dirname, '../lib/tiger.mp3');
        
        if (fs.existsSync(audioPath)) {
            const audioBuffer = fs.readFileSync(audioPath);
            await conn.sendMessage(from, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: mek });
        } else {
            console.log('Audio file not found at:', audioPath);
        }

    } catch (e) {
        console.error('Command List Error:', e)
        reply(`❌ Error generating command list: ${e.message}`)
    }
})


