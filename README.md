# algolia-in-fifteen-js

A quick tutorial to get your Algolia search running in fifteen minutes using the JavaScript API client and InstantSearch frontend library

## ... a diversion on Developer Setup
If you don't already use Node, get setup the right way:
### Install Node.js "the right way"
There are many ways to get Node.js on your system (brew, setup files...) but the best way to do it is via nvm.

* Remove any system-wide Node.js installation: https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x
* Install nvm: https://github.com/creationix/nvm#install-script
* Open a new terminal to ensure nvm is installed: `nvm --version`

### Install Yarn "the right way"
* Remove any installation of Yarn: https://stackoverflow.com/questions/42334978/how-do-i-uninstall-yarn
* Install Yarn following this: https://yarnpkg.com/en/docs/install#alternatives-stable


# Sign-up for Algolia
1. Login to your Algolia account or Sign-up for an account [here](https://www.algolia.com/users/sign_up) if you don't have one already (Note: You can get a free [Community](https://www.algolia.com/pricing/) plan)


# Upload Your Data
2. Copy the `.env.defaults` file and name it `.env` for your configuration variables 
```
cp .env.defaults .env
```

3. Navigate to the "API Keys" tab in your Algolia Dashboard to find the Application ID and Admin API Key, then in your `.env` file set the following values:
```

ALGOLIA_APP_ID=YOUR_APP_ID
ALGOLIA_ADMIN_API_KEY=YOUR_ADMIN_API_KEY
ALGOLIA_INDEX_NAME=YOUR_INDEX_NAME_OF_YOUR_CHOICE
``` 

4. Install the node modules:
```
yarn
```

5. In `index.js` Line 10 we require the [Algolia Javascript API Client](https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/). But, don't forget, Algolia has [API clients](https://www.algolia.com/doc/) for many languages.
```
const algoliasearch = require('algoliasearch');
```

6. In `index.js` Line 26-28 we initialize the client using your credentials
```
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const indexName = process.env.ALGOLIA_INDEX_NAME;
const index = client.initIndex(indexName);
```

7. Pick your dataset and copy-and-paste it into `data.json`. Algolia has [free datasets](https://github.com/algolia/datasets) here if you're interested.

8. In `index.js` Line 40 shape your date into a JSON record of your choosing. For example:
```
{
    "name": "shirt",
    "color": "white",
    "_tags": ["summer", "cotton"],
    "onSale": true,
    "price": 24
}
``` 

9. Index the data:
```
yarn upload
```

# Set Your Relevance

10. You have many options for [setting relevance](), but at a minimum set [searchable attributes](https://www.algolia.com/doc/guides/managing-results/must-do/searchable-attributes/)


# Setup the Frontend

11. Use the boilerplate InstantSearch.js [codesandbox](https://codesandbox.io/s/7oxwxrl5o6), which has the Algolia widgets, fork it and use it to get started

12. In `app.js` replace the Algolia credentials with your own APP ID, Search API Key, and index name

13. Review the [available widgets](https://www.algolia.com/doc/api-reference/widgets/js/) and enjoy testing them out using your data in `app.js` and `index.html`
