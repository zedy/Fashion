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
    main_box_resizing();
    
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
  
  
  // End of file
})( jQuery, window, document );