const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "daily",
   aliases: ["napi"],
   description: "daily parancs",
   run: async (bot, message, args) => {
//////////////////////////////////////////////////////////////////////////////////////////////////
    let prefix = profilok.get(`prefix_${message.guild.id}`) || process.env.prefix;
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
     let profilok = new profilok.table(`Profilok`);
     let timeout0 = 86400000;
       let amount = 2000;
       let daily = profilok.get(`profil_${message.author.id}.daily`);
       if(daily != null && timeout0 - (Date.now() - daily) > 0) {
           let time = ms(timeout0 - (Date.now() - daily));
           message.channel.send(`<a:x_:736342460522823768> Te már igényelted a napi nyereményt. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
       } else {
           let embed = new Discord.MessageEmbed()
           .setAuthor(message.author.tag, message.author.avatarURL())
           .setColor("RANDOM")
           .setTitle("Napi nyeremény")
           .setDescription(`${message.member}, sikeresen szereztél **${amount}** dollárt, a napi nyereményből!`)
           .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
           .setTimestamp();
           message.channel.send(embed);
           profilok.add(`profil_${message.author.id}.money`, amount);
           profilok.add(`profil_${message.author.id}.daily`, Date.now());
       }
  }
}
