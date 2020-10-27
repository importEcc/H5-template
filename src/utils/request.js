// 设置请求统一信息
import axios from 'axios'
import qs from 'qs'
import apiConfig from '../../config/index.js'
import md5 from 'js-md5'
import store from '@/store'
const service = axios.create({
  timeout: 300000 // 超时设置
})

let hasLogoutStatus = false // 是否某个请求存在需要退出的状态

const queue = [] // 请求队列

const CancelToken = axios.CancelToken // axios内置的中断方法

/**
 * 拼接请求的url和方法；
 * 同样的`url + method` 可以视为相同的请求
 * @param {Object} config 请求头对象
 */
const token = config => {
  return `${config.url}_${config.method}`
}

/**
 * 中断重复的请求，并从队列中移除
 * @param {Object} config 请求头对象
 */
const removeQueue = config => {
  for (let i = 0, size = queue.length; i < size; i++) {
    const task = queue[i]
    if (!task) return
    // 出现401，403状态码中断后续请求
    const isLogout = token(config).includes('logout')
    // 退出接口跳过中断逻辑
    if (!isLogout && hasLogoutStatus) {
      task.token()
      queue.splice(i, 1)
    } else {
      const cancelMethods = ['post', 'put', 'delete'] // 需要中断的请求方式
      const { method } = config
      if (cancelMethods.includes(method)) {
        if (task.token === token(config)) {
          task.cancel()
          queue.splice(i, 1)
        }
      }
    }
  }
}

/**
 * 请求错误统一处理
 * @param {Object} response 错误对象
 */
const errorHandle = response => {
  const { status } = response
  hasLogoutStatus = status === 401 || status === 403
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 中断之前的同名请求
    removeQueue(config)
    // 添加cancelToken
    config.cancelToken = new CancelToken(c => {
      queue.push({ token: token(config), cancel: c })
    })
    // 添加请求头
    // config.headers[key] = '...'
    if (store.getters.config.headers) {
      Object.keys(store.getters.config.headers).forEach(key => {
        config.headers[key] = store.getters.config.headers[key];
      });
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 在请求完成后，自动移出队列
    removeQueue(response.config)
    // 错误码处理
    if (response.status !== 200) {
      return Promise.reject(response)
    }
    return response
  },
  error => {
    const { response } = error
    if (response) {
      // 错误处理
      errorHandle(response)
      return Promise.reject(response)
    } else {
      // 请求超时
      if (error.message.includes('timeout')) {
        console.log('超时了')
        // messages('error', '请求已超时，请刷新或检查互联网连接');
      } else {
        // 断网，可以展示断网组件
        console.log('断网了')
        // messages('error', '请检查网络是否已连接');
      }
    }
  }
)

export default {
  axios,
  get: (url, data = {}, headers = {}) => {
    const xntoken = md5(`${url}xN411`);
    const _headers = { ...headers, xntoken };
    return new Promise((resolve, reject) => {
      service
        .get(apiConfig.baseUrl + url, { params: data }, _headers
        )
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    }).catch(error => {
      throw new Error(error)
    })
  },
  exportFile: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .post(apiConfig.baseUrl + url, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          responseType: 'blob'
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          resolve(error)
        })
    }).catch(error => {
      return Promise.reject(error)
    })
  },
  exportFormDataFile: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .post(apiConfig.baseUrl + url, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          withCredentials: true,
          transformRequest: [
            data => {
              return qs.stringify(data)
            }
          ],
          responseType: 'blob'
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          resolve(error)
        })
    }).catch(error => {
      return Promise.reject(error)
    })
  },
  post: (url, data = {}, headers = {}) => {
    const xntoken = md5(`${url}xN411`);
    const _headers = { ...headers, xntoken };
    const { userid, user_token } = data;
    const userInfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if (!userid) {
      const _userId = userInfo ? userInfo.id : 1;
      data.userid = _userId;
    }
    if (!user_token) {
      const user_token = userInfo ? md5(`${userInfo.id}c0411`) : md5(`1c0411`);
      data.user_token = user_token;
    }
    return new Promise((resolve, reject) => {
      service
        .post(apiConfig.baseUrl + url, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            ..._headers
          },
          transformRequest: [
            data => {
              return qs.stringify(data)
            }
          ]
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    }).catch(error => {
      return Promise.reject(error)
    })
  },
  put: (url, data = {}) => {
    const xntoken = md5(`${url}xN411`);
    const _headers = { ...headers, xntoken };
    return new Promise((resolve, reject) => {
      service
        .put(apiConfig.baseUrl + url, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            _headers
          },
          withCredentials: true,
          transformRequest: [
            data => {
              return qs.stringify(data)
            }
          ]
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          throw new Error(error)
        })
    }).catch(error => {
      throw new Error(error)
    })
  },
  putJson: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .put(apiConfig.baseUrl + url, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          throw new Error(error)
        })
    }).catch(error => {
      throw new Error(error)
    })
  },
  postJson: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .post(apiConfig.baseUrl + url, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          throw new Error(error)
        })
    }).catch(error => {
      throw new Error(error)
    })
  },
  delete: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .delete(apiConfig.baseUrl + url, {
          data
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          throw new Error(error)
        })
    }).catch(error => {
      throw new Error(error)
    })
  },
  deleteJson: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .delete(apiConfig.baseUrl + url, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          data
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          throw new Error(error)
        })
    }).catch(error => {
      throw new Error(error)
    })
  }
}
