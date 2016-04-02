# Bot for Reddit
A bot for browsing Reddit using the Reddit API and the Microsoft Bot Framework.

At the 2016 [Microsoft Build Developer Conference][1], Microsoft announced a
new technology that they are exploring called "[conversation as a platform][2]". 
Essentially, Microsoft wants to develop a bevy of intelligent bots that you can
converse with using natural language in order to accomplish easily-automatable
tasks such as ordering a pizza, making a hotel reservation, or booking a flight.

This application uses Microsoft's [Bot Builder SDK][3] and a wrapper for the
Reddit API called [snoowrap][4] to allow you to browse Reddit content using 
natural-language commands such as _"Show me the top posts of all time from 
/r/all"_, or _"Display the newest posts on /r/funny for today"_. Neat, huh?

## Installation
### Prerequisites
Please ensure you have the following programs installed before continuing:

1. Node.js (for running the application)
2. NPM (for downloading application dependencies)
3. The [Microsoft Bot Framework Emulator][5] (for testing the application)

### Via Git (recommended)
1. Clone the repository:

    ```
    git clone https://github.com/robojamison/bot4reddit.git Bot4Reddit
    ```
    
2. Download the dependencies:

    ```
    cd src/
    npm update
    ```

### Manually
_NOTE: This method is not ideal because you will be unable to automatically get 
the latest version of the application. You will have to perform all updates and
maintenance manually._

1. Download the app by clicking [Download ZIP][6] (or [Download Tarball][7])
2. Extract the downloaded archive to a directory of your choice
3. `cd` into the `src/` directory of the extracted archive and run `npm update`

## Usage
1. Launch the Bot Framework Emulator
2. _(TBD: how to enter the App ID and the App Secret)_
3. Open a terminal and `cd` to the application's `src/` directory
4. Run `node bot.js`
5. Enter a command (see `doc/COMMANDS.md`) in the Emulator and hit `Enter`
6. Enjoy dank memes.

## FAQs
### What is a "bot"?
A bot, as Microsoft defines it, is an artificial intelligence that you can 
communicate with using natural language like "add bananas to my shopping list"
instead of a very strict set of predefined voice commands. 

## Contributing
I'm not accepting pull requests at this time (the app's not mature enough), but 
thanks anyway. To report a bug, use the [Issues][8] page. 

**Before submitting a bug report, please check to see that it has not already 
been submitted.** This keeps me sane, thanks.

## License
The MIT License (MIT)
=====================

Copyright (c) 2016 Jamison Bryant

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[1]: https://build.microsoft.com
[2]: https://channel9.msdn.com/Events/Build/2016/C902
[3]: https://github.com/Microsoft/BotBuilder
[4]: https://github.com/not-an-aardvark/snoowrap
[5]: http://download.botframework.com/botconnector/tools/emulator/publish.htm
[6]: https://github.com/robojamison/bot4reddit/archive/master.zip
[7]: https://github.com/robojamison/bot4reddit/archive/master.tar.gz
[8]: https://github.com/robojamison/bot4reddit/issues