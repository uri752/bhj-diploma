/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {    
    User.register(data, (err, response) => {
      if (response && response.success) {        
        document.forms['register-form'].reset(); // сбросить данные формы
        App.setState('user-logged');
        const modalRegister = App.getModal('register'); 
        modalRegister.close();
      }
    });
  }
}