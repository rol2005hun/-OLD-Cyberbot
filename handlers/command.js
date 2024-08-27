const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    // Read every commands subfolder
    readdirSync("./commands/").forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }

            // If there's an aliases key, read the aliases.
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    // Log the table
    console.log(table.toString());
}
/*

const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "cmdname",
   aliases: ["array", "of", "aliases"],
   description: "asd parancs",
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
       Idejonakodocska
  }
}

 */
/**
const Discord = require("discord.js");
const db = require("quick.db");

  module.exports = {
   name: "Command name",
   aliases: ["array", "of", "aliases"],
   category: "Category name",
   description: "Command description",
   usage: "[args input]",
   run: (client, message, args) => {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
           let pref = db.get(`prefix_${message.guild.id}`);
           let prefix;
           if(pref == null) {
           prefix = process.env.prefix;
          }else {
           prefix = pref;
          }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         const botcommandcsatorna = process.env.botcmdcsatorna;
         const botcmdcsatorna = bot.channels.cache.find(channel => channel.id == botcommandcsatorna);
         let embed = new Discord.MessageEmbed()
         //.setAuthor(message.author.tag, message.author.avatarURL())
         .setTitle(`Parancs használat`)
         .setColor("GREEN")
         .addField("Parancs:", message)
         .addField(`Felhasználó neve:`, message.author.tag)
         .addField(`Szerver neve:`, message.guild.name)
         .addField(`A szerveren ennyi tag van:`, message.guild.memberCount)
         .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL())
         .setTimestamp();
         botcmdcsatorna.send(embed);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       The code in here to execute
   }
  }
 */
