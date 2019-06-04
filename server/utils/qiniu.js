const express = require('express');
const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');

let app = express();
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "config.json")));
let mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);

let putExtra = new qiniu.form_up.PutExtra();
let options = {
  scope: config.Bucket,
  deleteAfterDays: 1,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};

let putPolicy = new qiniu.rs.PutPolicy(options);
let bucketManager = new qiniu.rs.BucketManager(mac, config);

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

app.get('/api/getImg', function(req, res) {
  let options = {
    limit: 5,
    prefix: 'image/test/',
    marker: req.query.marker
  };
  bucketManager.listPrefix(config.Bucket, options, function(err, respBody, respInfo) {
    if(err) {
      console.log(err);
      throw err;
    }

    if(respInfo.statusCode === 200) {
      let nextMarker = respBody.marker || '';
      let items = respBody.items;
      res.json({
        items: items,
        marker: nextMarker
      });
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });
});

app.get('/api/uptoken', function(req, res) {
  //    res.send('Hello World!');

  let token = putPolicy.uploadToken(mac);
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  if(token) {
    res.json({
      uptoken: token,
      domain: config.Domain
    });
  }
});

let server = app.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});