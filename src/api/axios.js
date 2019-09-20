import axios from "axios"
import store from '@/store';
import {  Notify } from 'vant'
import router from '@/router'
let cancel,
    promiseArr = {};
const CancelToken = axios.CancelToken;
axios.defaults.maxRedirects = 8;
axios.defaults.baseURL = "/";
//设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 25000;

let urlTimer = {};
export default {
  //get请求
  get(urlObj, param) {
    if (urlObj.isOpenLoading) {
    }
    return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: urlObj.url,
          params: param,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Format": "json"
          },
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          if (res && res.data) { 
            resolve(res && res.data);
            store.commit('SHOW_LOADMORE', false)
          }else if(res) {
            resolve(res);
          }
        });
    });
  },
  //put请求
  put(urlObj, param ) {
    if (urlObj.isOpenLoading) {
    }
    return new Promise((resolve, reject) => {
      clearTimeout(urlTimer[urlObj.url]);
      urlTimer[urlObj.url] = setTimeout(function () {
        axios({
          method: "put",
          url: urlObj.url,
          data : param,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Format": "json"
          },
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          if (res && res.data) { 
            resolve(res && res.data);
          }else if(res) {
            resolve(res);
          }
        });
      }, 500)

    });
  },
  //post请求
  post(urlObj, param, isChangeHeader = false) {
    if (urlObj.isOpenLoading) {
      // todo 待实现
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: urlObj.url,
        data: param,
        headers: isChangeHeader == false ? { "Content-Type": "application/json;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" } : { 'Content-Type': 'multipart/form-data' },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        if (res && res.data) { 
          resolve(res && res.data);
        }else if(res) {
          resolve(res);
        }
      });
    });
  },
  //img get请求
  imgGet(urlObj, param) {
    if (urlObj.isOpenLoading) {
        
    }
    return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: urlObj.url,
          params: param,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Format": "json"
          },
          responseType: 'arraybuffer',
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          if (res && res.data) { 
            resolve(res && res.data);
          }else if(res) {
            resolve(res);
          }
        });
    });
  },
};

//响应拦截器即异常处理
axios.interceptors.response.use(
    response => {
      // console.log(response.data.message)
      return response;
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:           
            error.message = error.response.data.message;
            Notify({ type: 'danger', message: error.message });
            break;
          case 401:
            error.message = error.response.data.message;
            Notify({ type: 'danger', message: error.message });
            router.push('/user/login');
            store.commit('IS_LOGIN', false)
            break;
          case 4001:
            error.message = "操作失败,请重试";
            Notify({ type: 'danger', message: error.message });
            break;
          case 403:
            error.message = "拒绝访问";
            Notify({ type: 'danger', message: error.message });
            break;
          case 404:
            error.message = "请求错误,未找到该资源";
            Notify({ type: 'danger', message: error.message });
            break;
          case 405:
            error.message = "请求方法未允许";
            Notify({ type: 'danger', message: error.message });
            break;
          case 408:
            error.message = "请求超时";
            Notify({ type: 'danger', message: error.message });
            break;
          case 500:
            error.message = "服务器端出错";
            Notify({ type: 'danger', message: error.message });
            break;
          case 501:
            error.message = "网络未实现";
            Notify({ type: 'danger', message: error.message });
            break;
          case 502:
            error.message = "网络错误";
            Notify({ type: 'danger', message: error.message });
            break;
          case 503:
            error.message = "服务不可用";
            Notify({ type: 'danger', message: error.message });
            break;
          case 504:
            error.message = "网络超时";
            Notify({ type: 'danger', message: error.message });
            break;
          case 505:
            error.message = "http版本不支持该请求";
            Notify({ type: 'danger', message: error.message });
            break;
          default:
            Notify({ type: 'danger', message: error.message });
            error.message = `连接错误${error.response.status}`;
        }
      } else {
        if (error.message == "操作取消") {
        }
        else{
          error.msg = "请求超时,请刷新请重试";
        }
      }
      
      return Promise.resolve(error);
    }
  );