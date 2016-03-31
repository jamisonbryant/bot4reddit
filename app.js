// Load dependencies
var dotenv = require('dotenv');
var restify = require('restify');
var builder = require('botbuilder');

// Configure environment
dotenv.config();

// Create bot
var redditBot = new builder.BotConnectorBot({
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
});

// Add default dialog
redditBot.add('/', function(session) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        session.send('Hello %s!', session.userData.name);
    }
});

// Add profile dialog
redditBot.add('/profile', [
    function(session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function(session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

// Set up and start Restify server
var server = restify.createServer();
server.post('/api/messages', redditBot.verifyBotFramework(), redditBot.listen());

server.listen(process.env.port || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});
