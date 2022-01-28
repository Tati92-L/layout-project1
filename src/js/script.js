var scrollPosition = window.scrollY;
var mainHeader = document.getElementsByClassName('header')[0];
var sectionHeaders = document.querySelectorAll('.section-header')
var headersPositions = []

sectionHeaders.forEach(item => {
    headersPositions.push(item.offsetTop)
});
console.log(headersPositions)


let fadeHeader = function (array, position) {
    let curPosition = -1;
    let count;
    for(let i = 0; i < array.length; i++){
        if(array[i] < position){ curPosition = i }
    }
    if(curPosition >= 0){
        makeFade(curPosition)
    }
    function makeFade(pos){
        if(pos !== count){
            console.log(pos)
        }
        count = pos
        sectionHeaders[pos].classList.add('current')
    }
}

// 1 проверить текущий скролл
// 2 сравнить его с необходимой точкой заголовка
// 3 выбрать необходимый заголовок
// 4 изменить его прозрачность в соответсвии близости к концу

window.addEventListener('scroll', function() {

    scrollPosition = window.scrollY;
    fadeHeader(headersPositions, scrollPosition)
    if (scrollPosition >= 80) {
        mainHeader.classList.add('header-fixed');
    } else {
        mainHeader.classList.remove('header-fixed');
    }

});


// window.addEventListener('scroll', function() {

//     let currentPosition = window.scrollY;
//     if(currentPosition > )
//     console.log(currentPosition)

// });

(function () {

    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.navigation');
    const menuCloseItem = document.querySelector('.header_nav_close');
    burgerItem.addEventListener('click',() => {
        menu.classList.add('navigation_active');
    });
    menuCloseItem.addEventListener('click',()=>{
        menu.classList.remove('navigation_active');
    });

}());

(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());
