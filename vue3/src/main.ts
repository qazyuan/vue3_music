import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ComPositionApi from '@vue/composition-api';
Vue.use(ComPositionApi);
new Vue({
  render: h => h(App),
}).$mount('#app')
