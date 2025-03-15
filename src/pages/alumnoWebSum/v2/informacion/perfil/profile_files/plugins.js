$(function() {
             
    let uiElements = function(){
        //Start Knob Plugin
        let uiKnob = function(){
            
            if($(".knob").length > 0){
                $(".knob").knob();
            }            
            
        }//End Knob
        
        // Custom Content Scroller
        let uiScroller = function(){
            
            if($(".scroll").length > 0){
                $(".scroll").mCustomScrollbar({axis:"y", autoHideScrollbar: true, scrollInertia: 20, advanced: {autoScrollOnFocus: false}});
            }
            
        }// END Custom Content Scroller
                  
        return {
            init: function(){
                uiKnob();
                uiScroller();
            }
        }
        
    }();

    uiElements.init();
    
    
    /* My Custom Progressbar */
    $.mpb = function(action,options){

        let settings = $.extend({
            state: '',            
            value: [0,0],
            position: '',
            speed: 20,
            complete: null
        },options);

        if(action == 'show' || action == 'update'){
            
            if(action == 'show'){
                $(".mpb").remove();
                let mpb = '<div class="mpb '+settings.position+'">\n\
                               <div class="mpb-progress'+(settings.state != '' ? ' mpb-'+settings.state: '')+'" style="width:'+settings.value[0]+'%;"></div>\n\
                           </div>';
                $('body').append(mpb);
            }
            
            let i  = $.isArray(settings.value) ? settings.value[0] : $(".mpb .mpb-progress").width();
            let to = $.isArray(settings.value) ? settings.value[1] : settings.value;
            
            let timer = setInterval(function(){
                $(".mpb .mpb-progress").css('width',i+'%'); i++;
                
                if(i > to){
                    clearInterval(timer);
                    if($.isFunction(settings.complete)){
                        settings.complete.call(this);
                    }
                }
            }, settings.speed);

        }

        if(action == 'destroy'){
            $(".mpb").remove();
        }                
        
    }
    /* Eof My Custom Progressbar */
    
    
    // New selector case insensivity        
     $.expr[':'].containsi = function(a, i, m) {
         return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
     };              
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
