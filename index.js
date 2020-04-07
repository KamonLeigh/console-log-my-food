#! /usr/bin/env node

// Above code lets the applications know that it needs to be excuted with node
//  chmod +x ./index.js run this in terminal inorder to run app in cli
const axios = require(axios);
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// The above code means it takes in input from the terminal and prints to the terminal

readline.question('What would you like to log today?', async (item)=> {
    const { data } = axios.get("http://localhost:3001/users");
    const it = data[Symbol.iterator]();

    let position = it.next();
    while(!position.done) {
        const food = position.data.value;
        if (food === item) {
            console.log(`${item} has ${position.value.calories} calories`)
        }
        postion = it.next();
    }


    console.log(item);
    readline.close();
});