'use-strict';

const axios = require('axios'); 
const base = `https://www.alphavantage.co/query?`; 
const key = require('../stonksniffer/config/config.json').alphavantage;

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

module.exports.timeSeriesDailyAdjustedAll = async(symbol) => {
    try {
        console.log(`${Date.now()} | alphavantage | timeSeriesDailyAdjusted | symbol : ${symbol}`);
        const url = `${base}function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${key}`;
        console.log(`${Date.now()} | making request : ${url}`);
        const res = await axios.get(url); 

        var dataset = {};
        for(var _d in res.data['Time Series (Daily)']){
            var daily = await this.parseTSD(res.data['Time Series (Daily)'][_d]);
            dataset[_d] = daily; 
        }
        console.log(`  response : ${JSON.stringify(res.data).length}`);
        return dataset; 

    }catch(error) {
        console.log(`alphavantage | timeSeriesDailyAdjusted | error : ${error}`);
    }
}

module.exports.company = async(symbol) => {
    try {
        console.log(`${Date.now()} | alphavantage | company | symbol : ${symbol}`);
        const url = `${base}function=OVERVIEW&symbol=${symbol}&apikey=${key}`;
        console.log(`${Date.now()} | making request : ${url}`);
        const res = await axios.get(url); 
        

    }catch(error) {
        console.log(`alphavantage | company | error : ${error}`);
    }
}

module.exports.parseTSD = function(tsd) {
    return new Promise((resolve, reject) => {
        try {
            resolve({
                open : tsd['1. open'],
                high : tsd['2. high'],
                low : tsd['3. low'],
                close : tsd['4. close'],
                adjclose : tsd['5. adjusted close'],
                volume : tsd ['6. volume'],
                divid : tsd ['7. dividend amount'],
                splitcoef : tsd['8. split coefficient']
            });
        }catch(error){
            reject(error);
            console.log(error); 
        }
    });
}