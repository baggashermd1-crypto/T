// TIGER-MD

const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "dlnpm",
    desc: "Download npm package as tgz (supports scoped packages)",
    category: "download",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) {
            return reply(
                "❌ *Package name do*"
            );
        }

        const pkg = q.trim();
        const encodedPkg = encodeURIComponent(pkg);

        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        // 1️⃣ Fetch package info (scoped-safe)
        const infoUrl = `https://registry.npmjs.org/${encodedPkg}`;
        const infoRes = await axios.get(infoUrl).catch(() => null);

        if (!infoRes || !infoRes.data) {
            await react("❌");
            return reply("❌ Package NPM registry par nahi mila");
        }

        const data = infoRes.data;
        const latest = data['dist-tags'].latest;
        const tarballUrl = data.versions[latest].dist.tarball;

        // safe filename (no / or @)
        const safeName = pkg.replace('@', '').replace('/', '-');
        const fileName = `${safeName}-${latest}.tgz`;
        const filePath = path.join(tempDir, fileName);

        // 2️⃣ Download tarball
        const tarballRes = await axios.get(tarballUrl, {
            responseType: 'arraybuffer'
        });

        fs.writeFileSync(filePath, tarballRes.data);

        // 3️⃣ Send file
        await conn.sendMessage(
            from,
            {
                document: fs.readFileSync(filePath),
                mimetype: 'application/gzip',
                fileName: fileName,
                caption:
`📦 *NPM Package Downloaded*

• *Name:* ${pkg}
• *Version:* ${latest}
• *Format:* .tgz

Powered By *TIGER-MD* 🤖`
            },
            { quoted: mek }
        );

        fs.unlinkSync(filePath);

    } catch (err) {
        console.error("DLNPM Error:", err);
        await react("❌");
        reply("❌ NPM package download failed");
    }
});


