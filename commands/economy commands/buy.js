const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "buy",
   aliases: ["vesz", "vasarol", "vásárol"],
   description: "buy parancs",
   run: async (bot, message, args) => {
//////////////////////////////////////////////////////////////////////////////////////////////////
    let prefix = profilok.get(`prefix_${message.guild.id}`) || process.env.prefix;
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
     let profilok = new db.table(`Profilok`);
     let author = profilok.fetch(`profil_${message.author.id}.penz`);
     if(!args[0]) return message.channel.send(`<a:x_:736342460522823768> Kérlek add meg a tárgy nevét amit szeretnél venni! **${prefix}shop** hogy megnézhesd milyen tárgyak vannak! (**${prefix}buy [tárgy neve]**)`);
     if(args[0] == "Kard") {
       if(author < 10000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Kard** megvásárláshoz! (Szükséges pénzösszeg: \`10000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Kard");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Kard**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 10000);
       }
     }
     if(args[0] == "AK-47") {
       if(author < 70000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed az **AK-47** megvásárláshoz! (Szükséges pénzösszeg: \`70000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "AK-47");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **AK-47**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 70000);
       }
     }
     if(args[0] == "Colt") {
       if(author < 10000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Colt** megvásárláshoz! (Szükséges pénzösszeg: \`15000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Colt");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Colt**-t!");
         profilok.subtract(`profil_${message.author.id}`, 15000);
       }
     }
     if(args[0] == "Deagle") {
       if(author < 17000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Deagle** megvásárláshoz! (Szükséges pénzösszeg: \`19000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Deagle");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Deagle**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 19000);
       }
     }
     if(args[0] == "Musketa") {
       if(author < 40000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Muskéta** megvásárláshoz! (Szükséges pénzösszeg: \`40000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Muskéta");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Musketa**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 40000);
       }
     }
     if(args[0] == "Muskéta") {
       if(author < 40000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Muskéta** megvásárláshoz! (Szükséges pénzösszeg: \`40000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Muskéta");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Musketa**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 40000);
       }
     }
     if(args[0] == "Minigun") {
       if(author < 25000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Minigun** megvásárláshoz! (Szükséges pénzösszeg: \`250000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Minigun");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Minigun**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 250000);
       };
     }
     if(args[0] == "Isten-csapása") {
       if(author < 500000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed az **Isten-csapása** megvásárláshoz! (Szükséges pénzösszeg: \`500000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Isten-csapása");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Isten-csapás**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 500000);
       }
     }
     if(args[0] == "Isten-csapasa") {
       if(author < 500000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed az **Isten-csapása** megvásárláshoz! (Szükséges pénzösszeg: \`500000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.push(`profil_${message.author.id}.targyak`, "Isten-csapása");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Isten-csapás**-t!");
         profilok.subtract(`profil_${message.author.id}.money`, 500000);
       }
     }
     if(args[0] == "Katonák") {
       if(author < 65000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Hadsereg** megvásárláshoz! (Szükséges pénzösszeg: \`65000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.add(`profil_${message.author.id}.targyak`, "Hadsereg");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Hadsereg**-et!");
         profilok.subtract(`profil_${message.author.id}.money`, 10000);
       };
     }
     if(args[0] == "Katonak") {
       if(author < 65000) {
         message.channel.send(`<a:x_:736342460522823768> Nincs elég pénzed a **Hadsereg** megvásárláshoz! (Szükséges pénzösszeg: \`65000 dollár\`)`);
       } else {
         let items = profilok.fetch(message.author.id, { items: [] });
         profilok.add(`profil_${message.author.id}.targyak`, "Hadsereg");
         message.channel.send("<a:pipa:736339378372214915> Sikeresen vettél egy **Hadsereg**-et!");
         profilok.subtract(`profil_${message.author.id}.money`, 10000);
       };
     }
  }
}
