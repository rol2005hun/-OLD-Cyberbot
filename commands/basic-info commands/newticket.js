const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "newticket",
   aliases: ["újticket", "ujticket"],
   description: "newticket parancs",
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
     let category = message.guild.channels.cache.find(c => c.name == "Ticketek" && c.type == "category");
     const tickets = new db.table('tickets');
     const regex = /(ticket-[0-9]+)/g.test(message.channel.name);
     let ticketallapot = db.fetch(`ticket_${message.guild.id}`);
     if(ticketallapot == null) return message.channel.send(`<a:x_:736342460522823768> A szerveren nincs **bekapcsolva** a **ticket** rendszer!`);
     if(!category) return message.channel.send(`<a:x_:736342460522823768> Nem találom a **Ticketek** csatornát, amikor be lett kapcsolva, akkor készítettem, valószínűleg nincs elég jogom látni, vagy törölve lett a csatorna!`);
     if(tickets.get(`guild_${message.guild.id}_member_${message.author.id}`) == true) return message.channel.send(`<a:x_:736342460522823768> Te már használtad a ticketet!`);
     await tickets.add(`guild_${message.guild.id}`, 1);
     tickets.set(`guild_${message.guild.id}_member_${message.author.id}`, true);
     message.guild.channels.create(`ticket-${tickets.get(`guild_${message.guild.id}`)}`, {
       type: 'text',
       permissionOverwrites: [
         {
           allow: 'VIEW_CHANNEL',
           allow: 'SEND_MESSAGES',
           id: message.author.id
         }
       ]
     })
       .then(channel => {
       let category = message.guild.channels.cache.find(c => c.name == "Ticketek" && c.type == "category");
       channel.setParent(category.id);
   })
     message.channel.send(`<a:pipa:736339378372214915> Sikeresen létrehoztam a ticketet! (#ticket-${tickets.get(`guild_${message.guild.id}`)})`);
  }
}
