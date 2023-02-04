/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    
    const buttonSlideBarToggle = document.querySelector('.sidebar-toggle');
    buttonSlideBarToggle.addEventListener('click', () => {
      const elementSidebarMini = document.querySelector('.sidebar-mini');
      elementSidebarMini.classList.toggle('sidebar-open');
      elementSidebarMini.classList.toggle('sidebar-collapse');

    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const menuItemLogin = document.querySelector('.menu-item_login');
    menuItemLogin.addEventListener('click',() => {      
      const modalLogin = App.getModal('login');      
      modalLogin.registerEvents();
      modalLogin.open();
    });
    
    const menuItemRegister = document.querySelector('.menu-item_register');
    menuItemRegister.addEventListener('click',() => {      
      const modalRegister = App.getModal('register');      
      modalRegister.registerEvents();
      modalRegister.open();
    });
    
    const menuItemLogout = document.querySelector('.menu-item_logout');
    menuItemLogout.addEventListener('click',() => {      
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState('init');
        }        
      });
    });
  }
}