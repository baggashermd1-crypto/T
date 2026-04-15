// KHAN MD

const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "apk",
    alias: ["app", "dlapk"],
    react: "🚀",
    desc: "📥 Download APK directly from Aptoide",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ *Please provide an app name!*");

        // ⏳ React - processing
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Using the working Aptoide API with node-fetch
        const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.datalist || !data.datalist.list || data.datalist.list.length === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *App not found. Please try another name.*");
        }

        const app = data.datalist.list[0];
        
        // Calculate size in MB
        const sizeInMB = (app.size / (1024 * 1024)).toFixed(2);
        
        // Check size limit (150MB)
        if (app.size > 150 * 1024 * 1024) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *App size is too large to download (max 150MB)*");
        }
        
        // Simple caption
        const caption = `✅ *APK Downloaded Successfully*\n\n📱 *App:* ${app.name}\n📦 *Size:* ${sizeInMB} MB`;

        // Send APK as document - simplified
        await conn.sendMessage(from, {
            document: { url: app.file.path_alt },
            mimetype: "application/vnd.android.package-archive",
            fileName: `${app.name}.apk`,
            caption: caption
        }, { quoted: mek });

        // ✅ React - success
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error("APK Download Error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply("❌ *An error occurred while fetching the APK. Please try again later.*");
    }
});
