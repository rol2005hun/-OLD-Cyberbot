const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "poll",
   aliases: ["szavazas", "szavazás", "szavazas", "savazás"],
   description: "poll parancs",
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
    .setFooter(`${bot.user.username}`, bot.user.avatarURL())
    .setTimestamp();
    botcmdcsatorna.send(embedxdd);
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Szerver kezelése\`)");
     message.delete();
     var mMsg = message.content.split(' ').slice(5).join(' ');
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Üzenetek kezelése\`)");
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szavazás első lehetőségét! (**${prefix}poll [lehetőség1] [lehetőség2] [lehetőség3] [lehetőség4] [szöveg/kérdés]**)`);
     if(!args[1]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szavazás második lehetőségét! (**${prefix}poll [lehetőség1] [lehetőség2] [lehetőség3] [lehetőség4] [szöveg/kérdés]**)`);
     if(!args[2]) return message.channel.send(`<a:x_:736342460522823768> Ha nincs szükséged harmadik lehetőségre, akkor a lehetőség helyett **nincs** szót írj! (**${prefix}poll [lehetőség1] [lehetőség2] [lehetőség3] [lehetőség4] [szöveg/kérdés]**)`);
     if(!args[3]) return message.channel.send(`<a:x_:736342460522823768> Ha nincs szükséged negyedik lehetőségre, akkor a lehetőség helyett **nincs** szót írj! (**${prefix}poll [lehetőség1] [lehetőség2] [lehetőség3] [lehetőség4] [szöveg/kérdés]**)`);
     if(!mMsg) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a szöveget/kérdést! (**${prefix}poll [lehetőség1] [lehetőség2] [lehetőség3] [lehetőség4] [szöveg/kérdés]**)`);
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RANDOM")
     .setTitle("Szavazás")
     .addFields(
       {name:"Kérdés:",value:`${mMsg}`},
       {name:'Első lehetőség: 🅰️',value:`${args[0]}`},
       {name:'Második lehetőség: 🅱️',value:`${args[1]}`},
       {name:'Harmadik lehetőség: 🤖',value:`${args[2]}`},
       {name:'Negyedik lehetőség: 😍',value:`${args[3]}`},
     )
     .setFooter(`${bot.user.username}`, bot.user.avatarURL())
     .setTimestamp();
     await message.channel.send( {embed: embed} ).then(embedMessage => {
       embedMessage.react("🅰️");
       embedMessage.react("🅱️");
       embedMessage.react("🤖");
       embedMessage.react("😍");
     })
  }
}
