const { cmd } = require('../command');
const { searchSong } = require('../lib/song');

cmd({
    pattern: "play",
    desc: "Search song",
    category: "media",
    filename: __filename
},
async (conn, mek, m, { text }) => {

    if (!text) return m.reply("❌ Song name do bhai");

    let song = await searchSong(text);

    let buttons = [
        { buttonId: `audio ${song.url}`, buttonText: { displayText: "🎧 Audio" }, type: 1 },
        { buttonId: `video ${song.url}`, buttonText: { displayText: "🎬 Video" }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        image: { url: song.thumbnail },
        caption: `🎵 ${song.title}`,
        footer: "Select format",
        buttons: buttons,
        headerType: 4
    }, { quoted: mek });

});
