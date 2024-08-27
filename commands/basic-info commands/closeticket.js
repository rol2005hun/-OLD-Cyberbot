const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "closeticket",
   aliases: ["ticketbezar", "ticketbezár"],
   description: "closeticket parancs",
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
     const tickets = new db.table('tickets');
     const regex = /(ticket-[0-9]+)/g.test(message.channel.name);
     let category = message.guild.channels.cache.find(c => c.name == "Ticketek" && c.type == "category");
     let ticketallapot = db.fetch(`ticket_${message.guild.id}`);
     if(ticketallapot == null) return message.channel.send(`<a:x_:736342460522823768> A szerveren nincs **bekapcsolva** a **ticket** rendszer!`);
     if(tickets.get(`guild_${message.guild.id}_member_${message.author.id}`) == null) return message.channel.send(`<a:x_:736342460522823768> Te nem készítettél ticketet!`);
     if(regex == false) return message.channel.send(`<a:x_:736342460522823768> A saját ticketedben használd a parancsot!`);
     await tickets.delete(`guild_${message.guild.id}_member_${message.author.id}`);
     //if(message.member.hasPermission("ADMINISTRATOR")) return await tickets.delete(`guild_${message.guild.id}_member_${message.author.id}`);
     message.channel.delete();
  }
}
