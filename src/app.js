/**
 * app.js - Common application functions and constants
 * 
 * @author Jamison Bryant <robojamison@gmail.com>
 * @copyright Copyright (c) 2016 Jamison Bryant
 * @license MIT License (https://opensource.org/licenses/MIT)
 */

// Version constants
const VERSION_MAJOR = 0;
const VERSION_MINOR = 3;
const VERSION_PATCH = 0;

// Error constants
const ERROR_DOTENV_FILE_NOT_FOUND = 100;

// Server constants
const SERVER_PORT = 3978;

// Miscellaneous constants
const AUTHOR_NAME = 'Jamison Bryant';
const AUTHOR_EMAIL = 'robojamison@gmail.com';
const AUTHOR_USERNAME = '/u/WhiskynWilderness';
const APP_SITE_URL = 'https://robojamison.github.io/bot4reddit';
const APP_REPO_URL = 'https://github.com/robojamison/bot4reddit';

// Load dependencies
var sprintf = require('sprintf-js');   // For printing strings
var builder = require('botbuilder');    // For integrating with Bot Framework

module.exports = {
    /*
     * Define constants we export
     * @TODO: Find out if we can share constants more easily
     */
    ERROR_DOTENV_FILE_NOT_FOUND: ERROR_DOTENV_FILE_NOT_FOUND,
    SERVER_PORT: SERVER_PORT,
    AUTHOR_USERNAME: AUTHOR_USERNAME,
    
    /**
     * Returns the value of an entity as a string, or an empty string if the 
     * entity was not present.
     * 
     * @param {}
     */
    getEntity: function(entities, name) {
        var entityObject = builder.EntityRecognizer.findEntity(entities, name);
        return (entityObject != null ? entityObject.entity : '');
    },
    
    /**
     * Returns the application's version number as a string.
     */
    getVersion: function() {
        return sprintf.sprintf('v%d.%d.%d', 
            VERSION_MAJOR, VERSION_MINOR, VERSION_PATCH);
    },
    
    /**
     * Returns the application's copyright information as a string.
     */
    getCopyright: function() {
        return sprintf.sprintf('%d %s', 
            new Date().getFullYear(), AUTHOR_NAME);
    },
    
    /**
     * Returns the application's website URL as a string.
     */
    getSiteUrl: function() {
        return APP_SITE_URL;
    },
    
    /**
     * Returns the application's repo URL as a string.
     */
    getRepoUrl: function() {
        return APP_REPO_URL;
    }
};