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

var builder = require('botbuilder');

// Create LUIS Dialog that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=d2e5044840ed4173bef063f00e93b387&q=';
var dialog = new builder.LuisDialog(model);
var cortanaBot = new builder.TextBot();
cortanaBot.add('/', dialog);

// Add intent handlers
dialog.on('builtin.intent.alarm.set_alarm', builder.DialogAction.send('Creating Alarm'));
dialog.on('builtin.intent.alarm.delete_alarm', builder.DialogAction.send('Deleting Alarm'));
dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));

cortanaBot.listenStdin();