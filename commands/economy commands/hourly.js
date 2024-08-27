const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "hourly",
   aliases: ["orai", "órai"],
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
     let timeout1 = 3600000;
     let amount = 500;
     let hourly = db.get(`hourly_${message.author.id}`);
     if (hourly != null && timeout1 - (Date.now() - hourly) > 0) {
         let time = ms(timeout1 - (Date.now() - hourly));
         message.channel.send(`<a:x_:736342460522823768> Te már igényelted az órai nyereményt. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
     } else {
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RANDOM")
         .setTitle("Órai nyeremény")
         .setDescription(`${message.member}, sikeresen szereztél **${amount}** dollárt, az órai nyereményből!`)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
         db.add(`money_${message.author.id}`, amount);
         db.add(`hourly_${message.author.id}`, Date.now());
     }
  }
}
