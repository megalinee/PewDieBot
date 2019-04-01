// Node modules
const fs = require("fs")
 
let warns = JSON.parse(fs.readFileSync("/Users/mjouhari/Desktop/IPD/users.json", "utf8"));
 
const ms = require("ms")
 
var DONOT = require('./config.json')
 
const Discord = require('discord.js');
 
var request = require('request');
 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
 
var PewSubs;
var TSubs;
var difference;
var offWords = ['faggot', 'nigger', 'f@ggot', 'n!gger', 'motherfucker', 'retard', 'nigga']
 
var url0 = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=" + DONOT.YTKey
var url1 = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=" + DONOT.YTKey
 
 
const bot = new Discord.Client();
 
var DONOT = require('./config.json')
 
 
 
bot.on("message", function(msg) {
    
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
 
    var input = msg.content.toLowerCase();
 
    var want = msg.content.split(" ")[1];
 
    if (input.startsWith(DONOT.prefix + "subcount")) {
      request({
          method: 'GET',
          url: url0
      }, function (er, respons, tex) {
          if (er) {
 
              return;
          }
 
          var jso = JSON.parse(tex);
 
      request({
          method: 'GET',
          url: url1
      }, function (err, response, text) {
          if (err) {
 
              return;
          }
 
          var json = JSON.parse(text); 
      difference = jso.items[0].statistics.subscriberCount - json.items[0].statistics.subscriberCount
      // msg.channel.send(`\`\`\`java\n PewDiePie: ` + PewSubs + `\n T-Series: ` + TSubs + `\n Difference: ` + difference + `\n\`\`\``)
        const embed = new Discord.RichEmbed()
  .setTitle("Subscribe to PewDiePie")
  .setAuthor("PewDieBot", 'https://img.timesnownews.com/story/1540488984-fvgef.jpg')
  .setColor('#f44e42')
  // .setDescription("")
  .setFooter('', bot.user.avatarURL)
  .setTimestamp()
  .setURL("https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw?sub_confirmation=1")
  .addField("PewDiePie\'s subcount",
    numberWithCommas(jso.items[0].statistics.subscriberCount))
  .addField("T-Series\'s subcount", numberWithCommas(json.items[0].statistics.subscriberCount))
  .addField('Difference between', numberWithCommas(difference))
  msg.channel.send({embed});
});
});
    }
    if (input.startsWith(DONOT.prefix + "keyword ")) {
 
    }
    var i;
    for (i = 0; i < offWords.length; i++) {
      if(msg.content.toLowerCase().includes(offWords[i])){
        if(!warns[msg.author.id]) warns[msg.author.id] = {
          warns : 0
        };
        warns[msg.author.id].warns++;
 
        if(warns[msg.author.id].warns == 2){
          msg.author.send('You\'ve been kicked.')
          msg.member.kick()
        }
        if(warns[msg.author.id].warns == 3){
          msg.author.send('You\'ve been banned.')
          msg.member.ban('Offensive language')
        }
 
        fs.writeFile("/Users/mjouhari/Desktop/IPD/users.json", JSON.stringify(warns), (err) => {
          if (err) console.log(err)
        });
 
        let warnEmbed = new Discord.RichEmbed()
        .setDescription("Warns")
        .setAuthor(msg.author.username)
        .setColor("#f45042")
        .addField("Warned User", msg.author.tag)
        .addField("Warned in", msg.channel)
        .addField("Number of warnings", warns[msg.author.id].warns)
        .addField("Reason", "Offensive language")
 
        msg.author.send(warnEmbed)
        // let warnchannel = message.guild.channels.find('name', 'channelname')
        // warnchannel.send(warnEmbed)
        msg.delete()
      }
  }
 
});
 
bot.login(DONOT.discordBotToken)
