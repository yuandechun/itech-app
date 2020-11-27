import axios from 'axios';
//import { Loading } from 'element-ui';

// 定义接口基础url
//const base_url = 'https://localhost:8443';
const base_url = 'http://localhost:8443';

// axios 配置
axios.defaults.timeout = 50000;

/*
// 定义loading变量
let loading;
//Loading 加载中
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

//Loading 关闭
function endLoading () {
  loading.close()
}
*/


//http request 拦截器
axios.interceptors.request.use(
  config => {
    //token验证
    if (sessionStorage.getItem('Authorization')) {
      config.headers.authorization = sessionStorage.getItem('Authorization');
    }
    //startLoading()
    config.data = JSON.stringify(config.data);
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 拼接url  
    config.url = base_url + config.url;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    //endLoading()
    let status = response.data.status;
    if (!status == 'SUCCESS') {
      this.router.push({
        path: "/404",
        querry: { redirect: this.router.currentRoute.fullPath } //从哪个页面跳转
      })
    }
    return response;
  },
  err => {
    return Promise.reject(err)
  }
)


//get function
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


//post function
export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}


//patch function
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}


//put function
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}


//delete function
export function del (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
