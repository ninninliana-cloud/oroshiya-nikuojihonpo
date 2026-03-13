gsap.registerPlugin(ScrollTrigger)



/* loading */

window.addEventListener("load",()=>{

gsap.to("#loader",{

opacity:0,
duration:1,
delay:1,

onComplete:()=>{

document.getElementById("loader").style.display="none"

}

})

})



/* smooth scroll */

const lenis = new Lenis()

function raf(time){

lenis.raf(time)
requestAnimationFrame(raf)

}

requestAnimationFrame(raf)



/* split text */

new SplitType(".split",{types:"chars"})


gsap.from(".char",{

y:60,
opacity:0,
stagger:0.03,
duration:0.8

})



/* hero zoom */

gsap.to(".hero-bg",{

scrollTrigger:{
trigger:".hero",
scrub:true
},

scale:1.2,
y:-200

})



/* parallax */

gsap.to(".parallax-img",{

scrollTrigger:{
trigger:".parallax",
scrub:true
},

y:-250

})



/* section reveal */

gsap.utils.toArray("section").forEach(section=>{

gsap.from(section,{

scrollTrigger:{
trigger:section,
start:"top 80%"
},

opacity:0,
y:80,
duration:1

})

})



/* cards */

gsap.from(".card",{

scrollTrigger:{
trigger:".cards",
start:"top 80%"
},

opacity:0,
y:100,
stagger:0.2

})



/* header scroll */

window.addEventListener("scroll",()=>{

if(window.scrollY > 50){

document.querySelector(".header").classList.add("scrolled")

}else{

document.querySelector(".header").classList.remove("scrolled")

}

})
