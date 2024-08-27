const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "cc",
   aliases: ["clear", "clearchat", "torol","töröl","torolchat","törölchat","purge"],
   description: "cc parancs",
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
     if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \`Üzenetek kezelése\`)");
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Üzenetek kezelése\`)");
     message.delete();
       if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy mennyi üzenetet szeretnél törölni! (**${prefix}cc [üzenetek száma]**)`);
       if(isNaN(args[0])) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy szám. Kérlek helyes számot adj meg!`);
       if(args[0] > 100) return message.channel.send(`<a:x_:736342460522823768> 100-nál több üzenetet nem törölhetek!`);
       if(args[0] < 2) return message.channel.send(`<a:x_:736342460522823768> 1-nél nagyobb számot adj meg!`);
       message.channel.bulkDelete(args[0])
       .then(messages => message.channel.send(`<a:pipa:736339378372214915> Sikeresen töröltem **${args[0]}** üzenetet!`)).then(d => d.delete( {timeout: 5000 }));
  }
}
