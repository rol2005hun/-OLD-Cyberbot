const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "warn",
   aliases: ["figyelmeztet"],
   description: "warn parancs",
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
     let toWarn = message.mentions.members.first();
     let reason = args.slice(1).join(" ");
     let warnings = db.get(`warnings_${message.guild.id}_${toWarn.id}`);
     if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)");
     if (!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akit warnolni szeretnél! (**${prefix}warn [@név] [indok]**)`);
     if(!toWarn) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(toWarn.bot) return message.channel.send(`<a:x_:736342460522823768> Botokat nem warnolhatsz!`);
     if(!reason) return message.channel.send(`<a:x_:736342460522823768> Adj meg egy indokot! (**${prefix}warn [@név] [indok]**)`);
     if(warnings == 3) return message.channel.send(`<a:x_:736342460522823768> Neki kigyűlt a 3 warnja!`);
     if(warnings == null) {
       db.set(`warnings_${message.guild.id}_${toWarn.id}`, 1);
       db.push(`warningreason_${message.guild.id}_${toWarn.id}`, `${reason}`);
       toWarn.send(`:robot: Warnoltak a **${message.guild.name}** szerverén! Warnolt: ${message.author}, indok: **${reason}**!`);
       let embed10 = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RED")
         .setTitle("Warn")
         .addFields(
           {name:`Akit warnoltak`,value:`${toWarn}`,inline:true},
           {name:"Aki warnolta:",value:`${message.author}`,inline:true},
           {name:"Indok:",value:`${reason}`,inline:true},
         )
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed10);
     } else if(warnings !== null) {
       db.push(`warningreason_${message.guild.id}_${toWarn.id}`, `${reason}`);
       db.add(`warnings_${message.guild.id}_${toWarn.id}`, 1)
       toWarn.send(`:robot: Warnoltak a **${message.guild.name}** szerverén! Warnolt: ${message.author}, indok: **${reason}**!`);
       let embed11 = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
         .setColor("RED")
         .setTitle("Warn")
         .addField(`Akit warnoltak`, `${toWarn}`,true)
         .addField("Aki warnolta:", `${message.author}`,true)
         .addField("Indok:", `${reason}`,true)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         message.channel.send(embed11);
     }
  }
}
