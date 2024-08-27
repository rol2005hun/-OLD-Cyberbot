const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "google",
   aliases: ["gogle", "kereses", "keresés"],
   description: "google parancs",
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
     if (args.length < 1) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj megy egy szöveget, amire rákeressek! (**${prefix}google [szöveg]**)`);
      const gooogleEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor("RANDOM")
      .setDescription('[' + args.toString().replace(/,/g, ' ') + '](https://www.google.com/search?hl=en_US&q=' + args.toString().replace(/,/g, '+') + ')')
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
      message.channel.send(gooogleEmbed);
  }
}
