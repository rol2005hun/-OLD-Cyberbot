// Import rész
const Discord = require("discord.js");
const Collection = require("discord.js");
const { config } = require("dotenv");
require('dotenv').config();
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db");
const canvas1 = require('canvas');
const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
};
const Util = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");//
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const queue = new Map();
let prefix = process.env.prefix;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

// Handler alap

["command.js"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});
// Eventek

bot.on("ready", async () => {
    console.log(`${bot.user.username} online lett ${bot.guilds.cache.size} szerveren!`);
});
bot.on('ready', function() {
    var interval = setInterval (function () {
        let fasz = 0;
        if (fasz === 0) {
            bot.user.setActivity(`${bot.guilds.cache.size} szerver | ${prefix}help`, {type: "PLAYING"});
            fasz = 1;
        }
        if (fasz === 1) {
          bot.user.setActivity(`${bot.users.cache.size} felhasználó | ${prefix}help`);
            fasz = 0;
        }
    }, 1 * 5000);
});;
bot.on('guildMemberAdd', async member => {
  let embedes = db.fetch(`embedeswelcome_${member.guild.id}`);
  if(embedes == null) return;
  if(!embedes) return;
  let embed = new Discord.MessageEmbed()
  .setAuthor(member.tag, member.avatarURL())
  .setTitle("Új tag")
  .setColor("RANDOM")
  .setDescription(`Üdvözlünk **${member.user.username}** a **${member.guild.name}** szerverén! Veled együtt már ${member.guild.memberCount}-an/en vagyunk! Érezd jól magad!`);
  member.guild.channels.cache.get(embedes).send(embed);
});
bot.on('guildMemberAdd', async member => {
  let szoveges = db.fetch(`szovegeswelcome_${member.guild.id}`);
  let szoveg = `Üdvözlünk **${member.user.username}**, a **${member.guild.name}** szerverén! Veled együtt már ${member.guild.memberCount}-an/en vagyunk! Érezd jól magad!`;
    if(szoveges == null) return;
    if(!szoveges) return;
    member.guild.channels.cache.get(szoveges).send(szoveg);
  });
bot.on('guildMemberAdd', async member => {
  let logcsatorna = db.fetch(`log_${member.guild.id}`);
  if(logcsatorna == null) return;
  if(!logcsatorna) return;
  let logembed = new Discord.MessageEmbed()
    .setAuthor(member.tag, member.avatarURL())
    .setTitle("Egy felhasználó belépett")
    .addFields(
      {name:`Neve`,value:member.user.tag},
      {name:`ID-je:`,value:member.id},
    )
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    member.guild.channels.cache.get(logcsatorna).send(logembed);
});
bot.on('guildMemberAdd', async member => {
    let wChan = db.fetch(`kepeswelcome_${member.guild.id}`);
    if(wChan == null) return;
    if(!wChan) return;
    const canvas = canvas1.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

	const background = await canvas1.loadImage("./back.jpg")
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Üdv a szerveren,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.tag}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await canvas1.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    member.guild.channels.cache.get(wChan).send(attachment);
});
bot.on("guildMemberAdd", async member => {
  let autorole = db.fetch(`role_${member.guild.id}`);
  if(autorole == null) return;
  if(!autorole) return;
  member.roles.add(autorole);
});
bot.on('guildMemberAdd', async member => {
  let ch = db.fetch(`vcsatorna_${member.guild.id}`);
  if(ch == null) return;
  if(!ch) return;
  member.send(`Szia ${member}! A ${member.guild.name} szerveren be van kapcsolva az ellenőrző rendszer, a ${ch} csatornán! Kérlek válaszold meg a kérdést!`);
  member.send(`Pl.: **${prefix}verify 1234**, vagy van a kérdés: Mikor született Petőfy Sándor?, erre a válasz: **${prefix}verify 1823**! Sok sikert :tada:`);
});
bot.on('guildMemberAdd', async member => {
  let allapot = db.fetch(`muted_${member.id}_${member.guild.id}`);
  if(allapot == null) return;
  if(!allapot) return;
  let role = member.guild.roles.cache.find(role => role.name == "Muted");
  member.roles.add(role);
});
bot.on("guildMemberAdd", async member => {
  let osszestag = db.fetch(`osszestag_${member.guild.id}`);
  let tagok = db.fetch(`tagok_${member.guild.id}`);
  let botok = db.fetch(`botok_${member.guild.id}`);
  if(osszestag == null) return;
  if(tagok == null) return;
  if(botok == null) return;
  let taggok = member.guild.members.cache.filter(member => !member.user.bot).size;
  let bottok = member.guild.members.cache.filter(member => member.user.bot).size;
  member.guild.channels.cache.get(osszestag).setName(`Összes tag: ${member.guild.memberCount}`);
  member.guild.channels.cache.get(tagok).setName(`Tagok: ${taggok}`);
  member.guild.channels.cache.get(botok).setName(`Botok: ${bottok}`);
});
//// REMOVE EVENT ////////////////////////////////////////////////////

bot.on("guildMemberRemove", async member =>{
  let embedes = db.fetch(`embedesleave_${member.guild.id}`);
    if(embedes == null) return;
    if(!embedes) return;
    let embed = new Discord.MessageEmbed()
    .setAuthor(member.tag, member.avatarURL())
    .setTitle("Lelépés")
    .setColor("RANDOM")
    .setDescription(`Viszlát **${member.user.tag}**! Reméljük hogy minél hamarabb visszajösz!`);
    member.guild.channels.cache.get(embedes).send(embed);
});
bot.on("guildMemberRemove", async member =>{
  let szoveges = db.fetch(`szovegesleave_${member.guild.id}`);
  if(szoveges == null) return;
  if(!szoveges) return;
  member.guild.channels.cache.get(szoveges).send(`Viszlát **${member.user.tag}**! Reméljük hogy minél hamarabb visszajösz!`);
});
bot.on("guildMemberRemove", async member =>{
  let logcsatorna = db.fetch(`log_${member.guild.id}`);
  if(logcsatorna == null) return;
	if(!logcsatorna) return;
  let logembed = new Discord.MessageEmbed()
    .setAuthor(member.tag, member.avatarURL())
    .setTitle("Egy felhasználó kilépett/kickelve lett")
    .addFields(
      {name:`Neve`,value:`**${member.user.tag}**`},
      {name:`ID-je:`,value:member.id},
    )
    .setColor("RED")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    member.guild.channels.cache.get(logcsatorna).send(logembed);
});
bot.on("guildMemberRemove", async member =>{
  let wChan = db.fetch(`kepesleave_${member.guild.id}`);
	if(wChan == null) return;
	if(!wChan) return;

  const canvas = canvas1.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

	const background = await canvas1.loadImage("./back.jpg")
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '40px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Visszavárunk ide,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.tag}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await canvas1.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    member.guild.channels.cache.get(wChan).send(attachment);
});
bot.on("guildMemberRemove", async member => {
  let osszestag = db.fetch(`serverstats_${member.guild.id}.osszestag`);
  let tagok = db.fetch(`serverstats_${member.guild.id}.tagok`);
  let botok = db.fetch(`serverstats_${member.guild.id}.botok`);
  if(tagok == null) return;
  if(botok == null) return;
  if(osszestag == null) return;
  let taggok = member.guild.members.cache.filter(member => !member.user.bot).size;
  let bottok = member.guild.members.cache.filter(member => member.user.bot).size;
  member.guild.channels.cache.get(osszestag).setName(`Összes tag: ${member.guild.memberCount}`);
  member.guild.channels.cache.get(tagok).setName(`Tagok: ${taggok}`);
  member.guild.channels.cache.get(botok).setName(`Botok: ${bottok}`);
});

bot.on("messageUpdate", async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content) {
    return;
  }
    let logcsatorna = db.fetch(`log_${oldMessage.guild.id}`);
    if(logcsatorna == null) return;
	  if(!logcsatorna) return;
    let logembed = new Discord.MessageEmbed()
    .setTitle("Üzenet szerkesztve")
    .addField("Szerkesztette:", oldMessage.author.tag)
    .addField("Csatorna:", oldMessage.channel)
    .addField("Üzenet szerkesztés előtt:", `**${oldMessage.content}**`, true)
    .addField("Üzenet szerkesztés után:", `**${newMessage.content}**`, true)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    oldMessage.guild.channels.cache.get(logcsatorna).send(logembed);
});
bot.on("messageDelete", async message => {
    let logcsatorna = db.fetch(`log_${message.guild.id}`);
    if(logcsatorna == null) return;
	  if(!logcsatorna) return;
    let logembed = new Discord.MessageEmbed()
    .setTitle("Üzenet törölve")
    .addField("Írta:", message.author.tag)
    .addField("Törölte:", message.author.tag)
    .addField("Csatorna:", message.channel)
    .addField("Üzenet:", `**${message}**`)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    message.guild.channels.cache.get(logcsatorna).send(logembed);
});
bot.on("guildCreate", function(guild){
  let botlogcsatorna = bot.channels.cache.find(channel => channel.id == "738086936438112386");
  //let invite = guild.createInvite({ temporary: true, reason: 'Just testing' });
  let embed = new Discord.MessageEmbed()
  .setTitle("A bot behívva")
  .setColor("GREEN")
  .addFields(
    {name:"Szerver neve:",value:guild},
    {name:"Szerver ID-je:",value:guild.id},
    {name:"Szerver tulajdonos neve:",value:guild.owner.user.tag},
    {name:"Szerver tulajdonos ID-je:",value:guild.ownerID},
    {name:"A szerveren ennyi tag lett:",value:guild.memberCount},
    {name:"A bot mostmár ennyi szerveren van benn:", value:bot.guilds.cache.size},
    //{name:"Invite:", value:invite},
  )
  botlogcsatorna.send(embed);
  console.log(`A bot be lett hívva a ${guild} szerverre! A szerver tulajdonosa: ${guild.owner.tag}, IDje: ${guild.onwerID}. A szerver ID-je: ${guild.id}. A szerveren ennyi tag van: ${guild.memberCount}`);
});
bot.on("guildDelete", function(guild){
  let botlogcsatorna = bot.channels.cache.find(channel => channel.id == "738086936438112386");
  /*let invite = guild.createInvite(
  {
    maxAge: 10 * 60 * 1000,
    maxUses: 2
  })*/
  let embed = new Discord.MessageEmbed()
  .setTitle("A bot kidobva")
  .setColor("RED")
  .addFields(
    {name:"Szerver neve:",value:guild},
    {name:"Szerver ID-je:",value:guild.id},
    {name:"Szerver tulajdonos neve:",value:guild.owner.user.tag},
    {name:"Szerver tulajdonos ID-je:",value:guild.ownerID},
    {name:"A szerveren ennyi tag volt:",value:guild.memberCount},
    {name:"A bot mostmár ennyi szerveren van benn:", value:bot.guilds.cache.size},
    //{name:"Invite:", value:invite},
  )
  botlogcsatorna.send(embed);
  db.delete(`logcsatorna_${guild.id}`);
  db.delete(`role_${guild.id}`);
  db.delete(`ticket_${guild.id}`);
  db.delete(`report_${guild.id}`);
  db.delete(`otlet_${guild.id}`);
  db.delete(`hiba_${guild.id}`);
  db.delete(`nyelv_${guild.id}`);
  db.delete(`embedeswelcome_${guild.id}`);
  db.delete(`szovegeswelcome_${guild.id}`);
  db.delete(`kepeswelcome_${guild.id}`);
  db.delete(`embedesleave_${guild.id}`);
  db.delete(`szovegesleave_${guild.id}`);
  db.delete(`kepesleave_${guild.id}`);
  db.delete(`prefix_${guild.id}`);
  db.delete(`levelchannel_${guild.id}`);
  db.delete(`verify_${guild.id}`);
  db.delete(`parancs_${guild.id}`);
  db.delete(`shop_${guild.id}`);
  console.log(`A bot ki lett dobva a ${guild} szerverről!`);
});
bot.on("roleCreate", function(role){
  let logcsatorna = db.fetch(`log_${role.guild.id}`);
  if(logcsatorna == null) return;
  if(!logcsatorna) return;
  let logembed = new Discord.MessageEmbed()
    .setTitle("Rang készítve")
    .addField("Rang:", role)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    role.guild.channels.cache.get(logcsatorna).send(logembed);
});
bot.on("roleDelete", function(role){
  console.error(`a guild role is deleted`);
});
/*bot.on("channelCreate", function(channel) {
    let logcsatorna = db.fetch(`log_${channel.guild.id}`);
    if(logcsatorna == null) return;
	  if(!logcsatorna) return;
    let logembed = new Discord.MessageEmbed()
    .setTitle("Csatorna készítve")
    .addField("Készítette:", channel.author)
    .addField("Csatorna:", channel)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    channel.guild.channels.cache.get(logcsatorna).send(logembed);

});
bot.on("channelDelete", function(channel) {
  let logcsatorna = db.fetch(`log_${channel.guild.id}`);
  if(logcsatorna == null) return;
	if(!logcsatorna) return;
  let logembed = new Discord.MessageEmbed()
  .setTitle("Csatorna törölve")
  .addField("Törölte:", channel.author)
  .addField("Csatorna:", channel)
  .setColor("GREEN")
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
  .setTimestamp();
  channel.guild.channels.cache.get(logcsatorna).send(logembed);

});*/
/*bot.on("channelPinsUpdate", function(channel, time){
  //let logcsatorna = db.get(`log_${message.guild.id}`);
  let logembed = new Discord.MessageEmbed()
  .setTitle("Üzenet kitűzve")
  .addField("Kitűzte:", channel.author)
  .addField("Csatorna:", channel)
  .setColor("GREEN")
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
  .setTimestamp();
  let ch = channel.guild.channels.find(n => n.name == `log`);
  if(!ch) return;
  ch.send(logembed);
});
bot.on("channelUpdate", function(oldChannel, newChannel){
  console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
  //let logcsatorna = db.get(`log_${message.guild.id}`);
  let logembed = new Discord.MessageEmbed()
  .setTitle("Csatorna szerkesztve")
  .addField("Szerkesztette:", channel.author)
  .addField("Csatorna szerkesztés előtt:", oldChannel)
  .addField("Csatorna szerkesztés után:", newChannel)
  .setColor("GREEN")
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
  .setTimestamp();
  let ch = channel.guild.channels.find(n => n.name == `log`);
  if(!ch) return;
  ch.send(logembed);
});
bot.on("clientUserGuildSettingsUpdate", function(clientUserGuildSettings){
  console.log(`clientUserGuildSettingsUpdate -> client user's settings update`);
});
bot.on("clientUserSettingsUpdate", function(clientUserSettings){
  console.log(`clientUserSettingsUpdate -> client user's settings update`);
});
bot.on("disconnect", function(event){
  console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
});
bot.on("emojiCreate", function(emoji){
  console.log(`a custom emoji is created in a guild`);
});
bot.on("emojiDelete", function(emoji){
  console.log(`a custom guild emoji is deleted`);
});
bot.on("emojiUpdate", function(oldEmoji, newEmoji){
  console.log(`a custom guild emoji is updated`);
});
bot.on("error", function(error){
  console.error(`client's WebSocket encountered a connection error: ${error}`);
});
bot.on("guildBanAdd", function(guild, user){
  console.log(`a member is banned from a guild`);
});
bot.on("guildBanRemove", function(guild, user){
  console.log(`a member is unbanned from a guild`);
});
bot.on("guildCreate", function(guild){
  console.log(`the client joins a guild`);
});
bot.on("guildDelete", function(guild){
  console.log(`the client deleted/left a guild`);
});
bot.on("guildMemberAvailable", function(member){
  console.log(`member becomes available in a large guild: ${member.tag}`);
});
bot.on("guildMemberSpeaking", function(member, speaking){
  console.log(`a guild member starts/stops speaking: ${member.tag}`);
});
bot.on("guildMemberUpdate", function(oldMember, newMember){
  console.error(`a guild member changes - i.e. new role, removed role, nickname.`);
});
bot.on("messageDeleteBulk", function(messages){
  console.log(`messages are deleted -> ${messages}`);
  //let logcsatorna = db.get(`log_${message.guild.id}`);
  let logembed = new Discord.MessageEmbed()
    .setTitle("Üzenetek törölve")
    //.addField("Felhasználó:", user)
    .addField("Üzenetek:", messages)
    .addField("Csatorna", message.channel)
    .setColor("RED")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    let ch = messageReaction.guild.channels.find(n => n.name == `log`);
    if(!ch) return;
    ch.send(logembed);
});
bot.on("messageReactionAdd", function(messageReaction, user){
  console.log(`a reaction is added to a message`);
  //let logcsatorna = db.get(`log_${message.guild.id}`);
  let logembed = new Discord.MessageEmbed()
    .setTitle("Reackció hozzáadva")
    .addField("Felhasználó:", user.tag)
    .addField("Reakció:", messageReaction)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    let ch = messageReaction.guild.channels.find(n => n.name == `log`);
    if(!ch) return;
    ch.send(logembed);
});
bot.on("messageReactionRemove", function(messageReaction, user){
  console.log(`a reaction is removed from a message`);
  //let logcsatorna = db.get(`log_${message.guild.id}`);
  let logembed = new Discord.MessageEmbed()
    .setTitle("Reackció törölve")
    .addField("Törölte:", user.tag)
    .addField("Reakció:", messageReaction)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    let ch = messageReaction.guild.channels.find(n => n.name == `log`);
    if(!ch) return;
    ch.send(logembed);
});
bot.on("messageReactionRemoveAll", function(message){
  console.error(`all reactions are removed from a message`);
  //let logcsatorna = db.get(`log_${message.guild.id}`);
  let logembed = new Discord.MessageEmbed()
    .setTitle("Reackciók törölve")
    .addField("Törölte:", user)
    .addField("Reakciók:", messageReaction)
    .setColor("GREEN")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
    .setTimestamp();
    let ch = messageReaction.guild.channels.find(n => n.name == `log`);
    if(!ch) return;
    ch.send(logembed);
});
bot.on("roleUpdate", function(oldRole, newRole){
  console.error(`a guild role is updated`);
});
bot.on("typingStart", function(channel, user){
  console.log(`${user.tag} elkezdett írni!`);
});
bot.on("typingStop", function(channel, user){
  console.log(`${user.tag} befejezte az írást!`);
});
bot.on("userNoteUpdate", function(user, oldNote, newNote){
  console.log(`a member's note is updated`);
});
bot.on("userUpdate", function(oldUser, newUser){
  console.log(`user's details (e.g. username) are changed`);
});
bot.on("voiceStateUpdate", function(oldMember, newMember){
  console.log(`a user changes voice state`);
});
bot.on("warn", function(info){
  console.log(`warn: ${info}`);
});*/

// Alap parancs
bot.on("message", async message =>{
  let cmdx = db.get(`cmd_${message.guild.id}`)
  if(cmdx) {
    let cmdy = cmdx.find(x => x.name === message.content)
    if(cmdy) message.channel.send(cmdy.responce)
  }
});
// Handler setup
bot.on("message", async message => {
    if(message.author.bot) return;
    let prefix = db.get(`prefix_${message.guild.id}`) || process.env.prefix;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    /////////////////////////////////////////
    let cmdx = db.get(`cmd_${message.guild.id}`)
    if(cmdx) {
      let cmdy = cmdx.find(x => x.name === message.content)
      if(cmdy) message.channel.send(cmdy.responce)
    }
    //////////////////////////////////////////////
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    //if(!cmd || !cmdx) return message.channel.send(`<a:x_:736342460522823768> A(z) **${message}** parancs nem létezik! Kérlek használd a **${prefix}help** parancsot, a parancslista megtekintéséhez!`);

    if (command)
        command.run(bot, message, args);
        let messageArray = message.content.split(" ");
        let cmd1 = messageArray[0];
        const serverQueue = queue.get(message.guild.id);
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        if(cmd == `${prefix}skip`) {
          console.log(`${message.author.username} használta a(z) ${prefix}skip parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
          skip(message, serverQueue);
          return;
        }
        if(cmd1 == `${prefix}stop` || cmd == `${prefix}dc` || cmd == `${prefix}disconnect`) {
        console.log(`${message.author.username} használta a(z) ${prefix}stop parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
        if (!message.member.voice.channel) return message.channel.send("<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába hogy befejezd a zenét!");
        stop(message, serverQueue);
        }
        if(cmd1 == `${prefix}play`) {
          console.log(`${message.author.username} használta a(z) ${prefix}play parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
          const voiceChannel = message.member.voice.channel;
          if(!message.guild.me.hasPermission('CONNECT')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \'Hangcsatornába való csatlakozás\')`);
          if(!message.guild.me.hasPermission('SPEAK')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \'Hangcsatornában való beszélgetés\')`);
          if(!voiceChannel) return message.channel.send(`<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába!`);
          if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek írd le a zene címét, minél pontosabban! (**${prefix}play [zene címe]**)`);
          try {
            var video = await youtube.getVideoByID(url);
          } catch{
            try {
              var videos = await youtube.searchVideos(searchString, 10);
              var index = 0;
              message.channel.send(`
              :musical_note: **Zene választó** :musical_note:
              ${videos.map(video2 => `**${++index}** - **${video2.title}**`).join(`\n`)}
              :musical_note: **Kérlek válassz egyet 1 és 10 között!** :musical_note:
              `)
              try {
                var responce = await message.channel.awaitMessages(message => message.content > 0 && message.content < 11, {
                max: 1,
                time: 30000,
                errors: ['time'],
              })
            } catch {
              message.channel.send(`<a:x_:736342460522823768> **Nem**, vagy **helytelenül** választottál!`);
            }
              const videoIndex = parseInt(responce.first().content);
              var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch {
              return message.channel.send(`<a:x_:736342460522823768> Nem találtam zenét!`);
            }
          }
          const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
          }
          if(!serverQueue) {
            const queueConstruct = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            }
            queue.set(message.guild.id, queueConstruct)
            queueConstruct.songs.push(song)
            try {
              var connection = await voiceChannel.join()
              queueConstruct.connection = connection
              play(message.guild, queueConstruct.songs[0])
            } catch (error) {
              console.log(error);
              queue.delete(message.guild.id)
            }
          } else {
            serverQueue.songs.push(song)
            return message.channel.send(`<a:pipa:736339378372214915> **${song.title}** hozzáadva a lejátszási listához!`);
          }
        }
        if(cmd1 == `${prefix}volume` || cmd == `${prefix}hang`) {
          console.log(`${message.author.username} használta a(z) ${prefix}volume parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
          const voiceChannel = message.member.voice.channel;
          if(!voiceChannel) return message.channel.send(`<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába!`);
          if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a hangnak az erősségét! (**${prefix}volume [erősség]**)`);
          if(isNaN(args[0])) return message.channel.send(`<a:x_:736342460522823768> **${args[1]}** nem egy szám! Kérlek helyes számot adj meg!`);
          serverQueue.volume = args[1]
          serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5)
          message.channel.send(`<a:pipa:736339378372214915> Sikeresen átváltottad erre: ${args[0]}`);
        }
        if(cmd1 == `${prefix}pause` || cmd == `${prefix}szunet`) {
          console.log(`${message.author.username} használta a(z) ${prefix}pause parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
          const voiceChannel = message.member.voice.channel;
          if(!voiceChannel) return message.channel.send(`<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába!`);
          if(!serverQueue) return message.channel.send(`<a:x_:736342460522823768> Most nem megy zene!`);
          if(!serverQueue.playing) return message.channel.send(`<a:x_:736342460522823768> A zene most is szünet alatt van!`);
          serverQueue.playing = false;
          serverQueue.connection.dispatcher.pause();
          message.channel.send(`<a:pipa:736339378372214915> Sikeres zene szünetelés!`);
        }
        if(cmd1 == `${prefix}resume` || cmd == `${prefix}folytatás`) {
          console.log(`${message.author.username} használta a(z) ${prefix}resume parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
          const voiceChannel = message.member.voice.channel;
          if(!voiceChannel) return message.channel.send(`<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába!`);
          if(!serverQueue) return message.channel.send(`<a:x_:736342460522823768> Most nem megy zene!`);
          if(serverQueue.playing) return message.channel.send(`<a:x_:736342460522823768> A zene most is megy!`);
          serverQueue.playing = true;
          serverQueue.connection.dispatcher.resume();
          message.channel.send(`<a:pipa:736339378372214915> Sikeres zene folytatás!`);
        }
        let egyediparancs = db.fetch(`parancs_${message.guild.id}.parancs1`);
        if(cmd1 == `${egyediparancs}`) {
          let mijen = db.fetch(`parancs_${message.guild.id}.miben`);
          let szoveg = db.fetch(`parancs_${message.guild.id}.szoveg`);
          let rang = db.fetch(`parancs_${message.guild.id}.rang`);
          if(mijen == 0) {
              if(rang == "null") {
              let embed = new Discord.MessageEmbed()
              .setTitle(`${message.author.tag}`)
              .setDescription(`${szoveg}`)
              .setTimestamp()
              .setFooter(bot.user.username, bot.user.displayAvatarURL);
              message.channel.send(embed);
            } else{
              let embed = new Discord.MessageEmbed()
              .setTitle(`${message.author.tag}`)
              .setDescription(`${szoveg}`)
              .setTimestamp()
              .setFooter(bot.user.username, bot.user.displayAvatarURL);
              message.channel.send(embed);
              message.author.roles.add(rang);
            }
          } else if (mijen == 1) {
              if(rang == "null") {
                message.channel.send(`${szoveg}`);
              } else {
                message.channel.send(`${szoveg}`);
                message.author.roles.add(rang);
            }
          }
        }
});
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükség jog: \'Hangcsatornában való beszélgetés\')"
    );
  }
  try {
        var video = await youtube.getVideoByID(url);
      } catch{
        try {
          var videos = await youtube.searchVideos(searchString, 1);
          var video = await youtube.getVideoByID(videos[0].id);
        } catch {
          return message.channel.send(`<a:x_:736342460522823768> Nem találtam zenét!`);
        }
      }
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`:musical_note: **${song.title}** hozzáadva a lejátszási listához!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába hogy skippeld a zenét!"
    );
  if (!serverQueue)
    return message.channel.send("<a:x_:736342460522823768> Nincs zene hozzáadva a lejátszási listához vagy nem megy zene!");
    message.channel.send(`<a:pipa:736339378372214915> Sikeres skippelés!`)
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  //console.log(serverQueue);
  if (!message.member.voice.channel)
    return message.channel.send(
      "<a:x_:736342460522823768> Kérlek lépj be egy hangcsatornába hogy befejezd a zenét!"
    );
    message.channel.send(`<a:pipa:736339378372214915> Sikeres lecsatlakozás!`);
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`:musical_note: Most megy: **${song.title}**`);
}
bot.login(process.env.TOKEN);
