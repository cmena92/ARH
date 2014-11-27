

$(document).ready(function(){ 

function supports_html5_storage() {
		  try {
			return 'localStorage' in window && window['localStorage'] !== null;
		  } catch (e) {
			return false;
		  }
		}

if(supports_html5_storage()){	
		var us;
		var us2=window.localStorage.getItem('usuarioARH');
		us=us2.split(",");	
		if(us!="..."){
			
			  var parametros={"Permiso":us[6]};							
			  $.ajax({
				  async:true,	
				  type:'POST',  
				  data:parametros,
				  url:'php/Vacaciones/GetMenuVacaciones.php', 
				  success:function(respuesta){
						$("#divMenu").html(respuesta);
						funcionModificarTamañoVentana();
					},
				  error:function(respuesta){
						alert("Error al intentar cargar el Menu, verifique su conexion");//MS
					}
				});
			
		}
	}

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 450);
});

$(window).bind('resizeEnd', function() {
     funcionModificarTamañoVentana();  
});


$('#txtCedula').keydown(function(e) {
		
		
	  $(this).hasClass('alert-danger')
	  {
        $(this).removeClass('alert-danger'); 
	  } 
	
});
$('#txtNPuesto').keydown(function(e) {
		
		
	  $(this).hasClass('alert-danger')
	  {
        $(this).removeClass('alert-danger'); 
	  } 
	   
});
//--------------

/*zona de redimencionar*/
$('body div a').click(function(e) {
  funcionModificarTamañoVentana();
});
/*zona de redimencionar*/



});//fin ready
 
var funcionModificarTamañoVentana=function(){
		setTimeout("padre = $(window.parent.document);padre.find('#fPrincipal').animate({'height': $('body').height()});",420);
}
	
