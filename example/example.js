var Redis = require('ioredis')
var Acl = require('@singcl/acl')

var redis = new Redis.Cluster([{
    port: 7000,
    host: '127.0.0.1'
  }, {
    port: 7001,
    host: '127.0.0.1'
  }, {
    port: 7002,
    host: '127.0.0.1'
}]);


//var redis = new Redis()

// cluster.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {})
// redis.sadd("hashsss", "some value");

var acl = new Acl(new Acl.redisBackend(redis, 'dap_acl'));


// acl.removeUserRoles('joed', 'member', function(err) {
  //   console.log(err)
  // })
acl.allow('member', '/api/admin/analysis/product/url/download/id', ['post'])    // 数据下载
acl.allow('member', '/api/admin/analysis/download/plan/success', ['get'])       // URL下载

acl.addUserRoles('admin', 'member', function(err) {
    console.log(err)
})

// acl.removeUserRoles('admin', 'member')

acl.isAllowed('admin', '/api/admin/analysis/product/url/download/id', 'post', function(err, res){
  console.log(err)
  if(res){
      console.log("User admin is allowed to view blogs")
  }
})
acl.whatResources('member', function(err, r) {
  console.log(r)
})