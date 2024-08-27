const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "help",
   aliases: ["helpme", "segitseg", "segítség"],
   description: "segítség parancs",
   run: async (bot, message, args) => {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      .setTitle("Bot parancsok")
      .setColor("RANDOM")
      .addField("Parancsok:", `[Kattints ide](https://cyberbot.webnode.hu/parancsok1)`, true)
      .addField("Moderációs parancsok:", `[Kattints ide](https://cyberbot.webnode.hu/moderacios-parancsok)`, true)
      .addField("Bot invite:", `[Kattints ide](https://discord.com/api/oauth2/authorize?client_id=733294179891019787&permissions=8&scope=bot)`, true)
      .addField("Support Szerver", `[Kattints ide](https://discord.gg/dufhvqU)`, true)
      .addField("Weboldal:", `[Kattints ide](https://cyberbot.webnode.hu)`, true)
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
      .setTimestamp();
      message.react("📬");
      message.channel.send(`<a:pipa:736339378372214915> Az információkat **privát üzenetben** elküldtem! Ha nem jött semmi, akkor ki van kapcsolva a **privát üzenetek** fogadása!`)
      message.author.send(embed);
  }
}
