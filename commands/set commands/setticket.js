const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "setticket",
   description: "setticket parancs",
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
     let server = message.guild;
     console.log(`${message.author.username} használta a(z) ${prefix}setticket parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni a **ticket rendszer**-t! (${prefix}setticket [be/ki]**)`);
     if(args[0] == "be") {
       db.set(`ticket_${message.guild.id}`, args[0]);
       message.channel.send(`<a:pipa:736339378372214915> A **ticket rendszer** sikeresen bekapcsolva! Kérlek add hozzá a megfelelő moderátor/admin rangokat, a **Ticketek** szerver kategóriához!`);
       server.channels.create("Ticketek", {
         type:'category'
       })
     }
     //csatornanev.send(`${message.author} kérlek állítsd be a kategóriához a megfelelő rang jogosultságokat, hogy rendesen működjön a rendszer!`);
     if(args[0] == "ki") {
       let csatornaallapot = db.fetch(`ticket_${message.guild.id}`);
         if(csatornaallapot == null) return message.channel.send(`<a:x_:736342460522823768> A **ticket rendszer** nincs **bekapcsolva**!`);
        if(!csatornaallapot) return message.channel.send(`<a:x_:736342460522823768> A **ticket rendszer** nincs **bekapcsolva**!`);
       db.delete(`ticket_${message.guild.id}`);
       message.channel.send(`<a:pipa:736339378372214915> A **ticket rendszer** sikeresen kikapcsolva!`);
     }
  }
}
