import axios from 'axios';
import store from '../store'
import { OPENPAGELOADING, CLOSEPAGELOADING } from '../store/tagsView/actions'
// 创建axios对象
const instance = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
/* 添加一个计数器 */
let needLoadingRequestCount = 0

function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    store.dispatch({type: OPENPAGELOADING})
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    store.dispatch({type: CLOSEPAGELOADING})
  }
}

//添加请求拦截器
instance.interceptors.request.use(
  config => {
      //在发送请求之前做某事，比如加一个loading
      showFullScreenLoading()
      // showLoading.loading()
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers['Authorization'] = getToken()
      return config;
    },
    error => {
      tryHideFullScreenLoading()
      //请求错误时做些事
      return Promise.reject(error.response);
    }
);

//添加一个响应拦截器
instance.interceptors.response.use(
  response => {
    //在拿到请求后, 去除loading状态
    tryHideFullScreenLoading()
    // 1.成功
    return Promise.resolve(response);
  }, 
  error => {
    tryHideFullScreenLoading()
    // 失败,在拿到请求后, 去除loading状态
    // 400错误,正常返回错误信息
    // 500 错误. 正常返回错误信息
    // 401token过期, 无权限, 则自动刷新token续命
      return Promise.reject(error.response);
  }
);

export default instance;


const get = (url, params) => {
  return instance.get(url, params)
}

const post = (url, params) => {
  return instance.post(url, params)
}

const put = (url, params) => {
  return instance.put(url, params)
}

const del = (url, params) => {
  return instance.delete(url, params)
}
const patch = (url, params) => {
  return instance.patch(url, params)
}

export {
  get,
  post,
  put,
  del,
  patch
}
