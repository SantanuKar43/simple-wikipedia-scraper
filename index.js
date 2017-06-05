var request = require('request');

//
// https.request({"host":"en.wikipedia.org","path":"/wiki/BMW","method":"get"},function(res){
//   res.on('data',function(chunk){
//     body.push(chunk);
//   });
//   res.on('end',function(){
//     string = Buffer.concat(body).toString();
//     console.log(string.match(/<title>(.*)<\/title>/g));
//   });
// }).end();
var input = process.argv.slice(2).join("_");
console.log(input);
var reqpro = new Promise(function(resolve,reject){
  request.get('https://en.wikipedia.org/wiki/'+input,function(err,response,body){
    if(err && err.code=="ETIMEDOUT") return console.log("request timed out");
    if(response.statusCode==404) return reject(body);
    else if(response.statusCode==200) return resolve(body);
    else return console.log("Something went wrong! Try again, please.");
  });
});

reqpro.then(function(body){
  var match = body.match(/<p><b>(.*)<\/p>/);
  var noLinks = match[1].replace(/<[^<]+>/g,"");
  var final = noLinks.replace(/\([^\:]*\:[^\:]*\)/g,"");
  console.log(final);
},function(body){
  var searchUrl = body.match(/<a.*href="([^<]*)".*>Search for/);
  return console.log("please visit-"+searchUrl[1]);
});

// request.get('https://en.wikipedia.org/wiki/amitabhhbachhan',function(err,response,body){
//     if(err && err.code=="ETIMEDOUT") return console.log("Request timed out");
//     if(!err && response.statusCode==404) {
//       var searchUrl = body.match(/<a.*href="([^<]*)".*>Search for/);
//       return console.log("please visit-"+searchUrl[1]);
//     }
//   console.log(body.match(/<p><b>(.*)<\/p>/)[0].replace(/<[^<]+>/g,""));
// });
