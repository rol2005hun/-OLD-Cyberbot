const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "deleteprofile",
   aliases: ["deleteprofil", "profiltorles", "profiltörlés"],
   description: "deleteprofile parancs",
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
     let allapot = profilok.get(`profil_${message.author.id}`);
     if(allapot == null) return message.channel.send(`<a:x_:736342460522823768> Neked nincs profilod! Készíts egyet a **${prefix}createprofile** paranccsal!`);
     const msg = await message.channel.send(`:bangbang: Biztosan törölni akarod a profilodat? Az összes adat oda fog veszni!\nHa törölni szeretnéd, akkor nyomj a(z) <a:pipa:736339378372214915> reakcióra, ha mégsem, nyomj a(z) <a:x_:736342460522823768> reakcióra! :bangbang:`);
     await msg.react('736339378372214915');
     await msg.react("736342460522823768");
     const filter = (reaction, user) => {
       return (reaction.emoji.id == '736339378372214915' || reaction.emoji.id == '736342460522823768') && user.id == message.author.id;
     }
     msg.awaitReactions(filter, {max: 1, time:60000, errors: ['time']})
      .then(reaction => {
        if(reaction.first().emoji.id == '736339378372214915') {
          profilok.delete(`profil_${message.author.id}`);
          message.channel.send(`<a:pipa:736339378372214915> Sikeresen törölted a profilod!`);
        } else if(reaction.first().emoji.id == '736342460522823768') {
          message.channel.send(`<a:pipa:736339378372214915> Sikeresen megtartottad a profilod, jó szórakozást!`);
        }
      })
      .catch(() => {
          message.channel.send(`<a:x_:736342460522823768> Lejárt az idő mivel nem választottál! A reagálás mostantól **semleges**`);
      }
    )
  }
}
