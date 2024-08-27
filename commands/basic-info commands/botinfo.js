const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "botinfo",
   aliases: ["bi", "botinfos", "botinformációk", "botinformaciok"],
   description: "botinfo parancs",
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
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("GREEN")
      .setTitle("A bot információi")
      .setDescription("A bot **JavaScript-ben** készült!")
      .addFields(
       {name:"A bot neve: ",value:`${bot.user.tag}`, inline:true},
       {name:"A bot fejlesztője:",value:`Cyber#7178`, inline:true},
       {name:"A bot jelenleg ennyi szerveren van:",value:`${bot.guilds.cache.size}`, inline:true},
       {name:"A bot prefixe:",value:`----- **${prefix}** -----> **${prefix}setprefix**`, inline:true},
       { name: `Support szerver:`, value: `[Kattints ide](https://discord.gg/dufhvqU)`, inline:true},
       { name: `Weboldal:`, value: `[Kattints ide](https://cyberbot.webnode.hu/)`, inline:true},
       { name: `Invite:`, value: `[Kattints ide](https://discord.com/api/oauth2/authorize?client_id=733294179891019787&permissions=8&scope=bot)`, inline:true},
     )
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
      .setTimestamp()

      message.channel.send(embed);
  }
}
