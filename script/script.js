
            var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    sidebarLinks = $(".sidebar-nav a"),
    isClosed = false;

    sidebarLinks.click(function () {

        hamburger_cross()
                $('#wrapper').toggleClass('toggled');
    var targetSec = $(this).text();
    $('html, body').animate({
        scrollTop: $('#' + targetSec).offset().top 
                });
            });
    trigger.click(function () {
        hamburger_cross();
            });
    overlay.click(function () {
        hamburger_cross();
            });

    function hamburger_cross() {

                if (isClosed == true) {
        overlay.hide();
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
    isClosed = false;
                    
                } else {
        overlay.show();
    trigger.removeClass('is-closed');
    trigger.addClass('is-open');
    isClosed = true;
                 
                }
                
            }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
            });


    $("#gotop").click(function () {
        $("html , body").animate({
            scrollTop: "0px"
        }, 100);
                });
    $(window).scroll(function () {
                    if ($(window).scrollTop() == 0) {
        $("#gotop").css("display", "none");

                    } else {
        $("#gotop").css("display", "flex");
                    }
                });
                

