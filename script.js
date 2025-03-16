//for h3
var h3 = document.querySelectorAll("#sub_heading_div h3");

h3.forEach(function(h3) {
  var words = h3.textContent.split(/\s+/); // split into words
  var clutter = "";
  words.forEach(function(word) {
    var letters = word.split(""); // split each word into individual characters
    letters.forEach(function(letter) {
      clutter += `<span>${letter}</span>`;
    });
    clutter += " "; // add a space between words
  });
  h3.innerHTML = clutter;
});


//for h1
var h1 =document.querySelector("#hello_heading")

var splitted = h1.textContent.split("");

var clutter = "";

splitted.forEach(function(element){
  clutter += `<span>${element}</span>`;
});

h1.innerHTML = clutter;


//timeline for all
const tl = gsap.timeline();

const tl2 = gsap.timeline();

const master = gsap.timeline();


//locomotive
function locoscroll() {
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

//image starting animation
function imageloader() {
  const images = document.querySelectorAll('#loader img');
  // Loop through the images
  images.forEach((image, index) => {
    // Set the initial visibility of the image to hidden
    image.style.visibility = 'hidden';
    
    // Add a tween to display the image
    tl.to(image, { visibility: 'visible', duration: 0.2 });
    
    // Add a pause to wait for the image to be fully displayed
    tl.pause(1);
    
    // Add a tween to hide the current image
    tl.to(image, { visibility: 'hidden', duration: 0 });
  });
  
  tl.play();
}

//loader animation
function loader() {
  tl.to("#loader", {
    y: "-100%",
    ease: CustomEase.create("custom", "M0,0 C0.315,0 0.233,0.567 0.35,0.797 0.467,1.027 0.849,1 1,1 "),
    duration: 1.8,
  });
  
  tl.to("#loader", {
    display:"none"
  })
}

// h1 main animation
function animate() {
  tl2.from("#Hello_div h1 span", {
    // transform: "translateY(50%)",
    y:500,
    ease: "cubicBezier(0.5, 0.02, 0.7, 0.9)",
    stagger: 0.075,
    // duration: 0.72,
    duration:0.78,
  })
}

// h3 main animation
function h3anime() {
  const subHeadings = document.querySelectorAll('#sub_heading_div h3 span');
  gsap.from(subHeadings, {
  y: 300,
  ease:"slow(0.1,0.7,false)",
  delay:3.8,
  duration: 2.1,
  opacity: 0,
  });
}

function video_scroll_anime() {
  
  gsap.to("#page2 #video_page2", {
    width:"100%",
    scale:1,
    scrollTrigger: {
      trigger: "#video_page2",
      scroller: "#main",
      // markers: true,
      start: "top 80%",
      end: "top 10%",
      scrub: 2,
    }
});
}

function page3_text_anime() {
  gsap.to("#page3 #wrapper_page3 h2 span , #page3 #wrapper_page3 p span", {
    y: 0,
    duration: 0.6,
    stagger: 0.07,
    scrollTrigger: {
      trigger: "#page3 #wrapper_page3 #upperrow",
      scroller: "#main",
      // markers: true,
      start: "top 80%",
      end: "top 10%",
    }
  })
}

function rotatory() {
  gsap.to("#circle_box #circle", {
    rotate: 720,
    ease: "none",
    repeat: -1,
    duration: 30,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      // markers: true,
      start: "top 80%",
      end: "top 10%",
    }
  })
}

function hovervideo() {
  var cursor = document.querySelector("#cursor");
  var main = document.querySelector("#main");
  var videodiv = document.querySelector("#video_left_container");
  var video = videodiv.querySelector("video");
  var video2div = document.querySelector("#wrapper_video");
  var video2 = video2div.querySelector("video");
  var imgdiv = document.querySelector("#img_right_container");
  var img = imgdiv.querySelector("img");
  var img2div = document.querySelector("#wrapper_img");
  var img2 = img2div.querySelector("img");
  var throttleTimeout = null;
  var throttleDelay = 20; // 16ms = ~60fps

  var mouseMoveHandler = function(event) {
    if (throttleTimeout) return;
    throttleTimeout = setTimeout(function() {
      throttleTimeout = null;
      gsap.killTweensOf(cursor); // Cancel any existing animations
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.7,
      });
    }, throttleDelay);
  };

  var leaveTimeout = null;

  videodiv.addEventListener("mouseenter", function() {
    cursor.style.visibility = "visible";
    videodiv.addEventListener("mousemove", mouseMoveHandler);
    gsap.to(videodiv, {
      scale: 0.96,
      duration: 0.7,
      ease: "power1.out",
    });
    gsap.to(video, {
      scale: 1.35,
      duration: 0.7,
      ease: "power1.out",
    });
  });

  videodiv.addEventListener("mouseleave", function() {
    leaveTimeout = setTimeout(function() {
      cursor.style.visibility = "hidden";
      gsap.to(videodiv, {
        scale: 1,
        duration: 0.7,
        ease: "power1.out",
      });
      gsap.to(video, {
        scale: 1.2,
        duration: 0.7,
        ease: "power1.out",
      });
    }, 10);
  });

  videodiv.addEventListener("mousemove", function() {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
  });

  video2div.addEventListener("mouseenter", function() {
    cursor.style.visibility = "visible";
    video2div.addEventListener("mousemove", mouseMoveHandler);
    gsap.to(video2div, {
      scale: 0.96,
      duration: 0.7,
      ease: "power1.out",
    });
    gsap.to(video2, {
      scale: 1.35,
      duration: 0.7,
      ease: "power1.out",
    });
  });

  video2div.addEventListener("mouseleave", function() {
    leaveTimeout = setTimeout(function() {
      cursor.style.visibility = "hidden";
      gsap.to(video2div, {
        scale: 1,
        duration: 0.7,
        ease: "power1.out",
      });
      gsap.to(video2, {
        scale: 1.2,
        duration: 0.7,
        ease: "power1.out",
      });
    }, 10);
  });

  video2div.addEventListener("mousemove", function() {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
  });

  imgdiv.addEventListener("mouseenter", function() {
    cursor.style.visibility = "visible";
    imgdiv.addEventListener("mousemove", mouseMoveHandler);
    gsap.to(imgdiv, {
      scale: 0.96,
      duration: 0.7,
      ease: "power1.out",
    });
    gsap.to(img, {
      scale: 1.3,
      duration: 0.7,
      ease: "power1.out",
    });
  });

  imgdiv.addEventListener("mouseleave", function() {
    leaveTimeout = setTimeout(function() {
      cursor.style.visibility = "hidden";
      gsap.to(imgdiv, {
        scale: 1,
        duration: 0.7,
        ease: "power1.out",
      });
      gsap.to(img, {
        scale: 1.1,
        duration: 0.7,
        ease: "power1.out",
      });
    }, 10);
  });

  imgdiv.addEventListener("mousemove", function() {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
  });

  img2div.addEventListener("mouseenter", function() {
    cursor.style.visibility = "visible";
    img2div.addEventListener("mousemove", mouseMoveHandler);
    gsap.to(img2div, {
      scale: 0.96,
      duration: 0.7,
      ease: "power1.out",
    });
    gsap.to(img2, {
      scale: 1.35,
      duration: 0.7,
      ease: "power1.out",
    });
  });

  img2div.addEventListener("mouseleave", function() {
    leaveTimeout = setTimeout(function() {
      cursor.style.visibility = "hidden";
      gsap.to(img2div, {
        scale: 1,
        duration: 0.7,
        ease: "power1.out",
      });
      gsap.to(img2, {
        scale: 1.1,
        duration: 0.7,
        ease: "power1.out",
      });
    }, 10);
  });

  img2div.addEventListener("mousemove", function() {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
  });

  main.addEventListener("mousemove", mouseMoveHandler);
}

function page7_pin_anime() {
  gsap.to("#page7 h1", {
    transform: "translateX(-165%)",
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start:"top 0%",
      end:"top -100%",
      scrub: 2,
      pin: true,
    }
  })
}

master.add(tl) // runs first
      .add(tl2, "+=4.5"); // runs 4.5 second after tl1 finishes
      
master.play();

locoscroll();
imageloader();
loader();
animate();
h3anime();
video_scroll_anime();
page3_text_anime();
rotatory();
hovervideo();
page7_pin_anime();