const Discord = require("discord.js");
const db = require("quick.db");
const bototletcsatorna = process.env.bototletcsatorna;

  module.exports = {
   name: "botötlet",
   aliases: ["bototlet", "botsuggest"],
   description: "botötlet parancs",
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
     const bothibacsatornaxd = process.env.bototletcsatorna;
     const bototletcsatorna = bot.channels.cache.find(channel => channel.id == `${bothibacsatornaxd}`);
     let otlet = args.slice(0).join(" ");
       if(!otlet) return message.channel.send(`<a:x_:736342460522823768> Add meg az ötletedet! (**${prefix}botötlet [ötleted])**`);
       let embed0 = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setColor("GREEN")
       .setTitle("EGY ÖTLET ÉRKEZETT!")
       .addFields(
         {name:"Bejelentő:",value:`${message.author.tag}`,inline:true},
         {name:"Bejelentő ID-je:",value:message.author.id,inline:true},
         {name:"Ötlet:",value:`${otlet}`,inline:true},
       )
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp()

       message.channel.send(`<a:pipa:736339378372214915> **${message.author}**, sikeresen elküldtem a bot ötleted a fejlesztők felé! Köszönjük!`);
       //message.bototletcsatorna.send("@Cyber#5256");
       bototletcsatorna.send(embed0);
  }
}
