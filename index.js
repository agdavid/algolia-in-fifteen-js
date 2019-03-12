// Utility Libraries
const JSONStream = require('JSONStream');
const es = require('event-stream');
const fs = require('fs');
const path = require('path');
const dotenvExtended = require('dotenv-extended');
const dotenvParseVariables = require('dotenv-parse-variables');
const _ = require('lodash');
// Algolia JavaScript API client
const algoliasearch = require('algoliasearch');

// load .env variables
dotenvParseVariables(
    dotenvExtended.load({
      // assign variables to process.env object for accessibility
      assignToProcessEnv: true,
      // displays "missing .env file", no need in production, where we use real env variables
      silent: process.env.APP_ENV === 'production',
      errorOnMissing: true,
      // also use process.env to fill variables in, only in production
      includeProcessEnv: process.env.APP_ENV === 'production',
    })
  );

// create Algolia client/index
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const indexName = process.env.ALGOLIA_INDEX_NAME;
const index = client.initIndex(indexName);

/////////////////////////////////////////////
// Add to index with objects from a JSON file
let list = [];
console.log('Starting JSON processing');
fs.createReadStream(path.join(__dirname, 'data.json'), { encoding: 'utf8' })
  .pipe(JSONStream.parse('*'))
  .pipe(
    es.through(
      obj => list.push(obj),
      () => {
        console.log('Completed JSON processing');
        console.log('Chunking into chunks of 10');
        const chunks = _.chunk(list, 10);
        console.log('Starting transfer of to index');
        Promise.all(
          chunks.map(chunk =>
            index
              .addObjects(chunk)
              .then(() => console.log('Finished chunk of 10'))
          )
        ).then(() => {
          console.log(
            `Finished transfer of ${list.length} to ${indexName} index`
          );
          process.exit();
        });
      }
    )
  );
/////////////////////////////////////////////