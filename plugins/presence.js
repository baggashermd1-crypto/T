// plugins/presence.js - CJS Version
const { cmd } = require('../command');
const config = require('../config');

// ===== READ MESSAGE =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup }) => {
    try {
        if (config.READ_MESSAGE === 'true') {
            await conn.readMessages([mek.key]).catch(() => {});
        } else if (config.READ_MESSAGE === 'inbox') {
            if (!isGroup) {
                await conn.readMessages([mek.key]).catch(() => {});
            }
        } else if (config.READ_MESSAGE === 'group') {
            if (isGroup) {
                await conn.readMessages([mek.key]).catch(() => {});
            }
        }
    } catch (e) {
        // Silent fail
    }
});

// ===== ALWAYS ONLINE =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup }) => {
    try {
        // Always online after reply
        if (config.ALWAYS_ONLINE === "true") {
            await conn.sendPresenceUpdate('available', from).catch(() => {});
        } else if (config.ALWAYS_ONLINE === "false") {
            await conn.sendPresenceUpdate('unavailable', from).catch(() => {});
        }
    } catch (e) {
        // Silent fail
    }
});

// ===== AUTO TYPING =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup }) => {
    try {
        if (config.AUTO_TYPING === 'true') {
            await conn.sendPresenceUpdate('composing', from).catch(() => {});
        } 
        else if (config.AUTO_TYPING === 'inbox') {
            if (!isGroup) {
                await conn.sendPresenceUpdate('composing', from).catch(() => {});
            }
        }
        else if (config.AUTO_TYPING === 'group') {
            if (isGroup) {
                await conn.sendPresenceUpdate('composing', from).catch(() => {});
            }
        }
    } catch (e) {
        // Silent fail
    }
});

// ===== AUTO RECORDING =====
cmd({
    on: "body"
}, async (conn, mek, m, { from, isGroup }) => {
    try {
        if (config.AUTO_RECORDING === 'true') {
            await conn.sendPresenceUpdate('recording', from).catch(() => {});
        }
        else if (config.AUTO_RECORDING === 'inbox') {
            if (!isGroup) {
                await conn.sendPresenceUpdate('recording', from).catch(() => {});
            }
        }
        else if (config.AUTO_RECORDING === 'group') {
            if (isGroup) {
                await conn.sendPresenceUpdate('recording', from).catch(() => {});
            }
        }
    } catch (e) {
        // Silent fail
    }
});