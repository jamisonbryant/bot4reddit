/**
 * bot.js - bot4reddit main file
 * 
 * This file contains the core logic of the bot4reddit bot. It sets up a REST 
 * server and listens for incoming message on a certain port, then passes the 
 * messages to a LUIS model which processes them and sends back a response. 
 * Based on the response, the bot queries reddit for the requested content and 
 * displays it to the user.
 *
 * Usage: To use, run `node bot.js`. You will need the Bot Framework Emulator 
 * in order to connect to use the app. For complete setup and usage information, 
 * see the "How to Use" section in README.md.
 *
 * @author Jamison Bryant <robojamison@gmail.com>
 * @copyright Copyright (c) 2016 Jamison Bryant
 * @license MIT License (https://opensource.org/licenses/MIT)
 */

// Load dependencies
var builder = require('botbuilder');    // For integrating with Bot Framework
var restify = require('restify');       // For capturing incoming messages
var sprintf = require('sprintf-js');    // For printing strings
var winston = require('winston');       // For logging

// Load Node.js modules
var filesys = require('fs');            // For examining the file system

// Load local modules
var appcore = require('./app');         // For application core functions

// Display welcome message
console.log(sprintf.sprintf('Bot4Reddit %s. Copyright (c) %s', 
    appcore.getVersion(), appcore.getCopyright()));
console.log(sprintf.sprintf('Learn more at %s', 
    appcore.getSiteUrl()));

// Load environment variables
try {
    filesys.accessSync('.env', filesys.F_OK);
    winston.info('Loading environment config file...');    
    require('dotenv').config();
} catch (e) {
    winston.error('Environment config file not found! (error 350)');
    process.exit(1);
}

// // Load dependencies
// var restify = require('restify');
// var builder = require('botbuilder');

// // Configure environment
// require('dotenv').config();

// // Create bot
// var redditBot = new builder.BotConnectorBot({
//     appId: process.env.APP_ID,
//     appSecret: process.env.APP_SECRET
// });

// // Create LUIS dialog
// var model = process.env.LUIS_URL;
// var dialog = new builder.LuisDialog(model);
// redditBot.add('/', dialog);

// // Handle BrowseSubreddit intent
// dialog.on('BrowseSubreddit', [
//     function(session, args) {
//         console.log(args.entities);

//         var subredditNameEntity = builder.EntityRecognizer.findEntity(args.entities, 'SubredditName');
//         var postPopularityEntity = builder.EntityRecognizer.findEntity(args.entities, 'PostPopularity');
//         var postTypeEntity = builder.EntityRecognizer.findEntity(args.entities, 'PostType');
//         var timePeriodEntity = builder.EntityRecognizer.findEntity(args.entities, 'TimePeriod');

//         // console.log(subredditNameEntity);
//         // console.log(postPopularityEntity);
//         // console.log(postTypeEntity);
//         // console.log(timePeriodEntity);

//         var subredditName = subredditNameEntity.entity.replace(/\s/g, '').toUpperCase();
//         var postPopularity = postPopularityEntity.entity.toUpperCase();
//         var postType = postTypeEntity.entity.toUpperCase();
//         var timePeriod = timePeriodEntity.entity.toUpperCase();

//         // console.log('Subreddit name: ' + subredditName);
//         // console.log('Post popularity: ' + postPopularity);
//         // console.log('Post type: ' + postType);
//         // console.log('Time period: ' + timePeriod);

//         // session.send('Showing you the ' + postPopularity + ' ' + postType + ' from ' + subredditName + ' for ' + timePeriod);
//     }
// ]);

// dialog.onDefault(builder.DialogAction.send("Sorry, I didn't catch that. Say again?"));

// // Set up and start Restify server
// var server = restify.createServer();
// server.post('/api/messages', redditBot.verifyBotFramework(), redditBot.listen());

// server.listen(process.env.port || 3978, function() {
//     console.log('%s listening to %s', server.name, server.url);
// });