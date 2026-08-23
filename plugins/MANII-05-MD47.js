/*_______________________________________________________________________________________________________________________________________________________________________________________________________________________
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
─██████████████──██████████──██████──────────██████████████──██████──────────██████──██████████████──██████──────────██████████████──██████──██████──██████████████──████████████████─── 
─██░░░░░░░░░░██──██░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██████████──██░░██──██░░░░░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██░░██████████──████░░████──██░░██──────────██░░██████████──██░░░░░░░░░░██──██░░██──██████░░██████──██░░██──────────██░░██████░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░██────────────██░░██────██░░██──────────██░░██──────────██░░██████░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██────██░░██─── 
─██░░██████████────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░░░░░░░░░██────██░░██────██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██████████░░██────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░██████░░████─── 
─────────██░░██────██░░██────██░░██──────────██░░██──────────██░░██──██░░██████░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░░░██░░░░██──██░░██──────────██░░██──██░░██───── 
─██████████░░██──████░░████──██░░██████████──██░░██████████──██░░██──██░░░░░░░░░░██──────██░░██──────██░░██████████──██░░██████░░██──████░░░░░░████──██░░██████████──██░░██──██░░██████─ 
─██░░░░░░░░░░██──██░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██████████░░██──────██░░██──────██░░░░░░░░░░██──██░░░░░░░░░░██────████░░████────██░░░░░░░░░░██──██░░██──██░░░░░░██─ 
─██████████████──██████████──██████████████──██████████████──██████──────────██████──────██████──────██████████████──██████████████──────██████──────██████████████──██████──██████████─ 
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
created by MANII05 🔥 
contact me on telegram mani05here ♻️
© Copy coder alert ⚠
*/


const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return reply("*`Need a valid Facebook URL!`*");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data?.content?.status || !data?.content?.data?.result?.length) {
      throw new Error("Invalid API response or no video found.");
    }

    let videoData = data.content.data.result.find(v => v.quality === "HD") || 
                    data.content.data.result.find(v => v.quality === "SD");

    if (!videoData) {
      throw new Error("No valid video URL found.");
    }

    await conn.sendMessage(from, {
      video: { url: videoData.url },
      caption: `📥 *𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 𝗙𝗕 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥..🚀*\n\n*QUAILTY•${videoData.quality}*\n\n🔗 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵*`
    }, { quoted: m });

  } catch (error) {
    console.error("FB Download Error:", error);

    // Send error details to bot owner
    const ownerNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerNumber, {
      text: `⚠️ *FB Downloader Error!*\n\n📍 *Group/User:* ${from}\n💬 *Query:* ${q}\n❌ *Error:* ${error.message || error}`
    });

    // Notify the user
    reply("❌ *Error:* Unable to process the request. Please try again later.");
  }
});


cmd({
    pattern: "insta3",
    alias: ["igdl3", "reel3", "ig3", "instadl3"],
    desc: "Download Instagram reels or image posts",
    category: "downloader",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide an Instagram post or reel link.");
        if (!q.includes("instagram.com")) return reply("Invalid Instagram link.");

        const apiUrl = `https://delirius-apiofc.vercel.app/download/igv2?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌"); 
            return reply("Failed to fetch Instagram media.");
        }

        const { username, fullname, caption, likes, comments, followed, download } = data.data;

        const captionText = `*𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 𝗜𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🚀*` +
                            `📸 *Instagram Post* 📸\n\n` +
                            `👤 *User:* ${fullname} (@${username})\n` +
                            `❤️ *Likes:* ${likes}\n💬 *Comments:* ${comments}\n👥 *Followers:* ${followed}\n` +
                            `📝 *Caption:*\n${caption || "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗."}`;

        for (const media of download) {
            if (media.type === "image") {
                await conn.sendMessage(from, {
                    image: { url: media.url },
                    caption: captionText,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: mek });
            } else if (media.type === "video") {
                await conn.sendMessage(from, {
                    video: { url: media.url },
                    caption: captionText,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: mek });
            }
        }

        await react("✅"); // React after successfully sending media
    } catch (e) {
        console.error("Error in Instagram downloader command:", e);
        await react("❌");
        reply(`An error occurred: ${e.message}`);
    }
});


cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        reply("*𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗜𝗡𝗚 𝗧𝗜𝗞𝗧𝗢𝗞 𝗩𝗜𝗗𝗘𝗢 , 𝗣𝗟𝗘𝗔𝗦𝗘 𝗪𝗔𝗜𝗧...🚀*");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `🎵 *𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗 𝗧𝗜𝗞𝗧𝗢𝗞 𝗩𝗜𝗗𝗘𝗢* 🎵\n\n` +
                        `👤 *USER:* ${author.nickname} (@${author.username})\n` +
                        `📖 *TITLE:* ${title}\n` +
                        `👍 *LIKES:* ${like}\n💬 *COMMENTS:* ${comment}\n🔁 *SHARES:* ${share}\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵ ♥️`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

/*const { fetchJson } = require('../functions');

cmd({
  pattern: "tiktok",
  alias: ['tt', 'ttdown'],
  react: "🎥",
  desc: "Download For Tiktok Videos",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
    }
    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗",
        newsletterJid: "120363406014910137@newsletter"
      }
      //externalAdReply: {
        //title: "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗-𝗪𝗔-𝗕𝗢𝗧",
        //body: "MANII05 MD BOT MADE BY MANII 05 ",
        //sourceUrl: "https://www.youtube.com/@Powerbymani05",
        //thumbnailUrl: "https://i.ibb.co/h2GC8Jn/20241228-171651.png",
        //mediaType: 1,
        //renderLargerThumbnail: false
      //}
    };

    const apiResponse = await fetchJson(`https://api.agatz.xyz/api/tiktok?url=${q}`);

    const downloadMessage = `*MANII-05-MD TIKTOK DOWNLOADEDER*
    
> *TITLE :* ${apiResponse.data.title}
> *Author :* ${apiResponse.data.author.fullname}
> *DURATION :* ${apiResponse.data.duration}
> *VIEWS :* ${apiResponse.data.stats.views}

*1.1 | No-Watermark-01*
*1.2 | No-Watermark-SD*
*1.3 | No-Watermark-HD*
*1.4 | AUDIO DOWNLOAD*
 
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵
`;

    const sentMessage = await conn.sendMessage(from, {
      image: { url: apiResponse.data.cover || '' },
      caption: downloadMessage,
      contextInfo
    }, { quoted: message });

    conn.ev.on("messages.upsert", async (msgUpdate) => {
      const receivedMessage = msgUpdate.messages[0];

      if (!receivedMessage.message || !receivedMessage.message.extendedTextMessage) {
        return;
      }

      const userResponse = receivedMessage.message.extendedTextMessage.text.trim();

      if (receivedMessage.message.extendedTextMessage.contextInfo &&
          receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        
        switch (userResponse) {
          case '1.1':
            await conn.sendMessage(from, {
              video: { url: apiResponse.data.data[0].url },
              mimetype: "video/mp4",
              caption: `*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵*`,
              contextInfo
            }, { quoted: receivedMessage });
            break;

          case '1.2':
            await conn.sendMessage(from, {
              video: { url: apiResponse.data.data[1].url },
              mimetype: "video/mp4",
              caption: `*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵*`,
              contextInfo
            }, { quoted: receivedMessage });
            break;

          case '1.3':
            await conn.sendMessage(from, {
              video: { url: apiResponse.data.data[2].url },
              mimetype: "video/mp4",
              caption: `*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵*`,
              contextInfo
            }, { quoted: receivedMessage });
            break;

          case '1.4':
            await conn.sendMessage(from, {
              audio: { url: apiResponse.data.music_info.url },
              mimetype: "audio/mpeg",
              contextInfo
            }, { quoted: receivedMessage });
            break;

          default:
            await conn.sendMessage(from, {
              text: "❌ Invalid option. Please select a valid number."
            }, { quoted: receivedMessage });
            break;
        }
      }
    });

  } catch (error) {
    console.error(error);
    await reply("❌ *I couldn't find anything. Please try again later...*");
    await conn.sendMessage(botNumber + "@s.whatsapp.net", {
      text: `❗ *Error Info:* ${error}`
    }, { quoted: message });
  }
});*/


/*cmd({
  pattern: "tiktok3",
  alias: ['tt3', 'ttdown3'],
  react: "🎥",
  desc: "Download TikTok Videos",
  category: "download",
  filename: __filename
}, async (bot, message, args, { from, quoted, reply, q }) => {
  try {
    if (!q) return await reply("*`Please provide a TikTok URL.`*");
    
    if (!q.includes('tiktok.com')) return await reply("This URL is invalid.");

    const apiUrl = `https://dark-shan-yt.koyeb.app/download/tiktok?url=${encodeURIComponent(q)}`;
    const apiResponse = await fetchJson(apiUrl);

    if (!apiResponse.status || !apiResponse.data) {
      return await reply("❌ Could not fetch video details.");
    }

    const videoData = apiResponse.data;
    const videoOptions = videoData.data;

    const downloadMessage = `
┏━┫ *⚬ᴍᴀɴɪ⁰⁵-ᴍᴅ-ᴛɪᴋᴛᴏᴋ⚬* ┣━✾
┃           
┻
> *Title:* ${videoData.title}
> *Author:* ${videoData.author.fullname}
> *Duration:* ${videoData.duration}
> *Views:* ${videoData.stats.views}
      
*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ*

*1.1 | No Watermark - SD*
*1.2 | No Watermark - HD*
*1.3 | Watermarked*
*1.4 | AUDIO*

> ᴍᴀɴɪ⁰⁵-ᴍᴅ ✻`;

    const sentMessage = await conn.sendMessage(from, {
      image: { url: videoData.cover || '' },
      caption: downloadMessage,
      contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363406014910137@newsletter',
                    newsletterName: "𝗠𝗔𝗡𝗜𝗜-𝟬𝟱-𝗠𝗗",
                    serverMessageId: 999
                }           
            }
     }, {quoted: mek});

    bot.ev.on("messages.upsert", async (msgUpdate) => {
      const receivedMessage = msgUpdate.messages[0];

      if (!receivedMessage.message || !receivedMessage.message.extendedTextMessage) return;

      const userResponse = receivedMessage.message.extendedTextMessage.text.trim();

      if (receivedMessage.message.extendedTextMessage.contextInfo &&
          receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        
        let downloadUrl;
        let captionText = "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵ · · ·*";

        switch (userResponse) {
          case '1.1':
            downloadUrl = videoOptions.find(v => v.type === "nowatermark")?.url;
            break;
          case '1.2':
            downloadUrl = videoOptions.find(v => v.type === "nowatermark_hd")?.url;
            break;
          case '1.3':
            downloadUrl = videoOptions.find(v => v.type === "watermark")?.url;
            break;
          case '1.4':
            downloadUrl = videoData.music_info.url;
            captionText = "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴɪ⁰⁵ · · ·*";
            break;
          default:
            return await conn.sendMessage(from, { text: "❌ Invalid option. Try again." }, { quoted: receivedMessage });
        }

        if (downloadUrl) {
          const mediaType = userResponse === '4' ? "audio/mpeg" : "video/mp4";
          await bot.sendMessage(from, {
            [userResponse === '4' ? "audio" : "video"]: { url: downloadUrl },
            mimetype: mediaType,
            caption: captionText
          }, { quoted: mek });
        }
      }
    });

  } catch (error) {
    console.error(error);
    await reply("❌ Error fetching the video. Please try again later.");
  }
});*/
          
