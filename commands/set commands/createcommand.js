const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "createcommand",
   aliases: ["createcc", "createparancs", "c_cc"],
   description: "create_cc parancs",
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
     let parancsok = new db.table('Szerverek');
     message.channel.send(`:wave: Szia!\n:bangbang: **Ez egy interaktív parancs! A beállítási lehetőségeket ide,** ***prefix nélkül*** **írd!** :bangbang:\n**Két perced** van beállítani a dolgokat, utána lejár az idő!\nKérlek írd le a parancsot, prefixel együtt! Pl.: !?tgf.`);
     const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 });
     collector.once('collect', message => {
       parancsok.push(`parancsok_${message.guild.id}.parancs`, message.content);
       //message.channel.send(`<a:pipa:736339378372214915> Rendben! Az üzenet **${message.content}** lesz!\n\nMost kérlek add meg hogy **szöveg**-ben, vagy **embed**-ben küldjem el az üzenetet`);
       message.channel.send(`<a:pipa:736339378372214915> Oké! A parancs **${message.content}** lesz!\n\nMost kérlek nevezd meg vagy jelöld meg azt a rangot, amit **ráadjak** az adott felhasználóra, a parancs használatakor!`);
     collector.once('collect', message => {
       let rang1 = message.mentions.roles.first();
       if(!rang1) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy rang! Kérlek kezdd el előrönnen a **parancs készítés** beállításait!`);
       parancsok.push(`parancsok_${message.guild.id}.rang1`, rang1.id);
       message.channel.send(`<a:pipa:736339378372214915> Rendben! A rang amit ráadok a parancs használatakor, a **${message.content}** lesz!\n\nMost kérlek nevezd meg vagy jelöld meg azt a rangot, amit **elvegyek** az adott felhasználóra, a parancs használatakor!`);
    collector.once('collect', message => {
       let rang2 = message.mentions.roles.first();
       if(!rang2) return message.channel.send(`<a:x_:736342460522823768> **${message.content}** nem egy rang! Kérlek kezdd el előrönnen a **parancs készítés** beállításait!`);
       parancsok.push(`parancsok_${message.guild.id}.rang2`, rang1.id);
       message.channel.send(`<a:pipa:736339378372214915> Rendben! A rang amit elveszek a parancs használatakor, a **${message.content}** lesz!\n\nMost kérlek add meg hogy **szöveg**-ben, vagy **embed**-ben küldjem el az üzenetet`);
    collector.once('collect', message => {
      if(message.content == "embed" || message.content == "embedes") {
        parancsok.push(`parancsok_${message.guild.id}.tipus`, 2);
        message.channel.send(`<a:pipa:736339378372214915> Szuper! Az üzenet **embedes**-es formátumban lesz elküldve!\n\nMost kérlek add meg a szöveget, amit elküldjek a parancs használatakor!`);
        collector.once("collect", message => {
          parancsok.push(`parancsok_${message.guild.id}.szoveg`, message.content);
          message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! Az üzenet **${message.content}** lesz!\n\nA **${parancsok.fetch(`parancsok_${message.guild.id}.parancs`)}** parancs sikeresen létrehozva!`);
        })
      }else if(message.content == "szoveg" || message.content == "szoveges" || message.content == "szöveg" || message.content == "szöveges") {
        parancsok.push(`parancsok_${message.guild.id}.tipus`, 1);
        message.channel.send(`<a:pipa:736339378372214915> Szuper! Az üzenet **szöveg**-es formátumban lesz elküldve!\nMost kérlek add meg a szöveget, amit elküldjek a parancs használatakor!`);
        collector.once("collect", message => {
          parancsok.push(`parancsok_${message.guild.id}.szoveg`, message.content);
          message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! Az üzenet **${message.content}** lesz!\n\nA **${parancsok.fetch(`parancsok_${message.guild.id}.parancs`)}** parancs sikeresen létrehozva!`);
        })
      }
     })})})})





     /*if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
     let rang = args[1];
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a parancsot, **prefixel együtt**! Pl.: **!?tgf**, ebből a prefix: **!?** (**${prefix}createcommand [parancs neve, prefixel együtt] [@rang, ha nem kell, akkor null] [embed/szoveg] [szoveg]**)`);
     if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a rangot, amit ráadjak ráadjon az adott felhasználóra, amikor beírja a parancsot! Ha ne legyen ilyen, szimplán így ird: **null**! (**${prefix}createcommand [parancs neve, prefixel együtt] [@rang, ha nem kell, akkor null] [embed/szoveg] [szoveg]**)`);
     if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **embed**-ben, vagy **szöveg**-ben küldje el a szöveget! (**${prefix}createcommand [parancs neve, prefixel együtt] [@rang, ha nem kell, akkor null] [embed/szoveg] [szoveg]**)`);
     let szoveg = message.content.split(' ').slice(4).join(' ');
     if(!szoveg) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szöveget, amit kiírjak a parancs használata közben! (**${prefix}createcommand [parancs neve, prefixel együtt] [@rang, ha nem kell, akkor null] [embed/szoveg] [szoveg]**)`);
       if(args[2] == "embed" || args[1] == "embedes") {
         db.set(`parancs_${message.guild.id}`, { rang: args[1].id, miben: 0, szoveg: szoveg, parancs1: args[0] });
         message.channel.send(`<a:pipa:736339378372214915> Sikeresen létrehoztam a parancsot! A parancs: **${args[0]}**, a rang: ${rang}, szöveg: **${szoveg}**, típus: **embed**!`);
       }
       if(args[2] == "szoveg" || args[1] == "szöveg" || args[1] == "szöveges" || args[1] == "szoveges") {
         db.set(`parancs_${message.guild.id}`, { rang: args[1].id, miben: 1, szoveg: szoveg, parancs1: args[0] });
         message.channel.send(`<a:pipa:736339378372214915> Sikeresen létrehoztam a parancsot! A parancs: **${args[0]}**, a rang: ${rang}, szöveg: **${szoveg}**, típus: **szöveg**!`);
       }*/
  }
}
