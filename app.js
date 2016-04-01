// Load dependencies
var restify = require('restify');
var builder = require('botbuilder');

// Configure environment
require('dotenv').config();

// Create bot
var redditBot = new builder.BotConnectorBot({
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
});

// Create LUIS dialog
var model = process.env.LUIS_URL;
var dialog = new builder.LuisDialog(model);
redditBot.add('/', dialog);

// Handle BrowseSubreddit intent
dialog.on('BrowseSubreddit', [
    function(session, args, next) {
        // Get entities from response
        var subredditName = builder.EntityRecognizer.findEntity(args.entities, 'SubredditName');
        var timePeriod = builder.EntityRecognizer.findEntity(args.entities, 'TimePeriod');
        var postFilter = builder.EntityRecognizer.findEntity(args.entities, 'PostFilter');

        // Display something cool to the user
        var subredditNameStr = subredditName.entity.toString() || '<??SUBREDDIT??>';
        var timePeriodStr = timePeriod.entity.toString() || '<??TIMEPERIOD??>';
        var postFilterStr = postFilter.entity.toString() || '<??POSTFILTER??>';

        subredditNameStr = subredditName.entity.replace(/\s/g, '');
        //console.log(subredditNameStr + "," + timePeriodStr + "," + postFilterStr);
        console.log(subredditNameStr + "," + timePeriodStr);
    }
]);

dialog.onDefault(builder.DialogAction.send("Sorry, I didn't catch that. Say again?"));

// Set up and start Restify server
var server = restify.createServer();
server.post('/api/messages', redditBot.verifyBotFramework(), redditBot.listen());

server.listen(process.env.port || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});