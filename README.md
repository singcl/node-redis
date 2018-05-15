## 如何使用Ruby 创建Redis 集群。

### Redis cluster construction for building with nodejs.
 
### 使用

- `npm run installs` 将6个redis节点配置成windows 服务. 这样每次就会开机自启没用每次都是手动开启。
- `npm run start` 启动这个6个redis 节点服务。
- `npm run stop` 结束这个6个redis 节点服务。
- `npm run uninstalls` 卸载这6个之前配置的windows服务。

- `npm run cluster` 将上面6个redis 节点连接成集群模式。

*项目中redis文件夹是对官方redis安装包的一份拷贝。其中7000-7005文件夹是我自己添加的*

### EXAMPLE

在`example` 目录下分别给出通过ruby和js链接到redis集群进行操作的简单示例。

```js
// ioredis 链接到redis 集群
// @singcl/acl 对集群进行Acl权限数据读写

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
```

```rb
require './cluster'

if ARGV.length != 2
    startup_nodes = [
        {:host => "127.0.0.1", :port => 7001},
        {:host => "127.0.0.1", :port => 6789}
    ]
else
    startup_nodes = [
        {:host => ARGV[0], :port => ARGV[1].to_i}
    ]
end

rc = RedisCluster.new(startup_nodes,32,:timeout => 0.1)

last = false

while not last
    begin
        last = rc.get("__last__")
        last = 0 if !last
    rescue => e
        puts "error #{e.to_s}"
        sleep 1
    end
end

((last.to_i+1)..1000000000).each{|x|
    begin
        rc.set("foo#{x}",x)
        puts rc.get("foo#{x}")
        rc.set("__last__",x)
    rescue => e
        puts "error #{e.to_s}"
    end
    sleep 0.1
}
```
