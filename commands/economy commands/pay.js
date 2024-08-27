const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "pay",
   aliases: ["fizet"],
   description: "pay parancs",
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
     let toPenzad = message.guild.member(message.mentions.users.first());
     let penz = args.slice(1).join(" ");
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akinek adjam az adott pénzösszeget! (**${prefix}pay [@név] [összeg]**)`);
     if(!toPenzad) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg az összeget, amennyit szeretnél adni neki! (**${prefix}pay [@név] [összeg]**)`);
     if(isNaN(args[1])) return message.channel.send(`<a:x_:736342460522823768> **${args[1]}** nem egy szám! Kérlek helyes számot adj meg!`);
     db.add(`money_${toPenzad.id}`, penz);
     db.subtract(`money_${message.author.id}`, penz);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("Pénz adás")
     .addFields(
       {name:"Aki adta:",value:`${message.author}`},
       {name:"Aki kapta:",value:`${toPenzad}`},
       {name:"Pénzösszeg:",value:`${args[1]}`},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(embed);
  }
}
