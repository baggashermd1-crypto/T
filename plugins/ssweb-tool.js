const { cmd } = require("../command");
const axios = require("axios");

// ================= SSWEB COMMAND ====================

cmd({
    pattern: "ssweb",
    alias: ["screenshot", "webss"],
    desc: "Take screenshot of a website",
    category: "tools",
    react: "📸",
    filename: __filename,
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("📛 Please provide a URL\nExample: .ssweb https://github.com");
        
        let url = args[0];
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        
        // Default parameters
        const width = args[1] || "1280";
        const height = args[2] || "720";
        const full_page = args[3] || "true";
        const device_scale = args[4] || "2";
        
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        const encodedUrl = encodeURIComponent(url);
        const apiUrl = `https://api.nexray.web.id/tools/v1/ssweb?url=${encodedUrl}&width=${width}&height=${height}&full_page=${full_page}&device_scale=${device_scale}`;
        
        const response = await axios.get(apiUrl);
        
        if (response.data.status && response.data.result) {
            const imageUrl = response.data.result;
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            
            await conn.sendMessage(from, { 
                image: Buffer.from(imageResponse.data), 
                caption: `*✅ Website Screenshot*\n\n*URL:* ${url}\n*Resolution:* ${width}x${height}\n> *🚀 Powered by JAWAD-MD*`
            }, { quoted: mek });
        } else {
            reply("❌ Failed to capture screenshot");
        }
        
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
