const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "avatar",
   aliases: ["profilkép", "profilkep"],
   description: "asd parancs",
   run: async (bot, message, args) => {
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
       let mentionedUser = message.mentions.members.first() || bot.users.cache.find(user => user.username == `${args.join(' ')}`) || bot.users.cache.find(user => user.tag == `${args.join(' ')}`) || bot.users.cache.find(user => user.id == `${args.join(' ')}`) || message.member;
       if(!mentionedUser) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó, vagy nincs közös szerverem vele!`);
       let aEmbed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setImage(mentionedUser.displayAvatarURL())
       .setColor("00ff00")
       .setTitle(`${mentionedUser.username} avatárja`)
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp();

       message.channel.send(aEmbed);
  }
}
