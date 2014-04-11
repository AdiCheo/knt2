Multiplayer Kings'n Things
==========================

- Node.js
- Express
- Socket.io
- HTML5 (KineticJS)

Instructions
============

Our game has been uploaded to heroku and can be played online from anywhere using any modern browser.

Simply follow this link: [http://kingsnt.herokuapp.com]. Please email us in case it stops loading, as we might need to refresh the heroku server (becomes inactive when not used).

Please follow the instructions under "How to Connect Clients" to setup a 4 player game.

How to run the server
---------------------

1. Please download and install Node JS from: [http://nodejs.org/]
2. Open your terminal/shell and go to the source directory
3. Run the following command to install all necessary packages:
```npm install```
4. If everything went smoothly, simply run the following command to run the server:
```node app.js```
5. The server will start on port 3000 (make sure it's not in use)

How to connect clients
----------------------
1. Open any modern browser (we recommend Google Chrome for best compatibility/performance)
2. Open 4 tabs
3. Point the first one to ```localhost:3000``` and wait for it to load, it should indicate you are player 1 (use the highlighted right hand menu color).
4. Go to the second tab an open the same url for player 2, then follow suit for player 3 and 4.

Warnings
--------
1. We have made it so if one player gets disconnected, all other players are pointed to a blank page.
2. Please make sure you do not connect more than 4 players/tabs when testing (!important)
3. Simply hitting the back button on the browser should reconnect you as player 1 and so on.

How to play the Game
====================
1. You can play the game normally following the rules of the game, sometimes the display doesn't refresh the phase and turn, simply switching tabs updates them (fault of the KineticJS library, using old version). But on the server side everything should be updated normally.
2. Pressing ```escape``` on your keyboard brings up a menu, where you can load the predefined game setups.
3. Again battle phase is not working, and can be skipped by ending each players turn.
4. You can win by building a citadel (load scenario 1) and then playing a full turn.

Extras
======
1. If you would like some feedback while playing the game, open the javascript console of the browser and you will be able to see some outputs (some of them were alerts, but were very annoying for the gameplay) so we made them console outputs.

Again if any questions arise, please email us. We had a lot of fun learning and doing this project, and wished we could have implemented more features of them game. It was one of the most interesting classes we have taken. We hope you enjoy your summer whomever is reading this.
