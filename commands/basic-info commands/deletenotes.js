const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "deletenote",
   aliases: ["deletenotes", "jegyzettorles", "jegyzettörlés"],
   description: "deletenote parancs",
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
     let allapot = db.fetch(`notes_${message.author.id}`);
     if(allapot === null) return message.channel.send(`<a:x_:736342460522823768> Neked nincsenek jegyzeteid!`);
     if(!allapot) return message.channel.send(`<a:x_:736342460522823768> Neked nincsenek jegyzeteid!`);
     db.delete(`notes_${message.author.id}`);
     message.channel.send(`<a:pipa:736339378372214915> Sikeresen töröltem a jegyzeteidet!`);
  }
}
