const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// REGISTER A PARTIAL TEMPLATE FOLDER
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs'); // set handle bar as the view engine(for templating) for express as the beginnig of the program


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n',(err) => {
    if (err) {
      console.log('Unable to access the file..!');
    }
  });

  next();
});

// IF WE DO NOT NEED TO ACCESS OUR ROUTES BY USERS OR IF NEED TO MAINTENANCE THE SYSTEM, WE CAN HANDLE IT BY USING BELOW MIDDLEWARE FUNCTION WITHOUT CALLING next() METHOD
// ONCE THE USER ACCESS ANY ROUTES, THE ABOVE MIDDLEWARE FUNCTION DIRECTLY CALL TO THIS BELOW FUNCTION AND RESNDER THE RESPONSE TO BELOW "maintenance.hbs" ROUTE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public') ); // WHEN WE THIS PUBLIC FOLDER AFTER THE maintenance.hbs MIDDLEWARE, THE PUBLIC FOLDER ALSO CANNOT BE ACCESSED BY ANYONE

// HELPERS ARE USE TO ACCESS SOME FUNCTION BY THE VIEW DIRECTLY
// two arguments. 1st is name of the helper. 2nd is function to run
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (textToUpper) => {
  return textToUpper.toUpperCase();
});


/* root */
app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
    //currentYear: new Date().getFullYear() //commented and now this access by helper function "getCurrentYear"
  });
});

/* about page */
app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear() //commented and now this access by helper function "getCurrentYear"
  });
});

/* bad page */
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Request cannot be full fill'
  });
});




app.listen(3000, () => {
  console.log('Server is up on port 3000');
});



/*
* we use express middleware (express.static() ), to access static directory here
* "__dirname" used to get absolute path to the project folder(root) from the hard drive
* "__dirname + '/public" used to,
*     >> specifies the root directory from which to serve static assets
*     >> For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:
*         >> EX:  http://localhost:3000/images/kitten.jpg
                  http://localhost:3000/css/style.css
                  http://localhost:3000/js/app.js
                  http://localhost:3000/images/bg.png
                  http://localhost:3000/hello.html
* In our case we uses "http://localhost:3000/help.html" which is inside the public static folder
* **Note that we’re going to make everything in the public directory available for viewing. This means that we should not put anything secret/sensitive in there, so keep any files with passwords, tokens, etc. out of the public folder, or users will be able to see it.
*/

/* res.render()
* res.render() - used to render any thing to view, which set as the express view engine. here we have used handlebars(hbs) as our templating for view engine
*/
//nodemon server.js -e js,hb  >> tell nodemon to watch and update both .js and .hbs file when updating them. otherwie nodemon need to restart to see changes
