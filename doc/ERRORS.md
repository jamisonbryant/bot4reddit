# Errors
This page contains a detailed description of each of the possible known errors 
that can occur while using the application. If you encounter an error not 
detailed here, please report it on the [Issues][1] page.

## System Errors (100-level)
### Error 100: Environment config file not found
**Cause:** Caused when the application is launched without an environment
configuration file present.

**Explanation:** For security purposes, Bot for Reddit loads the sensitive
information it requires (App ID, OAuth keys, etc.) from an environment config
file located in application directory (same directory as `bot.js`).
  
**How to Fix:** Copy `.env.template` to `.env`, then open the new file in your 
favorite text editor and update its content. When finished, save and close the 
file and re-run the application.

**Notes:**
* For security purposes, your `.env` file **should NOT be committed to your
version-control system.** To do so would be equivalent to storing all of your 
passwords in plain-text on a publicly-accessible Google Doc. Yup, bad idea.

[1]: https://github.com/robojamison/bot4reddit/issues