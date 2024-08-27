const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "verify",
   aliases: ["ellenorzes", "ellenőrzés"],
   description: "verify parancs",
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
     let szoveg = args.join(" ");
     let allapot = db.fetch(`vcsatorna_${message.guild.id}`);
     if(allapot == null) return message.channel.send(`Az **ellenőrző rendszer** nincs **bekapcsolva**!`);
     if(!szoveg) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg az ellenőrző kódot/szöveget!`);
     let role = db.fetch(`vrole_${message.guild.id}`);
     let csatorna = db.fetch(`vcsatorna_${message.guild.id}`);
     let csatorna2 = message.member.channel;
     if(csatorna != csatorna2) return message.channel.send(`<a:x_:736342460522823768> Helytelen csatornába írod be! A helyes csatorna: ${csatorna.name}`);
     let szovegecske = db.fetch(`vszoveg_${message.guild.id}`);
     if(szovegecske == `${szoveg}`) {
       message.author.roles.add(role);
       message.channel.send(`:tada: Sikeresen átmentél az ellenőrző teszten! A rangodat megkaptad! :tada:`);
     }
  }
}
