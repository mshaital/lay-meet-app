/**
 * qiniu
 * Created by dell on 2018/5/31.
 */
'use strict'
const qiniu = require('qiniu')
const accessKey = 'your access key';
const secretKey = 'your secret key';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const qiniuConfig = new qiniu.conf.Config();
// 空间对应的机房
qiniuConfig.zone = qiniu.zone.Zone_z0;



module.exports = ()=> {
  var options = {
    scope: bucket,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  let formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
  let putExtra = new qiniu.form_up.PutExtra();
  let key='test.txt';
  formUploader.put(uploadToken, key, "hello world", putExtra, function(respErr,
                                                                       respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody);
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });
}
