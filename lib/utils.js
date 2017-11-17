'use strict';

const crypto = require('crypto');

/**
 * 采用md5加密
 * @param {string} str - 原字符串
 * @return {string} result string
 */
exports.md5 = function(str) {
  return crypto
    .createHash('md5')
    .update(String(str))
    .digest('hex');
};

/**
 * 生成salt, 时间戳(2) + 随机字母(8)
 * @return {string} result string
 */
exports.getSalt = function() {
  let time = Date.now() % 100;
  let str = '';
  time = time === 0 ? '00' : String(time);
  for (let i = 0; i < 8; i++) {
    const base = Math.random() < 0.5 ? 65 : 97;
    str += String.fromCharCode(
      base +
            Math.floor(
              Math.random() * 26
            )
    );
  }
  return time + str;
};
