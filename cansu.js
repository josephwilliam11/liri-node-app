var twitterList = require("./key.js");
var Twitter = require('twitter');

var twitterAcc = "";

var client = new Twitter(twitterList)

const command = process.argv[2];

var request = require("request");

for (var key in twitterList) {
    console.log(key + ": " + twitterList[key]);
}

var inquirer = require("inquirer");

inquirer
     .prompt([
         {
            type: "list",
            message: "What do you wanna do?",
            choices: ["my-tweets", "spotify-this-song", "movie-this","do-what-it-says"],
            name: "command"
         }
     ])

     .then(function(inquirerResponse){
         if (inquirerResponse.command === "my-tweets"){
            inquirer 
            .prompt([{
                type: "input",
                message: "Whose tweets do you wanna see ? Make sure its his/her username.",
                name: "tweet"
            }])
            .then(function(inquirerResponse){
                if (inquirerResponse.tweet){
                    twitterAcc = inquirerResponse.tweet;
                    getTweets();
                }
            });
            
         }
    
     })


function getTweets() {
   console.log(twitterAcc);
   client.get('statuses/user_timeline', twitterAcc, function(error, tweets, response) {
    if (error) throw error; 
    if (!error) {
    for (var i in tweets) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
    }
    console.log(tweets.length);
  }
});

}