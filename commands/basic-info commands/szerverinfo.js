const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "szerverinfo",
   aliases: ["serverinfo", "si", "szerverinformaciok", "szerverinformációk"],
   description: "szerverinfo parancs",
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
     const embed = new Discord.MessageEmbed()
      .setThumbnail()
      .setColor('RANDOM')
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle(`${message.guild.name} szerver statisztikái`)
      .addFields(
          {
              name: "Szerver neve:",
              value: message.guild.name,
              inline: true
          },
          {
              name: "Szerver ID-je:",
              value: message.guild.id,
              inline: true
          },
          {
              name: "Tulajdonos:",
              value: message.guild.owner.user.tag,
              inline: true
          },
          {
              name: "Tulajdonos ID-je:",
              value: message.guild.ownerID,
              inline: true
          },
          {
              name: "Tagok száma:",
              value: `${message.guild.memberCount}`,
              inline: true
          },
          {
              name: "Státuszok:",
              value: `${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} :green_circle: ${message.guild.members.cache.filter(m => m.user.presence.status == "dnd").size} :red_circle: ${message.guild.members.cache.filter(m => m.user.presence.status == "idle").size} :yellow_circle: ${message.guild.members.cache.filter(m => m.user.presence.status == "idle").size} :white_circle:`,
              inline: true
          },
          {
              name: "Botok száma: ",
              value: `${message.guild.members.cache.filter(m => m.user.bot).size}`,
              inline: true
          },
          {
              name: "Létrehozás dátuma: ",
              value: message.guild.createdAt.toLocaleDateString("hu"),
              inline: true
          },
          {
              name: "Régió: ",
              value: message.guild.region,
              inline: true
          },
          {
              name: "Rangok száma: ",
              value: `${message.guild.roles.cache.size}`,
              inline: true,
          },
    {
              name: "Rangok nevei: ",
              value: `${message.guild.roles.cache.name}`,
              inline: true,
          },
          {
              name: `Elfogadott: `,
              value: message.guild.verified ? 'A szerver el van fogadva' : `A szerver nincsen elfogadva!`,
              inline: true
          },
          {
              name: 'Boostok száma: ',
              value: message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} boost` : `Nincsenek boostok`,
              inline: true
          },
          {
              name: "Emojik száma: ",
              value: message.guild.emojis.cache.size >= 1 ? `${message.guild.emojis.cache.size}` : 'Nincsenek emojik' ,
              inline: true
          },
          {
              name: "Csatornák száma: ",
              value: message.guild.channels.cache.size,
              inline: true
          }
      )
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
      .setTimestamp();
      message.channel.send(embed)
  }
}
