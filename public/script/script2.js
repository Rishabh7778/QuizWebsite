const btn1 = document.querySelector('.btn1');
const startscr = document.querySelector('.start-screen');
const startscrcont = document.querySelector('.start-screen-cont');
const section1 = document.querySelector('.section1');
const btn = document.querySelector('.btn');

btn1.onclick = () =>{
    startscr.classList.add('active');    
    startscrcont.classList.add('active');    
    section1.classList.add('active');
}



