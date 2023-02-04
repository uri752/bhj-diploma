/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  url = '/account';

  static get(id = '', callback){    
    const options = {url: this.url,
      method: 'GET',
      data: {'id':id},
      callback: (err, response)=> {
        if (response && response.success) {
          //???
        }
        if (callback)  {
          callback(err, response, id);
        }
      }};
    const xhr = createRequest(options);
  }
}
