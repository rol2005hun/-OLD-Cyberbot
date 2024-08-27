const Discord = require("discord.js");
const db = require("quick.db");
const weather = require('weather-js');

  module.exports = {
   name: "weather",
   aliases: ["idojaras", "időjárás"],
   description: "időjárás parancs",
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
     if(!args.length) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy település nevet! (**${prefix}időjárás [település név**)`);
     weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
     try {
       let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle(`Időjárás - ${result[0].location.name}`)
       .setColor("RANDOM")
       .setDescription("A hőmérsékleti egységek idővel eltérhetnek")
       .addField("Hőmérséklet:", `${result[0].current.temperature} Celcius`, true)
       .addField("Felhő:", result[0].current.skytext, true)
       .addField("Páratartalom:", result[0].current.humidity, true)
       .addField("Szél sebesség:", result[0].current.windspeed, true)//What about image
       .addField("Megfigyelési idő:", result[0].current.observationtime, true)
       .addField("Szél kijelző:", result[0].current.winddisplay, true)
       .setThumbnail(result[0].current.imageUrl)
       .setTimestamp()
       .setFooter(bot.user.username, bot.user.displayAvatarURL());
         message.channel.send(embed)
       } catch(err) {
         console.log(err);
         return message.channel.send("<a:x_:736342460522823768> Nem találtam város/falu-t ilyen névvel! Kérlek angolul add meg a nevét!");
       }
     });
  }
}
