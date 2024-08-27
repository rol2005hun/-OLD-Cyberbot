const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setwelcome",
   description: "sw parancs",
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
     let channel = message.mentions.channels.first()
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni a **köszöntő üzenetet**-t! (**${prefix}setwelcome [be/ki] [szöveges/képes/embedes] [#csatorna]**)`);
     if(args[0] == "be") {
       if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg hogy a **képes/szöveges/embedes köszöntő üzenet** legyen **bekapcsolva**! (**${prefix}setwelcome [be/ki] [szöveges/képes/embedes] [#csatorna]**)`);
       if(args[1] == "kepes" || args[1] == "képes") {
         if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **be** legyen kapcsolva a **képes köszöntő üzenet**! (**${prefix}setwelcome [be/ki] [szöveges/képes/embedes] [#csatorna]**)`);
         db.set(`kepeswelcome_${message.guild.id}`, channel.id);
         message.channel.send(`<a:pipa:736339378372214915> A **képes köszöntő üzenet** sikeresen **bekapcsolva** a ${channel} csatornán!`);
         //message.channel.send(`<a:x_:736342460522823768> Jelenleg javítás alatt!`);
       }
       if(args[1] == "szöveges" || args[1] == "szoveges") {
         if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **be** legyen kapcsolva a **szöveges köszöntő üzenet**! (**${prefix}setwelcome [be/ki] [szöveges/képes/embedes] [#csatorna]**)`);
         db.set(`szovegeswelcome_${message.guild.id}`, channel.id);
         message.channel.send(`<a:pipa:736339378372214915> A **szöveges köszöntő üzenet** sikeresen **bekapcsolva** a ${channel} csatornán!`);
       }
       if(args[1] == "embedes" || args[1] == "émbedes") {
         if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **be** legyen kapcsolva az **embedes köszöntő üzenet**! (**${prefix}setwelcome [be/ki] [szöveges/képes/embedes] [#csatorna]**)`);
         db.set(`embedeswelcome_${message.guild.id}`, channel.id);
         message.channel.send(`<a:pipa:736339378372214915> Az **embedes köszöntő üzenet** sikeresen **bekapcsolva** a ${channel} csatornán!`);
       }
     }
     if(args[0] == "ki") {
       if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg hogy a **képes/szöveges/embedes köszöntő üzenet** legyen **kikapcsolva**! (**${prefix}setwelcome [be/ki] [szöveges/képes/embedes] [#csatorna]**)`);
       if(args[1] == "kepes" || args[1] == "képes") {
         let csatornaallapot = db.fetch(`kepeswelcome_${message.guild.id}`);
         if(csatornaallapot == null) return message.channel.send(`<a:x_:736342460522823768> A **képes köszöntő üzenet** nincs **bekapcsolva**!`);
         if(!csatornaallapot) return message.channel.send(`<a:x_:736342460522823768> A **képes köszöntő üzenet** nincs **bekapcsolva**!`);
         db.delete(`kepeswelcome_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> A **képes köszöntő üzenet** sikeresen **kikapcsolva**!`);
       }
       if(args[1] == "szöveges" || args[1] == "szoveges") {
         let csatornaallapot = db.fetch(`szovegeswelcome_${message.guild.id}`);
         if(csatornaallapot == null) return message.channel.send(`<a:x_:736342460522823768> A **szöveges köszöntő üzenet** nincs **bekapcsolva**!`);
         if(!csatornaallapot) return message.channel.send(`<a:x_:736342460522823768> A **szöveges köszöntő üzenet** nincs **bekapcsolva**!`);
         db.delete(`szovegeswelcome_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> A **szöveges köszöntő üzenet** sikeresen **kikapcsolva**!`);
       }
       if(args[1] == "embedes" || args[1] == "émbedes") {
         let csatornaallapot = db.fetch(`embedeswelcome_${message.guild.id}`);
         if(csatornaallapot == null) return message.channel.send(`<a:x_:736342460522823768> Az **embedes köszöntő üzenet** nincs **bekapcsolva**!`);
         if(!csatornaallapot) return message.channel.send(`<a:x_:736342460522823768> Az **embedes köszöntő üzenet** nincs **bekapcsolva**!`);
         db.delete(`embedeswelcome_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> Az **embedes köszöntő üzenet** sikeresen **kikapcsolva**!`);
       }
     }
     /*if(args[0] != 'be' || args[0] != 'ki'){
       message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy opció! Opciók: **be** | **ki**!`);
     }*/
  }
}
