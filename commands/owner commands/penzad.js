const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "pénzad",
   aliases: ["penzad"],
   description: "penzad parancs",
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
     if(!message.member.user.tag.startsWith(process.env.botfejleszto)) return message.channel.send(`<a:x_:736342460522823768> Nem tartozol a fejlesztők csapatába!`);
     let toPenzad = message.guild.member(message.mentions.users.first()) || bot.users.cache.find(user => user.name == `${args[0]}`);
     let penz = args.slice(1).join(" ");
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akinek adjam az adott pénzösszeget! (**${prefix}pénzad [@név] [összeg]**)`);
     if(!toPenzad) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg az összeget, amennyit szeretnél adni neki! (**${prefix}pénzad [@név] [összeg]**)`);
     if(isNaN(args[1])) return message.channel.send(`<a:x_:736342460522823768> **${args[1]}** nem egy szám! Kérlek helyes számot adj meg!`);
     db.add(`money_${toPenzad.id}`, penz);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("Pénz adás")
     .addFields(
       {name:"Aki adta:",value:`${message.author}`, inline:true},
       {name:"Aki kapta:",value:`${toPenzad}`, inline:true},
       {name:"Pénzösszeg:",value:`${args[1]}`, inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(embed);
  }
}
