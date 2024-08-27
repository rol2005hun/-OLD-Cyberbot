const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "report",
   aliases: ["bejelentes", "bejelentés"],
   description: "report parancs",
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
     let reportcsatorna = db.fetch(`report_${message.guild.id}`);
     if(reportcsatorna == null) return message.channel.send(`<a:x_:736342460522823768> A szerveren nincs **bekapcsolva** a **report** rendszer!`);
     let toReport = message.mentions.members.first();
     let reason = args.slice(1).join(" ");
     if (!args[0]) return message.channel.send(`<a:x_:736342460522823768> Jelöld meg azt a felhasználót, akit reportolni szeretnél! (**${prefix}report [@név] [indok]**)`);
     if(!toReport) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(!reason) return message.channel.send(`<a:x_:736342460522823768> Adj meg egy indokot! (**${prefix}report [@név] [indok])**`);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("EGY FELHASZNÁLÓT BEREPORTOLTAK!")
     .addFields(
       {name:"Bejelentő:",value:`${message.author}`, inline:true},
       {name:"Bejelentett:",value:`${toReport}`,inline:true},
       {name:"Csatorna:",value:`#${message.channel.name}`,inline:true},
       {name:"Indok:",value:`${reason}`,inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(`<a:pipa:736339378372214915> **${message.author}**, sikeresen elküldtem a reportod az adminok felé! Köszönjük!`);
     message.guild.channels.cache.get(reportcsatorna).send(embed);
  }
}
