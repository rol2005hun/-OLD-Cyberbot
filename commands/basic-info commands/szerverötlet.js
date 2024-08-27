const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "szerverötlet",
   aliases: ["serverötlet", "serverotlet", "szerverotlet", "serversuggest"],
   description: "szerverötlet parancs",
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
     let otletcsatorna = db.fetch(`otlet_${message.guild.id}`);
     if(otletcsatorna == null) return message.channel.send(`<a:x_:736342460522823768> A szerveren nincs **bekapcsolva** az **ötlet** rendszer!`);
     let hiba = args.slice(0).join(" ");
     if(!hiba) return message.channel.send(`<a:x_:736342460522823768> Add meg az ötleted! (**${prefix}szerverötlet [ötleted])**`);
     let embed1 = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("EGY ÖTLET ÉRKEZETT!")
     .addFields(
       {name:"Bejelentő:",value:`${message.author}`,inline:true},
       {name:"Ötlet:",value:`${hiba}`,inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(`<a:pipa:736339378372214915> **${message.author}**, sikeresen elküldtem a szerverhibát az adminok felé! Köszönjük!`);
     message.guild.channels.cache.get(otletcsatorna).send(embed1).then(embedMessage => {
       embedMessage.react("✅");
       embedMessage.react("❌");
     });
     message.delete();
  }
}
