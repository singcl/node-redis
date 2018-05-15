## 如何使用Ruby 创建Redis 集群。

### Redis cluster construction for building with nodejs.
 
### 使用

- `npm run installs` 将6个redis节点配置成windows 服务. 这样每次就会开机自启没用每次都是手动开启。
- `npm run start` 启动这个6个redis 节点服务。
- `npm run stop` 结束这个6个redis 节点服务。
- `npm run uninstalls` 卸载这6个之前配置的windows服务。

- `npm run cluster` 将上面6个redis 节点连接成集群模式。

*项目中redis文件夹是对官方redis安装包的一份拷贝。其中7000-7005文件夹是我自己添加的*