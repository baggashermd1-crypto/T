// plugins/autodl
const { cmd } = require("../command");
const config = require('../config');
const axios = require('axios');

// Platform URLs and their APIs - Using new APIs
const platforms = {
    youtube: {
        pattern: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-_]{11})/i,
        api: "https://jawad-tech.vercel.app/download/ytdl",
        method: "video"
    },
    facebook: {
        pattern: /(?:https?:\/\/)?(?:www\.)?(facebook\.com|fb\.watch)\/[^\s]+/i,
        api: "https://jawad-tech.vercel.app/downloader",
        method: "video"
    },
    instagram: {
        pattern: /(?:https?:\/\/)?(?:www\.)?(instagram\.com|instagr\.am)\/[^\s]+/i,
        api: "https://api-aswin-sparky.koyeb.app/api/downloader/igdl",
        method: "media"
    },
    tiktok: {
        pattern: /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com|vt\.tiktok\.com)\/[^\s]+/i,
        method: "video" // No api here, will use multiple APIs in handler
    },
    pinterest: {
        pattern: /(?:https?:\/\/)?(?:www\.)?(pinterest\.com|pin\.it)\/[^\s]+/i,
        api: "https://jawad-tech.vercel.app/download/pinterest",
        method: "media"
    }
};

// Create caption for downloads (same for all platforms)
const createCaption = () => {
    return `> *© ${config.BOT_NAME} Auto Downloader*`;
};

// No prefix auto-downloader handler
cmd({
    'on': "body"
}, async (client, message, store, {
    from,
    body,
    isGroup,
    isAdmins,
    isBotAdmins,
    isCreator,
    reply,
    sender
}) => {
    try {
        // Direct check of config.AUTO_DOWNLOADER
        if (config.AUTO_DOWNLOADER === "true") {
            // Works for both inbox and groups - no additional check needed
        } 
        else if (config.AUTO_DOWNLOADER === "inbox") {
            if (isGroup) return; // Only works in inbox
        } 
        else if (config.AUTO_DOWNLOADER === "group") {
            if (!isGroup) return; // Only works in groups
        } 
        else if (config.AUTO_DOWNLOADER === "owner") {
            if (!isCreator) return; // Only works for owner
        } 
        else {
            // Anything else ("false", "off", "disable", or any other value) - DISABLE
            return;
        }
        
        // Check if message contains any platform URL
        let matchedPlatform = null;
        let matchedUrl = null;
        for (const [platform, data] of Object.entries(platforms)) {
            const match = body.match(data.pattern);
            if (match) {
                matchedPlatform = platform;
                matchedUrl = match[0];
                break;
            }
        }
        // Skip if no platform matched
        if (!matchedPlatform || !matchedUrl) return;

        // Get platform config
        const caption = createCaption();
        // Show processing reaction
        await client.sendMessage(from, { react: { text: '⏳', key: message.key } });

        try {
            // Handle different platform types
            await handleApiDownload(client, from, matchedUrl, matchedPlatform, caption, message);
            await client.sendMessage(from, { react: { text: '✅', key: message.key } });
        } catch (apiError) {
            console.error(`Auto-downloader error for ${matchedPlatform}:`, apiError);
            await client.sendMessage(from, { react: { text: '❌', key: message.key } });
        }

    } catch (error) {
        console.error("Auto-downloader error:", error);
    }
});

// Handle API-based downloads
async function handleApiDownload(client, from, url, platformType, caption, message) {
    try {
        // Handle different platforms with their specific APIs
        switch (platformType) {
            case "instagram":
                return await handleInstagram(client, from, url, caption, message);
            case "tiktok":
                return await handleTikTok(client, from, url, caption, message);
            case "youtube":
                return await handleYouTube(client, from, url, caption, message);
            case "facebook":
                return await handleFacebook(client, from, url, caption, message);
            case "pinterest":
                return await handlePinterest(client, from, url, caption, message);
            default:
                throw new Error("Unsupported platform");
        }
    } catch (error) {
        console.error(`API download error for ${platformType}:`, error);
        throw error;
    }
}

// Instagram handler with new API
async function handleInstagram(client, from, url, caption, message) {
    try {
        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        // Check response format for new API
        if (!response.data?.status || !response.data.data?.length) {
            throw new Error("Failed to fetch Instagram media");
        }
        
        const mediaData = response.data.data;

        // Send all media items
        for (const item of mediaData) {
            const mediaType = item.type === 'video' ? 'video' : 'image';
            
            await client.sendMessage(from, {
                [mediaType]: { url: item.url },
                caption: caption
            }, { quoted: message });
            
            // Small delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        return;
    } catch (error) {
        console.error("Instagram download error:", error);
        throw error;
    }
}

// TikTok handler using multiple APIs (from your tiktok command)
async function handleTikTok(client, from, url, caption, message) {
    try {
        let videoUrl;

        // Try First API: https://jawad-tech.vercel.app/download/tiktok?url=
        try {
            const api1 = `https://jawad-tech.vercel.app/download/tiktok?url=${encodeURIComponent(url)}`;
            const res1 = await axios.get(api1);
            const data1 = res1.data;

            if (data1?.status && data1?.result) {
                videoUrl = data1.result;
            } else {
                throw new Error("First API failed");
            }
        } catch (api1Error) {
            // Try Second API: https://jawad-tech.vercel.app/download/ttdl?url=
            try {
                const api2 = `https://jawad-tech.vercel.app/download/ttdl?url=${encodeURIComponent(url)}`;
                const res2 = await axios.get(api2);
                const data2 = res2.data;

                if (data2?.status && data2?.result) {
                    videoUrl = data2.result;
                } else {
                    throw new Error("Second API also failed");
                }
            } catch (api2Error) {
                // Try Third API as fallback
                const api3 = `https://api.deline.web.id/downloader/tiktok?url=${encodeURIComponent(url)}`;
                const res3 = await axios.get(api3);
                const data3 = res3.data;
                
                if (!data3?.status || !data3?.result?.download) {
                    throw new Error("All TikTok APIs failed");
                }
                videoUrl = data3.result.download;
            }
        }

        if (!videoUrl) {
            throw new Error("No video URL found");
        }

        // Send TikTok video with simple caption
        await client.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: caption
        }, { quoted: message });
        
        return;

    } catch (error) {
        console.error("TikTok download error:", error);
        throw error;
    }
}

// YouTube handler
async function handleYouTube(client, from, url, caption, message) {
    try {
        const apiUrl = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.result?.mp4) {
            throw new Error("Failed to fetch YouTube video");
        }
        
        await client.sendMessage(from, {
            video: { url: response.data.result.mp4 },
            caption: caption
        }, { quoted: message });
        
        return;
    } catch (error) {
        console.error("YouTube download error:", error);
        throw error;
    }
}

// Facebook handler
async function handleFacebook(client, from, url, caption, message) {
    try {
        const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.result?.length) {
            throw new Error("Failed to fetch Facebook video");
        }
        
        const video = response.data.result.find(v => v.quality === "HD") || 
                     response.data.result.find(v => v.quality === "SD");
                     
        if (!video?.url) {
            throw new Error("No video URL found");
        }
        
        await client.sendMessage(from, {
            video: { url: video.url },
            caption: caption
        }, { quoted: message });
        
        return;
    } catch (error) {
        console.error("Facebook download error:", error);
        throw error;
    }
}

// Pinterest handler
async function handlePinterest(client, from, url, caption, message) {
    try {
        const apiUrl = `https://jawad-tech.vercel.app/download/pinterest?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data?.status || !response.data.result?.url) {
            throw new Error("Failed to fetch Pinterest media");
        }
        
        const isVideo = response.data.result.type === 'video';
        
        await client.sendMessage(from, {
            [isVideo ? 'video' : 'image']: { url: response.data.result.url },
            caption: caption
        }, { quoted: message });
        
        return;
    } catch (error) {
        console.error("Pinterest download error:", error);
        throw error;
    }
}
