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
    // доработка - убрал лишний try
    try {
        if (method === 'GET') {
            let extUrl = '';
            for (key in data) {
                extUrl += (extUrl.length === 0 ? '' : '&') + key + '=' + data[key];
            }        
            curUrl = curUrl + '?' + extUrl;                   
        }   
        xhr.open(method, curUrl);
        xhr.send(data);
    } catch (err) {
        callback(err);
    }

    // доработка - используем событие 'load' вместо  xhr.addEventListener('readystatechange', () => {
    // событие load выполняется если запрос завершился успешно 
    xhr.addEventListener('load', () => {                              
        if (callback) {
            callback(err, xhr.response);
        }        
    });
    
    // доработка - возвращать xhr бессмысленно    
};
