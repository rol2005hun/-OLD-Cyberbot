const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "pm",
   aliases: ["dm"],
   description: "pm parancs",
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
     let szoveg = message.content.split(' ').slice(2).join(' ');
     if(!message.member.user.tag.startsWith(process.env.botfejleszto)) return message.channel.send(`<a:x_:736342460522823768> Nem tartozol a fejlesztők csapatába!`);
     message.delete();
     let mentionedUser1 =  bot.users.cache.find(user => user.id == `${args[0]}`);
     if(!mentionedUser1) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akinek elküldjem az üzenetet! (**${prefix}pm [@név/id] [szöveg]**)`);
     if(!szoveg) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szöveget, amit elküldjek az adott felhasználónak! (**${prefix}pm [@név/id] [szöveg]**)`);
     message.channel.send(`<a:pipa:736339378372214915> ${message.author}, sikeresen elküldtem az üzenetet ${mentionedUser1.tag}-nak/nek! Üzenet:\n**${szoveg}**`);
     mentionedUser1.send(`Szia! ${message.author.tag} ezt küldte neked:\n***${szoveg}***\nHa szerinted zavarás/zaklatás/spamm, vagy nem szeretnéd hogy küldjenek üzenetet, akkor használd a **${prefix}bothiba** parancsot, és mi foglalkozunk az üggyel!`);
  }
}
