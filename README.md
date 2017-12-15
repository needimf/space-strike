<img src="https://i.imgur.com/pJqB2pt.png" alt="Space Strike logo" style="max-width: 7%;"/>

# Space Strike

## Overview

Space Strike is an interstellar rendition of the classic game, Battleship! Players are paired up against other users, taking turns firing missiles at each other's spacecraft. The player who destroys all of their opponent's spacecraft first is declared the winner!

**Test your skills here:** https://spacestrike.herokuapp.com/

### Screenshot

<img src="https://i.imgur.com/hJiUoV4.png"
     alt="Space Strike main page"
     style="margin: 0 auto; max-width: 80%;" />

---

<img src="https://i.imgur.com/ZVCQRwX.png"
     alt="Space Strike gameplay"
     style="margin: 0 auto; max-width: 80%;" />

---

## Technologies Used

- React
- Express
- Node.js
- MongoDB
- Socket.io
- HTML
- CSS
- Javascript
- MaterializeCSS

---

## The Design

User stories and planning documents can be found at: [Space Strike Planning Board](https://trello.com/b/F4TJsPE6/react-battleship-spacestrike)

---

## Local Installation Instructions

1. Clone the repo from your terminal ```git clone https://github.com/needimf/space-strike.git```
2. Install npm packages with ```npm install```
3. Create a .env file for local development with the following keys: 
```javascript
DATABASE_URL=<your database url>
SECRET=<your JWT secret>
```
4. Run the node.js sever with ```node server.js``` or ```nodemon server.js``` if you have nodemon installed
5. Run react with ```npm start```
6. Browse to ```http://localhost:3000``` and enjoy the game!


### OR

Play online here: https://spacestrike.herokuapp.com/

---

## Future Steps

- Implement in-game chat functionality
- Change game forfeit handling to allow the winning player the option of playing a new game or not
- Provide a "Current Games" page that allows users to see the stats of games in progress at the time
- Allow users to save a game for future play
- Update responsive design for mobile users