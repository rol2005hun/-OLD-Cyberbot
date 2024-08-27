const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setwelcome",
   aliases: ["setw", "setwc", "setwchannel"],
   description: "setwelcome parancs",
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
     let welcome = new db.table(`Szerverek`);
      message.channel.send(`:wave: Szia!\n:bangbang: **Ez egy interaktív parancs! A beállítási lehetőségeket ide,** ***prefix nélkül*** **írd!** :bangbang:\n**Két perced** van beállítani a dolgokat, utána lejár az idő!\nKérlek add meg hogy **be** vagy **ki** szeretnéd kapcsolni a **welcome rendszer**-t!`);
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 });
      collector.once('collect', message => {
        if(message.content == "ki" || message.content == "off") {
          welcome.delete(`welcome_${message.guild.id}`);
          message.channel.send(`<a:pipa:736339378372214915> A **welcome rendszer** sikeresen kikapcsolva!`);

        } else if(message.content == "be" || message.content == "on") {
           message.channel.send(`<a:pipa:736339378372214915> Oké! A **welcome rendszer** **bekapcsolása** köveztkezik!\n\nKérlek add meg hogy **szöveges**, **embedes**, vagy **képes** leave legyen-e!`);
           collector.once('collect', message => {
             if(message.content == "szöveges" || message.content == "szoveges") {
               let welcome = new db.table(`Welcome`);
                welcome.set(`welcome_${message.guild.id}.tipus`, 1);
                message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet típusa **szöveges** lesz!\n\nMost kérlek jelöld meg azt a csatornát, ahol az üzenet legyen!`);
                collector.once('collect', message => {
                  let csatorna = message.mentions.channels.first();
                  if(!csatorna) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy csatorna! Kérlek kezdd el előrönnen a **welcome rendszer** beállításait!`);
                  welcome.set(`welcome_${message.guild.id}.csatorna`, csatorna.id);
                message.channel.send(`<a:pipa:736339378372214915> Szuper! Az üzenet a(z) ${csatorna} csatornába lesz elküldve!\n\nMost kérlek add meg hogy mi legyen a szöveg!`);
                collector.once('collect', message => {
                  welcome.set(`welcome_${message.guild.id}.szoveg`, message.content);
                  message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! A **welcome rendszer** sikeresen beállítva!`);
                })})
             } else if(message.content == "embedes") {
               let welcome = new db.table(`Welcome`);
               welcome.set(`welcome_${message.guild.id}.tipus`, 2);
               message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet típusa **embedes** lesz!\n\nMost kérlek jelöld meg azt a csatornát, ahol az üzenet legyen!`);
               collector.once('collect', message => {
                 let csatorna = message.mentions.channels.first();
                 if(!csatorna) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy csatorna! Kérlek kezdd el előrönnen a **welcome rendszer** beállításait!`);
                 welcome.set(`welcome_${message.guild.id}.csatorna`, csatorna.id);
               message.channel.send(`<a:pipa:736339378372214915> Szuper! Az üzenet a(z) ${csatorna} csatornába lesz elküldve!\n\nMost kérlek add meg hogy mi legyen a szöveg!`);
               collector.once('collect', message => {
                 welcome.set(`welcome_${message.guild.id}.szoveg`, message.content);
                 message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! A **welcome rendszer** sikeresen beállítva!`);
               })})
             } else if(message.content == "kepes" || message.content == "képes") {
               let welcome = new db.table(`Welcome`);
               welcome.set(`welcome_${message.guild.id}.tipus`, 2);
               message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet típusa **képes** lesz!\n\nMost kérlek jelöld meg azt a csatornát, ahol az üzenet legyen!`);
               collector.once('collect', message => {
                 let csatorna = message.mentions.channels.first();
                 if(!csatorna) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy csatorna! Kérlek kezdd el előrönnen a **welcome rendszer** beállításait!`);
                 welcome.set(`welcome_${message.guild.id}.csatorna`, csatorna.id);
                 message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! Az üzenetet a(z) ${csatorna} csatornába lesz elküldve!\n\nA **welcome rendszer** sikeresen beállítva!`);
                })
              }
           })
        }
      })
  }
}
