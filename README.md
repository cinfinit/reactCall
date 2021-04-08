# reactCall

phone calls made using Plivo , node , react \

Pre-requisites \
Install nodejs and postgres \

open both the folders in respective directories and then run npm i in both \
the directories

then run command "node server" in the phoneapi folder , this will spin up the server , this will be currently running on PORT 8080,
\
hence the base url for API will be http://localhost:8080
\
Now , go to the other folder name phonecall, then src/config.js/
from here change the baseUrl to http://localhost:8080
\
now from this directory run command "npm start"
\
this will start the react app at PORT 3000 , hence the entire url of the app\
will be http://localhost:3000

this app consist of two routes \
http://localhost:3000 \
http://loclahost:3000/logs \

logs route will basically display the phone calls made till now
\
Note:
Since plivo currently allows only purchased number to make call from , \
have mentioned the purchased number in the UI itself for testing purpose
\
since this application is only designed for IN users , so just need to \
under the desired phone number , no need to enter the country code
