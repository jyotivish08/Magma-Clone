function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

var clutter = ""; // Initialize an empty string to hold the modified HTML.

document.querySelector("#page2>h1").textContent.split("  ").forEach(function(dets) {
  // 1. Access the text content of the <h1> element inside #page2.
  // 2. Split the text into an array of words using the `.split(" ")` method.
  //    - " " (space) is used as the delimiter, so each word becomes an array element.

  clutter += `<span> ${dets} </span>`;
  // 3. Wrap each word (dets) in a <span> element and append it to the 'clutter' variable.
  // Wrapping each word in a <span> allows you to target and animate them independently using CSS or JavaScript.
  /*<h1>
  <span> The </span>
  <span> Digital </span>
  <span> Twin </span>
  <span> Token </span> ... 
  </h1> */

  document.querySelector("#page2>h1").innerHTML = clutter;
  // 4. Replace the original <h1> content with the modified content (clutter),
  //    where each word is now wrapped in a <span>.
});

gsap.to("#page2>h1>span",{
    stagger: .2, //animate each word with a delay
    color: "#fff",
    scrollTrigger: {
        trigger: "#page2>h1>span",
        start: "top bottom",
        end: "bottom top",
        scroller: "#main",
        scrub: .5, //smooth scroll-based animation
        // markers: true
    }

})


function canvas(){
    const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  ./frames/frames00007.png
  ./frames/frames00010.png
  ./frames/frames00013.png
  ./frames/frames00016.png
  ./frames/frames00019.png
  ./frames/frames00022.png
  ./frames/frames00025.png
  ./frames/frames00028.png
  ./frames/frames00031.png
  ./frames/frames00034.png
  ./frames/frames00037.png
  ./frames/frames00040.png
  ./frames/frames00043.png
  ./frames/frames00046.png
  ./frames/frames00049.png
  ./frames/frames00052.png
  ./frames/frames00055.png
  ./frames/frames00058.png
  ./frames/frames00061.png
  ./frames/frames00064.png
  ./frames/frames00067.png
  ./frames/frames00070.png
  ./frames/frames00073.png
  ./frames/frames00076.png
  ./frames/frames00079.png
  ./frames/frames00082.png
  ./frames/frames00085.png
  ./frames/frames00088.png
  ./frames/frames00091.png
  ./frames/frames00094.png
  ./frames/frames00097.png
  ./frames/frames00100.png
  ./frames/frames00103.png
  ./frames/frames00106.png
  ./frames/frames00109.png
  ./frames/frames00112.png
  ./frames/frames00115.png
  ./frames/frames00118.png
  ./frames/frames00121.png
  ./frames/frames00124.png
  ./frames/frames00127.png
  ./frames/frames00130.png
  ./frames/frames00133.png
  ./frames/frames00136.png
  ./frames/frames00139.png
  ./frames/frames00142.png
  ./frames/frames00145.png
  ./frames/frames00148.png
  ./frames/frames00151.png
  ./frames/frames00154.png
  ./frames/frames00157.png
  ./frames/frames00160.png
  ./frames/frames00163.png
  ./frames/frames00166.png
  ./frames/frames00169.png
  ./frames/frames00172.png
  ./frames/frames00175.png
  ./frames/frames00178.png
  ./frames/frames00181.png
  ./frames/frames00184.png
  ./frames/frames00187.png
  ./frames/frames00190.png
  ./frames/frames00193.png
  ./frames/frames00196.png
  ./frames/frames00199.png
  ./frames/frames00202.png
 `;
  return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page3`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page3",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
});
}
canvas()
