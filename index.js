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
  console.log(body);
});
