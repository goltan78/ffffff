const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Youtube | Kobs Abone Olmayı Unutma !`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);



const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);

//--------------------------------KOMUTLAR-------------------------------\\
client.on("userUpdate", (oldUser, newUser) => {
  client.guilds.cache.forEach(async guild => {
    if (!guild.members.cache.get(newUser.id)) return;
    const tagFetch = await db.fetch(`roltag.${guild.id}`);
    const roleFetch = await db.fetch(`tag.role.${guild.id}`);
    const logFetch = await db.fetch(`tag.log.${guild.id}`);
    if (!tagFetch || !roleFetch || !logFetch) return;
    let tag = tagFetch;
    let role = guild.roles.cache.get(roleFetch);
    let log = guild.channels.cache.get(logFetch);
    if (oldUser.username === newUser.username) return;
    if (newUser.username.includes(tag) && !oldUser.username.includes(tag)) {
      log.send(
        new Discord.MessageEmbed()
          .setTitle("খ - TAG Alındı.")
          .setDescription(
            `${newUser} **Aramıza hoşgeldin. \`${tag}\` tagını aldığı için ${role} rolü verildi!**`
          )
      );
      guild.members.cache.get(newUser.id).roles.add(role.id);
    }
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
      log.send(
        new Discord.MessageEmbed()
          .setTitle("খ - TAG Çıkarıldı.")
          .setColor("#f1c335")
          .setDescription(
            `${newUser} **Aramızdan ayrıldı. \`${tag}\` tagını çıkardığı için ${role} rolü alındı!**`
          )
      );
      guild.members.cache.get(newUser.id).roles.remove(role.id);
    }
  });
});


client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/A06UFEx8jxEwU/giphy.gif`)
    .addField(`Sunucuyaesaj`, `●▬▬▬▬▬▬▬▬ taaac 「খ Singel Mined খ」taaac  ▬▬▬▬▬▬▬▬●

ate  খ Singel Mined Sunucusuna hoşgeldin! :minnoş:
ate  Klanımıza Gelerek Bizi Çok Mutlu Ettin! 
ate  Tag Almayı Ve Sınırsız Aktifliğe Girişmeye Ne Dersin! 
ate  Gelmek İstersen Tagımız: খ 

igne  Sunucumuzda eğleneceğine emin olabilirsin! pikacu 

●▬▬▬▬▬▬▬▬ taaac 「খ Singel Mined খ」taaac ▬▬▬▬▬▬▬▬●`)
    .setFooter(`footer mesajı`)
  member.send(e);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const channel = member.guild.channels.find('name', 'record');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
        .setAuthor(`Kayıt Sistemi`)
        .addField(`Kayıt Olmak İçin`,`Bulunduğumuz Chate Oyun İçi Nickini, İsmini Ve Yaşını Yaz! `)
        .setFooter('deneme', client.user.avatarURL)

  channel.sendEmbed(embed); 
});

client.on("guildMemberAdd", async member => {
  const kanal = member.guild.channels.find("name", "record");
  client.channels.sendMessage(
      `Selam ${member} HOŞGELDİN.`
    );
});
//----------------------------------HOSGELDIN-----------------------------//
client.on("ready", () => {
client.channels.get("817508742559563796").join();
});
//----------------------------------hazır cevaplar-----------------------------//
client.on('message', message => {
 
  if (message.content === '') {
    message.channel.send('');
  }
   if (message.content === '') {
    message.channel.send('');
  }
   if (message.content === '') {
    message.channel.send('');
  }
 });