/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static url = '/account';

  static get(id = '', callback){    
    const options = {url: this.url,
      method: 'GET',
      data: {'id':id},
      callback: callback
    };    
    createRequest(options);
  }
}
