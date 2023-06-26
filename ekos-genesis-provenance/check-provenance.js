const fs = require('fs');
require('./seed');
const _ = require('lodash');

// Load data from file
const data = JSON.parse(fs.readFileSync('metadata-all-unshuffled.json'));

// Convert data to an array of objects with keys
const dataArray = Object.keys(data).map(key => ({ key, value: data[key] }));

// Shuffle data with a specific random seed
const shuffledData = _.shuffle(dataArray);

// Convert shuffled data back to an object
const shuffledDataObject = shuffledData.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
}, {});

var iKey = 0;
shuffledData.map(function (key, value) {
    key.key = iKey;
    iKey++;
})

fs.writeFile('shuffled-final.json', JSON.stringify(shuffledData, null, 2), 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
});
