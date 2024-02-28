/*
 * @Description: 
 * @Author: 舌红
 * @Date: 2024-02-28 14:42:15
 * @LastEditors: 舌红
 * @LastEditTime: 2024-02-28 15:29:42
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UpdateListener from '../dist/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UpdateListener()
  ],
})
