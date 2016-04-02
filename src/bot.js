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
var filesys = require('fs');            // For examining the file system
var appcore = require('./app');         // For application core functions

// Define aliases
spf = sprintf.sprintf;                  // spf -> sprintf.sprintf

// Display welcome message
console.log(spf('Bot4Reddit %s. Copyright (c) %s.', 
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

// Create Reddit bot
var bot = new builder.BotConnectorBot({
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
});

// Create LUIS dialog
var model = process.env.LUIS_URL;
var dialog = new builder.LuisDialog(model);
bot.add('/', dialog);

// Configure and start server
var server = restify.createServer({ name: 'bot4reddit' });

// Start listening for messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || appcore.SERVER_PORT, function() {
    logger.info(spf('%s listening on %s', server.name, server.url));
});

// Handle BrowseSubreddit intent
dialog.on('BrowseSubreddit', [
    function(session, args) {
        var subredditName = appcore.getEntity(args.entities, 'SubredditName');
        var postPopularity = appcore.getEntity(args.entities, 'PostPopularity');
        var postType = appcore.getEntity(args.entities, 'PostType');
        var timePeriod = appcore.getEntity(args.entities, 'TimePeriod');

        var subredditName   = subredditName.replace(/\s/g, '').toUpperCase();
        var postPopularity  = postPopularity.toUpperCase();
        var postType        = postType.toUpperCase();
        var timePeriod      = timePeriod.toUpperCase();
        
        logger.debug(spf('Caught BrowseSubreddit intent (entities: %d)',
            args.entities.length), {
                'subredditName': subredditName,
                'postPopularity': postPopularity,
                'postType': postType,
                'timePeriod': timePeriod
            });

        // session.send('Showing you the ' + postPopularity + ' ' + postType + ' from ' + subredditName + ' for ' + timePeriod);
    }
]);

dialog.onDefault(builder.DialogAction.send("Sorry, I didn't catch that. Say again?"));