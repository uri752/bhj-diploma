/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Переданный элемент не существует!');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {    
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
   
    // Доработка - делегировать событие с элементов крестиков на весь родительский блок.
    // То есть, вам нужно добавить обработчик события на весь element, а внутри обработчика проверять:
    // кликнули вы на крестик, или на кнопку удаления счёта, или вообще мимо
    this.element.addEventListener('click', (event) => {      
      debugger;            
      const curEl = event.target.closest('button');//event.target;
            
      if (curEl.classList.contains('transaction__remove')) {
        const transactionId = curEl.getAttribute('data-id');
        App.pages.transactions.removeTransaction(transactionId);        
      } 

      if (curEl.classList.contains('remove-account')) {
        App.pages.transactions.removeAccount();
      }
    });

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {    
    if (!this.lastOptions){
      return;
    }

    let isRemove = confirm("Вы действительно хотите удалить счет?");
    if (isRemove) {      
      const account_id = this.lastOptions.account_id;      
      const data = new FormData();
      data.append('id',account_id);      
      
      Account.remove(data, (err, response) => {
        if (response && response.success) {          
          App.pages.transactions.clear();          
          App.updateWidgets();
          App.updateForms();
        }
      });      
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {    
    let isRemove = confirm("Вы действительно хотите удалить транзакцию?");
    if (isRemove) {
      Transaction.url = '/transaction';      
      const data = new FormData();
      data.append('id',id);      
      Transaction.remove(data, (err, response) =>  {        
        if (response && response.success) {          
          App.update();
          App.updatePages();
        }
      });
     
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
        
    if (!options) {
      return;
    }
    
    this.lastOptions = options;

    const account_id = options.account_id;    
    Account.get(account_id, (err, response, account_id) => {
      if (response && response.success) {        
        
        let curAccount = response.data.find((account) => account.id === account_id);//'cq3o4a4ldkfz2u9');

        App.pages.transactions.renderTitle(curAccount.name);//response.name);

      }
    });
    
    let data = {'account_id':account_id};
    Transaction.list(data, (err, response) => {
      if (response && response.success) {                        
        App.pages.transactions.clearPage();
        App.pages.transactions.renderTransactions(response.data);
        //App.pages.transactions.registerEvents();
      }
    });    
    
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {    
    this.clearPage();       
    this.renderTransactions([]);
    this.renderTitle('Название счёта')
    this.lastOptions = null;
  }

  clearPage() {
    // очистить страницу от списка транзакций предыдущего счета 
    const prevTransactions = [...document.getElementsByClassName('transaction')];
    for (let transaction of prevTransactions) {
      transaction.remove();
    } 
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const elContentTitle = document.querySelector('.content-title');
    elContentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];        
    const curDate = new Date(date);
    const year = curDate.getFullYear();
    const month = curDate.getMonth();
    const day = curDate.getDate();
    const hours = curDate.getHours();
    const minutes = curDate.getMinutes();    
    
    //'10 марта 2019 г. в 03:20';
    const resultDate = '' + day +' ' + months[month]+ ' ' + year + ' г. в ' + hours + ':' + minutes;        
    return resultDate; 
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    
    /*{
      "account_id": "1",
      "created_at": "2019-09-19 20:12:02",
      "id": "3",
      "name": "Копилка",
      "sum": 1500,
      "type": "income",
      "user_id": "1"
    }*/

    // либо transaction_expense, либо transaction_income
    const transactionType = item.type === 'income' ? 'transaction_income' : 'transaction_expense';
    const htmlTransaction = `<div class="transaction ${transactionType} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
      ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id=${item.id}>
            <i class="fa fa-trash"></i>  
        </button>
    </div>
    </div>`;

    return htmlTransaction;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    for (let item of data) {
      const htmlEl = this.getTransactionHTML(item);      
      
      // доработка - добавить транзакции в нужный блок
      const elContent = this.element.querySelector('.content')
      if (elContent) {
        elContent.insertAdjacentHTML('beforeEnd',htmlEl);
      } 
    }
  }
}