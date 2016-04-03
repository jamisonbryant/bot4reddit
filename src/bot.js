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
var appcore = require('./app');         // For application core functions
var builder = require('botbuilder');    // For integrating with Bot Framework
var filesys = require('fs');            // For examining the file system
var redwrap = require('redwrap');       // For interfacing with reddit
var restify = require('restify');       // For capturing incoming messages
var sprintf = require('sprintf-js');    // For printing strings
var winston = require('winston');       // For logging

// Define aliases
spf = sprintf.sprintf;                  // spf -> sprintf.sprintf

// Define some prototypes
String.prototype.isEmpty = function() {
    return (this.length === 0);
};

// Display welcome message
console.log(spf('Bot4reddit %s. Copyright (c) %s.', 
    appcore.getVersion(), appcore.getCopyright()));
console.log(spf('Learn more at %s', appcore.getSiteUrl()));

// Configure logging
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        //new winston.transports.File({ filename: 'debug.log' })
    ]
});

// Configure environment (or try to)
try {
    filesys.accessSync('.env', filesys.F_OK);
    logger.info('Loading environment config file...');    
    require('dotenv').config();
} catch (e) {
    logger.error(spf('Environment config file not found (error %d)', 
        appcore.ERROR_DOTENV_FILE_NOT_FOUND));
    process.exit(1);
}

// Create reddit bot
var bot = new builder.BotConnectorBot({
    appId: process.env.MICROSOFT_APP_ID,
    appSecret: process.env.MICROSOFT_APP_SECRET
});

bot.configure({
    userWelcomeMessage: 'Hi! Welcome to Bot for Reddit.',
    goodbyeMessage: 'See ya next time!' 
});

// Create LUIS dialog
var model = process.env.LUIS_ENDPOINT_URL;
var dialog = new builder.LuisDialog(model);
bot.add('/', dialog);

// Configure and start server
var server = restify.createServer({ name: 'bot4reddit' });

// Start listening for messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || appcore.SERVER_PORT, function() {
    logger.info(spf('%s listening on %s', server.name, server.url));
});

// Display a message when command sent
// bot.on('reply', function(session) {
//     var okMessages = [
//         'OK, lemme look that up for you real quick.',
//         'Sure! Give me one sec...',
//         'Coming right up.',
//         'Sure thing. Half a \'mo.',
//         'OK, give me just a minute.',
//         'No problem, coming right up.',
//         'OK, happy to help.',
//         'OK, give me just a sec to look that up.',
//         '10-4. Be right with you.',
//         'Affirmative. Processing...(*bleep bloop*)',
//         '\'kay. Lemme grab that for you.'
//     ];
    
//     var okMessage = okMessages[Math.floor(Math.random() * okMessages.length)];
//     session.send(okMessage); 
// });

// Handle BrowseSubreddit intent
dialog.on('BrowseSubreddit', [
    function(session, args) {        
        var subredditName = appcore.getEntity(args.entities, 'SubredditName').replace(/\/ r \/ /g, '');
        var postPopularity = appcore.getEntity(args.entities, 'PostPopularity');
        var postType = appcore.getEntity(args.entities, 'PostType');
        var timePeriod = appcore.getEntity(args.entities, 'TimePeriod');
        
        logger.debug('Caught BrowseSubreddit intent:', {
            'subredditName': subredditName,
            'postPopularity': postPopularity,
            'postType': postType,
            'timePeriod': timePeriod
        });

        // Fetch posts from requested subreddit
        if (!subredditName.isEmpty()) {
            redwrap.r(subredditName).sort(postPopularity).from('year').limit(10, function(error, posts, result) {
                if (posts.data != null) {
                    posts.data.children.forEach(function(post, index) {                    
                        // console.log('  #%d: %s by %s on %s (%d upvotes, %d downvotes) - %s',
                        //     (index + 1),
                        //     post.data.title,
                        //     post.data.author,
                        //     new Date(post.data.created * 1000).toISOString(),
                        //     post.data.ups,
                        //     post.data.downs,
                        //     post.data.url
                        // );
                    });
                } else {
                    session.send("Sorry, either I didn't understand the name " +
                        "of the subreddit you asked for or that subreddit " +
                        "doesn't exist. Try asking me again, or report the " +
                        "issue to the developer if the problem persists.");
                }
            });           
        } else {
            session.send("I'm sorry, but I didn't understand the name of the " +
                "subreddit you asked for. I am a bot, after all, and I am " +
                "stupid. Try asking me again, or report the issue to the " +
                "developer if the problem persists.");              
        }
    }
]);

dialog.onDefault(builder.DialogAction.send("Sorry, I didn't catch that. Say again?"));