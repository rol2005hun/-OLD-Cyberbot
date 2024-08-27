const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setreport",
   description: "setreport parancs",
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
     let channel = message.mentions.channels.first();
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni a **reportolás**-t! (**${prefix}setreport [be/ki] [#csatorna]**)`);
     if(args[0] == 'be') {
         if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **be** legyen kapcsolva a **reportolás**! (**${prefix}setreport [be/ki] [#csatorna]**)`);
         db.set(`report_${message.guild.id}`, channel.id);
         message.channel.send(`<a:pipa:736339378372214915> A **reportolás** sikeresen **bekapcsolva** a(z) ${channel} csatornán!`);
       }
       if(args[0] == "ki") {
         let csatornaallapot = db.fetch(`report_${message.guild.id}`);
         if(csatornaallapot == null) return message.channel.send(`<a:x_:736342460522823768> A **reportolás** nincs **bekapcsolva**!`);
        if(!csatornaallapot) return message.channel.send(`<a:x_:736342460522823768> A **reportolás** nincs **bekapcsolva**!`);
         db.delete(`report_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> Az **reportolás** sikeresen **kikapcsolva**!`);
     }
  }
}
