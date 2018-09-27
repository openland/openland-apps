const fs = require('fs');

let schema = JSON.parse(fs.readFileSync('./schema.json', 'utf-8'));

// here we're filtering out any type information unrelated to unions or interfaces
const filteredData = schema.__schema.types.filter(
    type => type.possibleTypes !== null,
);
schema.__schema.types = filteredData;
fs.writeFile('./packages/openland-api/fragmentTypes.json', JSON.stringify(schema), err => {
    if (err) {
        console.error('Error writing fragmentTypes file', err);
    } else {
        console.log('Fragment types successfully extracted!');
    }
});