const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "createprofile",
   aliases: ["createprofil", "ujprofil", "újprofil"],
   description: "újprofil parancs",
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
       let profilok = new db.table(`Profilok`);
       message.channel.send(`:wave: Szia!\n:bangbang: **Ez egy interaktív parancs! A beállítási lehetőségeket ide,** ***prefix nélkül*** **írd!** :bangbang:\n**Két perced** van beállítani a dolgokat, utána lejár az idő!\nLegyenk általános tudnivalók rólad? **igen** vagy **nem**`);
       const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 });
       collector.once('collect', message => {
         if(message.content.toLowerCase() == "igen" || message.content.toLowerCase() == "yes") {
           profilok.set(`profil_${message.author.id}.allapot`, "on");
           message.channel.send(`<a:pipa:736339378372214915> Remek! Akkor beállítjuk a dolgokat rólad is!\nMost kérlek add meg a nevedet!`);
           collector.once('collect', message => {
             profilok.set(`profil_${message.author.id}.rlnev`, message.content);
             message.channel.send(`<a:pipa:736339378372214915> Oké! A neved **${message.content}** lesz!\n\nMost kérlek határozd meg a nemedet! (Fiú/lány)`);
             collector.once('collect', message => {
                profilok.set(`profil_${message.author.id}.nem`, message.content);
                message.channel.send(`<a:pipa:736339378372214915> Rendben! A nemed **${message.content}** lesz!\n\nMost kérlek hatázozd meg az életkorodat!`);
             collector.once('collect', message => {
                profilok.set(`profil_${message.author.id}.kor`, message.content);
                message.channel.send(`<a:pipa:736339378372214915> Okés! Az életkorod **${message.content}** lesz!\n\nMost kérlek add meg a kedvenc hobbydat!`);
             collector.once('collect', message => {
               profilok.set(`profil_${message.author.id}.hobby`, message.content);
               message.channel.send(`<a:pipa:736339378372214915> Remek! A kedvenc hobbyd a(z) **${message.content}** lesz!\n\nMost kérlek add meg a kedvenc állatodat!`);
             collector.once('collect', message => {
                profilok.set(`profil_${message.author.id}.allat`, message.content);
                message.channel.send(`<a:pipa:736339378372214915> Szuper! A kedvenc állatod a **${message.content}** lesz!\n\nMost kérlek add meg a kedvenc színed!`);
            collector.once('collect', message => {
                profilok.set(`profil_${message.author.id}.szin`, message.content);
                message.channel.send(`<a:pipa:736339378372214915> Fantasztikus! A kedvenc színed a **${message.content}** lesz!\n\nMost kérlek add meg a profilod nevét!`);
            collector.once('collect', message => {
                profilok.set(`profil_${message.author.id}.profilnev`, message.content);
                message.channel.send(`<a:pipa:736339378372214915> Szuper! A profilod neve **${message.content}** lesz!\n\n:ok_hand: A profilod sikeresen elkészítve! Az adatok lekéréséhez használd a **${prefix}stats** parancsot!`);
           })})})})})})})
         } else if (message.content.toLowerCase() == "nem" || message.content.toLowerCase() == "no") {
           message.channel.send(`<a:pipa:736339378372214915> Remek! Akkor nem állítunk be dolgokat rólad!\nMost kérlek add meg a profilod nevét!`);
           collector.once('collect', message => {
             profilok.set(`profil_${message.author.id}.profilnev`, message.content);
             message.channel.send(`<a:pipa:736339378372214915> Szuper! A profilod neve **${message.content}** lesz!\n\n:ok_hand: A profilod sikeresen elkészítve! Az adatok lekéréséhez használd a **${prefix}stats** parancsot!`);
           })
         }
       })
  }
}
