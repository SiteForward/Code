// Scripts.js - v1.27
/*
1.27
- added initServiceCarouselAutoH()
1.26.3
- initRemoveBlogColumns will use ID or class
1.26.2
- initRemoveBlogColumns(waitForBlogsToLoad)  Will default to true if no params given
1.26.1
- initRemoveBlogColumns will clone and replace it's self to remove any resize events
1.26
- Added WaitForBlogs() and fixed up initRemoveBlogColumns()
1.25.3
- Fixed error with carousel if no valid container found
1.25.2
- Re-added selectorStyle to carousel
1.25.1
- Fixed carousel's overlay being onop when not using rotating text
1.25
- Added pause button to carousel
1.24.1
- Fixed issue with calculators if not one of our .calculator divs
1.24
- Added initServiceCarousel()
1.23
- Updated initCalculators to use custom formulas
1.22-1.22.1
- Fixed initQuickScroll
1.21
- initBannerPush only affects the home divider now instead of all dividers
1.20
- initQuickScroll now applies to sub navigation links
1.19
- Added option to not have disclaimer on specific pages
- Fixed initBannerPush using false for homepage/regular page
1.18
- Updated initCarousel to support options object
1.17.2
- Blog Disclaimers no longer added to Client Login Page
1.17.1
- Updated Disclaimers
1.17
- Fixed banner push
1.16
- Added initFrenchBlog()
1.15
- Corrected adjustIrisScroll()
1.14
- initSmallerOverlay only wraps if not wrapped
1.13
- initExternalBlogDisclaimer() -> initBlogDisclaimer();
1.12
- Fix to closing brackets
1.11
- Added initSmallerOverlay()
- Added initFormDataSwitch()
- Added adjustMembersListWidth()
- Added adjustMembersOverlayWidth()
- Added adjustIrisScroll()
1.10
- Corrected initMoveBelow to only trigger when not in edit mode
1.9
- Added option to define just alignment in initCarousel per item
1.8
- Fixed initMoveBelow
1.7
- initQuickScroll now applies to main navigation links as well
1.6
- Added option to define just alignment in initCarousel
*/

// INITIALIZE TABBED SERVICES ICON CAROUSEL WITH AUTOHEIGHT ADJUSTMENT
function initServiceCarouselAutoH() {
  if (!window.suppress) {
    var owl = $('.services-carousel-auto-height').owlCarousel({
        items: 1,
        loop: true,
        autoplay: false,
        autoplayTimeout: 10000,
        dotsSpeed: 300,
        dotsData: true,
        dotsContainer: '.tabbed-icon-nav-container',
        autoHeight:true,
        smartSpeed: 700
    });
  }
}

// INITIALIZE TABBED ICON CAROUSEL
function initServiceCarousel() {
    if (!window.suppress) {
      console.log('services carousels');
      var owl = $('.services-carousel').owlCarousel({
          items: 1,
          loop: true,
          autoplay: false,
          autoplayTimeout: 10000,
          dotsSpeed: 300,
          dotsData: true,
          dotsContainer: '.tabbed-icon-nav-container'
      });
    }
}
function waitForJQuery(callback) {
    var checkLoop = setInterval(function() {
        if (typeof $ !== 'undefined') {
            clearInterval(checkLoop);
            callback();
        }
    });
}

function waitForLoad(callback) {
    var checkLoop = setInterval(function() {
        if ($('html').hasClass("is-loaded")) {
            clearInterval(checkLoop);
            callback();
        }
    });
}

function waitForBlogs(callback){
     var checkLoop = setInterval(function() {
       if ($('.posts-list').find(".loading").length != 1) {
           clearInterval(checkLoop);
           callback();
       }
   });
 }

function initFormDataSwitch() {
    $("[data-formswitch]").each(function() {
        $($(this).data("formswitch")).hide();
    });
    $("[data-formswitch]").parent().on('change', function() {
        var selected = $(this).find("option:selected");
        var target = $($(this).find("option[data-formswitch]").data("formswitch"));
        if (selected.data("formswitch"))
            target.show();
        else
            target.hide();
    });
}

function initHiddenRecaptcha() {
    $(".form-item.is-recaptcha").hide();
    $("form").on("change", function() {
        $(this).find(".form-item.is-recaptcha").show();
    });
}

function updateShareLinks() {
    $(".share-links li a").each(function() {
        $(this).addClass("btn secondary");
    });
}

function initSmallerOverlay() {
    $(".overlay-content").each(function() {
        $(this).addClass("smaller");
        if ($(this).find(".overlay-content-inner").length <= 0)
            $(this).wrapInner('<div class="overlay-content-inner">', '</div>');
    });

    $(".overlay-content").off().on('click', function(event) {
        if (event.target == this) {
            $(this).find(".close-overlay").click();
        }
    });
}


function initBannerPush(homePage, regularPage) {
    if (homePage == undefined || homePage == null)
        homePage = true;
    if (regularPage == undefined || regularPage == null)
        regularPage = true;

    if (homePage)
        $(".divider.home-divider, .page-bg.full-screen").addClass("pushedBanner");
    if (regularPage)
        $(".page-bg:not(.full-screen)").addClass("pushedBanner");

    pushBannerImage();

    $(window).on('resize', function() {
        pushBannerImage();
    });

    function pushBannerImage() {
        $(".pushedBanner").css({
            "margin-top": $("#header").outerHeight() + "px"
        });
    }
}

var wasTransparent = true;

function updateOnTransparent(transparent, notTransparent) {
    transparent();
    $(document).on("scroll", function() {
        checkLogo();
    });
    checkLogo();

    function checkLogo() {
        setTimeout(function() {
            if (!wasTransparent && $(".transparent-header").length >= 1) {
                transparent();
                wasTransparent = true;
            } else if (wasTransparent && $(".transparent-header").length == 0) {
                notTransparent();
                wasTransparent = false;
            }
        }, 1);
    }
}

function initBlogDisclaimer(notPages) {
  var notOnPage = ":not(.client-login)";

  if(notPages){
    if(typeof notPages == "string")
      notPages = [notPages];
    notPages.forEach(item => {
      notOnPage+=":not(."+item+")";
    });
  }

  var disclaimer = 'The Advisor and Manulife Securities Incorporated, Manulife Securities Investment Services Inc. (“Manulife Securities”) and/or Manulife Securities Insurance Inc. do not make any representation that the information in any linked site is accurate and will not accept any responsibility or liability for any inaccuracies in the information not maintained by them, such as linked sites. Any opinion or advice expressed in a linked site should not be construed as the opinion or advice of the advisor or Manulife Securities. The information in this communication is subject to change without notice.' +
  '<br><br>This publication contains opinions of the writer and may not reflect opinions of the Advisor and Manulife Securities Incorporated, Manulife Securities Investment Services Inc. (“Manulife Securities”) and/or Manulife Securities Insurance Inc. The information contained herein was obtained from sources believed to be reliable, no representation, or warranty, express or implied, is made by the writer, Manulife Securities or any other person as to its accuracy, completeness or correctness. This publication is not an offer to sell or a solicitation of an offer to buy any of the securities. The securities discussed in this publication may not be eligible for sale in some jurisdictions. If you are not a Canadian resident, this report should not have been delivered to you. This publication is not meant to provide legal or account advice. As each situation is different you should consult your own professional Advisors for advice based on your specific circumstances.';

    if ($(".blog-page" + notOnPage + ", .post").length > 0) {
        $(".post-link").each(function(i, item) {
            item = $(item);
            var link = item.find("a");
            if (link.prop("target") == "_blank" && link.prop("href").indexOf("https://static.twentyoverten.com") != 0) {
                item.find(".post-header").find("h3").append('<sup style="font-size:.9rem"> *</sup>');
            }
        });
        $(".blog-page" + notOnPage + " #page, .blog-page" + notOnPage + " .content-wrapper").append('<div class="container"><div class="main-content" id="footNote" ><p style="text-align:center" class="disclaimer">' + '* This article link will open in a new internet browser tab.<br>' + disclaimer + '</p></div></div>');
        $(".post .post-wrapper").append('<div><hr><p style="text-align:center" class="disclaimer">' + disclaimer + '</p></div>');
    }
}

function updateCopyrightYear() {
    $(function() {
        var date = new Date();
        var year = date.getFullYear();
        $(".copyrightYear").html(year);
    });
}

function initMembersOverlayURL() {
    var advisor = null;
    try {
        var urlParams = new URLSearchParams(window.location.search);
        advisor = urlParams.get('advisor');
    } catch (e) {

        advisor = getURLParam('advisor');

        function getURLParam(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return decodeURI(results[1]) || 0;
            }
        }
    }
    document.addEventListener("DOMContentLoaded", function() {

        if (advisor) {
            advisor = advisor.replace(/-/g, " ").replace(/_/g, " ").replace(/%20/g, " ");
            var overlay = $("#members-list").find('.member-header:contains(' + advisor + ')').parent();

            setTimeout(function() {
                overlay.click();
            }, 500);
        }
    });
}

function updateAlternateBoxes() {
    if (!window.suppress)
        $(".alternateBoxes img").each(function(i, e) {
            $(e).hide();
            var src = e.src;
            $(e).parent().parent()[0].style = "background: url(" + src + "); background-size: cover; background-position: center center; min-height: 300px;";
        });
}

function initIrisScrollAdjust() {
    adjustIrisScroll();
}

function adjustIrisScroll() {
    function scrollToSection(slug) {
        var headerHeight = $('#header').hasClass('overlay') ? '' : $('#header').outerHeight(),
            scrollSettings = {
                duration: 900,
                easing: 'easeInOutQuint',
                offset: -headerHeight
            };

        if ($('#section-' + slug).length && slug !== 'home') {
            $('#section-' + slug).velocity('scroll', scrollSettings);
        }
    }

    $('a[data-section]').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var slug = $(this).data('section');

        if ($('#section-' + slug).length) {
            $('#main-navigation li').removeClass('active');
            $(this).parent('li').addClass('active');
            history.pushState({
                slug: slug
            }, null, '/' + (slug === 'home' ? '' : slug));

            scrollToSection(slug);
        } else {
            window.location = '/' + slug;
        }

        if ($('.menu-toggle').is(':visible')) {
            $('.menu-toggle.open').trigger('click');
        }
    });
}

function initQuickScroll() {
    if (location.hash) {
        setTimeout(function() {
            ScrollTo(location.hash);
        }, 1);
    }
    $('.content-wrapper a[href*="#"], #content a[href*="#"], .posts-wrappera[href*="#"], #main-navigation a[href^="' + this.location.pathname + '#"], #sub-navigation a[href^="' + this.location.pathname + '#"]').on('click', function(e) {
        var target = $(this).attr("href");

        if (target && target != '#' && $(target).length) {
            ScrollTo(target);
            e.preventDefault();
        }
    });

    function ScrollTo(target) {
        var element = $(target);
          $('html, body').animate({
              scrollTop: (element.offset().top - 150)
          }, 1750, 'swing');
    }
}

//Remove Columns from blog page
function initRemoveBlogColumns(waitForBlogsToLoad) {
  if(waitForBlogsToLoad == null || waitForBlogsToLoad)
    waitForBlogs(run);
  else
    run();

  function run(){
    let posts = ($("#posts-list").length) ? $("#posts-list") : $(".posts-list");
    posts.addClass("posts-wrapper");
    posts.find(".column").children().unwrap();
    // $(".post-link").css("visibility", "visible"); <-- Used to be needed, not sure if it still is
    posts.find(".post-link").sort( (a,b) => {
      //Compare dates
      a = $(a).find("time").attr("datetime").split("-");
      b = $(b).find("time").attr("datetime").split("-");

      a = new Date(a[0], a[1], a[2]);
      b = new Date(b[0], b[1], b[2]);

      return a > b ? -1 : 1;
    }).each(function(){
      $(".posts-list").append(this);
    });

    //Clone to prevent resize event from re-creating with columns
    let postsClone = posts.clone();
    posts.replaceWith(postsClone);
  }
}

function initCalculators() {
  let calcs = document.querySelectorAll(".calculator");
  for (let i = 0; i < calcs.length; i++) {
    calculate(calcs[i]);
    calcs[i].addEventListener("change", function() {
      calculate(calcs[i]);
    });
  }

  function calculate(calc) {

    //Get math and inputs
    let math = calc.hasAttribute("data-math") ? calc.getAttribute("data-math"):"";
    let inputs = calc.querySelectorAll("input");

  	//Preset formulas for old calculators
    let calcId = calc.id;
    if (calcId == "savings-retirement")
      math = "(#1+(#2*((1-(1/((1+(#3/1200))^(#4*12))))/(#3/1200))))*((1+(#3/1200))^(#4*12))";
    if (calcId == "credit-card")
      math = "(#1*((#2/(12*100))*((1+(#2/(12*100)))^#3))/(((1+(#2/(12*100)))^#3)-1))";
    if (calcId == "bank-loan")
      math = "(#1*((#2/(12*100))*((1+(#2/(12*100)))^(#3*12)))/(((1+(#2/(12*100)))^(#3*12))-1))";
    if (calcId == "auto-loan")
      math = "(#1*(#2/(12*100)*((1+(#2/(12*100)))^#3))/(((1+(#2/(12*100)))^#3)-1))";


    // Evaluate the power operator(Because JS doesn't know how to do this)
    if (math.indexOf("^") > 0)
      math = evaluatePower(math);

    //Replace #1.. with input[1]
    for (let i = 0; i < inputs.length; i++) {
      var regex = new RegExp("#" + (i + 1), "g");
      math = math.replace(regex, inputs[i].value);
    }

    //Evaluate(Not safe, but I doubt anything dangerous can happen with math)
    math = eval(math);

    //Round, and display
    math = Math.round(math * 100) / 100;
    if(!!calc.querySelectorAll("input").length && calc.querySelectorAll("input")[calc.querySelectorAll("input").length-1])
	   calc.querySelectorAll("input")[calc.querySelectorAll("input").length-1].value = math;
  };

  function evaluatePower(expression) {

    //Math Operators
    let mathOperators = "+-*/^";

    //Search whole expression
    for (let letter = 0; letter < expression.length; letter++) {

      //If power is found
      if (expression[letter] == '^') {

        let leftIndex = -1;
        let rightIndex = -1;

        //LEFT
        //If previous char was a closing bracket
        if (expression[letter - 1] == ')') {
          //Count how many brackets
          let brackets = 0;
          //Reverse through the string
          for (let letter2 = letter - 1; letter2 >= 0; letter2--) {
            //If another closing bracket is found
            if (expression[letter2] == ')')
              brackets++
            //If closing a bracket
            if (expression[letter2] == '(')
              brackets--;
            //If opening bracket found, and no other brackets opened
            if (brackets == 0) {
              leftIndex = letter2;
              break;
            }
          }
        } else {
          //Go backwards looking for a math operator
          for (let letter2 = letter; letter2 >= 0; letter2--) {
            if (letter2 == 0)
              leftIndex = 0;
            else if (mathOperators.indexOf(expression[letter2]) > 0) {
              leftIndex = letter2;
            }

          }
        }
        //RIGHT
        if (expression[letter + 1] == '(') {
          //Count how many brackets
          let brackets = 0;
          //Forward through the string
          for (let letter2 = letter + 1; letter2 <= expression.length; letter2++) {
            //If another closing bracket is found
            if (expression[letter2] == '(')
              brackets++;
            //If closing a bracket
            if (expression[letter2] == ')')
              brackets--;
            //If opening bracket found, and no other brackets opened
            if (brackets == 0) {
              rightIndex = letter2 + 1;
              break;
            }
          }
        } else {
          //Go forwards looking for a math operator
          for (let letter2 = letter; letter2 <= expression.length; letter2++) {
            if (letter2 == expression.length)
              rightIndex = expression.length;
            else if (mathOperators.indexOf(expression[letter2]) > 0) {
              rightIndex = letter2 + 1;
            }
          }
        }

        //Edit the expression
        let leftExpression = expression.substring(leftIndex, letter);
        let rightExpression = expression.substring(letter, rightIndex);
        let replacedExpression = leftExpression + rightExpression;
        let replaceWithExpression = "Math.pow(" + leftExpression + ", " + rightExpression.substring(1) + ")";

        expression = expression.replace(replacedExpression, replaceWithExpression);

      }
    }
    //Run again if needed
    if (expression.indexOf("^") > 0)
      return evaluatePower(expression);
    else
      return expression;
  }

}

function initSlideshow() {
    if (!window.suppress) {
        $(document).ready(function() {
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


function initCarousel(options, useSelector, selectorStyle, rotateText, items, globalStyle, alignY) {

    //Check if options is a string (Supports older websites)
    if (typeof options === 'string' || options instanceof String) {
        options = {
            'container': options,
            'useSelector': useSelector,
            'selectorStyle': selectorStyle,
            'rotateText': rotateText,
            'items': items
        }
        //Check if alignY is valid(Supports older websiteS), if so then globalStyle has become alignX
        if (alignY) {
            options.x = globalStyle;
            options.y = alignY;
        }
        //Check if a globalStyle was given
        else if (globalStyle) {
            var semiColinIndex = globalStyle.indexOf(';');
            var pos = globalStyle.substr(21, semiColinIndex);
            var spaceIndex = globalStyle.indexOf(' ');
            options.x = globalStyle.substr(0, spaceIndex);
            options.y = globalStyle.substr(spaceIndex);
        }
        //No alignment set
        else {
            options.x = 'center';
            options.y = 'center';
        }
    }

    //Create vars from options
    var container = options.hasOwnProperty("container") ? options.container : '.page-bg.full-screen';
    var useSelector = options.hasOwnProperty("useSelector") ? options.useSelector : true;
    var selectorStyle = options.hasOwnProperty("selectorStyle") ? options.selectorStyle : 'pill';
    var rotateText = options.hasOwnProperty("rotateText") ? options.rotateText : false;
    var items = options.hasOwnProperty("items") ? options.items : [{
        'img': 'https://static.twentyoverten.com/5b6499146b80a9633b347026/UH-5vE468Ti/iStock-900381778.jpg'
    }, {
        'img': 'https://static.twentyoverten.com/5b6499146b80a9633b347026/UH-5vE468Ti/iStock-900381778.jpg'
    }];
    var x = options.hasOwnProperty("x") ? options.x : 'center';
    var y = options.hasOwnProperty("y") ? options.y : 'center';

    //Stop if the container isn't valid
    if($(container).length == 0){
      console.log('No container '+options.container+' was found');
      return;
    }
    //Owl Carousel Settings
    var owlCarouselSettings = {
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        dotsSpeed: 1000,
        dots: useSelector
    };

    //Overwrite Owl Carousel Settings if valid in the options
    if (options.hasOwnProperty('owlSettings'))
        for (let [key, value] of Object.entries(options.owlSettings))
            owlCarouselSettings[key] = value;

    //init variables
    var i = 1;
    var containerItems = "";
    var pupilFramework = $(container).find(".overlay-wrapper").length > 0,
        intrinsic = $(container).hasClass("is-intrinsic");

    globalStyle = "background-position: " + x + " " + y + "; background-repeat: no-repeat; background-attachment: scroll; background-size: cover;";

    //Add each item to the carousel, also start creation of selector
    items.forEach(function(item) {
        var img = item.img;
        var style = item.style ? item.style : (item.y || item.x ? "background-position: " + (item.y ? item.y : y) + " " + (item.x ? item.x : x) + "; background-repeat: no-repeat; background-attachment: scroll; background-size: cover;" : globalStyle);
        containerItems += '<div class="item">';

        //If the background image was set to instrinsic
        if (!intrinsic)
            containerItems += '<div class="bg" data-src="' + img + '" style="' + style + ' background-image: url(\'' + img + '\')"></div>';
        else
            containerItems += '<figure class="page-bg--image"><img src="' + img + '"></figure>';

        //Add the overlay
        containerItems += '<div class="overlay" ' + (rotateText ? '' : 'style="background:none"') + '>';

        //If each item has it's own text
        if (rotateText) {
            containerItems += '<div class="container">';

            //If the framework isn't pupil push the hero content down 99px
            if (!pupilFramework)
                containerItems += '<div class="header-push" style="height: 99px;"></div>';

            // Add the hero content wrapper
            containerItems += '<div class="hero-content" data-location="hero_content" data-type="hero">';

            //Add the content if item has it's own text
            if (item.header && item.header != null)
                containerItems += item.header;

            // Close the wrapper
            containerItems += "</div></div>";
        }

        // Close the wrapper
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

    e.wrapInner('<div class="owl-carousel owl-theme banner-carousel '+(selectorStyle ? 'owl-'+selectorStyle : '')+'" ' + (intrinsic ? '' : 'style="position: absolute') + '">', '</div>');

    $(container).find(".banner-carousel").wrapInner('<div class="item">', '</div>');


    //Add the other items
    $(container).find(".banner-carousel").append(containerItems);


    //Add Selector
    var e1 = $(container);
    if (pupilFramework && !rotateText)
        e1 = e1.find(".overlay-wrapper");

    //Start Carousel
    var owl = $(container).find(".banner-carousel").owlCarousel(owlCarouselSettings);
    owl.on('changed.owl.carousel', function(e) {
        owl.trigger('stop.owl.autoplay');
        if(!$(container).find(".banner-carousel").hasClass("paused"))
          owl.trigger('play.owl.autoplay');
    });

    let pauseBtn = $('<a class="owl-pause" title="Pause/Play carousel"><i class="fas fa-pause"></i></a>')
    pauseBtn.on("click", function(){
      let $owl = $(container).find(".banner-carousel");
      let $owlData = $('.banner-carousel').data('owl.carousel');
      if($owl.hasClass("paused")){
        //Unpause
        $owl.removeClass("paused");
        $owl.trigger('play.owl.autoplay');
        $owlData.settings.autoplay = true;
        $owlData.options.autoplay = true;
        this.innerHTML = '<i class="fas fa-pause"></i>';
      }else{
        //Pause
        $owl.addClass("paused");
        $owl.trigger('stop.owl.autoplay');
        $owlData.settings.autoplay = false;
        $owlData.options.autoplay = false;
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    $(container).find(".banner-carousel").append(pauseBtn);

    //If text is not rotating, re-add overlay
    if (!rotateText) {
        var e2 = $(container);
        if (pupilFramework){
          $(container).css('min-height', '65vh');
          $(container).find(".banner-carousel").css("height","auto");
        }

         if(overlayCopy.length > 0)
           overlayCopy[0].style = "position: absolute;z-index: 1;top: 0;left: 0;width: 100%;";
        $(container).find(".banner-carousel").append(overlayCopy);
    } else if (pupilFramework) {
        $(container).find(".overlay-wrapper").append(overlayCopyPlaceholder);
    }

}

function initVideo(container, videoURL) {
    var bg = $(container); // Background container
    var bgImage = bg.css('background-image'); // The BG image per CSS

    var videoActive = bg.length > 0;
    /*
     var vidElement = $('<video muted loop class="heroVid"><source src="' + videoURL + '" type="video/mp4"></video>'); // New video element
      */

    var vidElement = $('<video muted loop class="heroVid">' +
        '<source src="' + videoURL + '" type="video/mp4">' +
        '</video>'); // New video element
    var heroVid;

    // Declare the function so we can call it again on resize, and once on load
    var bgSwap = function() {
        var bgAR = bg.outerWidth() / bg.outerHeight(); // Aspect ratio of container
        // The method to set a Video - returns promise
        var setVideo = function() {
            return new Promise(function(resolve, reject) {
                try {
                    heroVid = bg.find(".heroVid");
                    // Get rid of the existing background image
                    bg.css('background-image', 'none');
                    if (bg.find(".heroVid").length < 1) {
                        // If this is the first time running this function on page load, we will not have a heroVid element. So create one.
                        // Append the video Element
                        bg.append(vidElement);
                        heroVid = bg.find(".heroVid");
                        heroVid.css({
                            width: "100%",
                            height: "auto",
                            position: 'absolute',
                            top: '0'
                        })
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
            return new Promise(function(resolve, reject) {
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
            setVideo().then(function() {
                // Even though the vid element has been set, and this is guaranteed by the promise, the full video data may not yet have been loaded. We need to test the aspect ratio of the video, so we loop until we get something that makes sense.
                var testVidWidth = setInterval(function() {
                    var vidWidth = heroVid[0].videoWidth;
                    // If videoWidth is set on the vid and it's more than 0
                    if (vidWidth && vidWidth > 0) {
                        // Stop the loop
                        clearInterval(testVidWidth);
                        // Get the video Aspect Ratio
                        vidAR = vidWidth / heroVid[0].videoHeight;
                        // Test the aspect ratio of the vid agianst the aspect ratio of the container
                        if (vidAR > bgAR) {
                            // If it's a small space, use the default background image (set in the gui)
                            setBgImage().then(function(bgImage) {
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
            }).catch(function(error) {
                console.error(error)
            })
        }
    }

    // Run the function on window resize event
    $(window).on('resize', function() {
        bgSwap();
    })

    // Run the function on load
    bgSwap();
}

function initMoveBelow() {
    $(".moveBelow").each(function() {
        var $this = $(this);
        var belowArea = $($this.data("below_area"));
        if (belowArea.length > 0 &&
            ($this.closest(".editable").length == 0 ||
                ($this.closest(".editable").length > 0 && !window.suppress))) {

            $this.hide();
            var content = $this.clone();
            content.removeClass("moveBelow");
            content.addClass("main-content main-content-wrapper");

            content.appendTo(belowArea);
            content.wrap('<div class="container"></div>');
            content.show();
        }
    });
}


function adjustMembersListWidth() {
    $("#members-list, .members-list").addClass("smaller");
}

function adjustMembersOverlayWidth() {
    $(".overlay-content .overlay-content-wrapper").addClass("larger");
}

function initFrenchBlog() {
    $('.form-item button[type="submit"]').html("Chercher");
    $(".categories-title").html("catégories");
    $(".read-more").html("<span></span>Lire Davantage");
    $('.form-item input[name="q"]').attr("placeholder", "Entrez votre recherche...");
    $(".prev-page").text("Page Précédente");
    $(".next-page").text("Page Suivante");

    $(".post-meta time").each(function() {
        var time = $(this).html()
            .replace(/January/g, "Janvier")
            .replace(/Febuary/g, "Février")
            .replace(/March/g, "Mars")
            .replace(/April/g, "Avril")
            .replace(/May/g, "Mai")
            .replace(/June/g, "Juin")
            .replace(/July/g, "Juillet")
            .replace(/Augest/g, "Août")
            .replace(/September/g, "Septembre")
            .replace(/October/g, "Octobre")
            .replace(/November/g, "Novembre")
            .replace(/December/g, "Décembre")
        $(this).html(time);
    });

    if ($("#footNote .disclaimer").length > 0)
        $("#footNote .disclaimer")[0].innerHTML = '* Le lien vers l’article s’ouvrira dans un nouvel onglet du navigateur Internet.' +
        '<br>Avis de non-responsabilité relativement aux liens hypertextes Lien vers le site Web d’un tiers. Le représentant et Placements Manuvie incorporée ou Placements Manuvie Assurance inc. (« Placements Manuvie »)  ne donnent aucune garantie quant à l\'exactitude de l\'information contenue dans les sites liés à son propre site et ne peuvent être tenus responsables de l\'inexactitude de l\'information qu\'ils ne Contrôlent pas, comme le contenu du site liés. Les opinions ou les conseils présentés dans les sites liés à son propre site ne peuvent être interprétés comme étant des opinions ou des conseils de le représentant ou de Placements Manuvie. L’information ci‐dessus peut être modifiée sans préavis.' +
        '<br><br>Avis de non-responsabilité relativement aux opinions. Cette publication est l’oeuvre seule de l’auteur, et les avis, les opinions et les recommandations sont ceux de l’auteur seulement et ne reflètent pas nécessairement ceux de Placements Manuvie incorporée ou Placements Manuvie Services d’investissement inc. ou Placements Manuvie Assurance inc. L’information contenue dans ce document vient de sources jugées fiables. Toutefois, ni l’auteur ni Placements Manuvie incorporée ou Placements Manuvie Services d’investissement inc. ou Placements Manuvie Assurance inc., ni toute autre personne n’offre aucune représentation ou garantie, explicite ou implicite, relativement à l’exactitude, à l’exhaustivité ou à la précision de cette information. Cette publication ne constitue pas une offre de vente ni la sollicitation d’une offre d’achat de quelque titre que ce soit. Les titres dont il est question dans cette publication ne sont peut‐être pas admissibles à la vente dans certaines juridictions. Si vous n’êtes pas un résident canadien, cette publication ne vous est pas destinée. Cette publication ne vise pas à offrir des conseils sur le plan juridique ou sur la gestion de compte. Chaque situation est unique; vous devriez consulter un professionnel qui sera en mesure de vous offrir des conseils en tenant compte de votre situation particulière.';
}
