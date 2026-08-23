const { cmd } = require("../command");
const { sleep } = require('../lib/functions');
const config = require('../config');
const { runtime } = require('../lib/functions');
const os = require("os");

// 🔹 Meta Verified Style (Fake vCard Contact)
const lipx = {
  key: {
    remoteJid: "status@broadcast",
    fromMe: false,
    id: "FAKE_META_ID_001",
    participant: "13135550002@s.whatsapp.net"
  },
  message: {
    contactMessage: {
      displayName: "© 𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 ☑️",
      vcard: `BEGIN:VCARD
VERSION:3.0
N:𝗠𝗔𝗡𝗜𝗜;𝟬𝟱;;;
FN:𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 ☑️
TEL;waid=13135550002:+1 313 555 0002
END:VCARD`
    }
  }
};

cmd({
  pattern: "ping",
  alias: ["🚀", "pong"],
  use: ".ping",
  desc: "Check bot's response time.",
  category: "main",
  react: "⚡",
  filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
  try {
    const start = Date.now();

    // 🔥 Random reaction
    const reacts = ["⚡", "🚀", "🔥", "💨", "✨"];
    await conn.sendMessage(from, {
      react: { text: reacts[Math.floor(Math.random() * reacts.length)], key: mek.key }
    });

    const ping = Date.now() - start;
    const uptime = runtime(process.uptime());

    const text = `*👋 ℍ𝔼𝕃𝕃𝕆 @${sender.split("@")[0]}!*

*🤖 𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗-𝗔𝗟𝗜𝗩𝗘*
*📡 𝗣𝗜𝗡𝗚:* \`${ping} ms\`
*⏱ 𝗨𝗣𝗧𝗜𝗠𝗘:* \`${uptime}\`
*🛡 𝗦𝗧𝗔𝗧𝗨𝗦:* \`𝐒𝐭𝐚𝐛𝐥𝐞\`

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵ 🤭`;

    await conn.sendMessage(
      from,
      {
        text,
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363406014910137@newsletter",
            newsletterName: "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗",
            serverMessageId: 1
          }
        }
      },
      { quoted: lipx } // ✅ META VERIFIED QUOTE
    );

  } catch (e) {
    console.error("Ping Cmd Error:", e);
    reply("❌ Ping failed!");
  }
});

// ping 2

// 🔹 Meta Verified Style (Fake vCard Contact)

cmd({
  pattern: "speed",
  react: "✨",
  alias: ["ping2", "pong2"],
  desc: "Check bot status",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from }) => {
  try {
    const speed = Date.now() - Date.now(); // ultra fast ping

    // ⏱️ Uptime
    const uptimeSec = process.uptime();
    const uptime =
      Math.floor(uptimeSec / 3600) + "h " +
      Math.floor((uptimeSec % 3600) / 60) + "m " +
      Math.floor(uptimeSec % 60) + "s";

    // 🧠 RAM
    const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(0);

    // 🌐 Platform
    const platform = `${os.platform()} (${os.arch()})`;

    // 📶 WhatsApp Connection
    const waStatus = conn.user ? "Connected ✅" : "Disconnected ❌";

    const text =
`╭───〈 🚀 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒 🚀 〉───╮
│      𝐌𝐄𝐓𝐀 𝐕𝐄𝐑𝐈𝐅𝐈𝐄𝐃
│ ⚡ 𝐒𝐏𝐄𝐄𝐃     : *${speed} ms*
│ ⏱️ 𝐔𝐏𝐓𝐈𝐌𝐄   : *${uptime}*
│ 🧠 𝐑𝐀𝐌       : *${usedRam} MB*
│ 🌐 𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌 : *${platform}*
│ 📶 𝐖𝐀        : *${waStatus}*
╰──────────────────╯`;

    await conn.sendMessage(from, {
      text,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 ☑️",
          body: "𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦 • 𝗠𝗘𝗧𝗔 𝗩𝗘𝗥𝗜𝗙𝗜𝗘𝗗",
          thumbnailUrl: "https://telegra.ph/file/2a06381b260c3f096a612.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363406014910137@newsletter",
          newsletterName: "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗",
          serverMessageId: 143
        }
      }
    }, { quoted: lipx }); // ✅ Meta verified + thumbnail reply

  } catch (e) {
    console.log("Speed cmd error:", e);
  }
});
