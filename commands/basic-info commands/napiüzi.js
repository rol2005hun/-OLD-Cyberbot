const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

  module.exports = {
   name: "napiüzi",
   aliases: ["napiuzi", "dailymessage", "dmess"],
   description: "dmessage parancs",
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
     let timeoutxd = 86400000;
     let dailyxd = await db.fetch(`dailymessage_${message.author.id}`);
     if(dailyxd != null && timeoutxd - (Date.now() - dailyxd) > 0) {
       let time = ms(timeoutxd - (Date.now() - dailyxd));
       message.channel.send(`<a:x_:736342460522823768> Te már lekérted a napi üzeneted. Próbáld újra **${time.hours} óra ${time.minutes} perc és ${time.seconds} másodperc** múlva!`);
     } else {
       let szavak = ["Soha ne felejtsd el, hogy önmagad vagy, és úgy vagy jó, ahogy Isten teremtett!", "Mindig hallgass önmagadra!", "1 életed, 1 halálod! Szeresd az embertársaidat, barátaidat, ellenségeidet, szeretteidet, családodat, az egész emberiséget, és Istent!", "Bárki bármit mondd rólad, te úgy vagy tökéletes ahogy vagy!", "Légy mindig vidám, és meggondolt!", "Szeresd a természetet, légy jó az állatokhoz, és kíméld a növényeket!", "Húsz év múlva nem azok miatt leszel csalódott, amiket megtettél, hanem amiket nem!", "Mindig két út van előtted: a biztonságosabb, és az, amelyre születtél!", "Azzá válsz, aminek hisznek!", "A boldogság gyökere: az akarj lenni, aki vagy!", "Ha nem lehet úgy, ahogy akarod, akkor akard úgy, ahogyan lehet!", "Az emberek ritkán érnek el sikert abban, amit nem élvezettel csinálnak!"];
       let szo = szavak[Math.floor(Math.random()* szavak.length)];
       db.add(`dailymessage_${message.author.id}`, Date.now());
       let embed = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setTitle("Napi üzenet")
       .setDescription(szo)
       .setTimestamp()
       .setFooter(bot.user.username, bot.user.displayAvatarURL());
       message.channel.send(embed);
   }
  }
}
