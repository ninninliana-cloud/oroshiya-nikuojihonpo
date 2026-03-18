gsap.registerPlugin(ScrollTrigger)

/* ================= Lenis（完全版） ================= */

const lenis = new Lenis({
  duration: 1.2,
  smooth: true
})

function raf(time){
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

lenis.on("scroll", ScrollTrigger.update)

/* ScrollTriggerと同期 */
ScrollTrigger.scrollerProxy(document.body,{
  scrollTop(value){
    if(arguments.length){
      lenis.scrollTo(value)
    }
    return window.scrollY
  },
  getBoundingClientRect(){
    return {
      top:0,
      left:0,
      width:window.innerWidth,
      height:window.innerHeight
    }
  }
})

ScrollTrigger.addEventListener("refresh", ()=> lenis.update())
ScrollTrigger.refresh()

/* ================= loader 初期位置（絶対先に） ================= */

gsap.set(".loader-character",{
  x: window.innerWidth + 500,
  opacity:1
})

/* ================= scroll系（外で作る） ================= */

/* hero zoom */
gsap.to(".hero-bg",{
  scrollTrigger:{
    trigger:".hero",
    start:"top top",
    end:"bottom top",
    scrub:true,
    invalidateOnRefresh:true
  },
  scale:1.35,
  y:-200
})

/* hero parallax */
gsap.to(".hero-middle",{
  scrollTrigger:{
    trigger:".hero",
    start:"top top",
    end:"bottom top",
    scrub:true,
    invalidateOnRefresh:true
  },
  y:-150
})

/* cards */
gsap.from(".card",{
  scrollTrigger:{
    trigger:".cards",
    start:"top 80%"
  },
  opacity:0,
  y:80,
  stagger:0.2,
  duration:1,
  ease:"power2.out"
})

/* ================= main（ロード後） ================= */

window.addEventListener("load",()=>{

  const tl = gsap.timeline()

  /* キャラ走る */
  tl.to(".loader-character",{
    x: window.innerWidth * 0.4,
    duration:2.0,
    ease:"power1.inOut"
  })
  .to(".loader-character",{
    x:-600,
    duration:2.6,
    ease:"power1.in"
  })

  /* ローダー消える */
  .to("#loader",{
    opacity:0,
    duration:0.8,
    onComplete:()=>{
      document.getElementById("loader").style.display="none"
    }
  })

  /* ===== 本編 ===== */

  new SplitType(".split",{types:"chars"})

  gsap.from(".char",{
    y:60,
    opacity:0,
    stagger:0.04,
    duration:0.8,
    ease:"power2.out"
  })

  /* hero 初期状態 */
  gsap.set(".hero-bg",{opacity:0, scale:1.2})
  gsap.set(".hero-year",{opacity:0, scale:0.8})
  gsap.set(".hero-tag",{opacity:0, y:40})

  /* hero 登場 */
  tl.to(".hero-bg",{
    opacity:1,
    scale:1,
    duration:1.8,
    ease:"power2.out"
  })
  .to(".hero-year",{
    opacity:1,
    scale:1,
    duration:1.2,
    ease:"power3.out"
  },"-=1")
  .to(".hero-tag",{
    opacity:1,
    y:0,
    duration:1,
    ease:"power2.out"
  },"-=0.6")

})

/* ================= lightbox ================= */

const stickers = document.querySelectorAll(".sticker")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")

stickers.forEach(sticker=>{
  sticker.addEventListener("click",()=>{

    lightboxImg.src = sticker.src
    lightbox.classList.add("active")

    gsap.fromTo(lightboxImg,
      {scale:0.8, opacity:0},
      {scale:1, opacity:1, duration:0.5}
    )

  })
})

lightbox.addEventListener("click",()=>{

  gsap.to(lightboxImg,{
    scale:0.8,
    opacity:0,
    duration:0.3,
    onComplete:()=>{
      lightbox.classList.remove("active")
    }
  })

})
