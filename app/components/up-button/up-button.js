export default (function upButton() {
    const upButton = document.querySelector('.up-button');
    const html = document.documentElement;
    const body = document.body;
    window.onscroll = function() {
        const scrollTop = html.scrollTop || body && body.scrollTop || 0;
        if(scrollTop > 0) {
            setTimeout(function(){
                upButton.style.display = "block"
            }, 10)
            
        } else {
            setTimeout(function(){
                upButton.style.display = "none"
            }, 10)
            
        }
    }
    upButton.addEventListener('click', function() { 
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
    

})()