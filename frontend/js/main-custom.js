
$(document).ready(function() {
    // add active class to menu
    var path = window.location.pathname;
    var activeURL = path.split("/").pop();
    console.log(activeURL);
    $(document).ready(function() {
        $('.nav-item').removeClass('active');
        if (activeURL != '') {
            $('[href="./' + activeURL + '"]').parents('.nav-item').addClass('active');
            $('[href="./' + activeURL + '"]').addClass('active');
        } else {
            $('[href="/"]').parents('.nav-item').addClass('active');
        }
    });


    jQuery('.goto-sec').on('click', function(e) {

        var href = jQuery(this).attr('href');
        jQuery('html, body').animate({
            scrollTop: jQuery(href).offset().top - 100
        }, 1000);
        e.preventDefault();
    });

    $(".input-effect .theme_input").focusout(function() {
        if ($(this).val() != "") {
            $(this).addClass("has-content");
        } else {
            $(this).removeClass("has-content");
        }
    });
    $("#mute_btn").click(function() {
        if ($("video.bg_video").prop('muted')) {
            $("video.bg_video").prop('muted', false);
            $("#mute_btn i").addClass('fa-volume-up');
            $("#mute_btn i").removeClass('fa-volume-mute');
        } else {
            $("video.bg_video").prop('muted', true);
            $("#mute_btn i").removeClass('fa-volume-up');
            $("#mute_btn i").addClass('fa-volume-mute');
            // <i class="fas fa-volume-mute"></i>
            // $("#mute").css("background-image","url(http://image.flaticon.com/icons/svg/10/10776.svg)");
        }
    });
    $('.custom-file-input').on('change', function() {
        //get the file name
        var fileName = $(this).val();
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    })

    $(document).on('change', '.file-input', function() {
        console.log("files uploaded");
        var filesCount = $(this)[0].files.length;
        var textbox = $(this).prev();
        if (filesCount === 1) {
            var fileName = $(this).val().split('\\').pop();
            textbox.text(fileName);
        } else {
            textbox.text(filesCount + ' files selected');
        }
    });



});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    //>=, not <=
    if (scroll >= 115) {
        //clearHeader, not clearheader - caps H
        $("header").addClass("sticky_header");
    } else {
        $("header").removeClass("sticky_header");
    }


});

// Plugin isInViewport
! function(e, n) { "object" == typeof exports && "undefined" != typeof module ? n(require("jquery"), require("window")) : "function" == typeof define && define.amd ? define("isInViewport", ["jquery", "window"], n) : n(e.$, e.window) }(this, function(e, n) {
    "use strict";

    function t(n) { var t = this; if (1 === arguments.length && "function" == typeof n && (n = [n]), !(n instanceof Array)) throw new SyntaxError("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"); return n.forEach(function(n) { "function" != typeof n ? (console.warn("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"), console.warn("isInViewport: Ignoring non-function values in array and moving on")) : [].slice.call(t).forEach(function(t) { return n.call(e(t)) }) }), this }

    function o(n) {
        var t = e("<div></div>").css({ width: "100%" });
        n.append(t);
        var o = n.width() - t.width();
        return t.remove(), o
    }

    function r(t, i) {
        var a = t.getBoundingClientRect(),
            u = a.top,
            c = a.bottom,
            f = a.left,
            l = a.right,
            d = e.extend({ tolerance: 0, viewport: n }, i),
            s = !1,
            p = d.viewport.jquery ? d.viewport : e(d.viewport);
        p.length || (console.warn("isInViewport: The viewport selector you have provided matches no element on page."), console.warn("isInViewport: Defaulting to viewport as window"), p = e(n));
        var w = p.height(),
            h = p.width(),
            v = p[0].toString();
        if (p[0] !== n && "[object Window]" !== v && "[object DOMWindow]" !== v) {
            var g = p[0].getBoundingClientRect();
            u -= g.top, c -= g.top, f -= g.left, l -= g.left, r.scrollBarWidth = r.scrollBarWidth || o(p), h -= r.scrollBarWidth
        }
        return d.tolerance = ~~Math.round(parseFloat(d.tolerance)), d.tolerance < 0 && (d.tolerance = w + d.tolerance), l <= 0 || f >= h ? s : s = d.tolerance ? u <= d.tolerance && c >= d.tolerance : c > 0 && u <= w
    }

    function i(n) { if (n) { var t = n.split(","); return 1 === t.length && isNaN(t[0]) && (t[1] = t[0], t[0] = void 0), { tolerance: t[0] ? t[0].trim() : void 0, viewport: t[1] ? e(t[1].trim()) : void 0 } } return {} }
    e = "default" in e ? e.default : e, n = "default" in n ? n.default : n,
        /**
         * @author  Mudit Ameta
         * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
         */
        e.extend(e.expr[":"], { "in-viewport": e.expr.createPseudo ? e.expr.createPseudo(function(e) { return function(n) { return r(n, i(e)) } }) : function(e, n, t) { return r(e, i(t[3])) } }), e.fn.isInViewport = function(e) { return this.filter(function(n, t) { return r(t, e) }) }, e.fn.run = t
});
//# isInViewport
$(document).ready(function() {

    // If the comparison slider is present on the page lets initialise it, this is good you will include this in the main js to prevent the code from running when not needed
    if ($(".comparison-slider")[0]) {
        let compSlider = $(".comparison-slider");

        //let's loop through the sliders and initialise each of them
        compSlider.each(function() {
            let compSliderWidth = $(this).width() + "px";
            $(this).find(".resize img").css({ width: compSliderWidth });
            drags($(this).find(".divider"), $(this).find(".resize"), $(this));
        });

        //if the user resizes the windows lets update our variables and resize our images
        $(window).on("resize", function() {
            let compSliderWidth = compSlider.width() + "px";
            compSlider.find(".resize img").css({ width: compSliderWidth });
        });
    }
});

// This is where all the magic happens
// This is a modified version of the pen from Ege Görgülü - https://codepen.io/bamf/pen/jEpxOX - and you should check it out too.
function drags(dragElement, resizeElement, container) {

    // This creates a variable that detects if the user is using touch input insted of the mouse.
    let touched = false;
    window.addEventListener('touchstart', function() {
        touched = true;
    });
    window.addEventListener('touchend', function() {
        touched = false;
    });

    // clicp the image and move the slider on interaction with the mouse or the touch input
    dragElement.on("mousedown touchstart", function(e) {

        //add classes to the emelents - good for css animations if you need it to
        dragElement.addClass("draggable");
        resizeElement.addClass("resizable");
        //create vars
        let startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
        let dragWidth = dragElement.outerWidth();
        let posX = dragElement.offset().left + dragWidth - startX;
        let containerOffset = container.offset().left;
        let containerWidth = container.outerWidth();
        let minLeft = containerOffset + 10;
        let maxLeft = containerOffset + containerWidth - dragWidth - 10;

        //add event listner on the divider emelent
        dragElement.parents().on("mousemove touchmove", function(e) {

            // if the user is not using touch input let do preventDefault to prevent the user from slecting the images as he moves the silder arround.
            if (touched === false) {
                e.preventDefault();
            }

            let moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
            let leftValue = moveX + posX - dragWidth;

            // stop the divider from going over the limits of the container
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            let widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";

            $(".draggable").css("left", widthValue).on("mouseup touchend touchcancel", function() {
                $(this).removeClass("draggable");
                resizeElement.removeClass("resizable");
            });

            $(".resizable").css("width", widthValue);

        }).on("mouseup touchend touchcancel", function() {
            dragElement.removeClass("draggable");
            resizeElement.removeClass("resizable");

        });

    }).on("mouseup touchend touchcancel", function(e) {
        // stop clicping the image and move the slider
        dragElement.removeClass("draggable");
        resizeElement.removeClass("resizable");

    });

}

// images lazyloader
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazyload");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Possibly fall back to a more compatible method here
    }
});



$('.technologies-slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout:3000,
    animateIn:'linear',
    animateOut:'linear',
    smartSpeed:3000,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        768: {
            items: 4
        },
        1000: {
            items: 6
        }
    }
});

$('.services_silder').owlCarousel({
    loop: true,
    margin: 40,
    nav: false,
    dots:false,
    autoplay: true,
    autoplayTimeout:3000,
    animateIn:'linear',
    animateOut:'linear',
    smartSpeed:3000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1.5
        },
        1000: {
            items: 2.5
        },
        1200: {
            items: 3.5
        }
    }
});
$('.partner_slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 5
        },
        1000: {
            items: 7
        }
    }
});

jQuery(document).ready(function($) {
    "use strict";
    $('#customers-testimonials').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots:false,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1170: {
            items: 3
          }
        }
    });
});



const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
  });
});

// Change Header Background on Scrolling
window.addEventListener("scroll", () => {
  if (this.scrollY >= 85) {
    headerMenu.classList.add("on-scroll");
  } else {
    headerMenu.classList.remove("on-scroll");
  }
});

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (navbarMenu.classList.contains("is-active")) {
      navbarMenu.classList.remove("is-active");
    }
  }
});
