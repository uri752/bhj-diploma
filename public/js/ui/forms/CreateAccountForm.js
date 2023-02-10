/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {        
    Account.create(data, (err, response) => {
      if (response && response.success) {                 
        App.update()        
        
        // доработка
        //document.forms['new-account-form'].reset();                
        this.element.reset()

        const modalNewAccount = App.getModal('createAccount');
        modalNewAccount.close();        
      }
    });
  }
}