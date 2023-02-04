//const { response } = require("express");

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {    
    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userJSON = localStorage.getItem('user');
    let user = undefined;
    if (userJSON) {
      user = JSON.parse(userJSON)
    }
    return user;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {            
    const options = {url:'/user/current', 
      method:'GET',
      callback: (err, response) => {
        if (response && response.success && response.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      }};    
    const xhr = createRequest(options);    
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {                
    const options = {url: '/user/login',
      method: 'POST',
      data: data,
      callback: (err, response) => {
        if (response && response.success &&response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }};
    
    const xhr = createRequest(options);                
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {    
    const options = {url: '/user/register',
      method: 'POST',
      data: data,
      callback: (err, response) => {
        if (response && response.success &&response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }};
    const xhr = createRequest(options);   
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {    
    const options = {url: '/user/logout',
      method: 'POST',
      callback: (err, response)=> {
        if (response && response.success) {
          User.unsetCurrent();          
        }
        if (callback)  {
          callback(err, response);
        }
      }};
    
    const xhr = createRequest(options);
  }
}
