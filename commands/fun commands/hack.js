const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "hack",
   aliases: ["hackeles", "hackelés"],
   description: "hack parancs",
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
     let toHack = args[0] || message.mentions.members.first() || message.member;
     let randomEmails = ["filipszbuta@gmail.com", "nfowzedfnowe@citromail.hu", "jozsefakiraj@gmail.com", "hivdbeabotom@yahoo.com", "cyberbot_alegjobb@gmail.com", "demon.sunwell.hu:7837@gmail.com", "diamondrp.hu@citromai.hu"];
     let randomEmail = randomEmails[Math.floor(Math.random()* randomEmails.length)];
     let randomJelszok = ["gyerefel_diamondra!!?", "filipsz+zed=okosság", "randomjelszó", "jelszó", "jozsi", "diamondrp.hu", "demon.sunwell.hu:7837"];
     let randomJelszo = randomJelszok[Math.floor(Math.random()* randomJelszok.length)];
     let embed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setTitle("Hackelés")
     .setDescription(`**${toHack}** hackelése`)
     .addField(`Email-je:`, randomEmail)
     .addField(`Jelszava:`, randomJelszo)
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();
     message.channel.send(embed);
  }
}
