/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

//const e = require("express");

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {    
    if (!element) {
      throw new Error('Переданный элемент не существует!');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const newAccount = document.querySelector('.create-account');    
    // событие нажатия на новый счет
    if (newAccount) {
      newAccount.addEventListener('click', (e) => {
        const modalNewAccount = App.getModal('createAccount');//#modal-new-account
        modalNewAccount.registerEvents();
        modalNewAccount.open();
      });
    } 
    
    // событие нажатия на существующий счет
    /*const currentAccounts = [...document.getElementsByClassName('account')];
    for (let curAccount of currentAccounts) {      
      curAccount.addEventListener('click', () => {
        this.onSelectAccount(curAccount);
      });
    }*/            

    // доработки - делегировать событие с элементов на весь родительский блок
    this.element.addEventListener('click', (event) => {      
      const curAccount = event.target.closest('.account');//event.target.querySelector('.account');      
      if (curAccount) {
        this.onSelectAccount(curAccount);
      }
    });

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {                
    let data = {};    
    Account.list(data, (err, response) => {
      if (response && response.success) {
        this.clear();
        this.renderItem(response.data);            
        //this.registerEvents();
      }
    });    
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    
    const accountElements = [...document.getElementsByClassName('account')];
    for(let el of accountElements){
      el.remove();
    };
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {        
    element.classList.add('active');
    const accountElements = [...document.getElementsByClassName('account')];
    for(let el of accountElements){
      if (el != element) {
        el.classList.remove('active');
      }
    };      
    App.showPage( 'transactions', { account_id: element.getAttribute('data-id') });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){   
    //active
    const htmlEl = `<li class="account" data-id=${item.id}>
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum} ₽</span>
        </a>
    </li>`;  
    return htmlEl;      
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){        
    for(let item of data) {
      const htmlEl = this.getAccountHTML(item);
      this.element.insertAdjacentHTML('beforeEnd',htmlEl);      
    }            
    
  }
}
