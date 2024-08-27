const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "bothiba",
   aliases: ["boterror"],
   description: "boterror parancs",
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
     const bothibacsatornaxd = process.env.bothibacsatorna;
     const bothibacsatorna = bot.channels.cache.find(channel => channel.id == `${bothibacsatornaxd}`);
     let hiba = args.slice(0).join(" ");
       if(!hiba) return message.channel.send(`<a:x_:736342460522823768> Add meg a hibát! (**${prefix}bothiba [hiba])**`);
       let embed1 = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setColor("RED")
       .setTitle("EGY HIBA ÉRKEZETT!")
       .addFields(
         {name:"Bejelentő:",value:`${message.author.tag}`,inline:true},
         {name:"Bejelentő ID-je:",value:message.author.id,inline:true},
         {name:"Hiba:",value:`${hiba}`,inline:true},
       )
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp()

       message.channel.send(`<a:pipa:736339378372214915> **${message.author}**, sikeresen elküldtem a bothibát a fejlesztő felé! Köszönjük!`);
       bothibacsatorna.send(embed1);
  }
}
