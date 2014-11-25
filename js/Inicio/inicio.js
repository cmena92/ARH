
$(document).ready(function(e) {

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 450);
});

$(window).bind('resizeEnd', function() {
     funcionModificarTamañoVentana();  
});	
	
	
	
 funcionModificarTamañoVentana();   
});

//------------------------------------	
	var funcionModificarTamañoVentana=function(){
		setTimeout("padre = $(window.parent.document);padre.find('#fPrincipal').animate({'height': $('body').height()+25});",420);
		}

//-------------------------------------------------	