const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "takerole",
   description: "takerole parancs",
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
     if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)");
     if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)`);
       let felh = message.guild.member(message.mentions.users.first());
       if(!felh) return message.reply(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akinek el szeretnéd hogy vegyem a rangját! (**${prefix}takerole [@név] [@rang]**)`);
       let args1 = message.content.split(" ").slice(2);
       if(!args1) return message.reply(`<a:x_:736342460522823768> Nem jelöltél meg rangot! (**${prefix}takerole [@név] [@rang]**)`);
       let rolename = message.mentions.roles.first();
       if(!rolename) return message.reply('<a:x_:736342460522823768> Nem létezik ilyen rang!');
       felh.roles.remove(rolename);
       let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle("Rang elvétel")
       .addFields(
         {name:"Elvette:",value:`${message.author}`,inline:true},
         {name:"Elvesztette:",value:`${felh}`,inline:true},
         {name:"A rang:",value:`${rolename}`,inline:true},
       )
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
       .setTimestamp();
       message.channel.send(embed);
  }
}
