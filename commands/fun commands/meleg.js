const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "meleg",
   aliases: ["gay", "gaymeter"],
   description: "gay parancs",
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
     let togay = args[0] || message.mentions.members.first() || message.member;
       let sum = Math.floor(Math.random() * 100) +1;
       let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle("Melegség számláló")
       .setColor("RANDOM")
       .setDescription(`**${togay}** ${sum}%-ban meleg!`)
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp();
       message.channel.send(embed);
  }
}
