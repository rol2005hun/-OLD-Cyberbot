const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "mute",
   aliases: ["nemit", "némít", "lenemit", "lenémít"],
   description: "mute parancs",
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
     if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságom a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)");
     if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:x_:736342460522823768> Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Szerepek kezelése\`)");
     let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
     let toMute = message.mentions.members.first();
     let reason = args.slice(1).join(" ");
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek jelöld meg azt a felhasználót, akit muteolni szeretnél! (**${prefix}mute [@név] [indok]**)`);
     if(!toMute) return message.channel.send(`<a:x_:736342460522823768> **${args[0]}** nem egy felhasználó!`);
     if(!reason) return message.channel.send(`<a:x_:736342460522823768> Adj meg egy indokot! (**${prefix}mute [@név] [indok]**)`);
     if(toMute.roles.cache.find(muterole => muterole.name === `Muted`)) return message.channel.send("<a:x_:736342460522823768> Ő már muteolva van!");
     let embed10 = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.avatarURL())
     .setColor("RED")
     .setTitle("Mute")
     .addFields(
       {name:`Akit muteoltak:`,value:`${toMute}`,inline:true},
       {name:"Aki muteolta:",value:`${message.author}`,inline:true},
       {name:"Indok:",value:`${reason}`,inline:true},
     )
     .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
     .setTimestamp();
     message.channel.send(embed10);
     toMute.roles.add(muterole);
     db.set(`muted_${toMute.id}_${message.guild.id}`, reason);
     if(!muterole){
         muterole = await message.guild.roles.cache.create({
           name: "Muted",
           color: "#000000",
           permissions:[]
         })
         message.guild.channels.forEach(async (role, id) => {
           await muterole.overwritePermissions({
             SEND_MESSAGES: false,
             ADD_REACTIONS: false,
               SEND_TTS_MESSAGES: false,
               ATTACH_FILES: false,
               SPEAK: false
           });
           message.channel.send(`<a:pipa:736339378372214915> Sikeresen készítettem, és ráadtam ${toMute}-ra/re a **Muted** rangot. Kérlek húzd feljebb a rangot hogy működjön a parancs!`);
         });
       }
  }
}
