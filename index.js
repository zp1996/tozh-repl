const http = require('http');

// 发起请求
http.get(
  'http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4',
  function(res) {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log('请求发生错误~')
    }
    
  }
);
