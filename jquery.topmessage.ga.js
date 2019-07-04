(function ( $ ){
  /*
  All rights reseved to https://www.questific.com [Abdallah Ibrahim Salameh Alhabarneh] 2016
  For more information please visit us at https://www.questific.com or contact us at abdallah.alhabarneh@gmail.com
  Or easily you can go to https://www.questific.com/contact-us
  */
  
  var MWR, MOB;

  var methods = {
    close: function(){
      //TODO
    }
    ,init: function(options){
      var myobj = this;
      var settings = $.extend({
        type: 'none',
        classes: null,
        style: null,
        topStyle: null,
        topClasses: null,
        htmlContent: true,
        content: '',
        ajaxContent: null,
        noDelay: false,
        closeButton: true,
        delay: null,
        onCloseButtonClicked: function() {},
        onComplete: function() {},
        onClose: function() {},
        delayOnClose: 0.5,
        delayOfAppearing: 0.5,
        align: 'left',
        container: 'body',
        onClick: function() {},
        icon: null,
        //wrapperCSS: {'position': 'fixed','left': '0','top': '0','right': '0','bottom': '0'},
        wrapperCSS: {},
        id: null,
        wrapperID: null,
        type: null,
      }, options);

      if( settings.id === null ){
        var d  = new Date(),
            t  = d.getTime(),
            id = 'gatopmessage_t_' + t;
      }else var id = settings.id;

      if( settings.wrapperID === null ){
        var d  = new Date(),
            t  = d.getTime(),
            wrapperID = 'gatopmessage_w_' + t;
      }else var wrapperID = settings.wrapperID;

      var delayOnClose = parseInt(settings.delayOnClose * 1000);

      if( $("#top_message").length < 1 ) $("body").append("<div class='top-message-container' id='top_message'></div>");
      var topmessagecontainer = $("#top_message");

      var wrapper = $( "<div />" ).appendTo( topmessagecontainer );
      wrapper.css( settings.wrapperCSS );
      wrapper.attr('id', wrapperID);
      wrapper.addClass("top-message-wrapper");

      var obj = $("<div />").appendTo( wrapper );
      obj.attr("id", id);
      obj.addClass("message-content");
      if( settings.style !== null ){
        obj.css( settings.style );
      }

      if( settings.classes !== null ){
        obj.addClass( settings.classes );
      }

      if( settings.topStyle !== null ){
        topmessagecontainer.css( settings.topStyle );
      }

      if( settings.topClasses !== null ){
        topmessagecontainer.addClass( settings.topClasses );
      }

      if( settings.type != null && settings.type != "default" ){
        if( settings.type == 'danger' ){
          obj.css({'border-color': '#ebccd1', 'background-color': '#f2dede', 'color': '#a94442'});
        }else if( settings.type == 'warning' ){
          obj.css({'border-color': '#faebcc', 'background-color': '#fcf8e3', 'color': '#8a6d3b'});
        }else if( settings.type == 'info' ){
          obj.css({'border-color': '#bce8f1', 'background-color': '#d9edf7', 'color': '#31708f'});
        }else if( settings.type == 'success' ){
          obj.css({'border-color': '#d6e9c6', 'background-color': '#dff0d8', 'color': '#3c763d'});
        }
      }

       
      // Easy to reference later...
      //$("body").append( '<div id="' + wrapperID + '" class=" ' + settings.wrapperCSS + '"></div>' );

      /*var obj = $("#" + id),
          mytop = '5px',
          myleft = '5px',
          myposition = 'fixed',
          myclasses = 'gatopmessage';*/

      MOB = obj;
      MWR = wrapper;

      var closeThis = function(closeTimer){
        obj.animate({
          opacity: 0
        }, closeTimer, function(){
          $( this ).remove();
          wrapper.remove();

          if( $(".top-message-wrapper").length < 1 ) $("#top_message").remove();

          if ( $.isFunction( settings.onClose ) ) {
            settings.onClose.call( this );
          }
        })
      }

      if ( $.isFunction( settings.onClick ) ) {
        $(document).on("click", "#" + id, function(){
          settings.onClick.call( this );
        })
      }
      
      var delay = 1000;

      if( settings.delay !== null ){
        delay = parseInt(settings.delay * 1000);
        setTimeout( function(){
          closeThis(delayOnClose);
        } , delay );
      }

      /*switch( settings.type ){
        case 'normal':
          myclasses += ' gatopmessage-normal';
          break;
        case 'danger':
          myclasses += ' gatopmessage-danger';
          break;
        case 'warning':
          myclasses += ' gatopmessage-warning';
          break;
        case 'success':
          myclasses += ' gatopmessage-success';
          break;
        case 'info':
          myclasses += ' gatopmessage-info';
          break;
        case 'primary':
          myclasses += ' gatopmessage-primary';
          break;
        case 'none':
          myclasses += ' gatopmessage-none';
          break;
        default:
          myclasses += ' gatopmessage-none';
          break;
      }*/

      /*obj.css({
        'left'      : p_left,
        'right'     : p_right,
        'top'       : p_top,
        'bottom'    : p_bottom,
        'position'  : myposition,
        'display'   : 'none'
      });*/


      //var //contentID = 'gatopmessage_content_' + id,
          //closeareaID = 'gatopmessage_closearea_' + id,
          //mycontent = '<div class="message-content" id="' + contentID + '"></div>';
          //actionarea = '<div class="gatopmessage-closearea" id="' + closeareaID + '"></div>';

      /*if(settings.closeButton === true){
        obj.html( mycontent + actionarea );
      }else{
        obj.html( mycontent );
        $("#" + contentID).css('width', '100%');
      }*/
      
      //var contentObj = $('#' + contentID);
          //actionObj  = $('#' + closeareaID);

      if(settings.htmlContent == true){
        obj.html( settings.content );
      }else{
        obj.text( settings.content );
      }

      if(settings.icon !== null){
        obj.html( '<i class="fa fa-' + settings.icon + '" aria-hidden="true"></i>&nbsp;' + obj.html() );
      }

      if(settings.closeButton === true){
        var closeButtonID = 'gatopmessage_closebutton_' + id;

        var closeButton = $("<a />").appendTo( obj );
        closeButton.attr("id", closeButtonID);
        closeButton.addClass("dismiss-message");

        closeButton.addClass(settings.align);

        closeButton.html("✕");
        closeButton.attr("href", "#");

        //actionObj.html('<span id="' + closeButtonID + '" class="gatopmessage-close-btn"><i class="fa fa-times" aria-hidden="true"></i></span>' );
        /*actionObj.html('<span id="' + closeButtonID + '" class="gatopmessage-close-btn">&times;</span>' );
        actionObj.addClass( 'actionarea-' + settings.closeButtonPositionX );
        contentObj.addClass( 'gatopmessage-content-' + settings.closeButtonPositionX );*/
        $(document).on("click", "#" + closeButtonID, function(e){
          e.preventDefault();
          if( $.isFunction( settings.onCloseButtonClicked ) ){
            settings.onCloseButtonClicked.call( this );
          }
          closeThis(delayOnClose);
        })
      }

      var appearingDelay = parseInt(settings.delayOfAppearing * 1000);
      obj.css('opacity', '0'); //, 'display': 'block'});

      obj.animate({
        opacity: 1,
      }, appearingDelay, function(){
        if ( $.isFunction( settings.onComplete ) ) {
          settings.onComplete.call( this );
        }
      })
    },
  }; // Abdallah Alhabarneh

  $.fn.gatopmessage = function(methodOrOptions){
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.topmessage.ga Questific please contact us questific.com' );
    }
  }

}(jQuery))
