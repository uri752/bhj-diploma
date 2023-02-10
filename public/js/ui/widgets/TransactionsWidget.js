/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {    
    if (!element) {
      throw new Error('Переданный элемент не существует');
    }    
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {        
    const btnIncome = document.querySelector('.create-income-button');
    btnIncome.addEventListener('click', () => {
      const modalNewIncome = App.getModal('newIncome');
      modalNewIncome.registerEvents();
      modalNewIncome.open();
    });

    const btnExpense = document.querySelector('.create-expense-button');
    btnExpense.addEventListener('click', () => {
      const modalNewExpense = App.getModal('newExpense');
      modalNewExpense.registerEvents();
      modalNewExpense.open();      
    });
  }
}
