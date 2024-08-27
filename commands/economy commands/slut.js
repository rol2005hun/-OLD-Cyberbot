const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "slut",
   aliases: ["elvezkedes", "élvezkedés"],
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
     let timeout4 = 10800000;
     let slut = await db.get(`slut_${message.author.id}`);
     if (slut != null && timeout4 - (Date.now() - slut) > 0) {
         let time = ms(timeout4 - (Date.now() - slut));
         message.channel.send(`<a:x_:736342460522823768> Te már élvezkedtél. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
     } else {
         let amount = Math.floor(Math.random() * 500) +1;
         let jobs = ["sikeresen élvezkedtél a barátnőddel", "sikeresen kimentél az utca sarokra, és élvezkedtél", "sikeresen élvezkedtél a boltban", "sikeresen élvezkedtél a barátod barátnőjével"];
         let job = jobs[Math.floor(Math.random()* jobs.length)];
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RANDOM")
         .setTitle("Élvezkedés")
         .setDescription(`${message.member}, ${job}, ezért szereztél **${amount}** dollárt!`)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
         db.add(`money_${message.author.id}`, amount);
         db.add(`slut_${message.author.id}`, Date.now());
     }
  }
}
