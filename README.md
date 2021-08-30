# mongo-url-cli

This cli is the easy way to create urls for mongodb and mongoose



## Usage

### Installation

```
# Using npm:
npm install -g mongo-url-cli

# Using yarn:
yarn global add mongo-url-cli
```



### Get started

To get started, first install the script globally. When done, you can use the cli via npx:

````
npx mongo-url
````



It will ask some questions, if you choose to generate your url via a file, see [mongodb-uri](https://www.npmjs.com/package/mongodb-uri). Create a config file with the values shown in [mongodb-uri](https://www.npmjs.com/package/mongodb-uri) and pass the path of the config to the cli. Example:

````
? For what do you want to use the URI mongodb
? Choose your build option Build by file
? Your file path (must be a JSON file) config.json
````







