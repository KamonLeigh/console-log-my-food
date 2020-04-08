#! /usr/bin/env node

// Above code lets the applications know that it needs to be excuted with node
//  chmod +x ./index.js run this in terminal inorder to run app in cli
const axios = require('axios');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'enter command >'

});
// The above code means it takes in input from the terminal and prints to the terminal

readline.prompt();

readline.on('line', async (line) => {


    switch (line.trim()) {
        case 'list vegan foods':
            {

                const { data } =  await axios.get(`http://localhost:3001/food`);

                function* listVeganFoods() {
                     let idx = 0;

                     const veganOnly = data.filter(food => {
                         return food.dietary_preferences.includes('vegan')
                     });

                     while(veganOnly[idx]){
                         yield veganOnly[idx]
                         idx++
                     }
                }
                   
                    

                   
                    for (let val of listVeganFoods()) {
                
                        console.log(val.name);
                    }
                
                    readline.prompt()
            

            }
            break;
        case 'log': 
            const { data } = await axios.get("http://localhost:3001/food");
            const it = data[Symbol.iterator]();
            let actionIt;

            function* actionGenerator() {
                const food = yield;
                const servingSize = yield askForServingSize();
                yield displayCalories(servingSize, food);
            }
                       

            function askForServingSize(food) {
                readline.question('How many servings did you eat? (as a decimal: 1, 0.5, 1.2 etc)', servingSize => {
                    if (servingSize === 'nevermind' || servingSize === 'n') {

                        actionIt.return();

                    } else {

                        actionIt.next(servingSize)
                    }
                    
                })
            }

             async function displayCalories(servingSize = 1, food) {
                const calories = food.calories;
                console.log(
                    `${food.name} with a serving size of ${servingSize} has a 
                     ${Number.parseFloat(calories * parseInt(servingSize, 10),).toFixed()}
                     calories
                     `

                );
                
                const { data } = await axios.get(`http://localhost:3001/users/1`);
                const usersLog = data.log || [];
                const putBody = {
                    ...data,
                    log: [
                        ...usersLog,
                        {
                            [Date.now()]: {
                                food: food.name,
                                servingSize,
                                calories: Number.parseFloat(
                                    calories * parseInt(servingSize, 10)
                                )
                            }
                        }
                    ]
                }

                await axios.put(`http://localhost:3001/users/1`, putBody, {
                    'Content-Type': 'application/json'
                });

                actionIt.next()
                readline.prompt()
            }

            readline.question(
              "What would you like to log today?",
              (item) => {

                let position = it.next();
                while (!position.done) {
                  const food = position.value.name;
                  if (food === item.trim()) {
                    console.log(
                      `${item} has ${position.value.calories} calories`
                    );
                    actionIt = actionGenerator();
                    actionIt.next()
                    actionIt.next(position.value);
                  }
                  position = it.next();
                }

                readline.prompt();
              });

              break;
        }
    

readline.prompt();
})




