var twitterKey = require('./key.js');
var Twitter = require('twitter');
var client = new Twitter(twitterKey);

// var spotifyKey = require('./key.js');
var Spotify = require('node-spotify-api');
var clientSpotify = new Spotify({
    id: '31e63ab3e5b346c1b9db951128951c13',
    secret: '7f5d78c514f2488bace2dc2921aa1743'
    });

var request = require("request");

var command = process.argv[2];


// var inquirer = require('inquirer');

// inquirer 
//     .prompt([
//         {
//             type: "list",
//             message: "What would you like Liri to do for you?",
//             choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
//             name: "command"
//         }
//     ]) 

//     .then(function(inquirerResponse) {

switch (command) {
    case 'my-tweets': 
    getTweets();
    break;

    case 'spotify-this-song':
    getSpotify();
    // pass a parm which is song name comes from for loop for user input
    break;

    case 'movie-this':
    getMovie();
    break;

    case 'do-what-it-says':
    break;

    default: console.log('this is not a command');
    console.log('try my-tweets, spotify-this-song, movie-this, or do-what-it-says');
    break;

}

function getTweets() {
    var params = {screen_name: 'kelsey_kernan'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
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

function getSpotify() {

    var track = '';
    for(var i = 3; i < process.argv.length; i++) {
        track += process.argv[i] + ' ';
    }

clientSpotify
    .search({ type: 'track', query: track })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getMovie()  {
    var movie = '';
    for (var i = 3; i < process.argv.length; i++) {
        movie += process.argv[i] + ' ';
    }  

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The year it came out is: " + JSON.parse(body).Year);
        console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
        console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
        console.log("This movie was produced in: " + JSON.parse(body).Country);
        console.log("The movie's language is: " + JSON.parse(body).Language);
        console.log("Here's a quick summary of the movie: " + JSON.parse(body).Plot);
        console.log("This movie stars: " + JSON.parse(body).Actors);  
    }
});

}


