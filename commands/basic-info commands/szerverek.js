const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "szerverek",
   aliases: ["guilds", "servers", "serverek"],
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
     bot.guilds.cache.forEach(guild => {
       let embed = new Discord.MessageEmbed()
       .setTitle("Szerverek")
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setDescription(`Szerver neve: **${guild.name}** | Szerver ID-je: **${guild.id}** | A szerver tulajdonos neve: **${guild.owner.user.tag}** | Tagok száma: **${guild.memberCount}**`)
       .setTimestamp()
       .addField(`A bot jelenlegi szervereinek a száma:`, bot.guilds.cache.size)
       .setFooter(bot.user.username, bot.user.displayAvatarURL());
       message.channel.send(embed);
     })
  }
}
