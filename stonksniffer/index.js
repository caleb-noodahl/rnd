'use-strict';

const axios = require('axios');
const aa = require('./alphavantage');
const symbols = require('./config/symbols.json').symbols;
const writepath = require('./config/config.json').writepath;
const fs = require('fs'); 

(async () => {
    try {
        console.log(`${Date.now()} | stonksniffer starting | args : ${process.argv}`);
        const details = await aa.details(); 
        console.log(`${Date.now()} | alphavantage : ${JSON.stringify(details)}`);
        for(var i = 0; i < symbols.length; i++) {
            const symbol = symbols[i]; 
            const data = await aa.timeSeriesDailyAdjustedAll(symbol);
            await writeData(data, `${writepath}${symbol}.json`);
            await timeout(16000);
        }
        

    }catch(error) {
        console.log(`stonksniffer | index | main | error : ${error}`);
    }
})(); 

function timeout(ms) {
    console.log(`${Date.now()} | timeout | ms : ${ms}`);
    return new Promise(resolve => { setTimeout(resolve, ms); });
}

function writeData(data, path) {
    console.log(`${Date.now()} | writeData | data : ${data.length}, path : ${path}`);
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(path, JSON.stringify(data), resolve);
        }catch(error){
            console.log(`stonksniffer | writeData | error : ${error}`);
            reject(error);
        }
    });
}