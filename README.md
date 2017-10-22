# beacon

## Prerequisites
nodejs  > 4

Developed on 8.7.0
Tested on 4.7.3 and 8.7.0

Browser Support
Developed and Tested on
Firefox 52.2 
Chrome 61

## Run
````
1. git clone https://github.com/z-shan/beacon.git
2. cd into beacon folder
3. npm install
4. install and start mongodb
    https://docs.mongodb.com/manual/administration/install-community/
5. npm start
6. goto localhost:3001 on your browser (port can be configured in config.js)
````

## Rest API calls
* Generate beak code 
 POST - /beak/generate/
 Pass - "recipientemail" in the post body
 Returns - url which can be included in emails

* Beacon hit
 GET - /beak/:beakCode
 Returns - pixel image
 