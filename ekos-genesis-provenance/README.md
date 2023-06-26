Utilizing a shuffle script we shuffled the data based on a shuffle seed.
Shuffle seed is: 0xc913a04189010d86149cc7c5c9fd5ae23b174ee44857594a4dd3698dc70b560f

The shuffle seed was the block hash closest to the earliest block of the hour prior to the providence being set.

This block was used https://etherscan.io/block/17095218 on April 21 @ 2:00pm PST

```
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
shuffledData.map(function(key, value){
    key.key = iKey;
    iKey ++;
})

fs.writeFile('shuffled-final.json', JSON.stringify(shuffledData, null, 2), 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
});

```

```
const seedrandom = require("seedrandom");

seedrandom("0xc913a04189010d86149cc7c5c9fd5ae23b174ee44857594a4dd3698dc70b560f", { global: true });

```

This results in shuffled metadata

Calculating the SHA256 hash of this file results in
e707250940efbbe96c6c822a54a66630a7e4ff70684ca2c2bb2eeac601d5c542

The providence was set on April 21, 2023 at 2:54pm
https://etherscan.io/tx/0x67c01de282a770c992acaac96611efe3f50e0799ece0bba9f5ae0f9f773775c8



sent the tokens:
https://etherscan.io/tx/0x88aeb9bb8ac54b47a438f74c7d8ecf21928cd77a88e89956e8e9d1754fa4a5de