const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "calc",
   aliases: ["calculate", "math", "mathe", "matek"],
   description: "calc parancs",
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
     var plus = Math.floor(Number(args[0]) + Number(args[2]));
      if (isNaN(plus)) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy számot! (**${prefix}calc [szám1] [jel] [szám2]**)`);

      var minus = Math.floor(args[0]) - (args[2]);
      if (isNaN(minus)) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy számot! (**${prefix}calc [szám1] [jel] [szám2]**)`);

      var multiply = Math.floor(args[0]) * (args[2]);
      if (isNaN(multiply)) message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy számot! (**${prefix}calc [szám1] [jel] [szám2]**)`);

      var divide = Math.floor(args[0]) / (args[2]);
      if (isNaN(divide)) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy számot! (**${prefix}calc [szám1] [jel] [szám2]**)`);

      if (args[1] ==  "+") return message.channel.send(args[0] + " + " + args[2] + " = **" + plus + "**");
      if (args[1] ==  "-") return message.channel.send(args[0] + " - " + args[2] + " = **" + minus + "**");
      if (args[1] ==  "*") return message.channel.send(args[0] + " * " + args[2] + " = **" + multiply + "**");
      if (args[1] ==  "x") return message.channel.send(args[0] + " x " + args[2] + " = **`" + multiply + "`**");
      if (args[1] ==  "/") return message.channel.send(args[0] + " / " + args[2] + " = **" + divide + "**");

      else message.channel.send(`<a:x_:736342460522823768> Hiba történt!`);
  }
}
