// Scripts.js - v1.5



function waitForJQuery(callback){
  var checkLoop = setInterval(function() {
    if (typeof $ !== 'undefined') {
      clearInterval(checkLoop);
      callback();
    }
  });
}
function waitForLoad(callback){
  var checkLoop = setInterval(function() {
    if ($('html').hasClass("is-loaded")) {
      clearInterval(checkLoop);
      callback();
    }
  });
}
function initHiddenRecaptcha(){
  $(".form-item.is-recaptcha").hide();
  $("form").on("change", function(){
   $(this).find(".form-item.is-recaptcha").show();
 });
}

function updateShareLinks(){
  $(".share-links li a").each(function() {
    $(this).addClass("btn secondary");
  });
}

var wasTransparent = true;
function updateOnTransparent(transparent, notTransparent){
  transparent();
  $(document).on("scroll", function(){
    checkLogo();
 });
 checkLogo();
 function checkLogo(){
   setTimeout(function(){
     if(!wasTransparent && $(".transparent-header").length >= 1 ){
       transparent();
       wasTransparent = true;
     } else if(wasTransparent && $(".transparent-header").length == 0 ){
       notTransparent();
       wasTransparent = false;
     }
   }, 1);
  }
}
function initExternalBlogDisclaimer(disclaimer){
  if($(".blog-page").length > 0){

    var hasExternalLink = false;

    $(".post-link").each(function(i, item){
      item = $(item);
      var link = item.find("a");
      if(link.prop("target") == "_blank" && link.prop("href").indexOf("https://static.twentyoverten.com") != 0){
        hasExternalLink = true;
        item.find(".post-header").find("h3").append('<sup style="font-size:.9rem"> *</sup>');
      }
    });
    if(hasExternalLink){
      var footNote = "* This article link will open in a new internet browser tab. " + disclaimer;
      $(".posts-wrapper").append('<div class="container"><div class="main-content" id="footNote" ><p style="text-align:center" class="disclaimer">'+footNote+'</p></div></div>');
    }
  }
}

function updateCopyrightYear(){
   $(function() {
     var date = new Date();
     var year = date.getFullYear();
	 $(".copyrightYear").html(year);
	});
}

function initMembersOverlayURL(){
  var advisor = null;
  try{
    var urlParams = new URLSearchParams(window.location.search);
     advisor = urlParams.get('advisor');
  }catch(e){

    advisor = getURLParam('advisor');

    function getURLParam(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results==null){
         return null;
      }
      else{
         return decodeURI(results[1]) || 0;
      }
    }
  }
   document.addEventListener("DOMContentLoaded", function(){

    if(advisor)
    {
      advisor = advisor.replace(/-/g, " ").replace(/_/g, " ").replace(/%20/g, " ");
      var overlay = $("#members-list").find('.member-header:contains(' + advisor + ')').parent();

      setTimeout(function(){
        overlay.click();
      }, 500);
    }
  });
}
function updateAlternateBoxes(){
  if(!window.suppress)
    $(".alternateBoxes img").each(function(i, e){
      $(e).hide();
      var src = e.src;
      $(e).parent().parent()[0].style="background: url("+src+"); background-size: cover";
    });
}

function initIrisScrollAdjust(){
  function scrollToSection(slug) {
    var headerHeight = $('#header').hasClass('overlay') ? '' : $('#header').outerHeight(),
        scrollSettings = { duration: 900, easing: 'easeInOutQuint', offset: -headerHeight };

    if ($('#section-' + slug).length && slug !== 'home') {
      $('#section-' + slug).velocity('scroll', scrollSettings);
    }
  }

  $('a[data-section]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var slug = $(this).data('section');

    if ($('#section-' + slug).length) {
      $('#main-navigation li').removeClass('active');
      $(this).parent('li').addClass('active');
      history.pushState({ slug: slug }, null, '/' + (slug === 'home' ? '' : slug));

      scrollToSection(slug);
    } else {
      window.location = '/' + slug;
    }

    if ($('.menu-toggle').is(':visible')) {
      $('.menu-toggle.open').trigger('click');
    }
  });
}

function initQuickScroll(){
  if (location.hash) {
    setTimeout(function() {

      ScrollTo(location.hash);
    }, 1);
  }
  $('.content-wrapper a[href*="#"], #content a[href*="#"], .posts-wrappera[href*="#"]').on('click', function(e){
       var target = e.target.hash;

       if(target){
        ScrollTo(target);
        e.preventDefault();
       }
     });

  function ScrollTo(target){
    var element = $(target);
       $('html, body').animate({
          scrollTop: (element.offset().top - 150)
        }, 1750, 'swing');
  }
}

function initRemoveBlogColumn(){
  $("#posts-list").addClass("posts-wrapper");
  $("#posts-list .column").children().unwrap();
  $(".post-link").css("visibility", "visible");
}

function initCalculators(){
  $(".calculator").each(function() {
    let $calc = $(this);
    calculate($calc);
    $calc.find("input").off().on('change', function() {
      calculate($calc);
    });
  });

  function calculate($calc) {
    let calcType = $calc.attr('id');

    switch (calcType) {
      case "savings-retirement":
        {
          let total = 0.0;
          let init = parseFloat($calc.find("#initialDeposit").val());
          let monthly = parseFloat($calc.find("#monthlyDeposit").val());
          let rate = parseFloat($calc.find("#interestRate").val());
          let years = parseFloat($calc.find("#years").val());

          let j = rate / 1200;
          let f = years * 12;
          let subTotal = init + monthly * ((1 - (1 / Math.pow((1 + j), f))) / j);
          total = subTotal * Math.pow((1 + j), f);
          total = Math.round(total * 100) / 100;
          $calc.find(".total").find("input").val(total);

          break;
        }
      case "credit-card":
        {
          let total = 0.0;
          let balance = parseFloat($calc.find("#balance").val());
          let rate = parseFloat($calc.find("#interestRate").val());
          let months = parseFloat($calc.find("#months").val());
          let g = rate / (12 * 100);
          let e = months;
          let h = (g * Math.pow((1 + g), e));
          let p = (Math.pow((1 + g), e) - 1);
          total = (balance * h / p);
          total = Math.round(total * 100) / 100;
          $calc.find(".total").find("input").val(total);

          break;
        }
      case "bank-loan":
        {
          let total = 0.0;
          let loanAmount = parseFloat($calc.find("#loanAmount").val());
          let rate = parseFloat($calc.find("#interestRate").val());
          let years = parseFloat($calc.find("#years").val());

          let g = rate / (12 * 100);
          let e = years * 12;
          let h = (g * Math.pow((1 + g), e));
          let q = (Math.pow((1 + g), e) - 1);
          total = (loanAmount * h / q);
          total = Math.round(total * 100) / 100;
          $calc.find(".total").find("input").val(total);

          break;
        }
      case "auto-loan":
        {
          let total = 0.0;
          let loanAmount = parseFloat($calc.find("#loanAmount").val());
          let rate = parseFloat($calc.find("#interestRate").val());
          let months = parseFloat($calc.find("#months").val());

          let g = rate / (12 * 100);
          let e = months;
          let h = (g * Math.pow((1 + g), e));
          let q = (Math.pow((1 + g), e) - 1);
          total = (loanAmount * h / q);
          total = Math.round(total * 100) / 100;
          $calc.find(".total").find("input").val(total);

          break;
        }
    }
  }
}
function initSlideshow(){
  if (!window.suppress) {
    $(document).ready(function(){
      var owl = $('.owl-slideshow').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
       autoplayTimeout: 10000,
       dotsSpeed: 750
      });
     owl.on('changed.owl.carousel', function(e) {
      owl.trigger('stop.owl.autoplay');
      owl.trigger('play.owl.autoplay');
    });
  });
  }
}


function initCarousel(container, useSelector, selectorStyle, rotateText, items, globalStyle){

  //init variables
  var i = 1;
  var containerItems = "";
  var pupilFramework = $(container).find(".overlay-wrapper").length > 0,
      intrinsic = $(container).hasClass("is-intrinsic");

      if(!globalStyle)
        globalStyle = "background-position: center center; background-repeat: no-repeat; background-attachment: scroll; background-size: cover;";

  //Add each item to the carousel, also start creation of selector
  items.forEach(function(item) {
    var img = item.img;
    containerItems += '<div class="item">';

    if(!intrinsic)
      containerItems += '<div class="bg" data-src="' + img + '" style="' + (item.style ? item.style : globalStyle) + ' background-image: url(\'' + img + '\')"></div>';
    else
      containerItems += '<figure class="page-bg--image"><img src="'+img+'"></figure>';


    containerItems += '<div class="overlay" ' + (rotateText ? '' : 'style="background:none"') + '>';

    if (rotateText) {
      containerItems += '<div class="container">';

      if (!pupilFramework)
        containerItems += '<div class="header-push" style="height: 99px;"></div>';

      containerItems += '<div class="hero-content" data-location="hero_content" data-type="hero">';

      if (item.header && item.header != null)
        containerItems += item.header;

      containerItems += "</div></div>";
    }

    containerItems += "</div></div>";
    i++;
  });

  //Create an overlay copy if the text is not rotating
  var overlay = $(container).find(".overlay");
  var overlayCopy;
  if (!rotateText) {
    overlay.css("background", "none");
    overlayCopy = overlay.clone();
    overlayCopy.css({
      "background": "",
      "z-index": "1"
    });
    overlay.find(".container").remove();
  } else if (pupilFramework) {
    var overlayCopyPlaceholder = overlay.clone();
    overlayCopyPlaceholder.find(".container").remove();

  }
  //Wrap the containers children in an owl carousel
  var e = $(container);
  if (pupilFramework)
    e = e.find(".overlay-wrapper");

  e.wrapInner('<div class="owl-carousel owl-theme banner-carousel" ' + (intrinsic ? '' : 'style="position: absolute' ) +'">', '</div>');

  $(container).find(".banner-carousel").wrapInner('<div class="item">', '</div>');


  //Add the other items
  $(container).find(".banner-carousel").append(containerItems);


  //Add Selector
  var e1 = $(container);
  if (pupilFramework && !rotateText)
    e1 = e1.find(".overlay-wrapper");

  e1.append('<div class="dots-selector owl-theme" style="position: absolute;width: 100%; bottom: 10px; z-index: 2;"><div class="owl-dots ' + (selectorStyle != null ? 'owl-' + selectorStyle : '') + '">', '</div></div>');

  //Start Carousel
  var owl = $(container).find(".banner-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    dotsSpeed: 1000,
    dots: useSelector,
    dotsContainer: '.dots-selector .owl-dots'
  });
  owl.on('changed.owl.carousel', function(e) {
    owl.trigger('stop.owl.autoplay');
    owl.trigger('play.owl.autoplay');
  });

  //If text is not rotating, re-add overlay
  if (!rotateText) {
    var e2 = $(container);
    if (pupilFramework)
      e2 = e2.find(".overlay-wrapper");
    e2.append(overlayCopy);
  }else if(pupilFramework){
  $(container).find(".overlay-wrapper").append(overlayCopyPlaceholder);
  }

}

function initVideo(container, videoURL){
      var bg = $(container); // Background container
      var bgImage = bg.css('background-image'); // The BG image per CSS

      var videoActive = bg.length > 0;
      /*
     var vidElement = $('<video muted loop class="heroVid"><source src="' + videoURL + '" type="video/mp4"></video>'); // New video element
      */

          var vidElement = $('<video muted loop class="heroVid">'+
     '<source src="' + videoURL + '" type="video/mp4">'+
     '</video>'); // New video element
      var heroVid;

      // Declare the function so we can call it again on resize, and once on load
      var bgSwap = function() {
        var bgAR = bg.outerWidth() / bg.outerHeight(); // Aspect ratio of container
        // The method to set a Video - returns promise
        var setVideo = function() {
          return new Promise(function(resolve, reject){
            try {
              heroVid = bg.find(".heroVid");
              // Get rid of the existing background image
              bg.css('background-image', 'none');
              if (bg.find(".heroVid").length < 1) {
                // If this is the first time running this function on page load, we will not have a heroVid element. So create one.
                // Append the video Element
                bg.append(vidElement);
                heroVid = bg.find(".heroVid");
                heroVid.css({width: "100%", height: "auto", position: 'absolute', top: '0'})
                // We are now sure to have a heroVid element
              }
              resolve()
            } catch (error) {
              reject(error)
            }
          })
        }

        // The method to set the background image - returns promise
        var setBgImage = function() {
          return new Promise(function(resolve, reject){
            try {
              if (bg.find(".heroVid").length > 0) {
                bg.find(".heroVid").remove();
              }
              bg.css('background-image', bgImage);
              resolve()
            } catch (error) {
              reject(error)
            }
          })
        }

        if (videoActive) {
          setVideo().then(function(){
            // Even though the vid element has been set, and this is guaranteed by the promise, the full video data may not yet have been loaded. We need to test the aspect ratio of the video, so we loop until we get something that makes sense.
            var testVidWidth = setInterval(function(){
              var vidWidth = heroVid[0].videoWidth;
              // If videoWidth is set on the vid and it's more than 0
              if (vidWidth && vidWidth > 0) {
                // Stop the loop
                clearInterval(testVidWidth);
                // Get the video Aspect Ratio
                vidAR = vidWidth / heroVid[0].videoHeight;
                // Test the aspect ratio of the vid agianst the aspect ratio of the container
                if ( vidAR > bgAR) {
                  // If it's a small space, use the default background image (set in the gui)
                  setBgImage().then(function(bgImage){
                    // success
                  }).catch(function(error) {
                    console.error(error)
                  })
                } else {
                  // If it's a big space, play the video
                  heroVid.get()[0].play();
                  console.log("play");
                }
              }
            }, 50)
          }).catch(function(error){
            console.error(error)
          })
        }
      }

      // Run the function on window resize event
      $(window).on('resize', function(){
        bgSwap();
      })

      // Run the function on load
      bgSwap();
}
function initMoveBelow(){
  $(".moveBelow").each(function(){
    var belowArea = $(this).data("below_area");
    if(belowArea && !window.suppress){
      belowArea = $("."+belowArea).find(".content-wrapper");

      $(this).hide();
      var content = $(this).clone();
      content.addClass("main-content");

      content.appendTo(belowArea);
      content.wrap('<div class="container"></div>');
      content.show();
    }
  });
}
