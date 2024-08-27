const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "roletemplate1",
   description: "roletemplate1 parancs",
   run: async (bot, message, args) => {
//////////////////////////////////////////////////////////////////////////////////////////////////
    let prefix = db.get(`prefix_${message.guild.id}`) || process.env.prefix;
    const botcommandcsatorna = process.env.botcmdcsatorna;
    const botcmdcsatorna = bot.channels.cache.find(channel => channel.id == botcommandcsatorna);
    let invite = await message.channel.createInvite({
      maxAge: 0,
      maxUses: 0
    });
    let embedxdd = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTitle(`Parancs használat`)
    .setColor("GREEN")
    .addField("Parancs:", `${message}`, true)
    .addField(`Felhasználó neve:`, `${message.author.tag}`, true)
    .addField(`Szerver neve:`, `${message.guild.name}`, true)
    .addField(`A szerveren ennyi tag van:`, `${message.guild.memberCount}`, true)
    .addField(`Invite a szerverre:`, `[Kattints ide](${invite})`, true)
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    botcmdcsatorna.send(embedxdd);
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
     if(!args[0]) {
       message.channel.send(":wave: Szia!");
       message.channel.send(`:ok_hand: Ha szeretnéd, hogy létrehozzam ezeket a rangokat, kérlek írd be **${prefix}roletemplate1 igen** parancsot!`);
       message.channel.send({files: ["https://i.imgur.com/l5KX4Ag.jpg"]});
     }
     if(args[0] == "igen") {
       message.guild.roles.cache.forEach(roles => roles.delete());
       ///////// MUTED ///////////////////
       message.guild.roles.create({
           name: 'Muted',
           color: '969A9D',
           permissions: [],
       })
       //////// TULAJDONOS ///////////////
       message.guild.roles.create({
           name: 'Tulajdonos',
           color: 'D7342A',
           permissions: ['ADMINISTRATOR'],
       })
       //////////// ADMIN //////////////////////
       message.guild.roles.create({
           name: 'Admin',
           color: '#F2BCB8',
           //permissions: ['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', "MANAGE_EMOJIS", 'SEND_TTS_MESSAGES', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'CREATE_INSTANT_INVITE', 'SEND_MESSAGES' 'EMBED_LINKS', 'ATTACH_FILES', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'MENTION_EVERYONE'],
       })
       //////////// STAFF /////////
       message.guild.roles.create({
           name: 'Staff',
           color: '#E47871',
           //permissions: ['KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'CREATE_INSTANT_INVITE', 'SEND_MESSAGES' 'EMBED_LINKS', 'ATTACH_FILES', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'USE_VAD', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'MENTION_EVERYONE'],
       })
       ////////////// MODERATOR ///////////////////
       message.guild.roles.create({
           name: 'Moderátor',
           color: '#277ECD',
           //permissions: ['KICK_MEMBERS', 'MANAGE_MESSAGES', 'CREATE_INSTANT_INVITE', 'SEND_MESSAGES' 'EMBED_LINKS', 'ATTACH_FILES', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'USE_VAD', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
       })
       /////////////// V.I.P. ////////////////////////
       message.guild.roles.create({
           name: 'V.I.P',
           color: '#E8C02A',
           //permissions: ['CREATE_INSTANT_INVITE', 'SEND_MESSAGES' 'EMBED_LINKS', 'ATTACH_FILES', 'CHANGE_NICKNAME','MANAGE_NICKNAMES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'USE_VAD', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
       })
       ///////////////// TAG ////////////////////
       message.guild.roles.create({
           name: 'Tag',
           color: '#25C059',
           //permissions: ['CREATE_INSTANT_INVITE', 'SEND_MESSAGES' 'EMBED_LINKS', 'ATTACH_FILES', 'CHANGE_NICKNAME', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'USE_VAD', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
       })
       message.guild.roles.create({
           name: 'Bot',
           color: '#116D56',
           permissions: ['ADMINISTRATOR'],
       })
       message.author.send(`:wave: Szia!\n<a:pipa:736339378372214915> A template sikeresen betöltve, jó szórakozást, ha channel templatere is szükséged lenne, használd a **${prefix}template1-2** parancsot!`);
     }
  }
}
