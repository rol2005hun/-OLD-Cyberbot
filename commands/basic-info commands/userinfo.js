const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "userinfo",
   aliases: ["ui", "felhasznaloinfo", "felhasználóinfo", "felhasznaloinformacio", "felhasználóinformáció"],
   description: "userinfo parancs",
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
    const userMention = message.mentions.users.first() || message.author;
    const memberMention = message.mentions.members.first() || message.member;

    let userinfo = {};
    userinfo.bot = userMention.bot;
    userinfo.createdat = userMention.createdAt;
    userinfo.discrim = userMention.discriminator;
    userinfo.id = userMention.id;
    userinfo.mfa = userMention.mfaEnabled;
    userinfo.pre = userMention.premium;
    userinfo.presen = userMention.presence;
    userinfo.tag = userMention.tag;
    userinfo.uname = userMention.username;
    userinfo.verified = userMention.verified;

    userinfo.avatar = userMention.avatarURL;

    //const rolesOfTheMember = memberMention.roles.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')
    if(userinfo.bot === "false") userinfo.bot === "Nem";
    if(userinfo.bot === "true") userinfo.bot === "Igen";
     let embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(`${userMention.tag} információi`)
     .setAuthor(message.author.tag, message.author.avatarURL())
     .addField(`Neve:`, userMention.tag)
     .addField(`ID-je:`, userMention.id, true)
     .addField("Készítve:",userinfo.createdat, true)
     .addField("Bot?",userinfo.bot, true)
     .addField("2FA/2 lépcsős azonosítás bekapcsolva?",userinfo.mfa, true)
     .addField("Paid Account?",userinfo.pre, true)
     .addField("Presence",userinfo.presen, true)
     .addField("Ellenőrizve?",userinfo.verified, true)
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();
     message.channel.send(embed);
  }
}
