// Load dependencies
var sprintf = require('sprintf-js').sprintf;

// Define utterance components
var botCommands = [
    "what are",
    "show me",
    "pull up",
    "bring up",
    "display"
];

var postPopularities = [
    "hot", "hottest",
    "new", "newest",
    "rising",
    "top"
];

var postTypes = [
    "posts",
    "images",
    "self-posts", "self posts", "text posts",
    "articles",
    "links"
];

var forumTypes = [
    "/r/foo", "r/foo",
    "/m/foo", "m/foo"
];

var timePeriods = [
    "right now",
    "the past day", "the past 24 hours", "today", "yesterday",
    "the past week", "this week", "last week",
    "the past month", "this month", "last month",
    "the past year", "this year", "last year",
    "all time"
];

// Generate complete utterances
botCommands.forEach(function(botCommand) {
    postPopularities.forEach(function(postPopularity) {
        postTypes.forEach(function(postType) {
            forumTypes.forEach(function(forumType) {
                timePeriods.forEach(function(timePeriod) {
                    var utterance = sprintf("%s the %s %s on %s for %s",
                        botCommand, postPopularity, postType, forumType, timePeriod);
                    console.log(utterance);
                });
            });
        });
    });
});