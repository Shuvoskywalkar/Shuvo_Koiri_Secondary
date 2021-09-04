//style switcher system
const styleSwitcherToggle=document.querySelector(".style-switcher-toggler");

styleSwitcherToggle.addEventListener("click",()=>{
    document.querySelector(".style-switcher").classList.toggle("open");
})
//hide-style swithcher on scroll
window.addEventListener("scroll",()=>{
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

//////theme colors//////
const alternateStyles=document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    localStorage.setItem("color",color)

    changecolor();
}
    function changecolor() {
    alternateStyles.forEach((style)=>{
        if (localStorage.getItem("color")===style.getAttribute("title")) {
         style.removeAttribute("disabled")
        }   
        else{
            style.setAttribute("disabled","true")
        }
    })        
    }
  

if (localStorage.getItem("color") !== null) {
    changecolor();
}

//theme light and dark mode////
 const dayNight=document.querySelector(".day-night");


dayNight.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
if (document.body.classList.contains("dark")) {
localStorage.setItem("theme",'dark');    
}
else{
    localStorage.setItem("theme","light")
}
updateIcon()
})

function themeMode() {
    if (localStorage.getItem("theme") !== null) {
 if(localStorage.getItem("theme")==="light"){
     document.body.classList.remove("dark")
 }        
 else{
     document.body.classList.add("dark")
 }
    }
    updateIcon();
}
themeMode();

function updateIcon() {
    if (document.body.classList.contains("dark")) {
         dayNight.querySelector("i").classList.add("fa-sun");        
        dayNight.querySelector("i").classList.remove("fa-moon");
}
else{
    dayNight.querySelector("i").classList.remove("fa-sun");        
        dayNight.querySelector("i").classList.add("fa-moon");
}
}
