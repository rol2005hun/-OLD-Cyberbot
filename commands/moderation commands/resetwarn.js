const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "resetwarn",
   description: "resetwarn parancs",
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
     const user = message.mention.members.first();
     let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Üzenetek kezelése\`)");
     if(!user) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akinek szeretnéd hogy töröljem a warnjainak a szzámát! (**${prefix}resetwarn [@név]**)`);
     if(warnings == null) return message.channel.send(`<a:x_:736342460522823768> Neki nincsenek warnjai!`);
     db.delete(`warnings_${message.guild.id}_${user.id}`);
     db.delete(`warningreason_${message.guild.id}_${user.id}`);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RANDOM")
     .setTitle("Warn törlés")
     .addFields(
       {name:"Aki törölte:",value:`${message.author}`,inline:true},
       {name:"Akinek törölték:",value:`${user}`,inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();
     message.channel.send(embed);
  }
}
