const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "online",
   aliases: ["uptime", "onlájn", "onlajn"],
   description: "online parancs",
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
     let totalSeconds = (bot.uptime / 1000);
     let days = Math.floor(totalSeconds / 86400);
     let hours = Math.floor(totalSeconds / 3600);
     totalSeconds %= 3600;
     let minutes = Math.floor(totalSeconds / 60);
     let seconds = Math.floor(totalSeconds % 60);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RANDOM")
     .setTitle(`Online`)
     .addField(`Nap:`, `${days}`, true)
     .addField(`Óra:`,hours, true)
     .addField(`Perc:`,minutes, true)
     .addField(`Másodperc`, seconds, true)
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();
     message.channel.send(embed);
  }
}
