const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  
 if(!message.member.roles.cache.has('817508565228191744')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')
  
  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let al = "817508587508596777"; ///alınacak rol idsi
  let ver = "817508576058277898";
  let ver4 = "817508576742473794";
  let ver5 = "817508577275019306"///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`খ ${isim} | ${yaş}`);
  
    member.roles.add(ver5);
    member.roles.add(ver4);
    member.roles.add(ver);
    member.roles.remove(al);
  

  const embed = new Discord.MessageEmbed()
    .setColor("PİNK")
    .setTitle("<a:emoji_5:818049148019802143>  Kayıt işlemi başarılı!  <a:emoji_5:818049148019802143>")
    .setImage("https://media.tenor.com/images/5a8496cf0faf284d514a8cedc3f7332d/tenor.gif")
    .setDescription(`
<a:elmas_1:817791756510429245> **Kayıt Edilen Kullanıcı** : <@${member.user.id}> <a:elmas_1:817791756510429245>
<a:elmas_1:817791756510429245> **Kayıt Eden Yetkili** : <@${message.author.id}> <a:elmas_1:817791756510429245>

<a:emoji_2:817719391332335636> **Kayıt İşleminde Verilen Roler**: <a:emoji_3:817721806017921054>
<@&817508576058277898>
<@&817508576742473794>
<@&817508577275019306>

<a:emoji_2:817719391332335636> **Kayıt İşleminde Alınan Rol**: <a:emoji_3:817721806017921054>
<@&817508587508596777>
`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız" , "k"],
  permLevel: 0
}
exports.help = {
  name: 'kız',
  description: "Kız Kayıt Sıstemı",
  usage: 'Kız isim yaş'
}
