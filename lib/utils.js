const crypto = require('crypto');

/**
 * 采用md5加密
 */
exports.md5 = function(str) {
  return crypto
    .createHash('md5')
    .update(String(str))
    .digest('hex');
};

/**
 * 生成salt, 时间戳(2) + 随机字母(8)
 */
exports.getSalt = function() {
    var time = Date.now() % 100;
    var str = '';
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
