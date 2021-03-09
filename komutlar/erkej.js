const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  
  
 if(!message.member.roles.cache.has('817508565228191744')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')
  
  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let al = "817508587508596777"; ///alınacak rol idsi
  let ver = "817508579296411648";
  let ver2 = "817508578319007804";
  let n = "817508580131209257"///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`খ ${isim} | ${yaş}`);
  
    member.roles.add(n)
    member.roles.add(ver);
    member.roles.add(ver2);
    member.roles.remove(al);
  
  
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("<a:emoji_5:818049148019802143>  Kayıt işlemi başarılı!  <a:emoji_5:818049148019802143>")
    .setImage("https://media.tenor.com/images/5a8496cf0faf284d514a8cedc3f7332d/tenor.gif")
    .setDescription(`
<a:elmas_1:817791756510429245> **Kayıt Edilen Kullanıcı** : <@${member.user.id}> <a:elmas_1:817791756510429245>
<a:elmas_1:817791756510429245> **Kayıt Eden Yetkili** : <@${message.author.id}> <a:elmas_1:817791756510429245>

<a:emoji_2:817719391332335636> **Kayıt İşleminde Verilen Roler**: <a:emoji_3:817721806017921054>
<@&817508578319007804>
<@&817508579296411648>
<@&817508580131209257>

<a:emoji_2:817719391332335636> **Kayıt İşleminde Alınan Rol**: <a:emoji_3:817721806017921054>
<@&817508587508596777> 
`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  permLevel: 0
}
exports.help = {
  name: 'Erkek',
  description: "Erkek Kayıt Sıstemı",
  usage: 'Erkek isim yaş'
}
