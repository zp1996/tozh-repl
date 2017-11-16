const http = require('http');
const { md5, getSalt } = require('./utils');
const { appid, apikey } = require('./config');

const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate';

/**
 * 错误code对应解释
 */
const errorMsg = {
  '52001': '请求超时，请重试',
  '52002': '系统错误，请重试',
  '52003': '请前往百度开放平台检查您的appid是否正确，或者服务是否开通',
  '54005': '请您降低长句子翻译频率，3s后再试',
  '54003': '请降低您的调用频率',
  '58001': '译文语言方向不支持',
};
const defaultMsg = '未知错误，请打脸->1179258516@qq.com';

/**
 * 基于百度翻译的api
 */
function requestTranslate(word) {
  const salt = getSalt();
  const data = {
    q: word,
    from: 'auto',
    to: 'zh',
    appid,
    salt,
    sign: md5(appid + word + salt + apikey)
  };
  const search = Object.keys(data).reduce(
    (s, k) => `${s}&${k}=${data[k]}`, ''
  ).slice(1);

  return new Promise((resolve, reject) => {
    http.get(
      `${url}?${search}`,
      function(res) {
        const { statusCode } = res;
        if (statusCode !== 200) {
          reject('请求失败~');
        }

        const chunks = [];
        let size = 0;
        res.on('data', (chunk) => {
          chunks.push(chunk);
          size += chunk.length;
        });

        res.on('end', () => {
          const buf = Buffer.concat(chunks, size);
          const str = buf.toString('utf8');
          try {
            const data = JSON.parse(str);
            if (data.error_code) {
              reject(errorMsg[data.error_code] || defaultMsg);
            }
            resolve(data.trans_result);
          } catch(err) {
            reject(err.message);
          }
        });
      }
    );
  });
}

requestTranslate('I like eat apple')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })
