const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "work",
   aliases: ["dolgoz", "dolgozas", "dolgozás"],
   description: "work parancs",
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
     let timeout2 = 10800000;
     let work = await db.get(`work_${message.author.id}`);
     if (work != null && timeout2 - (Date.now() - work) > 0) {
         let time = ms(timeout2 - (Date.now() - work));
         message.channel.send(`<a:x_:736342460522823768> Te már dolgoztál, most pihensz. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
     } else {
         let amount = Math.floor(Math.random() * 500) +1;
         let jobs = ["sikeresen dolgoztál orvosként, és megmentettél sok ember", "sikeresen dolgoztál elárusítóként, és eladtál egy csomó tárgyat", "sikeresen programoztál játékot", "sikeresen kihordtad az újságokat és leveleket"];
         let job = jobs[Math.floor(Math.random()* jobs.length)];
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RANDOM")
         .setTitle("Dolgozás")
         .setDescription(`${message.member}, ${job}, ezért szereztél **${amount}** dollárt!`)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
         db.add(`money_${message.author.id}`, amount);
         db.add(`work_${message.author.id}`, Date.now());
       }
  }
}
