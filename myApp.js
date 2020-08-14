var bodyParser = require('body-parser'); //Required for post data
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(function middleware(req,res, next) {
  console.log(req.method+' '+req.path+' - '+req.ip);
  next(); //Execute the next function. Whitout it, it will be a infinite loop
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/hello",function(req,res) {
  res.send("Hello Express");
});

/** 3) Serve an HTML file */
var absolutePath = __dirname + "/views/index.html";
console.log(absolutePath);
app.get("/",function(req,res){
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/json",function(req,res){
  let hello = "Hello json";
  if(process.env.MESSAGE_STYLE === "uppercase") {
    hello = hello.toUpperCase();
  }
  res.json({"message":hello}); 
});

/** 6) Use the .env file to configure the app */
 process.env.MESSAGE_STYLE="uppercase";
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now",
        (req,res,next) => {
          req.time = new Date().toString();
          next();
        },
         (req,res) => {
          res.send({"time": req.time});
        }
);

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo",(req,res) => {
  res.json({echo : req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/** 12) Get data form POST  */

app.route("/name").get(function(req,res){
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({name: `${firstName} ${lastName}`});
}).post(function(req,res){
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
