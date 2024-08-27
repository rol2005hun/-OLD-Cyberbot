const Discord = require("discord.js");
const db = require("quick.db");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

  module.exports = {
   name: "koronavírus",
   aliases: ["koronavirus", "corona", "covid"],
   description: "corona parancs",
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
     //if(!args.length) return message.channel.send(`<a:x_:736342460522823768> Kérlek adj meg egy ország nevet! (**${prefix}koronavírus [ország név/all]**)`);
     if(args.join(" ")) {
       try {
       let corona = await track.countries(args.join(" "));
       let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle(`A koronavírus ${corona.country} statisztikája`)
       .setColor("RANDOM")
       .setDescription("A statisztikák kicsit eltérhetnek")
       .addField("Összes esetek száma:", corona.cases, true)
       .addField("Összes halálozások száma:", corona.deaths, true)
       .addField("Meggyógyultak száma:", corona.recovered, true)
       .addField("Mai esetek száma:", corona.todayCases, true)
       .addField("Mai halálesetek száma:", corona.todayDeaths, true)
       .addField("Mai meggyógyultak száma", corona.todayRecovered, true)
       .addField("Aktív fertőzöttek:", corona.active, true)
       .addField("Tesztelt:", corona.tests)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
       message.channel.send(embed);
      }catch(err) {
       message.channel.send(`<a:x_:736342460522823768> Nem találtam országot ilyen névvel! Kérlek angolul írd le az ország nevét!`);
     }
   } else {
     let corona = await track.all();
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setTitle("A koronavírus világ statisztikája")
     .setColor("RANDOM")
     .setDescription("A statisztikák kicsit eltérhetnek")
     .addField("Összes esetek száma:", corona.cases, true)
     .addField("Összes halálozások száma:", corona.deaths, true)
     .addField("Meggyógyultak száma:", corona.recovered, true)
     .addField("Mai esetek száma:", corona.todayCases, true)
     .addField("Mai halálesetek száma:", corona.todayDeaths, true)
     .addField("Mai meggyógyultak száma", corona.todayRecovered, true)
     .addField("Aktív fertőzöttek:", corona.active, true)
     .addField("Tesztelt:", corona.tests)
     .setTimestamp()
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
     message.channel.send(embed);
   }
  }
}
