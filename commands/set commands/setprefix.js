const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setprefix",
   aliases: ["prefix", "setelotag", "setelőtag", "elotag"],
   description: "setprefix parancs",
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
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg az új prefixet a szervernek! (**${prefix}prefixváltozatás [új prefix]**)`);
     if(args[1]) return message.channel.send(`<a:x_:736342460522823768> A prefix egyben kell legyen, nem lehet két jel!`);
     if(args[0].length > 3) return message.channel.send(`<a:x_:736342460522823768> A prefix nem lehet 3 karakternél több!`);
     db.set(`prefix_${message.guild.id}`, args[0]);
     if(args[0] == process.env.prefix) {
       db.delete(`prefix_${message.guild.id}`)
       await message.channel.send(`<a:pipa:736339378372214915> Sikeres bot prefix resetelés!`);
     } else {
        await message.channel.send(`<a:pipa:736339378372214915> Sikeres bot prefix változtatás erre: **${args[0]}**`);
      }
     }
  }
