import axios from 'axios';
import store from "@/store"
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

const getUrl = function(type) {
    var url = "";
    switch (type) {
        case "upload":
            url = getURL("url") + "/upload/file.aspx?appId=2";
            break;
        case "url":
            url = "http://218.22.251.156/gj-app-4/data2.aspx?appId=2";
            if (store.state.user.userInfo.sessionID) {
                url += "&sessionID=" + store.state.user.userInfo.sessionID;
            }
            break;
        case "socket":
            url = "ws://ydzl.gujing.net:9091";
            break;
        default:
            alert('类型：' + type + '不存在！');

    }
    return url;
}
const postData = function(param) {
    return new Promise(
        function(resolve, reject) {
            axios.post(getUrl("url"), param).then(function(res) {
                if ("-201" == res.data.resulttype) {
                    realsoApp.$router.replace("/loginout");
                } else {
                    resolve(res.data);
                }
            }).catch(function(e) {
                reject(e);
            });
        }
    )
}

const open = function(params) {
    let param = {};
    if (params["sqlId"]) {
        param["tp"] = "query6";
        param["json"] = encodeURIComponent(JSON.stringify({ params }));
    } else {
        params["tp"] = "query1";
        param = params;
    }
    return postData(param);
}

const call = function(para) {
    let param = {
        tp: "call",
        json: encodeURIComponent(JSON.stringify({ para: para }))
    };
    return postData(param);
};


export default {
    getUrl,
    postData,
    open,
    call
}