import axios from 'axios';
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

const getUrl = function (type) {
  var url = "";
  switch (type) {
    case "upload":
      url = getURL("url") + "/upload/file.aspx?appId=2";
      break;
    case "url":
      url = "http://ydzl.gujing.net:9090/gj-app-3/data2.aspx?appId=2";
      break;
    case "socket":
      url = "ws://ydzl.gujing.net:9091";
      break;
    default:
      alert('类型：' + type + '不存在！');

  }
  return url;
}
const postData = function (param) {
  return new Promise(
    function (resolve, reject) {
      axios.post(getUrl("url"), param).then(function (res) {
        resolve(res.data);
      }).catch(function (e) {
        reject(e);
      });
    }
  )
}
export default {
  getUrl,
  postData
}
