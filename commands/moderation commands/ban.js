const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "ban",
   aliases: ["kitilt", "kitílt"],
   description: "ban parancs",
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
     if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \`Tagok kitiltása\`)");
     if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Tagok kitiltása\`)");
     let toBan = message.mentions.members.first();
     let reason = args.slice(1).join(" ");
     if (!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akit bannolni szeretnél! (**${prefix}ban [@név] <indok>**)`);
     if(!toBan) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(!toBan.bannable) return message.channel.send(`<a:x_:736342460522823768> Őt nem bannolhatom mert egy admin/moderátor!`);
     if(reason == null) reason == "Nincs megadva";
     let x = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("Ban")
     .addFields(
       {name:`Akit bannoltak:`,value:`${toBan.user.tag}`,inline:true},
       {name:"Aki bannolta:",value:`${message.author}`,inline:true},
       {name:"Indok:",value:`${reason}`,inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();

     message.channel.send(x);
     toBan.send(`**${message.author.tag}** banolt a **${message.guild.name}** Discord szerveréről. Oka: **${reason}**!`)
     .catch(err => message.channel.send(`<a:x_:736342460522823768> Nem tudok küldeni **privát üzenetet** **${toKick}**-nak/nek.`));
     toBan.ban();
  }
}
