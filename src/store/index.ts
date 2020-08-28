import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleFiles = require.context('./modules', true, /\.ts$/);
const modules = moduleFiles.keys().reduce((modules: any, modulePath: string) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = moduleFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});


export default new Vuex.Store({
  modules
})
