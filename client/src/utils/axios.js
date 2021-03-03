import axios from 'axios'

// axios 配置
// axios.defaults.timeout = 1 * 60 * 1000
axios.defaults.baseURL = 'http://localhost:3001'

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.getItem('token')}` // 根据实际情况自行修改
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default axios
