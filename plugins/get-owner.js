//  KHAN-XMD
const { cmd } = require('../command');
const config = require('../config');
const { sleep } = require('../lib/functions');

cmd({
  pattern: "owner",
  desc: "Get owner number",
  category: "main",
  react: "🎮",
  filename: __filename
}, async (sock, m, msg, { from }) => {
  try {
    // React with loading emoji
    await sock.sendMessage(from, { react: { text: "📇", key: m.key } });
    await sock.sendPresenceUpdate("composing", from);
    await sleep(1000);

    const vcard =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${config.OWNER_NAME}\n` +  // Directly using config.OWNER_NAME
      `ORG:${config.BOT_NAME} Team;\n` +  // Directly using config.BOT_NAME
      `TEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${'+' + config.OWNER_NUMBER}\n` +  // Directly using config.OWNER_NUMBER
      'END:VCARD';

    await sock.sendMessage(from, {
      contacts: {
        displayName: config.OWNER_NAME,  // Directly using config.OWNER_NAME
        contacts: [{ vcard }]
      }
    });

    await sock.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error("Error sending contact:", e);
    await sock.sendMessage(from, {
      text: `❌ Couldn't send contact:\n${e.message}`
    });
  }
});
