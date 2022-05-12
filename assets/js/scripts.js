
(function($) {
    "use strict";

    /*================================
    Preloader
    ==================================*/
    var preloader = $('#preloader');
    $(window).on('load', function() {
        preloader.fadeOut('slow', function() { $(this).remove(); });
    });

    /*================================
    nice select active
    ==================================*/
    if ($.fn.niceSelect) {
        $('.course-select').niceSelect();
    }

    /*================================
    stickey Header
    ==================================*/
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop(),
            hbHeight = $('.header-top').innerHeight(),
            headerBottom = $('.header-bottom');

        if (scroll >= hbHeight ) {
            headerBottom.addClass("sticky-header");
        } else {
            headerBottom.removeClass("sticky-header");
        }
    });


    /*================================
    slicknav
    ==================================*/
    

    
    /*================================
    countdown
    ==================================*/
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown days"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hours</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Minutes</p></span> <span class="cdown second"> <span><span class="time-count">%S</span> <p>Seconds</p></span>'));
        });
    });

    /*================================
    Student Testimonial
    ==================================*/
    function singleGalleryCarousel() {
        if ($('.student-cmnt-active').length && $('.student-thumbnil-active').length) {

            var $sync1 = $(".student-cmnt-active"),
                $sync2 = $(".student-thumbnil-active"),
                flag = false,
                duration = 500;

            $sync1
                .owlCarousel({
                    items: 1,
                    margin: 0,
                    nav: false,
                    dots: true,
                    loop: true
                })
                .on('changed.owl.carousel', function(e) {
                    if (!flag) {
                        flag = true;
                        $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        flag = false;
                    }
                });

            $sync2
                .owlCarousel({
                    margin: 20,
                    items: 3,
                    nav: false,
                    dots: false,
                    center: true,
                    loop: true,
                    stagePadding: 70,
                    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    responsive: {
                        0: {
                            items: 2
                        },
                        400: {
                            items: 2
                        },
                        500: {
                            items: 3
                        },
                        800: {
                            items: 5
                        },
                        1400: {
                            items: 3
                        }
                    },
                })
                .on('click', '.owl-item', function() {
                    $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);

                })
                .on('changed.owl.carousel', function(e) {
                    if (!flag) {
                        flag = true;
                        $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        flag = false;
                    }
                });
        }
    }
    singleGalleryCarousel();




    /* about page read more*/

    const parentContainer =  document.querySelector('.read-more-container');

    parentContainer.addEventListener('click', event=>{
    
        const current = event.target;
    
        const isReadMoreBtn = current.className.includes('read-more-btn');
    
        if(!isReadMoreBtn) return;
    
        const currentText = event.target.parentNode.querySelector('.read-more-text');
    
        currentText.classList.toggle('read-more-text--show');
    
        current.textContent = current.textContent.includes('Read More') ? "Read Less..." : "Read More...";
    
    });



   /*--------------------------------------------------------------
         Ajax Contact Form
    --------------------------------------------------------------*/
    $('.screen-reader-response').hide();
    $('.wpcf7 #c_submit').on('click', function() {
        var c_name = $('#c_name').val();
        var c_email = $('#c_email').val();
        var c_msg = $('#c_msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(c_email)) {
            alert('Please enter valid email');
            return false;
        }

        c_name = $.trim(c_name);
        c_email = $.trim(c_email);
        c_msg = $.trim(c_msg);

        if (c_name != '' && c_email != '' && c_msg != '') {
            var values = "&c_name=" + c_name + "&c_email=" + c_email + " &c_msg=" + c_msg;
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: values,
                success: function() {
                    $('#c_name').val('');
                    $('#c_email').val('');
                    $('#c_msg').val('');

                    $('.screen-reader-response').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.screen-reader-response').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.screen-reader-response').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>');
        }
        return false;
    });

})(jQuery);