(function($) {
    "use strict";

    jQuery(document).ready(function($) {

        /*====  responsive menu js active =====*/
        if ($.fn.slicknav) {
            $('.mainmenu ul#nav').slicknav({
                prependTo: ".responsive_menu",
                label: ""
            })
        }

        /*====  sticky menu js active =====*/
        if ($.fn.sticky) {
            $('.header-area').sticky({
                stopSpacing: 0
            });
        }

        /*====  screenshot slide =====*/
        if ($.fn.owlCarousel) {
            $('.screenshot-slide').owlCarousel({
                items: 4,
                loop: true,
                margin: 20,
                dots: false,
                autoplay: true,
                center: true,
                mouseDrag: true,
                autoWidth: false,
                nav: true,
                autoplayHoverPause: true,
                touchDrag: true,
                navText: ["<img src='/assets/img/chevron-left.svg' style='width:13px;margin-top:-5px;'>", "<img src='/assets/img/chevron-right.svg' style='width:13px;margin-top:-5px;'>"],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true,
                        margin: 0
                    },
                    480: {
                        items: 2,
                        margin: 0
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 4
                    }
                }
            });
        }

        /*====  Reviews slide =====*/
        if ($.fn.owlCarousel) {
            $('.review-slide, .blog-slide').owlCarousel({
                items: 3,
                loop: true,
                nav: false,
                autoplay: true,
                margin: 20,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    480: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 3
                    }
                }
            });
        }

        $('.mainmenu > ul#nav > li > a').click(function() {
            //Toggle Class
            $(".active").removeClass("active");
            $(this).closest('li').addClass("active");
            var theClass = $(this).attr("class");
            $('.' + theClass).parent('li').addClass('active');
            //Animate Menu
            $('html, body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top - 0
            }, 1000);
            return false;
        });

    });

}(jQuery));

/*
	Replace all SVG images with inline SVG
*/
jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');
        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});


/*  Hide Header on on scroll down
    Originally written by @niteshkumarniranjan
    https://gitub.com/niteshkumarniranjan    */

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $(".header-area").outerHeight();

$(window).scroll(function(event) {
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $(".header-area")
      .addClass("nav-hide");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $(".header-area")
        .removeClass("nav-hide");
    }
  }
  lastScrollTop = st;
}