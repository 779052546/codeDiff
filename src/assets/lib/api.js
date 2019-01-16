//  引入axios文件包
import axios from 'axios';

// POST 方法封装  (参数处理)
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// POST 方法封装  (文件上传)
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

//  GET 方法封装
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: url
    });
};

//  PUT 方法封装
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

//  DELETE 方法封装
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: url
    });
};
