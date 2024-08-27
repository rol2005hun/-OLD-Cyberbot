const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setnyelv",
   aliases: ["setlanguage", "setlang", "setlan"],
   description: "setlang parancs",
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
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **magyar/hun** vagy **angol/eng** nyelvet szeretnél-e! (**${prefix}setlanguage [magyar/angol]**)`);
     if(args[0] == "hun" || args[0] == "hu" || args[0] == "magyar") {
       message.channel.send(`<a:pipa:736339378372214915> Succesfully set the language to **magyar**!`);
       db.delete(`nyelv_${message.guild.id}`);
     }
     if(args[0] == "eng" || args[0] == "en" || args[0] == "angol") {
       message.channel.send(`<a:pipa:736339378372214915> Sikeresen nyelvváltás **angol** nyelvre!`);
       db.set(`nyelv_${message.guild.id}`, args[0]);
     }
  }
}
