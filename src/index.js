/*
 * @Description: 
 * @Author: 舌红
 * @Date: 2024-02-28 14:12:38
 * @LastEditors: 舌红
 * @LastEditTime: 2024-02-28 15:18:53
 */
const { existsSync, writeFileSync } = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

export default function vitePluginUpdateListener(configs = {}) {
  return {
    name: 'vite-plugin-update-listener',
    enforce: 'pre',
    apply: 'build',
    writeBundle() {
      let gitInfo = {
        commitHash: '',
        isTip: true
      }

      // 获取子进程
      function getChildProcess(key) {
        return new Promise((resolve) => {
          exec(key, (err, stdout) => {
            if (err) {
              console.error(err)
              resolve(null)
            }
            resolve(stdout.trim())
          })
        })
      }

      // 获取git信息
      async function getGitInfo(callback) {
        return Promise.all([
          getChildProcess('git rev-parse HEAD'),
          getChildProcess('git log --no-merges --grep="^Revert" --invert-grep -1 --pretty=format:"%s"')
        ]).then(([commitHash, message]) => {
          const reg = /--no-tip/
          const info = {
            commitHash: commitHash,
            isTip: !reg.test(message)
          }
          callback && callback(info)
          return info
        }).catch(err => {
          console.error('git error', err)
        })
      }

      // 写入版本信息
      function setVersionInfo(info) {
        if (existsSync('./dist')) {
          try {
            writeFileSync('./dist/version.json', JSON.stringify(info), {
              encoding: 'utf8'
            })
            console.log('写入version.json成功')
          } catch (error) {
            console.log('写入version.json失败')
            console.error(error)
          }
        } else {
          setTimeout(setVersionInfo, 1000)
        }
      }

      async function setGitInfo() {
        gitInfo = await getGitInfo(info => {
          setVersionInfo(info)
        })
        console.log('资源输出到目录完成 afterEmit', gitInfo)
      }
      
      setGitInfo()
    }
  }
}