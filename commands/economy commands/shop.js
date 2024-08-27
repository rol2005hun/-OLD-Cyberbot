const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "shop",
   aliases: ["bolt", "uzlet", "üzlet"],
   description: "shop parancs",
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
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RANDOM")
     .setTitle("Shop")
     .addField("Tárgy shop:", "Kard | Colt | Deagle | Muskéta | AK-47 | Minigun | Isten-csapása | Katonák",true)
     .addField("Megvételhez:", `${prefix}buy [tárgy neve] || Úgy írd be ahogy balra is látható!`,true)
     .addField("Rang shop:", `Fejlesztés alatt!`,true)
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(embed);
  }
}
