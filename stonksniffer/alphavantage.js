'use-strict';

const axios = require('axios'); 
const base = `https://www.alphavantage.co/query?`; 
const key = require('./config/config.json').alphavantage;

module.exports.details = async() => {
    return new Promise((resolve) => {
        resolve({
            'base' : base,
            'key' : key
        }); 
    });
}

module.exports.timeSeriesDailyAdjustedAll = async(symbol) => {
    try {
        console.log(`alphavantage | timeSeriesDailyAdjusted | symbol : ${symbol}`);
        const url = `${base}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${key}`;
        console.log(`${Date.now()} | making request : ${url}`);
        const response = await axios.get(url); 
        console.log(`  response : ${JSON.stringify(response.data).length}`);
        return response.data; 
    }catch(error) {
        console.log(`alphavantage | timeSeriesDailyAdjusted | error : ${error}`);
    }
}