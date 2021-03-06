///Navbar issuse
(()=>{
const hamburgerBtn=document.querySelector(".hamburger-btn"),
navMenu=document.querySelector(".nav-menu"),
closeNavBtn=navMenu.querySelector(".close-nav-menu");

hamburgerBtn.addEventListener("click",showNavMenu);
closeNavBtn.addEventListener("click",closeNavMenu);

function showNavMenu() {
    navMenu.classList.add("open")
}
function closeNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle()
}

function fadeOutEffect(){
document.querySelector(".fade-out-effect").classList.add("active");
setTimeout(() => {
    document.querySelector(".fade-out-effect").classList.remove("active");
}, 300);
}

//attach event handler to document
document.addEventListener("click",(event)=>{
    if (event.target.classList.contains("link-item")) {
   console.log(event.target.hash) 
   if (event.target.hash !=="") {  
    event.preventDefault();

    const Hash=event.target.hash;

      document.querySelector(".section.active").classList.add("hide");
      document.querySelector(".section.active").classList.remove("active"); 

     document.querySelector(Hash).classList.add("active");
     document.querySelector(Hash).classList.remove("hide");
 
     navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
     navMenu.querySelector(".active").classList.add("active","inner-shadow");
if (navMenu.classList.contains("open")) {
     event.target.classList.add("active","inner-shadow");
     event.target.classList.remove("outer-shadow","hover-in-shadow");

     closeNavMenu();
}
else{
    let navItems=navMenu.querySelectorAll(".link-item");
    navItems.forEach((item)=>{
        if (Hash===item.hash) {
      item.classList.add("active","inner-shadow");
      item.classList.remove("outer-shadow","hover-in-shadow");
        }
    })
    fadeOutEffect();
}
window.location.hash=Hash;
   }    
    }
})
})();
//about selection tabs////

(()=>{
    const aboutSelection=document.querySelector('.about-section'),
    tabsContainer=document.querySelector('.about-tabs');

    tabsContainer.addEventListener("click",(event)=>{

        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains('active')){
         const target= event.target.getAttribute("data-target");
         
         tabsContainer.querySelector('.active').classList.remove('outer-shadow','active');

         event.target.classList.add("active","outer-shadow");
         aboutSelection.querySelector(".tab-content.active").classList.remove("active");
         aboutSelection.querySelector(target).classList.add("active");
        }
    })
}) ();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}














//portfolio filtered popup section interactivity //
(()=>{
const filterContainer =document.querySelector(".portfolio-filter"),
portfolioItemsContainer=document.querySelector(".portfolio-items"),
porfolioItems = document.querySelectorAll(".portfolio-item"),
popup = document.querySelector(".portfolio-popup"),
prevBtn=document.querySelector(".pp-prev"),
nextBtn = document.querySelector(".pp-next"),
closeBtn=document.querySelector(".pp-close"),
projectDetailsContainer = popup.querySelector(".pp-details"),
projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
let itemIndex,slideIndex,screenshots;
//filter portfolio items
filterContainer.addEventListener('click',(event)=>{
    if (event.target.classList.contains('filter-item') &&  !event.target.classList.contains('active')) {
    filterContainer.querySelector('.active').classList.remove('outer-shadow','active');
    event.target.classList.add('active','outer-shadow');  
    
    const target = event.target.getAttribute('data-target');
    porfolioItems.forEach((item)=>{
        if (target===item.getAttribute('data-category') || target==='all') {
     item.classList.remove('hide');
     item.classList.add('show');
        }
        else{
            item.classList.remove('show');
            item.classList.add('hide')
        }
    })
    }
})

portfolioItemsContainer.addEventListener('click',(event)=>{
if (event.target.closest('.portfolio-item-inner')) {
const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
//get the portfolioItem index
itemIndex=Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem)  
screenshots=porfolioItems[itemIndex].querySelector('.bugS').getAttribute('data-screenshots');

// convert screenshots into array
screenshots=screenshots.split(",");
if (screenshots.length===1) {
    prevBtn.style.display="none";
    nextBtn.style.display="none";
}
else{
prevBtn.style.display="block";
nextBtn.style.display="block";
}
slideIndex=0;
popupToggle();
popupSlideshow();
popupdDetails();
}
})
closeBtn.addEventListener("click",()=>{
    popupToggle();
//     if (projectDetailsContainer.classList.contains("active")) {
//  popupdDetailsToggle();       
//     }
})
function popupToggle() {
popup.classList.toggle("open")
bodyScrollingToggle()
}
function popupSlideshow () {
    const imgSrc=screenshots[slideIndex];
    const popupImg=popup.querySelector(".pp-img");
    //activate loader untill the popuping finished
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src=imgSrc;
    popupImg.onload=()=>{
        popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML=(slideIndex+1)+ " of " + screenshots.length;
}
//next slide
nextBtn.addEventListener("click",()=>{
    if (slideIndex===screenshots.length+1) {
slideIndex=0;        
    }
    else{
        slideIndex++;
    }
    popupSlideshow();

})

//prev slide
prevBtn.addEventListener("click",()=>{
    if (slideIndex===0) {
     slideIndex=screenshots.length-1; 
    }
    else{
        slideIndex--;
    }
    popupSlideshow();
    // console.log("SlideIndex:" + slideIndex)
})
function popupdDetails(){
    //if portfolio-item-details not exist
    if(!porfolioItems[itemIndex].querySelector(".portfolio-item-details")){
        projectDetailsBtn.style.display="none";
        return;
    }
    //get the project tdetails
    const details= porfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    popup.querySelector(".pp-project-details").innerHTML=details;
    const title=porfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    // console.log(title)
    popup.querySelector(".pp-title h2").innerHTML=title;
    const category=porfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML=category.split("-").projectDetailsContainer("");

}

projectDetailsBtn.addEventListener("click",()=>{
    popupdDetailsToggle()
})
function popupdDetailsToggle(){
if (projectDetailsContainer.classList.contains("active")) {
    
    projectDetailsBtn.querySelector("i").classList.add("fa-plus");
    projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
    projectDetailsContainer.classList.remove("active");
    projectDetailsContainer.style.maxHeight= 0 + "px";
}
else{
    projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
    projectDetailsBtn.querySelector("i").classList.add("fa-minus");
    projectDetailsContainer.classList.add("active");
    projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0,projectDetailsContainer.offsetTop);
}
}

}) ();

//testimonial section

(()=>{

    const sliderContainer=document.querySelector(".testi-slider-container"),
    slides=sliderContainer.querySelectorAll(".testi-item"),
    slideWidth=sliderContainer.offsetWidth,
    prevBtn=document.querySelector(".testi-slider-nav .prev"),
    nextBtn=document.querySelector(".testi-slider-nav .next"),
    activeSlide=sliderContainer.querySelector(".testi-item.active");
    let slideIndex=Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    console.log(slideIndex);

    //set width of all slides
    slides.forEach((slide)=>{
        slide.style.width=slideWidth + "px"
    })

    //set widthof sliderContainer
    sliderContainer.style.width= slideWidth * slides.length + "px"

    nextBtn.addEventListener("click",()=>{
        if (slideIndex===slides.length-1) {
      slideIndex=0;            
        }
        else{
            slideIndex++;
        }
        slider();
    })
    
    prevBtn.addEventListener("click",()=>{
        // console.log("keep it for now")
        if (slideIndex===0) {
      slideIndex=slides.length-1;            
        }
        else{
            slideIndex--;
        }
        slider();
    })


    function slider() {
console.log(sliderContainer.querySelector(".testi-item.active"))
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    // sliderContainer.querySelector(".testi-item.active").classList.remove("activeShow");

    slides[slideIndex].classList.add("active");
    // slides[slideIndex].classList.add("activeShow");
   sliderContainer.style.marginLeft = - ( slideWidth * slideIndex) + "px";     
    }
    slider();

}) ();



// Hide all sections expect .active
(()=>{

const sections=document.querySelectorAll(".section");
sections.forEach((section)=>{
if(!section.classList.contains("active")){
       section.classList.add("hide")
}
})

})();

window.addEventListener("load",()=>{
    //preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display="none";
    }, 600);
})