const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "rob",
   aliases: ["rablás", "rablas", "rabol", "crime"],
   description: "crime parancs",
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
     let timeout3 = 10800000;
     let rob = await db.get(`rob_${message.author.id}`);
     if (rob != null && timeout3 - (Date.now() - rob) > 0) {
         let time = ms(timeout3 - (Date.now() - rob));
         message.channel.send(`<a:x_:736342460522823768> Te már raboltál. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
     } else {
         let amount = Math.floor(Math.random() * 500) +1;
         let jobs = ["sikeresen kiraboltál egy embert", "sikeresen kiraboltad a bankot", "sikeresen kiraboltál egy ATM-et", "sikeresen túszt ejtettél"];
         let job = jobs[Math.floor(Math.random()* jobs.length)];
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RANDOM")
         .setTitle("Rablás")
         .setDescription(`${message.member}, ${job}, ezért szereztél **${amount}** dollárt!`)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
         db.add(`money_${message.author.id}`, amount);
         db.add(`rob_${message.author.id}`, Date.now());
     }
  }
}
