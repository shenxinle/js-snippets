/**
 * 构建 script
 * 全局唯一 callback，用后删除
 * @param {string} url
 * @param {object || null} params
 * @param {func} callback
 */
export const jsonp = (url, params, callback, onError) => {
  let callbackName = 'callback' + String(Math.random()).replace('.', '');
  params = params || {};
  params.callback = callbackName;
  let fullUrl = param(url, params);

  let script = document.createElement('script');
  script.src = fullUrl;

  window[callbackName] = (data) => {
    callback && callback(data);
    delete window[callbackName];
    document.body.removeChild(script);
  };
  script.onerror = () => {
    onError && onError();
  };

  document.body.appendChild(script);
}

/**
 * @param {string} url
 * @param {object} params  只考虑简单的对象
 */
export const param = (url, params) => {
  let arr = [];
  if (params) {
    for (let key in params) {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`);
    }
  }
  return url + (url.indexOf('?') === -1 ? '?' : '&') + arr.join('&');
}


/**
 * 测试
 *
 * jsonp('https://api.asilu.com/weather/',{ city: '上海' },(data) => {console.log('res', data)})
 *
 */
