const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// CHANGE THESE THREE LINES               // ← Your token
const SELLER_ROLE_ID = '1470072594303549669';       // ← Your sellers role ID
const TICKET_CATEGORY_ID = '1470073289106788518';   // ← Your Tickets category ID

client.once('clientReady', () => {
  console.log('Bot is online and ready!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

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
        '• Contact: <@&' + 1470072594303549669 + '>'   // pings all sellers
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

  // !prices command with your new prices
  if (message.content === '!prices') {
    const embed = new EmbedBuilder()
      .setColor('#FFD700') // gold color
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

  // !executors command (added here)
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

        '**I HIGHLY RECOMMENDED TO PURCHASE A PAID EXECUTOR FOR THE BEST SCRIPTING EXPERIENCE**\n\n' +
        'VOLCANO, SELWARE AND VOLT WORK GOOD.\n\n' +

        '**Important Links**\n' +
        '• FOLLOW TIKTOK: [Link](https://www.tiktok.com/@officialplug100?_r=1&_t=ZT-93mkMBzXUZq)\n' +
        '• Contact: <@&' + SELLER_ROLE_ID + '> or DM @Dizzy'
      )
      .setFooter({ text: 'BEWARE: Executor stats can change • Research before using • make ticket for questions' });

    await message.channel.send({ embeds: [embed] });
    await message.reply({ content: 'Executors list posted!', ephemeral: true });
  }
});  // ← This closes the messageCreate block (added/fixed here)

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

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
});
console.log('Token from .env:', process.env.TOKEN || 'MISSING/EMPTY');
client.login(process.env.TOKEN);
