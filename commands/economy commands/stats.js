const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "stats",
   aliases: ["statisztika", "mystats", "mys"],
   description: "stats parancs",
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
       let profilok = new db.table("Profilok");
       let user = message.mentions.members.first() || message.guild.members.cache.find(user => user.username == `${args.join(' ')}`) || bot.users.cache.find(user => user.tag == `${args.join(' ')}`) || bot.users.cache.find(user => user.id == `${args.join(' ')}`) || message.member;
       let allapot = profilok.fetch(`profil_${user.id}`);
       let allapot2 = profilok.fetch(`profil_${user.id}.allapot`);
       let nev = profilok.fetch(`profil_${user.id}.profilnev`)
       if(profilok.fetch(`profil_${user.id}.totallevel`) == null) profilok.fetch(`profil_${user.id}.totallevel`) === "Nincs";
       if(allapot == null && message.member == true) return message.channel.send(`<a:x_:736342460522823768> Neked nincsen még profilod!`);
       if(allapot2 == null) {
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setTitle(`Statisztika`)
         .setDescription(`**${nev} statisztikája**`)
         .addField(`Összes pénz:`, profilok.fetch(`profil_${user.id}.totalmoney`), true)
         .addField(`Készpénz:`, profilok.fetch(`profil_${user.id}.handmoney`), true)
         .addField(`Pénz a bankban:`, profilok.fetch(`profil_${user.id}.bankmoney`), true)
         .addField(`Total XP:`, profilok.fetch(`profil_${user.id}.totalxp`), true)
         .addField(`Total Level:`, profilok.fetch(`profil_${user.id}.totallevel`), true)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
       } else {
         let embed = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL())
         .setTitle(`Statisztika`)
         .setDescription(`**${nev} statisztikája**`)
         .addField(`Név:`, profilok.fetch(`profil_${user.id}.rlnev`), true)
         .addField(`Nem:`, profilok.fetch(`profil_${user.id}.nem`), true)
         .addField(`Hobby:`, profilok.fetch(`profil_${user.id}.hobby`), true)
         .addField(`Kedvenc állat:`, profilok.fetch(`profil_${user.id}.allat`), true)
         .addField(`Kedvenc szín:`, profilok.fetch(`profil_${user.id}.szin`), true)
         .addField(`Összes pénz:`, profilok.fetch(`profil_${user.id}.osszespenz`), true)
         .addField(`Készpénz:`, profilok.fetch(`profil_${user.id}.keszpenz`), true)
         .addField(`Pénz a bankban:`, profilok.fetch(`profil_${user.id}.bankpenz`), true)
         .addField(`Total XP:`, profilok.fetch(`profil_${user.id}.xp`), true)
         .addField(`Total Level:`, profilok.fetch(`profil_${user.id}.level`), true)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed);
       }
  }
}
