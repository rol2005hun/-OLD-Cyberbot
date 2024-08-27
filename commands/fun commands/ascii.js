const Discord = require("discord.js");
const db = require("quick.db");
const figlet = require("figlet");

  module.exports = {
   name: "ascii",
   description: "ascii parancs",
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
     if(!args.join(" ")) {
         message.delete();
         return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szöveget, amit a bot kiírjon! (**${prefix}ascii [szöveg]**)`).then(msg => msg.delete(5000));
     }
     figlet(args.join(" "), function(err, data) {
         if (err) return console.dir(err);
         message.delete();
         message.channel.send(data, {
             code: 'md'
         });
     });
  }
}
