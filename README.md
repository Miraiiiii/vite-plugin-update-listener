<!--
 * @Description: 
 * @Author: 舌红
 * @Date: 2024-01-12 11:28:47
 * @LastEditors: 舌红
 * @LastEditTime: 2024-02-28 15:20:03
-->
# vite-plugin-update-listener

## 使用说明

```powershell
1. npm install vite-plugin-update-listener --save-dev
```

```js
2. "vite.config.js"中进行配置：
    module.exports = {
      //...
      plugins: {
        UpdateListenerPlugin()
      }
      // ...
    }
```

```js
3. 提交信息含"--no-tip"则关闭一次更新提醒，否则版本发布后都会监听并且开启提醒
```