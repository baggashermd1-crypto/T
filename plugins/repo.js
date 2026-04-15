// Jawad TechX
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')
const {sleep} = require('../lib/functions')
const fs = require('fs')
const path = require('path')

// Function to validate media URL and determine type
const getMediaType = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
        return null;
    }
    
    const urlLower = url.toLowerCase();
    
    // Check image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (imageExtensions.some(ext => urlLower.endsWith(ext))) {
        return 'image';
    }
    
    // Check video extensions
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.gif'];
    if (videoExtensions.some(ext => urlLower.endsWith(ext))) {
        return 'video';
    }
    
    return null;
};

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/ali91682640-eng/TIGER-MD';

    try {
        // Show typing presence before processing
        await conn.sendPresenceUpdate('composing', from);
        
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API with axios
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        
        const repoData = response.data;

        // Updated pair link
        const pairLink = 'https://tigermdx-pair.onrender.com';
        
        // Format the repository information in new stylish format
        const formattedInfo = `
╭─〔 *TIGER-MD REPOSITORY* 〕
│
├─ *📌 Repository Name:* ${repoData.name}
├─ *👑 Owner:* Bagga Shar
├─ *⭐ Stars:* ${repoData.stargazers_count}
├─ *⑂ Forks:* ${repoData.forks_count}
├─ *📝 Description:* ${repoData.description || 'World Best WhatsApp Bot powered by JawadTechX'}
│
├─ *🔗 GitHub Link:*
│   ${repoData.html_url}
│
├─ *🤖 Pair Link:*
│   https://tigermdx-pair.onrender.com
│
╰─ *⚡ Powered by TIGER-MD*
`.trim();

        // Determine which media to use
        let mediaData;
        const localImagePath = path.join(__dirname, '../lib/khanmd.jpg');
        
        // First check if config has valid media URL
        const mediaType = getMediaType(config.BOT_MEDIA_URL);
        
        if (mediaType === 'image' || mediaType === 'video') {
            try {
                // Check if server is accessible (timeout after 3 seconds)
                await axios.head(config.BOT_MEDIA_URL, { timeout: 3000 });
                // Server is up, use the URL media
                mediaData = { 
                    [mediaType]: { url: config.BOT_MEDIA_URL } 
                };
            } catch (serverError) {
                // Server is down or inaccessible, use local image
                console.log('Media server down, using local image:', serverError.message);
                mediaData = { image: { url: localImagePath } };
            }
        } else {
            // Invalid media URL format, use local image
            mediaData = { image: { url: localImagePath } };
        }

        // Send an image with the formatted info as a caption using config.BOT_MEDIA_URL
        await conn.sendMessage(from, {
            ...mediaData,
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363422931946639@newsletter',
                    newsletterName: config.BOT_NAME || 'KHAN-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio after repo info
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

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("❌ Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
