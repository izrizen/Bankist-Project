'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const section1Button = document.querySelector('.btn--scroll-to');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav')

///////////////////////////////////////
// Modal window
//Open Modal Function
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//Closes Modal Function
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Loops and grabs all Open Modal Buttons
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
//Closes Modal with a Button
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//Exit the Modal with Esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scroll to Sextion 1
section1Button.addEventListener('click',(e)=>{
  e.preventDefault();
  section1.scrollIntoView({behavior:"smooth"},section1)
});

nav.addEventListener('click',function(e){
    e.preventDefault()
    if(e.target.classList.contains('nav__link')){
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth',},id);
    }
})

const container = document.querySelector('.operations')

//Tab Content Container Operations Tab
tabContainer.addEventListener('click',function(e){
  //Grabs Clicked Tab No matter if its the span in the buttom
  const clickedTab = e.target.closest('.operations__tab')

  //Returns if the clicked part of the container isn't the button
  if(!clickedTab)return//
  //Removes the classes of active from all tabs/content elements
  tabs.forEach(tab=>tab.classList.remove('operations__tab--active'))
  tabContents.forEach(e=>e.classList.remove('operations__content--active'))

  //Adds the active class to currently clicked elements and its content
  clickedTab.classList.add('operations__tab--active')
  tabs.forEach(tab=>{
    if(tab.classList.contains('operations__tab--active')){
      container.style.borderColor = window.getComputedStyle(tab).backgroundColor;
    }
  })
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active');


})
//Fade Links Animation
const fadeEffect = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    siblings.forEach(el=>{if(el !== link)el.style.opacity = this})
  }
}
//Fades
nav.addEventListener('mouseover',fadeEffect.bind(.5))
nav.addEventListener('mouseout',fadeEffect.bind(1))




const cords = section1.getBoundingClientRect()
window.addEventListener('scroll',function(){
    if(this.scrollY > cords.top)nav.classList.add('sticky')
    else(nav.classList.remove('sticky'))
})




//Scroll to Top Button
document.querySelector(".scrollTop").addEventListener('click',()=>document.querySelector('.header').scrollIntoView({behavior:'smooth'}))


for(let i = 0;i>3;i++){
  console.log(1);
}
