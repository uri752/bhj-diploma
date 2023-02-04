/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const url = options.url;
    const method = options.method;
    const data = options.data;
    const callback = options.callback;

    let curUrl = url;
    let err = undefined;

    if (method === 'GET') {
        let extUrl = '';
        for (key in data) {
            extUrl += (extUrl.length === 0 ? '' : '&') + key + '=' + data[key];
        }        
        curUrl = curUrl + '?' + extUrl;
        try {
            xhr.open(method, curUrl);
            xhr.send();
        }
        catch (err) {
            callback(err);
        }
    } else {                                       
        try {
            xhr.open(method, curUrl);
            xhr.send(data);
        }
        catch (err) {
            callback(err);
        }
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState != xhr.DONE) {
            return;
        }                
        
        if (callback) {
            callback(err, xhr.response);
        }
        
    });
    
    return xhr;    
};
