const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs'); // set handle bar as the view engine(for templating) for express as the beginnig of the program

app.use(express.static(__dirname + '/public') );

/* root */
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1 >');
  res.send({
    name: 'Malisha',
    likes:[
      'Biking',
      'Singing'
  ]
  });
});

/* about page */
app.get('/about',(req, res) => {
  // res.send('About Page'); // SEND AS A STRING, WHEN NAVIGATE TO THE /about . BUT NOT A PAGE (JUST SEND ONLY A STRING)
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
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
