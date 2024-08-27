const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "penzelvesz",
   aliases: ["pénzelvesz"],
   description: "asd parancs",
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
     let toElvesz = message.guild.member(message.mentions.users.first());
     let penz = args.slice(1).join(" ");
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akitől elvegyem az adott pénzösszeget! (**${prefix}pénzelvesz [@név] [összeg]**)`);
     if(!toElvesz) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(!penz) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg az összeget, amennyit el szeretnél venni az adott felhasználótól! (**${prefix}pénzelvesz [@név] [összeg]**)`);
     if(isNaN(penz)) return message.channel.send(`<a:x_:736342460522823768> **${args[1]}** nem egy szám! Kérlek helyes számot adj meg!`);
     db.subtract(`money_${toElvesz.id}`, `${penz}`);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("Pénz elvétel")
     .addFields(
       {name:"Aki elvette:",value:`${message.author}`, inline:true},
       {name:"Akitől elvették:",value:`${toElvesz}`, inline:true},
       {name:"Pénzösszeg:",value:`${penz}`, inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(embed);
  }
}
