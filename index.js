const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();
const { QuickDB } = require('quick.db'); // Updated import for clarity
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});
const db = new QuickDB();
// CHANGE THESE THREE LINES // ← Your values
const SELLER_ROLE_ID = '1470072594303549669';
const TICKET_CATEGORY_ID = '1470073289106788518';
const PREMIUM_ROLE_ID = '1471183765622493358';
const OWNER_ID = '1049050401493753866'; // Your ID
const LOG_CHANNEL_ID = '1471230871100063744'; // Log channel
const GEN_BUTTON_COOLDOWN_MS = 5 * 1000; // 5s anti-spam
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h
const buttonCooldowns = new Map(); // userID → timestamp
client.once('ready', () => {
  console.log(`Bot is online and ready! Logged in as ${client.user.tag}`);
});
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  // ── Panel Commands ──
  if (command === 'panel') {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('DizzyHub')
      .setDescription(
        'Welcome to DizzyHub!\n\n' +
        '• Click below to open a ticket\n' +
        '• Be patient — sellers will answer soon\n\n' +
        '**Rules:**\n' +
        '- No scamming accusations\n' +
        '- Be respectful\n' +
        '- Tickets only for purchases\n\n' +
        '**Links / Contact:**\n' +
        '• Email: yaboidizzy67@gmail.com\n' +
        '• Contact: <@&' + SELLER_ROLE_ID + '>'
      )
      .setFooter({ text: 'DizzyHubs bot • From Dizzy' });
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('create_ticket')
          .setLabel('Open Purchase Ticket')
          .setStyle(ButtonStyle.Success)
          .setEmoji('💰')
      );
    await message.channel.send({ embeds: [embed], components: [row] });
    await message.reply({ content: 'Panel sent!', ephemeral: true });
  }
 if (command === 'prices') {
  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setTitle('💰 Prices & Bundles')
    .setDescription(`\
🏙️ THA BRONX 3 — ACCOUNTS & MEMBERSHIPS
💠 $5 — BASIC
• 5 Cars | $990k Clean | $550k Dirty
• 1 Watch
• Full Gun Safe
💠 $10 — PREMIUM
• 25 Cars | $990k Clean & Dirty
• 5 Watches
• Full Gun Safe + Backpack
💠 $25 — EXOTIC
• ALL Cars | $1.6m Clean, Dirty & Bank
• ALL Watches
• Full Safe + Backpack + Trunk
• ALL Clothing
• Looting Pass
• Extra Wallet Pass
🔥 PREMIUM MEMBERSHIPS (Dupes or Money)
GUNS:
• 7 Days — $5
• 30 Days — $10
• 60 Days — $15
• LIFETIME — $25
MONEY:
• 7 Days — $6.50
• 30 Days — $7.50
• 60 Days — $10.50
• LIFETIME — $25
🏙️ PHILLY STREETS 2
💰 MONEY DROPS
• $1 → $5 MILL
• $2 → $10 MILL
• $3 → $15 MILL
• $4 → $20 MILL
• $5 → $25 MILL
💠 $5 — BASIC
• 5 Cars | $5.5 MILL Clean & Dirty
• 5 Outfits
• 1 Watch
💠 $10 — PREMIUM
• 10 Cars | $15 MILL Clean & Dirty
• 10 Outfits
• 5 Watches
💠 $25 — EXOTIC
• ALL Cars | MAX Clean & Dirty
• EVERY Outfit & Watch
• Double Wallet Pass
• Looting Pass
🚧 CENTRAL STREETS — COMING SOON 🚧
📩 DM FOR MORE INFO / ORDERS`)
    .setFooter({ text: 'Prices subject to change • DM for custom deals' });
  await message.channel.send({ embeds: [embed] });
  await message.reply({ content: 'Prices posted!', ephemeral: true });
}
  if (command === 'executors') {
  const embed = new EmbedBuilder()
    .setColor('#FF4500')
    .setTitle('🔥 Executors List – Best Tools for Roblox Scripting')
    .setDescription(
      '⚠️ **IMPORTANT DISCLAIMER**\n' +
      'Executors violate Roblox TOS and can lead to account bans, malware, or keyloggers.\n' +
      'Use at your own risk! Research thoroughly, use antivirus, and never share personal info.\n' +
      'We are NOT responsible for any issues. Download only from trusted sources.\n\n' +
      '**PC/WINDOWS**\n\n' +
      '**Paid**\n' +
      '• **Potassium** - sUNC 100% / UNC 100% → [Link](https://bloxproducts.com/r/weao#Potassium)\n' +
      '• **Seliware** - sUNC 100% / UNC 98% → [Link](https://robloxcheatz.com/product?id=51c9587f-4794-46ef-b6bf-2bd9f13c17d2&ref=weao)\n' +
      '• **Volcano** - sUNC 97% / UNC 98% → [Link](https://gckeys.cc/product?slug=volcano-executor&ref=weao)\n' +
      '• **Volt** - sUNC 100% / UNC 98% → [Link](https://bloxproducts.com/r/weao#Volt)\n' +
      '• **Wave** - sUNC 100% / UNC 99% → [Link](https://bloxproducts.com/?affiliate_key=weao#Wave)\n' +
      '• **Cryptic** - sUNC 94% / UNC 97% → [Link](https://bloxproducts.com/?affiliate_key=weao#Cryptic)\n\n' +
      '**Free**\n' +
      '• **Velocity** - sUNC 94% / UNC 99% → [Link](https://realvelocity.xyz/)\n' +
      '• **Xeno** - sUNC 27% / UNC 82% → [Link](https://www.xeno.onl/)\n\n' +
      '**iOS/ANDROID**\n\n' +
      '**Free**\n' +
      '• **Delta** - sUNC 100% / UNC 99% → [Official Site](https://delta-executor.com/) (or check deltaexploits.gg for updates)\n' +
      '• **Codex** - sUNC 96% / UNC 98% → [Link](https://robloxcheatz.com/affiliate/weao) or [codex.lol](https://
