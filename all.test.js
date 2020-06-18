const pluginTester = require('babel-plugin-tester').default;
import babelPluginDebugFunctions from './index.js'
const path = require('path');

pluginTester({
  plugin: babelPluginDebugFunctions,
  pluginName: '@rob.j.qva/babel-plugin-debug-functions',
  fixtures: path.join(__dirname, 'fixtures'),
  formatResult: r => r
})
