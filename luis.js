// // Load dependencies
// var dotenv = require('dotenv');
// var restify = require('restify');
// var builder = require('botbuilder');
//
// // Configure environment
// dotenv.config();
//
// // Create bot
// var model = 'https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=d2e5044840ed4173bef063f00e93b387&q=';
// var dialog = new builder.LuisDialog(model);
// var luisBot = new builder.BotConnectorBot({
//     appId: process.env.APP_ID,
//     appSecret: process.env.APP_SECRET
// });
//
// // Add model dialog
// luisBot.add('/', dialog);
//
// // Add intent handlers
// dialog.on('builtin.intent.alarm.set_alarm', builder.DialogAction.send('Creating alarm...'));
// dialog.on('builtin.intent.alarm.delete_alarm', builder.DialogAction.send('Deleting alarm...'));
// dialog.onDefault(builder.DialogAction.send("Sorry, didn't catch that. Say again?"));
//
// // Set up and start Restify server
// var server = restify.createServer();
// server.post('/api/messages', luisBot.verifyBotFramework(), luisBot.listen());
//
// server.listen(process.env.port || 3978, function() {
//     console.log('%s listening to %s', server.name, server.url);
// });

// var builder = require('botbuilder');
//
// // Create LUIS Dialog that points at our model and add it as the root '/' dialog for our Cortana Bot.
// var model = 'https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=d2e5044840ed4173bef063f00e93b387&q=';
// var dialog = new builder.LuisDialog(model);
// var cortanaBot = new builder.TextBot();
// cortanaBot.add('/', dialog);
//
// // Add intent handlers
// dialog.on('builtin.intent.alarm.set_alarm', builder.DialogAction.send('Creating Alarm'));
// dialog.on('builtin.intent.alarm.delete_alarm', builder.DialogAction.send('Deleting Alarm'));
// dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));
//
// cortanaBot.listenStdin();

var builder = require('botbuilder');

// Create LUIS Dialog that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=d2e5044840ed4173bef063f00e93b387&q=';
var dialog = new builder.LuisDialog(model);
var cortanaBot = new builder.TextBot();
cortanaBot.add('/', dialog);

// Add intent handlers
dialog.on('builtin.intent.alarm.set_alarm', [
    function (session, args, next) {
        // Resolve and store any entities passed from LUIS.
        var title = builder.EntityRecognizer.findEntity(args.entities, 'builtin.alarm.title');
        var time = builder.EntityRecognizer.resolveTime(args.entities);
        var alarm = session.dialogData.alarm = {
            title: title ? title.entity : null,
            timestamp: time ? time.getTime() : null
        };

        // Prompt for title
        if (!alarm.title) {
            builder.Prompts.text(session, 'What would you like to call your alarm?');
        } else {
            next();
        }
    },
    function (session, results, next) {
        var alarm = session.dialogData.alarm;
        if (results.response) {
            alarm.title = results.response;
        }

        // Prompt for time (title will be blank if the user said cancel)
        if (alarm.title && !alarm.timestamp) {
            builder.Prompts.time(session, 'What time would you like to set the alarm for?');
        } else {
            next();
        }
    },
    function (session, results) {
        var alarm = session.dialogData.alarm;
        if (results.response) {
            var time = builder.EntityRecognizer.resolveTime([results.response]);
            alarm.timestamp = time ? time.getTime() : null;
        }

        // Set the alarm (if title or timestamp is blank the user said cancel)
        if (alarm.title && alarm.timestamp) {
            // Save address of who to notify and write to scheduler.
            alarm.to = session.message.from;
            alarm.from = session.message.to;
            alarms[alarm.title] = alarm;

            // Send confirmation to user
            var date = new Date(alarm.timestamp);
            var isAM = date.getHours() < 12;
            session.send('Creating alarm named "%s" for %d/%d/%d %d:%02d%s',
                alarm.title,
                date.getMonth() + 1, date.getDate(), date.getFullYear(),
                isAM ? date.getHours() : date.getHours() - 12, date.getMinutes(), isAM ? 'am' : 'pm');
        } else {
            session.send('Ok... no problem.');
        }
    }
]);

dialog.on('builtin.intent.alarm.delete_alarm', [
    function (session, args, next) {
        // Resolve entities passed from LUIS.
        var title;
        var entity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.alarm.title');
        if (entity) {
            // Verify its in our set of alarms.
            title = builder.EntityRecognizer.findBestMatch(alarms, entity.entity);
        }

        // Prompt for alarm name
        if (!title) {
            builder.Prompts.choice(session, 'Which alarm would you like to delete?', alarms);
        } else {
            next({ response: title });
        }
    },
    function (session, results) {
        // If response is null the user canceled the task
        if (results.response) {
            delete alarms[results.response.entity];
            session.send("Deleted the '%s' alarm.", results.response.entity);
        } else {
            session.send('Ok... no problem.');
        }
    }
]);

dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));

// Add notification dialog
cortanaBot.add('/notify', function (session, alarm) {
    session.send("Here's your '%s' alarm.", alarm.title);
    session.endDialog(); // <= we don't want replies coming to us
});

cortanaBot.listenStdin();

// Very simple alarm scheduler
var alarms = {};
setInterval(function () {
    var now = new Date().getTime();
    for (var key in alarms) {
        var alarm = alarms[key];
        if (now >= alarm.timestamp) {
            cortanaBot.beginDialog({ from: alarm.from, to: alarm.to }, '/notify', alarm);
            delete alarms[key];
        }
    }
}, 15000);