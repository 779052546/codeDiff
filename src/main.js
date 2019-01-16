// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//  导入所有请求方法
import {getRequest} from './assets/lib/api';
import {postRequest} from './assets/lib/api';
import {deleteRequest} from './assets/lib/api';
import {putRequest} from './assets/lib/api';

//拦截器
import './assets/lib/interceptors.js';

//  向VUE的原型上添加请求方法
Vue.prototype.$get = getRequest;
Vue.prototype.$post = postRequest;
Vue.prototype.$delete = deleteRequest;
Vue.prototype.$put = putRequest;

Vue.use(iView);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});

