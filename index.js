const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();
const quickdb = require('quick.db');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const db = new quickdb.QuickDB();

// CHANGE THESE THREE LINES // ← Your values
const SELLER_ROLE_ID = '1470072594303549669';     // Your sellers role ID
const TICKET_CATEGORY_ID = '1470073289106788518'; // Your Tickets category ID
const PREMIUM_ROLE_ID = '1471183765622493358';    // ← Your Premium role ID

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

client.once('ready', () => {
  console.log('Bot is online and ready!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  // ── Your existing commands ──
  if (message.content === '!panel') {
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

  if (message.content === '!prices') {
    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('💰 Prices & Bundles')
      .setDescription(
        '🏙️ **THA BRONX 3**\n' +
        '💠 **$5 BASIC** → 5 Cars ($990k clean/$550k dirty) • 1 Watch • Full Gun Safe\n' +
        '💠 **$10 PREMIUM** → 25 Cars ($990k clean+dirty) • 5 Watches • Safe + Backpack\n' +
        '💠 **$25 EXOTIC** → ALL Cars ($1.6m clean/dirty/bank) • ALL Watches/Clothes • Safe+Backpack+Trunk • Looting + Extra Wallet Pass\n\n' +
        '🔥 **GUNS**: 7d $5 | 30d $10 | 60d $15 | Lifetime $25\n' +
        '🔥 **MONEY**: 7d $6.50 | 30d $7.50 | 60d $10.50 | Lifetime $25\n\n' +
        '🏙️ **PHILLY STREETS 2**\n' +
        '💰 **MONEY**: $1→$5m | $2→$10m | $3→$15m | $4→$20m | $5→$25m\n' +
        '💠 **$5 BASIC** → 5 Cars ($5.5m clean+dirty) • 5 Outfits • 1 Watch\n' +
        '💠 **$10 PREMIUM** → 10 Cars ($15m clean+dirty) • 10 Outfits • 5 Watches\n' +
        '💠 **$25 EXOTIC** → ALL Cars (max clean+dirty) • ALL Outfits/Watches • Double Wallet + Looting Pass\n\n' +
        '🚧 **CENTRAL STREETS — COMING SOON**\n\n' +
        '📩 **Make a ticket for orders/info**'
      )
      .setFooter({ text: 'Prices subject to change • DM for custom deals' });

    await message.channel.send({ embeds: [embed] });
    await message.reply({ content: 'Prices posted!', ephemeral: true });
  }

  if (message.content === '!executors') {
    const embed = new EmbedBuilder()
      .setColor('#FF4500')
      .setTitle('🔥 Executors List')
      .setDescription(
        '🏙️ **PC/WINDOWS**\n\n' +
        '**Paid**\n' +
        '• Potasium - sUNC100% / UNC100% → [Link](https://bloxproducts.com/r/weao#Potassium)\n' +
        '• Selware - sUNC100% / UNC98% → [Link](https://robloxcheatz.com/product?id=51c9587f-4794-46ef-b6bf-2bd9f13c17d2&ref=weao)\n' +
        '• Volcano - sUNC97% / UNC98% → [Link](https://gckeys.cc/product?slug=volcano-executor&ref=weao)\n' +
        '• Volt - sUNC100% / UNC98% → [Link](https://bloxproducts.com/r/weao#Volt)\n' +
        '• Cryptic - sUNC94% / UNC97% → [Link](https://bloxproducts.com/?affiliate_key=weao#Cryptic)\n\n' +
        '**Free**\n' +
        '• Velocity - sUNC94% / UNC99% → [Link](https://realvelocity.xyz/)\n' +
        '• Xeno - sUNC27% / UNC82% → [Link](https://www.xeno.onl/)\n\n' +
        '**MOBILE**\n' +
        '**Free/Paid**\n' +
        '• Delta - sUNC100% / UNC99% → [Link](https://deltaexploits.gg/)\n' +
        '• Cryptic - sUNC97% / UNC98% → [Link](https://bloxproducts.com/?affiliate_key=weao#Cryptic)\n\n' +
        '**MAC**\n' +
        '**Free**\n' +
        '• Hydrogen - sUNC90% / UNC99% → [Link](https://hydrogenmacos.selly.store/)\n\n' +
        '**Paid**\n' +
        '• MacSploít - sUNC100% / UNC99% → [Link](https://bloxproducts.com/?affiliate_key=weao#MacSploit)\n\n' +
        'I HIGHLY RECOMMEND TO PURCHASE A PAID EXECUTOR FOR THE BEST SCRIPTING EXPERIENCE\n\n' +
        'VOLCANO, SELWARE AND VOLT WORK GOOD.\n\n' +
        '**Important Links**\n' +
        '• FOLLOW TIKTOK: [Link](https://www.tiktok.com/@officialplug100?_r=1&_t=ZT-93mkMBzXUZq)\n' +
        '• Contact: <@&' + SELLER_ROLE_ID + '> or DM @Dizzy'
      )
      .setFooter({ text: 'BEWARE: Executor stats can change • Research before using • make ticket for questions' });

    await message.channel.send({ embeds: [embed] });
    await message.reply({ content: 'Executors list posted!', ephemeral: true });
  }

  // ── NEW: Add stock (admin only) ──
  if (message.content.startsWith('!addstock')) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply({ content: 'Only admins can add stock.', ephemeral: true });
    }
    const args = message.content.split(' ').slice(1);
    if (args.length < 2) {
      return message.reply('Usage: !addstock <free|premium> <account1> <account2> ...');
    }
    const type = args[0].toLowerCase();
    if (!['free', 'premium'].includes(type)) {
      return message.reply('Type must be "free" or "premium"');
    }
    const accounts = args.slice(1);
    let current = await db.get(`stock_${type}`) || [];
    current.push(...accounts);
    await db.set(`stock_${type}`, current);
    return message.reply(`Added ${accounts.length} ${type} account(s). Total now: ${current.length}`);
  }

  // ── NEW: Check stock (admin only) ──
  if (message.content === '!stock' && message.member.permissions.has('Administrator')) {
    const free = await db.get('stock_free') || [];
    const premium = await db.get('stock_premium') || [];
    message.reply(`**Current Stock Counts:**\nFree: ${free.length} accounts\nPremium: ${premium.length} accounts`);
  }

  // ── NEW: Remove specific accounts from stock (admin only) ──
  if (message.content.startsWith('!removestock') && message.member.permissions.has('Administrator')) {
    const args = message.content.split(' ').slice(1);
    if (args.length < 2) {
      return message.reply('Usage: !removestock <free|premium> <account1> <account2> ...');
    }
    const type = args[0].toLowerCase();
    if (!['free', 'premium'].includes(type)) {
      return message.reply('Type must be "free" or "premium"');
    }
    const toRemove = args.slice(1);
    const stockKey = `stock_${type}`;
    let current = await db.get(stockKey) || [];
    let removed = 0;
    toRemove.forEach(acc => {
      const index = current.indexOf(acc);
      if (index !== -1) {
        current.splice(index, 1);
        removed++;
      }
    });
    await db.set(stockKey, current);
    message.reply(`Removed **${removed}** account(s) from **${type}** stock. Total left: ${current.length}`);
  }

  // ── NEW: Post generator panel (admin only) ──
  if (message.content === '!genpanel') {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply({ content: 'Only admins can post the generator panel.', ephemeral: true });
    }
    const embed = new EmbedBuilder()
      .setColor('#00BFFF')
      .setTitle('Alt Generator')
      .setDescription(
        'Get your alts here!\n\n' +
        '• **Free AltGen** → 24 hour cooldown\n' +
        '• **AltGen Premium** → Premium role required + 24 hour cooldown\n\n' +
        'Premium? Buy from a seller / open a ticket!'
      )
      .setFooter({ text: 'Stock managed by DizzyHub' });

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('free_altgen')
          .setLabel('Free AltGen')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🆓'),
        new ButtonBuilder()
          .setCustomId('premium_altgen')
          .setLabel('AltGen Premium')
          .setStyle(ButtonStyle.Success)
          .setEmoji('💎')
      );

    await message.channel.send({ embeds: [embed], components: [row] });
    await message.reply({ content: 'Generator panel posted!', ephemeral: true });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  // Your existing ticket buttons
  if (interaction.customId === 'create_ticket') {
    await interaction.deferReply({ ephemeral: true });
    const guild = interaction.guild;
    const user = interaction.user;

    let ticket = guild.channels.cache.find(ch =>
      ch.name === `ticket-${user.username.toLowerCase()}` && ch.parentId === TICKET_CATEGORY_ID
    );

    if (ticket) {
      return interaction.editReply({ content: `You already have a ticket: ${ticket}` });
    }

    ticket = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: ChannelType.GuildText,
      parent: TICKET_CATEGORY_ID,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        { id: SELLER_ROLE_ID, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
      ]
    });

    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle(`Purchase Ticket - ${user.username}`)
      .setDescription('A seller will help soon!\nTell us what you want to buy.');

    const closeRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('close_ticket')
          .setLabel('Close Ticket')
          .setStyle(ButtonStyle.Danger)
      );

    await ticket.send({
      content: `<@&${SELLER_ROLE_ID}> New ticket from ${user}!`,
      embeds: [welcomeEmbed],
      components: [closeRow]
    });

    await interaction.editReply({ content: `Ticket created: ${ticket}` });
  }

  if (interaction.customId === 'close_ticket') {
    if (!interaction.member.roles.cache.has(SELLER_ROLE_ID)) {
      return interaction.reply({ content: 'Only sellers can close!', ephemeral: true });
    }
    await interaction.reply('Closing in 5 seconds...');
    setTimeout(() => interaction.channel.delete(), 5000);
  }

  // ── NEW: Alt Generator buttons ──
  const userId = interaction.user.id;
  let type = null;
  let label = '';

  if (interaction.customId === 'free_altgen') {
    type = 'free';
    label = 'Free AltGen';
  } else if (interaction.customId === 'premium_altgen') {
    type = 'premium';
    label = 'AltGen Premium';

    const hasPremium = interaction.member.roles.cache.has(PREMIUM_ROLE_ID);
    if (!hasPremium) {
      return interaction.reply({
        content: '❌ Premium only! Buy access via ticket or from a seller.',
        ephemeral: true
      });
    }
  }

  if (type) {
    await interaction.deferReply({ ephemeral: true });

    // Cooldown check (same for both)
    const lastUsed = await db.get(`cooldown_${userId}_${type}`);
    if (lastUsed && Date.now() - lastUsed < COOLDOWN_MS) {
      const remaining = COOLDOWN_MS - (Date.now() - lastUsed);
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      return interaction.editReply({
        content: `⏳ Cooldown active! Wait ~${h}h ${m}m.`
      });
    }

    // Get stock
    const accounts = await db.get(`stock_${type}`) || [];
    if (accounts.length === 0) {
      return interaction.editReply({ content: '❌ Out of stock right now. Check back later!' });
    }

    const account = accounts.shift();
    await db.set(`stock_${type}`, accounts);

    // Apply cooldown
    await db.set(`cooldown_${userId}_${type}`, Date.now());

    try {
      await interaction.user.send(`**${label}** account:\n\`\`\`\n${account}\n\`\`\``);
      await interaction.editReply({ content: '✅ Sent to your DMs! (check spam folder)' });
    } catch (err) {
      await interaction.editReply({ content: '❌ Could not DM you — please enable DMs from server members.' });
    }
  }
});

console.log('Token from .env:', process.env.TOKEN || 'MISSING/EMPTY');
client.login(process.env.TOKEN);
