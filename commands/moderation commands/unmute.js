const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "unmute",
   description: "unmute parancs",
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
     let toUnMute = message.mentions.members.first();
     let unmuterole = message.guild.roles.cache.find(unmuterole => unmuterole.name === "Muted");
     if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)");
     if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)");
     if (!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akit unmuteolni szeretnél! (**${prefix}unmute [@név]**)`);
     if(!toUnMute) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     let embed2 = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("GREEN")
     .setTitle("Unmute")
     .addFields(
       {name:`Akit unmuteoltak:`,value:`${toUnMute}`,inline:true},
       {name:"Aki unmuteolta:",value:`${message.author}`,inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp()
     message.channel.send(embed2);
     toUnMute.roles.remove(unmuterole);
     db.delete(`muted_${toUnMute.id}_${message.guild.id}`);
  }
}
