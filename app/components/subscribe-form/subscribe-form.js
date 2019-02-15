export default (function subscribeForm () {
    const subscribeForm = document.querySelector('.subscribe-form');
    const subscribeFormAlert = document.querySelector('.subscribe-form__alert');
    const emailInput = document.querySelector('.subscribe-form__email-input');
    const subscribeFormCheckbox = document.querySelector('.checkbox__input_theme_subscribe-form');
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    subscribeForm.addEventListener('submit', function(e){
        e.preventDefault();
        if(validateEmail(emailInput.value) && subscribeFormCheckbox.checked) {
            let sendForm = {
                email: emailInput.value,
                subscribe: true
            }
            emailInput.value = '';
            subscribeFormCheckbox.checked = false;
            subscribeFormAlert.style.color = 'lawngreen';
            subscribeFormAlert.innerText = 'Ваш email успешно отправлен, благодарим за подписку.';
        } 
        else if(validateEmail(emailInput.value) && !subscribeFormCheckbox.checked) {
            subscribeFormAlert.style.color = 'red';
            subscribeFormAlert.innerText = 'Пожалуйста, поставьте галочку для согласия.';
        }
        else {
            subscribeFormAlert.style.color = 'red';
            subscribeFormAlert.innerText = 'Некорректный email. Пожалуйста повторите попытку';
        }
    })
})()