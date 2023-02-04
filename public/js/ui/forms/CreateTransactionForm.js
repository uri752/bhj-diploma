/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);    
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let data = {};
    Account.list(data, (err, response) => {            
      if (response && response.success) {                
        /*this.renderItem(response.data);            
        this.registerEvents();*/
        const elSelectIncome = document.getElementById('income-accounts-list');        
        if (elSelectIncome) {
          elSelectIncome.length = 0; // очистить список селектов
          for (let item of response.data) {
            let newOption = new Option(item.name, item.id);
            elSelectIncome.append(newOption);
          }
        }

        const elSelectExpense = document.getElementById('expense-accounts-list');        
        if (elSelectExpense) {
          elSelectExpense.length = 0; // очистить список селектов
          for (let item of response.data) {
            let newOption = new Option(item.name, item.id);
            elSelectExpense.append(newOption);
          }
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {            
    Transaction.url = '/transaction';
    Transaction.create(data, (err, response) => {
      if (response && response.success) {                 
        App.update()        
        
        document.forms['new-income-form'].reset();                
        const modalNewIncome = App.getModal('newIncome');
        modalNewIncome.close();        

        document.forms['new-expense-form'].reset();                
        const modalNewExpense = App.getModal('newExpense');
        modalNewExpense.close();        
      }
    });    
  }
}