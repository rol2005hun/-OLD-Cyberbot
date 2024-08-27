const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setlevelchannel",
   aliases: ["setlvlchannel"],
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
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
     let channel = message.mentions.channels.first();
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni a **level channel**-t! (**${prefix}setlevelchannel [be/ki] [#csatorna]**)`);
       if(args[0] == 'be') {
         if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **be** legyen kapcsolva a **botlogolás**! (**${prefix}setlevelchannel [be/ki] [#csatorna]**)`);
         db.set(`levelchannel_${message.guild.id}`, channel.id);
         message.channel.send(`<a:pipa:736339378372214915> A **level channel** sikeresen **bekapcsolva** a(z) ${channel} csatornán!`);
       }
       if(args[0] == "ki") {
         //if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a csatornát, ahol **ki** legyen kapcsolva a **reportolás**! (**${prefix}setautorole [be/ki] [@rang]**)`);
         db.delete(`levelchannel_${message.guild.id}`);
         message.channel.send(`<a:pipa:736339378372214915> A **level channel** sikeresen **kikapcsolva**!`);
     }
  }
}
