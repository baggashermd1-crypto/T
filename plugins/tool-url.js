const { cmd } = require("../command");
const { fileTypeFromBuffer } = require("file-type");

const DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (Chrome) Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
};

const UPLOAD_TIMEOUT = 60000;

// Catbox uploader (exactly like Loara bot)
async function uploadToCatbox(buffer) {
    if (!buffer || buffer.length === 0) throw new Error("Buffer cannot be empty");
    
    const type = await fileTypeFromBuffer(buffer);
    if (!type) throw new Error("Unrecognized file format");
    
    const formData = new FormData();
    formData.append("reqtype", "fileupload");
    const blob = new Blob([buffer], { type: type.mime });
    formData.append("fileToUpload", blob, `upload.${type.ext}`);
    
    const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: formData,
        signal: AbortSignal.timeout(UPLOAD_TIMEOUT),
    });
    
    if (!response.ok) throw new Error(`Catbox HTTP ${response.status}: ${response.statusText}`);
    
    const text = await response.text();
    if (!text.startsWith("http")) throw new Error(`Catbox invalid response: ${text.substring(0, 100)}`);
    
    return text.trim();
}

// Uguu.se uploader (fallback)
async function uploadToUguu(buffer) {
    if (!buffer || buffer.length === 0) throw new Error("Buffer cannot be empty");
    
    const type = await fileTypeFromBuffer(buffer);
    if (!type) throw new Error("Unrecognized file format");
    
    const formData = new FormData();
    const blob = new Blob([buffer], { type: type.mime });
    formData.append("files[]", blob, `upload.${type.ext}`);
    
    const response = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: formData,
        signal: AbortSignal.timeout(UPLOAD_TIMEOUT),
    });
    
    if (!response.ok) throw new Error(`Uguu HTTP ${response.status}: ${response.statusText}`);
    
    const json = await response.json();
    if (!json?.files?.[0]?.url) throw new Error("Uguu invalid response format");
    
    return json.files[0].url.trim();
}

// Main command
cmd({
    pattern: "tourl",
    alias: ["imgtourl", "imgurl", "url", "geturl", "upload"],
    react: '🖇',
    desc: "Convert media to URL (Catbox/Uguu)",
    category: "utility",
    use: ".tourl [reply to media]",
    filename: __filename
}, async (client, message, match, { from, reply }) => {
    try {
        // Check if quoted message exists
        if (!match.quoted) {
            return reply("*🍁 Please reply to an image, video, or audio message!*");
        }

        const mimeType = match.quoted.mimetype || '';
        
        if (!mimeType) {
            return reply("*❌ Please reply to a valid media file!*");
        }

        // Show loading
        await reply("⏳ *Uploading media...*");

        // Download decrypted media (using vv command pattern)
        const buffer = await match.quoted.download();
        
        if (!buffer || buffer.length === 0) {
            throw new Error("Failed to download media");
        }

        const sizeMB = (buffer.length / 1024 / 1024).toFixed(2);
        const sizeDisplay = buffer.length > 1024 * 1024 ? `${sizeMB} MB` : `${(buffer.length / 1024).toFixed(2)} KB`;

        // Try Catbox first
        let result;
        let usedProvider = "Catbox.moe";
        
        try {
            result = await uploadToCatbox(buffer);
            if (!result || !result.startsWith("http")) throw new Error("Invalid Catbox response");
        } catch (catboxError) {
            console.error("Catbox failed:", catboxError.message);
            
            // Fallback to Uguu if Catbox fails
            try {
                result = await uploadToUguu(buffer);
                usedProvider = "Uguu.se (fallback)";
                if (!result || !result.startsWith("http")) throw new Error("Invalid Uguu response");
            } catch (uguuError) {
                throw new Error(`Both uploaders failed.\nCatbox: ${catboxError.message}\nUguu: ${uguuError.message}`);
            }
        }

        // Determine media type for response
        let mediaType = 'File';
        if (mimeType.includes('image')) mediaType = 'Image';
        else if (mimeType.includes('video')) mediaType = 'Video';
        else if (mimeType.includes('audio')) mediaType = 'Audio';

        // Send response
        await reply(
            `*${mediaType} Uploaded Successfully*\n\n` +
            `*Size:* ${sizeDisplay}\n` +
            `*Server:* ${usedProvider}\n` +
            `*URL:* ${result}\n\n` +
            `> © Uploaded by Tiger 💜`
        );

    } catch (error) {
        console.error("Tourl Error:", error);
        await reply(`❌ Error: ${error.message || error}`);
    }
});
