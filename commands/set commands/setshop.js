const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setshop",
   aliases: ["setbolt", "setüzlet", "setuzlet"],
   description: "setshop parancs",
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
     let rang = message.mentions.roles.first();
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be**, vagy **ki** szeretnéd kapcsolni a **Shop**-ot! (**${prefix}setshop [@rang] [ára] [tárgy neve]**)`);
     if(args[0] == "be" || args[0] == "on") {
       if(!rang) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a rangot, amelyet hozzá szeretnél **adni** a **Shop**-ba! (**${prefix}setshop [be/ki] [@rang] [ára] [tárgy neve]**)`);
       let nev = message.content.split(' ').slice(4).join(' ');
       if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a rang árát! (**${prefix}setshop [be/ki] [be/ki] [@rang] [ára] [tárgy neve]**)`);
       if(!nev) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a rang nevét! (**${prefix}setshop [be/ki] [@rang] [ára] [tárgy neve]**)`);
       db.add(`shop_${message.guild.id}`, { rangname: nev, rangar: args[2], rang: rang.id });
       message.channel.send(`<a:pipa:736339378372214915> Egy rang sikeresen hozzáadva a **Shop**-hoz! A rang: ${rang}, a rang neve: **${nev}**, a rang ára: **${args[2]}**`);
     }
     if(args[0] == "ki" || args[0] == "off") {
       db.delete(`shop_${message.guild.id}`);
       message.channel.send(`<a:pipa:736339378372214915> A **Shop** sikeresen törlésre került!`);
     }
  }
}
