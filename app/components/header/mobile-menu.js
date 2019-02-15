
export default (function mobileMenu () {
    const mobileMenu = document.querySelector('.header__mobile-menu_click');
    const mobileMenuNav = document.querySelector('.header__mobile-nav');
    mobileMenu.addEventListener('click', function() {     
        mobileMenu.classList.toggle('header__mobile-menu_close');
        if(!mobileMenuNav.classList.contains('open-menu')) {
            mobileMenuNav.classList.toggle('open-menu'); 
        } else {
            mobileMenuNav.classList.toggle('close-menu'); 
            mobileMenuNav.classList.toggle('open-menu');        
            setTimeout(function() {
                mobileMenuNav.classList.toggle('close-menu');    
            }, 300)        
        }
    })
})();
