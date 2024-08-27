const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "kpo",
   aliases: ["rps", "kopapirollo", "kőpapírolló"],
   description: "rps parancs",
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
     if (!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy emojit! (:punch:, :v:, :hand_splayed:) (**${prefix}kpo [emoji]**)`);
     let replies = [":hand_splayed:", ":v:", ":punch:"];
     let result = Math.floor(Math.random() * replies.length);
     let rps = args.slice(0).join(" ");
     let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle("Kő - Papír - Olló")
       .setColor("RANDOM")
       .addFields(
         {name:"Te:",value:[rps]},
         {name:"Én:",value:replies[result]},
       )
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp();

     message.channel.send(embed);
  }
}
