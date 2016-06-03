// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

  "use strict";
  
  /**
   * Global variables available for all scopes
   */
  var $ddm = $('#dropdownMenu');
  var $prev = $('#slider').find('.left');
  var $next = $('#slider').find('.right');  
  var $email = $('#contactForm').find('.email');
  
  /**
   * All function calls are placed on top for ease of access
   * and personal coding practices.
   */
  $(document).ready(function(){
    
    main_slider_controlls();
    main_box_resizing();
    $('#contactForm').find('.btn').on('click', main_contact_form_operations);
    $email.on('keypress', main_contact_form_check);
    $('#closeDDM').off().on('click', main_close_dropdown_menu);
    $('#navigation li').off().on('click', main_open_dropdown_menu);
    $('#cart').off().on('click', main_open_shopping_menu);
    $('#closeCart').off().on('click', main_close_shopping_menu);
    $('#quantity').off().on('click', main_show_picker);
    main_insert_into_qunatity();
    
  });
  
  
  /**
   * Call all the elements that need to be responsive
   */
  $(window).resize(function() {
    clearTimeout(resize);
      resize = setTimeout(function() {
        //magic goes here

      }, 300);
  });
  
  /**
   * When clicking on the custom 'select' field
   * we need to show the options.
   */
  function main_show_picker(e) {
    
    e.stopPropagation();
    // show the options
    $('#pickerBox').slideDown(100);
    if ($('#quantity').hasClass('closed')) {
      $('#quantity').removeClass('closed').addClass('opened');
    }
    
    $(document.body).off().on('click', function(ev){
      ev.stopPropagation();
      
      if (ev.target.parentElement.id !== "pickerBox") {
        $('#pickerBox').slideUp(100);
        $('#quantity').addClass('closed').removeClass('opened');
      }

    });
    
  }
  
  /**
   * When the user clicks on the options list
   * the value is inserted into the select element
   * and the picker is closed
   */
  function main_insert_into_qunatity() {
    
    $('#pickerBox li').off().on('click', function(e){
        var opt = parseInt(e.currentTarget.innerHTML);        
        $('#quantity').val(opt);
        $('#quantity').addClass('closed').removeClass('opened');
        $('#pickerBox').slideUp(100);
    });
       
  }

 
  /**
   * When the users clics on the `weight` symbol
   * for the shopping cart, the detailed menu slides up
   * with the bag/cart information
   */
  function main_open_shopping_menu() {
    
    $('#shoppingCart').slideDown(150);
    
  }
  
  /**
   * When the users clicks on one of the menu options
   * in the header, a dropdown menu should 'drop-down'.
   * 
   * Also we take the targets offset so we can properly
   * align the pointer of the dropdown menu to the target.
   * 
   */
  function main_open_dropdown_menu(e) {    

    e.stopPropagation();
    // there is not need for this since if this was a production
    // website the page would be redirected to home.
    if (e.target.className == 'home') {
      location.reload();
    }
    
    // get the  left offset of the element
    var left = e.delegateTarget.offsetLeft;
    // calculate the middle of the element
    // subtract the padding and divide by half to get middle.
    var offset = (e.currentTarget.clientWidth - 17) / 2;
    
    // add the combined offsets to the element
    $('#triDDM').css({'left': left + offset});
    
    $ddm.slideDown(150).toggleClass('opened');
    
  }
  
  /**
   * When the users clicks on the "x" | close btn
   * in the shoping cart menu, it should close.
   */
  function main_close_shopping_menu() {
    
    $('#shoppingCart').slideUp(150).toggleClass('closed');
    
  }
  
  /**
   * When the users clicks on the "x" | close btn
   * in the dropdown menu, it should close.
   */
  function main_close_dropdown_menu() {
    
    $ddm.slideUp(150).toggleClass('closed');
    
  }
  
  /**
   * Logic behind the slider controlls
   */
  function main_slider_controlls() {
    
    var id;
    
    // show previous slide        
    $prev.click(function(e){
      var $active = $('#slider .slides').find('.active');
      $active.fadeOut(150).removeClass('active');
      
      if ($active.hasClass('first')) {
        $('#slider .slides').find('.last').fadeIn(150).addClass('active');
      } else {
        $active.prev().fadeIn(150).addClass('active');
      }
      
      id = $('#slider .slides').find('.active').attr('data-id');
      main_slider_nav_controll(id);
    });
    
    // show next slide
    $next.click(function(e){
      var $active = $('#slider .slides').find('.active');      
      $active.fadeOut(150).removeClass('active');
      
      if ($active.hasClass('last')) {
        $('#slider .slides').find('.first').fadeIn(150).addClass('active');
      } else {
        $active.next().fadeIn(150).addClass('active');
      }
      id = $('#slider .slides').find('.active').attr('data-id'); 
      main_slider_nav_controll(id);
    });              
    
  }
  
  /**
   * Logic behind the navs on the slider
   * Is called when the event for moving
   * a slide is fired.
   * 
   * @param int position
   *  The position where the new nav is pointed at.
   * 
   */
  function main_slider_nav_controll(position) {
    $('#slider .navs').find('.active').removeClass('active');
    $('#slider .navs').find('li[data-id="' + position + '"]').addClass('active');
  }
  
  /**
   * Makes the #boxes elements perfectly squared
   * during all occasions.
   */
  function main_box_resizing() {
    var width = $('#boxes .left').width();
    $('#boxes > div').height(width);
  }
  
  /**
   * Validate as the user types
   */
  function main_contact_form_check(e) {
    
      var email = e.currentTarget.value;
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      
      if (regex.test(email)) {
        
      } else {
        if (email != '') {
          $email.addClass('invalid');
        } else {
          $email.removeClass('invalid');
        }
      }
  }
  
  /**
   * The validation and submition of the contact
   * form.
   */
  function main_contact_form_operations(e) {
    
    e.preventDefault();
        
    var trap = $('#contactForm').find('.trap').val();
    
    // regex for testing email
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    // Honeypot
    // mhm, honey, who can resist? certainly not a bot.
    if (trap != '') {
      return false;
    }

    // validation of the email
    if (!$email.val()) {
      $email.addClass('invalid').removeClass('valid');
    } else if (regex.test($email.val()) && $email.val()) {
      $email.addClass('valid').removeClass('invalid');
    }

    // fianlly we call the function wich whill send the DATA if validation is TRUE.
    if ($email.hasClass('valid')) {
      var data = {};
      data.email = $email.val();
      main_send_information(data);      
    } else {
      return false;
    }   

    return false;
    
  }
  
  /**
   * Simple ajax function which makes an ajax call
   * to send the data from the form to the server.
   * 
   * @param object Data
   */
  function main_send_data(data) {
    
    // this is false since we dont have a DB to store it.
    // the code is just for show.
    return false;
    
    var email = data;
    
    $.ajax({
        url : "some-url",
        type: "POST",
        data : data,
        success: function(data, textStatus, jqXHR) {
            //data - response from server
            
            // send an email to the subscriber
            main_send_email(email);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //data - response from server
        }
    });
  }
  
  /**
   * The function that send the contact form parameters to the php
   * script, which will send a nice little thank you to the new 
   * subsriber :) 
   * 
   * @param object emailData
   * 
   * @see send_email.php
   */
  function main_send_email(emailData) {

    if(emailData) {
        jQuery.ajax({
            url: "send_email.php",
            data:'email='+
            emailData.email,
            type: "POST",
            success:function(data){
                $('#contactForm .response').html(data); 
            },
            error:function(data){
              $('#contactForm .response').html(data);      
            }
        });
      }
  }
  
  // End of file
})( jQuery, window, document );