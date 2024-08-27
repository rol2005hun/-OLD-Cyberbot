const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "sqltörlés",
   description: "sqltörlés parancs",
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
     if(!message.member.user.tag.startsWith(process.env.botfejleszto)) return message.channel.send(`<a:x_:736342460522823768> Nem tartozol a fejlesztők csapatába!`);
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, az adatbázis nevét! (**${prefix}sqltörlés [sql neve] [ID] [ID(nem szükséges)]**)`);
     if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, az adott felhasználó/szerver ID-jét!`);
     if(args[1]) return db.delete(`${args[0]}${args[1]}`);
     if(args[2]) return db.delete(`${args[0]}${args[1]}${args[2]}`);
     message.channel.send(`<a:pipa:736339378372214915> Sikeresen töröltem az adatbázist!`);
  }
}
