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
        // доработка
        const elSelect = this.element.querySelector('.accounts-select')
        if (elSelect) {
          elSelect.length = 0; // очистить список селектов
          for (let item of response.data) {
            let newOption = new Option(item.name, item.id);
            elSelect.append(newOption);
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
        
        // доработка
        //document.forms['new-income-form'].reset();                               
        this.element.reset();
        if (this.element.id === 'new-income-form') {
          const modalNewIncome = App.getModal('newIncome');
          modalNewIncome.close();
        } else {
          const modalNewExpense = App.getModal('newExpense');
          modalNewExpense.close();
        }        
      }
    });    
  }
}