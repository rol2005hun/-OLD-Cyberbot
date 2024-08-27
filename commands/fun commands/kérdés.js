const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "kérdés",
   aliases: ["kerdes", "question"],
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
     let valaszok = ["Nem", "Igen", "Talán..", "Lehetséges..", "Persze", "Naná :DD", "Kitudja :D", "Miért?", "Soha", "Ma", "Holnap", "Neked nem"];
     let kerdes = args.join(" ");
     let valasz = valaszok[Math.floor(Math.random()* valaszok.length)];
       if(!kerdes) return message.channel.send(`<a:x_:736342460522823768> Kérlek írd le a kérdésedet, amit megválaszoljak neked! (**${prefix}kérdés [kérdésed]**)`);
       let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle("Kérdezz - felelek")
       .addFields(
         {name:`Kérdés:`,value:kerdes},
         {name:"Válasz:",value:valasz},
       )
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp();
       message.channel.send(embed);
  }
}
