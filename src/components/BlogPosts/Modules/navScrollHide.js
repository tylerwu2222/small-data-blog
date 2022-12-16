document.addEventListener("DOMContentLoaded", function(){

    var el_autohide = document.querySelector('.autohide');

    // add padding-top to body (if necessary)
    var navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';
  
    if(el_autohide){
        var last_scroll_top = 0;
        window.addEventListener('scroll', function() {
        let scroll_top = window.scrollY;
        if(scroll_top < last_scroll_top) {
            el_autohide.classList.remove('scrolled-down');
            el_autohide.classList.add('scrolled-up');
        }
        else {
            el_autohide.classList.remove('scrolled-up');
            el_autohide.classList.add('scrolled-down');
        }
        last_scroll_top = scroll_top;
      }); // window.addEventListener
    }// if
    
   
  }); // DOMContentLoaded  end