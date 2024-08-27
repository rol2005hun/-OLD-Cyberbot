const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setserverstats",
   description: "setserverstats parancs",
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
     let botnelkuli = message.guild.members.cache.filter(member => !member.user.bot).size;
     let botok = message.guild.members.cache.filter(member => member.user.bot).size;
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni a **szerver statisztikát**! (**${prefix}setserverstats [be/ki]**)`);
     if(args[0] == "be") {
       message.guild.channels.create(`Szerver Statisztika`, {
         type: 'category'
       })
       .then(channel => {
       let channelid = channel.id;
       db.set(`serverstats_${message.guild.id}.kategoria`, channelid);
       })
       message.guild.channels.create(`Összes tag: ${message.guild.memberCount}`, {
         type: 'voice'
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "Szerver Statisztika" && c.type == "category");
       channel.setParent(category.id);
       let channelid = channel.id;
       db.set(`serverstats_${message.guild.id}.osszestag`, channelid);
       })
       message.guild.channels.create(`Tagok: ${botnelkuli}`, {
         type: 'voice'
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "Szerver Statisztika" && c.type == "category");
       channel.setParent(category.id);
       let channelid = channel.id;
       db.set(`serverstats_${message.guild.id}.tagok`, channelid);
       })
       message.guild.channels.create(`Botok: ${botok}`, {
         type: 'voice'
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "Szerver Statisztika" && c.type == "category");
       channel.setParent(category.id);
       let channelid = channel.id;
       db.set(`serverstats_${message.guild.id}.botok`, channelid);
       })
       message.guild.channels.create(`Tulajdonos: ${message.guild.owner.user.tag}`, {
         type: 'voice'
       })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "Szerver Statisztika" && c.type == "category");
       channel.setParent(category.id);
       let channelid = channel.id;
       db.set(`serverstats_${message.guild.id}.tulaj`, channelid);
       })
       //db.set(`serverstats_${message.guild.id}`, {kategoria: channel1.id, osszestag: channel2.id, tagok: channel3.id, botok: channel4.id});
       message.channel.send(`<a:pipa:736339378372214915> A **szerver statisztika** sikeresen bekapcsolva!`);
     }
     if(args[0] == "ki") {
       let osszestag = db.fetch(`serverstats_${message.guild.id}.osszestag`);
       let tagok = db.fetch(`serverstats_${message.guild.id}.tagok`);
       let botok = db.fetch(`serverstats_${message.guild.id}.botok`);
       let tulaj = db.fetch(`serverstats_${message.guild.id}.tulaj`);
       let kategoria = db.fetch(`serverstats_${message.guild.id}.kategoria`);
       if(botok && tagok && osszestag && tulaj && kategoria == null) message.channel.send(`<a:x_:736342460522823768> A **szerver statisztika** nincs bekapcsolva!`);
       message.guild.channels.cache.get(botok).delete();
       message.guild.channels.cache.get(osszestag).delete();
       message.guild.channels.cache.get(tulaj).delete();
       message.guild.channels.cache.get(kategoria).delete();
       message.guild.channels.cache.get(tagok).delete();
       db.delete(`serverstats_${message.guild.id}.osszestag`);
       db.delete(`serverstats_${message.guild.id}.tagok`);
       db.delete(`serverstats_${message.guild.id}.botok`);
       db.delete(`serverstats_${message.guild.id}.tulaj`);
       db.delete(`serverstats_${message.guild.id}.kategoria`);
       message.channel.send(`<a:pipa:736339378372214915> A **szerver statisztika** sikeresen kikapcsolva!`);
     }
  }
}
