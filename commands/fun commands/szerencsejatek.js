const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "szerencsejáték",
   aliases: ["szerencsejatek", "luckygame"],
   description: "asd parancs",
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
     let embed = new Discord.MessageEmbed();
     let sum = Math.floor(Math.random() * 6) +1;
     embed.setAuthor(message.author.tag, message.author.avatarURL())
     embed.setColor("PURPLE");
     embed.addField("Szerencsejáték", `A mostani kidobott számod: **${sum}**`);
     embed.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     embed.setTimestamp()

     if(sum == 1) embed.addField("Mostani szerencse:", "Nagyon balszerencsés voltál. :(");
     else if(sum < 3) embed.addField("Mostani szerencse:", "Balszerencsés voltál. :/");
     else if(sum < 5) embed.addField("Mostani szerencse:", "Átlagos. :/");
     else if(sum == 5) embed.addField("Mostani szerencse:", "Szerencsés voltál. :)");
     else embed.addFields(
       {name:"Mostani szerencséd:",value:"Nagyon szerencsés voltál. :DDDDDDDDDD"}
     )

     message.channel.send(embed);
  }
}
