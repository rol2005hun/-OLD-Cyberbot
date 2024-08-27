const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "template1",
   description: "template1 parancs",
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
       message.channel.send(`:ok_hand: Ha szeretnéd, hogy létrehozzam ezeket a csatornákat, kérlek írd be **${prefix}template1 igen** parancsot!`);
       message.channel.send({files: ["https://i.imgur.com/flpjJXD.jpg"]});
     }
     if(args[0] == "igen") {
       message.guild.channels.cache.forEach(channel => channel.delete());
 /////////////////////////////////////////////////////////////////////////////////////
       message.guild.channels.create("》📰 Információk 📰《", {
       type:'category'
       });
       message.guild.channels.create(`》👋-belépők-kilépők-👋《`, {
       type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》📰 Információk 📰《" && c.type == "category");
       channel.setParent(category.id);
       });
       message.guild.channels.create(`》📰-hírek-📰《`, {
       type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》📰 Információk 📰《" && c.type == "category");
       channel.setParent(category.id);
       });
       message.guild.channels.create(`》🚫-szabályok-🚫《`, {
       type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》📰 Információk 📰《" && c.type == "category");
       channel.setParent(category.id);
       });
       message.guild.channels.create(`》🙋♂-partnerek-🙋♂《`, {
       type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》📰 Információk 📰《" && c.type == "category");
       channel.setParent(category.id);
       });
       message.guild.channels.create(`》🎉-nyereményjátékok-🎉《`, {
       type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》📰 Információk 📰《" && c.type == "category");
       channel.setParent(category.id);
       });
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////
       setTimeout(function() {
         message.guild.channels.create("》💬 Általános 💬《", {
         type:'category',
         })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》💬-chat-💬《`, {
         type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》💬 Általános 💬《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》🤖-bot-parancsok-🤖《`, {
           type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》💬 Általános 💬《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》🗺-képek-mémek-🐵《`, {
         type: 'text',
         })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》💬 Általános 💬《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》🗣 Társalgó 🗣《`, {
           type: 'voice',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》💬 Általános 💬《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       setTimeout(function() {
         message.guild.channels.create("》🛑 Admin Team 🛑《", {
       type:'category'
       })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》💬-chat-💬《`, {
           type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》🛑 Admin Team 🛑《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》📰-log-📰《`, {
       type: 'text',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》🛑 Admin Team 🛑《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       setTimeout(function() {
         message.guild.channels.create(`》🗣 Társalgó 🗣《`, {
       type: 'voice',
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "》🛑 Admin Team 🛑《" && c.type == "category");
       channel.setParent(category.id);
       })
       }, 1000);
       message.author.send(`:wave: Szia!\n<a:pipa:736339378372214915> A template sikeresen betöltve, jó szórakozást, ha roletemplate is kellene, használd a **${prefix}roletemplate1** parancsot!`);
     }
  }
}
