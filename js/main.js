// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

  "use strict";
  
  /**
   * Global variables available for all scopes
   */
  var $prev = $('#slider').find('.left');
  var $next = $('#slider').find('.right');  
  
  /**
   * All function calls are placed on top for ease of access
   * and personal coding practices.
   */
  $(document).ready(function(){
    
    main_slider_controlls();
    
  });
  
  
  /**
   * Call all the elements that need to be responsive
   */
  $(window).resize(function() {

  });
  
  /**
   * Logic behind the slider controlls
   */
  function main_slider_controlls() {
    
    // show previous slide        
    $prev.click(function(e){
      var $active = $('#slider').find('.active');
      $active.fadeOut(150).removeClass('active');
      
      if ($active.hasClass('first')) {
        $('#slider .slides').find('.last').fadeIn(150).addClass('active');
      } else {
        $active.prev().fadeIn(150).addClass('active');
      }
      
    });
    
    // show next slide
    $next.click(function(e){
      var $active = $('#slider').find('.active');      
      $active.fadeOut(150).removeClass('active');
      
      if ($active.hasClass('last')) {
        $('#slider .slides').find('.first').fadeIn(150).addClass('active');
      } else {
        $active.next().fadeIn(150).addClass('active');
      }
      
    });
    
    main_slider_nav_controll();
    
  }
  
  /**
   * Logic behind the navs on the slider
   * Is called when the event for moving
   * a slide is fired.
   */
  function main_slider_nav_controll() {
    
  }
  
  
  // End of file
})( jQuery, window, document );