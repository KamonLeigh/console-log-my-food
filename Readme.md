# Console Log My Food.

This is a CLI that can calculate the total calories of certain foods depending on serving. After calculating result will be saved to file.

## Installation

```
 cd into CONSOLE-LOG-MY-FOOD
 yarn install

 ```

 ## Set up RESTFUL server

 ```
 yarn global add json-server 
 npx json-server --watch ./db.json --port 3001
 ```

 Keep server running 

 ## Start app

 ```
./index.js
 ```

 ## Usage 

 ```
    Commands
    1) list all vegan foods: 'list vegan foods' -> returns request
    
    2) register food:  'log' --add food
        - add serving amount when promted by cli

 ```
