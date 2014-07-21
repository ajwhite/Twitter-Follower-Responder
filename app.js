var Stream = require('user-stream'),
    Twitter = require('node-twitter-api'),
    config = require('./local.env.js');

var stream = new Stream({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

var T = new Twitter({
  consumerKey: config.twitter.consumer_key,
  consumerSecret: config.twitter.consumer_secret
});

// create stream
stream.stream();
console.log("Stream initialized");

stream.on('data', function(data){
  if (data.event && data.event == 'follow'){
    console.log("Followed", data.source);
    sendDM(data.source.id);
  }
});


var sendDM = function(id){
  var message = {
    user_id: id,
    text: 'Thanks for following! Feel free to connect with me on LinkedIn https://www.linkedin.com/in/atticuswhite'
  };
  console.log("Sending DM", message);
  T.direct_messages("new", message, config.twitter.access_token_key, config.twitter.access_token_secret, function(resp){
    console.log("DM Sent", resp);
  });
};