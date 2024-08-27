const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "horgászás",
   aliases: ["horgaszas", "halaszas", "halászás", "pecazas", "pecázás"],
   description: "horgászás parancs",
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
     let timeout5 = 10800000;
     let horgaszas = await db.get(`horgaszas_${message.author.id}`);
     if (horgaszas != null && timeout5 - (Date.now() - horgaszas) > 0) {
         let time = ms(timeout5 - (Date.now() - horgaszas));
         message.channel.send(`<a:x_:736342460522823768> Te már horgásztál. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
     } else {
         let amount = Math.floor(Math.random() * 500) +1;
         let jobs = ["sikeresen kifogtál egy harcsát", "sikeresen kifogtál egy cipőt", "sikeresen kifogtál egy ruhát", "sikeresen kifogtál egy kígyót", "sikeresen kifogtál egy sügért", "sikeresen kifogtál egy keszeget"];
         let job = jobs[Math.floor(Math.random()* jobs.length)];
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RANDOM")
         .setTitle("Halászás")
         .setDescription(`${message.member}, ${job}, ezért szereztél **${amount}** dollárt!`)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
         db.add(`money_${message.author.id}`, amount);
         db.add(`horgaszas_${message.author.id}`, Date.now());
       }
  }
}
