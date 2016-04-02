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

// Miscellaneous constants
const COPYRIGHT_HOLDER = 'Jamison Bryant';
const APP_SITE_URL = 'https://robojamison.github.io/bot4reddit';
const APP_REPO_URL = 'https://github.com/robojamison/bot4reddit';

// Load dependencies
var sprintf = require('sprintf-js');   // For printing strings

module.exports = {
    /*
     * Define constants we export
     */
    ERROR_DOTENV_FILE_NOT_FOUND: ERROR_DOTENV_FILE_NOT_FOUND,
    
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
            new Date().getFullYear(), COPYRIGHT_HOLDER);
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