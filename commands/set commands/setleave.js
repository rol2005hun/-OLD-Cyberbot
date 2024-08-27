const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setleave",
   aliases: ["setl", "setlc", "setleavec"],
   description: "setleave parancs",
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
     let leave = new db.table(`Szerverek`);
      message.channel.send(`:wave: Szia!\n:bangbang: **Ez egy interaktív parancs! A beállítási lehetőségeket ide,** ***prefix nélkül*** **írd!** :bangbang:\n**Két perced** van beállítani a dolgokat, utána lejár az idő!\nKérlek add meg hogy **be** vagy **ki** szeretnéd kapcsolni a **leave rendszer**-t!`);
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 });
      collector.once('collect', message => {
        if(message.content == "ki" || message.content == "off") {
          leave.delete(`leave_${message.guild.id}`);
          message.channel.send(`<a:pipa:736339378372214915> A **leave rendszer** sikeresen kikapcsolva!`);

        } else if(message.content == "be" || message.content == "on") {
           message.channel.send(`<a:pipa:736339378372214915> Oké! A **leave rendszer** **bekapcsolása** köveztkezik!\n\nKérlek add meg hogy **szöveges**, **embedes**, vagy **képes** leave legyen-e!`);
           collector.once('collect', message => {
             if(message.content == "szöveges" || message.content == "szoveges") {
               let leave = new db.table(`leave`);
                leave.set(`leave_${message.guild.id}.tipus`, 1);
                message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet típusa **szöveges** lesz!\n\nMost kérlek jelöld meg azt a csatornát, ahol az üzenet legyen!`);
                collector.once('collect', message => {
                  let csatorna = message.mentions.channels.first();
                  if(!csatorna) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy csatorna! Kérlek kezdd el előrönnen a **leave rendszer** beállításait!`);
                  leave.set(`leave_${message.guild.id}.csatorna`, csatorna.id);
                message.channel.send(`<a:pipa:736339378372214915> Szuper! Az üzenet a(z) ${csatorna} csatornába lesz elküldve!\n\nMost kérlek add meg hogy mi legyen a szöveg!`);
                collector.once('collect', message => {
                  leave.set(`leave_${message.guild.id}.szoveg`, message.content);
                  message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! A **leave rendszer** sikeresen beállítva!`);
                })})
             } else if(message.content == "embedes") {
               let leave = new db.table(`leave`);
               leave.set(`leave_${message.guild.id}.tipus`, 2);
               message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet típusa **embedes** lesz!\n\nMost kérlek jelöld meg azt a csatornát, ahol az üzenet legyen!`);
               collector.once('collect', message => {
                 let csatorna = message.mentions.channels.first();
                 if(!csatorna) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy csatorna! Kérlek kezdd el előrönnen a **leave rendszer** beállításait!`);
                 leave.set(`leave_${message.guild.id}.csatorna`, csatorna.id);
               message.channel.send(`<a:pipa:736339378372214915> Szuper! Az üzenet a(z) ${csatorna} csatornába lesz elküldve!\n\nMost kérlek add meg hogy mi legyen a szöveg!`);
               collector.once('collect', message => {
                 leave.set(`leave_${message.guild.id}.szoveg`, message.content);
                 message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! A **leave rendszer** sikeresen beállítva!`);
               })})
             } else if(message.content == "kepes" || message.content == "képes") {
               let leave = new db.table(`leave`);
               leave.set(`leave_${message.guild.id}.tipus`, 2);
               message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet típusa **képes** lesz!\n\nMost kérlek jelöld meg azt a csatornát, ahol az üzenet legyen!`);
               collector.once('collect', message => {
                 let csatorna = message.mentions.channels.first();
                 if(!csatorna) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy csatorna! Kérlek kezdd el előrönnen a **leave rendszer** beállításait!`);
                 leave.set(`leave_${message.guild.id}.csatorna`, csatorna.id);

                 message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! Az üzenet a ${csatorna} csatornába lesz elküldve!\n\nA **leave rendszer** sikeresen beállítva!`);
                })
              }
           })
        }
      })
  }
}
