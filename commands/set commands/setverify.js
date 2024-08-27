const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setverify",
   description: "setverify parancs",
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
     let szoveg = message.content.split(' ').slice(5).join(' ');
     let csenel = message.mentions.channels.first();
     let role1 = message.mentions.roles.first();
     let role2 = args[3];
     let autoroleallapot = db.fetch(`autorole_${message.guild.id}`);
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni az **ellenőrző rendszer**-t! (**${prefix}setverify [be/ki] [#csatorna] [@rang, ami belát az adott csatornába] [@rang, amit ráadjak, a sikeres ellenőrzés után] [szám/szöveg/ellenörző kód]**)`);
     if(args[0] == "be" || args[0] == "on") {
       if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **be** legyen kapcsolva az **ellenőrző rendszer**! (**${prefix}setverify [be/ki] [#csatorna] [@rang, ami belátt az adott csatornába] [@rang, amit ráadjak, a sikeres ellenőrzés után] [szám/szöveg/ellenörző kód]**)`);
       if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a rangot, amit ráadjak az adott felhasználóra, ami belát az adott csatornába! (**${prefix}setverify [be/ki] [#csatorna] [@rang, ami belát az adott csatornába] [@rang, amit ráadjak, a sikeres ellenőrzés után] [szám/szöveg/ellenörző kód]**)`);
       if(!role) return message.channel.send(`<a:x_:736342460522823768> **${args[2]}** nem egy rang!`);
       if(!args[3]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a rangot, amit ráadjak az adott felhasználóra, ha sikerült neki az ellenőrző teszt! (**${prefix}setverify [be/ki] [#csatorna] [@rang, ami belát az adott csatornába] [@rang, amit ráadjak, a sikeres ellenőrzés után] [szám/szöveg/ellenörző kód]**)`);
       if(args[3] != role) return message.channel.send(`<a:x_:736342460522823768> **${args[3]}** nem egy rang!`);
       if(!szoveg) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg azt a szám kódot, számsort, szöveget, vagy kódot, amit szeretnél! (**${prefix}setverify [be/ki] [#csatorna] [@rang, ami belát az adott csatornába] [@rang, amit ráadjak, a sikeres ellenőrzés után] [szám/szöveg/ellenörző kód]**)`);
       if(autoroleallapot == null) {
         db.set(`verify_${message.guild.id}`, { csati: csenel.id, rangocska1: role1.id, rangocska2: role2.id, szoveg: szoveg});
         message.channel.send(`<a:pipa:736339378372214915> Az **ellenőrző rendszer** sikeresen **bekapcsolva** a(z) ${csenel} csatornán! A rang: ${role}, a kód: **${szoveg}**`);
       } else {
         db.set(`verify_${message.guild.id}`, { csati: csenel.id, rangocska1: role1.id, rangocska2: role2.id, szoveg: szoveg});
         db.delete(`autorole_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> Az **ellenőrző rendszer** sikeresen **bekapcsolva** a(z) ${csenel} csatornán! Az **autorole rendszer**-t **kikapcsoltam**! A rang: ${role}, a kód: **${szoveg}**`);
       }
     }
     if(args[0] == "ki" || args[0] == "off") {
         let allapot = db.fetch(`vcsatorna_${message.guild.id}`);
         if(allapot == null) return message.channel.send(`Az **ellenőrző rendszer** nincs **bekapcsolva**!`);
         db.delete(`verify_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> Az **ellenőrző rendszer** sikeresen **kikapcsolva**!`);
     }
  }
}
