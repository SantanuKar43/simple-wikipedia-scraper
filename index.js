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

request.get('https://en.wikipedia.org/wiki/bmw',function(err,response,body){
    if(err && err.code=="ETIMEDOUT") return console.log("Request timed out");
    if(!err && response.statusCode==404) return console.log("error 404 occured")
  console.log(body.match(/<p><b>(.*)<\/p>/)[0]);
});
