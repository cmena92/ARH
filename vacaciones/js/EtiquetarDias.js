var vmC= "";//ventana modal para manejo de interfaz
var hoy=new Date();
var mes = hoy.getMonth()+1;
var dia = hoy.getDate();
var diaActual=hoy.getFullYear() + '-' +
    ((''+mes).length<2 ? '0' : '') + mes + '-' +
    ((''+dia).length<2 ? '0' : '') + dia;//fecha actual para cálculos
var descripcion = "";//descripción del día libre
var tipo="";//tipo de etiqueta feriado-asueto
$(document).ready(function() {
	
	   
	    vmC = $('[data-remodal-id=vmModalP]').remodal();//instaciamos la ventana modal
		var currentLangCode='es';//idioma español
		$('#calendar').fullCalendar({
			//encabezado del calendario
			header: {
				left: '',
				center: 'title',
				right: 'prev,next today'               
			},
			defaultDate: diaActual,
			selectable: true,//se puede escoger un día
			allDaySlot : false,//el evento abarca todo el día
			selectHelper: true,
			lang: currentLangCode,//idioma
			select: function(start, end) {
				
				//función se activa al escoger una cuadrícula del calendario
			   
			   
				abreModal(start,end,"Guardar",null);
				
				
				
				$('#calendar').fullCalendar('unselect');
			},
			
			loading: function(bool) {
				$('#loading').toggle(bool);
			},
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			eventClick: function(calEvent, jsEvent, view) {
				//con esto podmos obtener cualquier dato de un evento
		     //cuando se da click a un evento para eliminarlo
            abreModal(null,null,"Eliminar",calEvent.id);
    }, 
	//hacer contador y asignar id distinto a cada uno
			events: 'php/ObtenerCalendario.php',//cargar el calendario con php externo, solución a problema de no encontrar el vector 
			
			
		});

	});


function abreModal(start, end, pTipo,id)
{
	if(pTipo=="Guardar")
	{
	  var GuardarDia="<h2 class='alert-success'>Guardando Día</h2><br><label for='txtDia'>Descripción</label><input type='text' class='form-control' id='txtDia' value='' name='Tamano1' required/><br><label for='cbTipoDia'>Tipo de Día</label><br><SELECT id='cbTipoDia' SIZE=1 class='form-control' > <OPTION  class='form-control' VALUE='FERIADO'>Feriado</OPTION><OPTION  class='form-control' VALUE='ASUETO'>Asueto</OPTION></SELECT> <br><a class='remodal-cancel' href='#'>Cancelar</a><a class='remodal-confirm' href='#' onClick=' Asignar($(\"#txtDia\").val(),$(\"#cbTipoDia\").val(),"+start+","+end+"); vmC.close();'>Guadar</a>";
		$("#vmModalP").empty();
	    $("#vmModalP").html(GuardarDia);
	    vmC.open();
	}
	if(pTipo=="Eliminar")
	{
	  var EliminarDia="<h2 class='alert-warning'>Eliminar Día</h2><p>Estas seguro o segura de que deseas eliminar la etiqueta de este día?</p><br><a class='remodal-confirm' href='#'>Volver</a><a class='remodal-cancel' href='#' onClick='EliminarDia("+id+");vmC.close();'>Eliminar</a>";
		$("#vmModalP").empty();
	    $("#vmModalP").html(EliminarDia);
	    vmC.open();
	}
	if(pTipo=="Vacio")
	{
	  var VacioDia="<h2 class='alert-warning'>Falta descripción del Día</h2><p>Estimado usuario, no se puede continuar con el proceso de guardado hasta colocar una descripción para etiquetar el día</p><br><a class='remodal-confirm' href='#' onClick='vmC.close();'>Volver</a>";
		$("#vmModalP").empty();
	    $("#vmModalP").html(VacioDia);
	    vmC.open();
	}
		
}
  function EliminarDia(id)
  {
	   
	   var parametros={
			  "pID":id	
		  };
		  $.ajax({
			  data: parametros,
			  url: 'php/EliminarDia.php',
			  type: 'POST',
			  beforeSend: function(){
				  			
			  },
			  success: function(response){
				  if(response=="...")
				  {//exito
				  	
	               $('#calendar').fullCalendar('removeEvents',id);
				  }else
				  {
					alert("ERROR AL ELIMINAR EL DÍA");  
				  }
			  }
		  });
	  
	  
	  
	   
	   
	   
	  
	  }

 function Asignar(elem0, elem1,start,end){
	
	 if($.trim(elem0)!=""){
	descripcion=elem0;
	tipo=elem1;
	idDia=0;
	
	 var hoy1=new Date(end);
                 var mes1 = hoy1.getMonth()+1;
                 var dia1 = hoy1.getDate();
                var diaActual1=hoy1.getFullYear() + '-' +
    ((''+mes1).length<2 ? '0' : '') + mes1 + '-' +
    ((''+dia1).length<2 ? '0' : '') + dia1;
			  
	
	
	/*aqui va y guarda y trae id*/
	var parametros={
			"pFecha":diaActual1, 
			"pTipo":tipo, 
			"pDescripcion":descripcion, 		
		};
		
		$.ajax({
			data: parametros,
			url: 'php/GuardarDia.php',
			type: 'POST',
			beforeSend: function(){
							
			},
			success: function(response){
				//alert(response);
			  idDia=response;
			  if(idDia!=0)
				{
				var eventData;
						if (descripcion) 
						{
								if(tipo=="FERIADO")
								{	
									eventData = {
										id: idDia,
										title: descripcion,
										start: start,
										end: end,
										allDay:true,
										tipo:tipo,
										color:"green"
												  }; 
								}else
								{
									eventData = {
										id: idDia,
										title: descripcion,
										start: start,
										end: end,
										allDay:true,
										tipo:tipo,
										color:"red"
											  }; 
								}
							$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
						}//if descripcion
	           }//if idDia
			}//function ajax succes
			
		
			
		});//ajax
		
	}//trim de descripcion
	else
	{
		abreModal(null,null,"Vacio",null);
		}
}
	 