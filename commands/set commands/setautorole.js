const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setautorole",
   description: "setautorole parancs",
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
     let role = message.mentions.roles.first();
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni az **autorole rendszer*-t! (**${prefix}setautorole[be/ki] [@rang]**)`);
     //if(args[0] != 'be' || args[0] != 'ki') return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy opció! Opciók: **be** | **ki**!`);
     if(args[0] == 'be') {
         if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a rangot, amit ráadjak a felhasználók felcsatlakozásakor! (**${prefix}setautorole [be/ki] [@rang]**)`);
         if(!role) return message.channel.send(`**${args[1]}** nem egy rang!`);
         db.set(`role_${message.guild.id}`, role.id);
         message.channel.send(`<a:pipa:736339378372214915> Az **autorole rendszer** sikeresen **bekapcsolva** a(z) ${role} rangon!`);
       }
       if(args[0] == "ki") {
         //if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **ki** legyen kapcsolva a **reportolás**! (**${prefix}setautorole [be/ki] [@rang]**)`);
         db.delete(`role_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> Az **autorole rendszer** sikeresen **kikapcsolva**!`);
     }
  }
}
