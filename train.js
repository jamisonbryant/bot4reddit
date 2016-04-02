/**
 * train.js - LUIS model training file generator
 *
 * LUIS (Language Understanding Intelligent Service) is a service provided by Microsoft that enables natural language
 * processing and cognition for applications with the ability to make HTTP requests to a given endpoint. Developers
 * must create "models" in order to use the service, and these models must be trained with text called "utterances".
 *
 * This script generates an extremely large list of strings that can be used to train a LUIS model. It does this by
 * printing every possible combination of a number of arrays, each of which contain a word of interest in the utterance
 * to be generated. Note: the more arrays there are, the more utterances there will be. This is not necessarily a good
 * thing, as LUIS cannot process utterance files over 4 MB (nor would you want it to, it would take forever).
 *
 * To use this script, simply run it with `node train.js`. This script only generates the utterances, it does not send
 * them to your LUIS model automatically or anything like that. Furthermore, the utterances are printed to stdout, so
 * if you don't want to do a shit-ton of copy-pasting, you should pipe the output to a file or to your clipboard.
 *
 * @author Jamison Bryant <robojamison@gmail.com>
 * @copyright Copyright (c) 2016 Jamison Bryant
 * @license MIT License (https://opensource.org/licenses/MIT)
 */

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