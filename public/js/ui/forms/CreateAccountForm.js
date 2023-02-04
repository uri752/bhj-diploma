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
    Account.url = '/account';
    Account.create(data, (err, response) => {
      if (response && response.success) {                 
        App.update()        
        document.forms['new-account-form'].reset();                
        const modalNewAccount = App.getModal('createAccount');
        modalNewAccount.close();        
      }
    });
  }
}