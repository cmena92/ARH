//MANUEL INTERFAZ
var camposFP=false;//variable para campos de form principal requeridos
var camposContacto=false;
var camposHistAca=false;
var camposLab=false;

var idSeleccionado=0;
var FilaConsu=0;
	
function ListarFuncionarios(){
	$.ajax({
			url: 'php/Funcionarios/ListaCompletaFuncionarios.php',
			type:'post',
			beforeSend: function(){
				$("#tResultadoFunc").html("<td>Procesando, espere por favor...</td>");
			},		
			success: function(response){
				$("#tResultadoFunc").html(response);
			}
		});	
	} 	
  
function Eliminar()
  {
  	if(confirm("¿Realmente desea eliminarlo? ")){
		
		var parametros={
			    "pID":idSeleccionado
		};
		
		$.ajax({
				url: 'php/Funcionarios/EliminarFuncionario.php',
				type:'post',	
				data:parametros,
				success: function(response){
					alert(response);
				}
			});	
		}
  }
 
















$(document).ready(function(){ 

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
//-----elementos de form principales
elementoGlobales($("#frmP1"));
elementoGlobales($("#frmP2"));
//-----------------
//------elementos de información adicional
function agregarComportamientoInfoAdicional(elementoForm,pTipo){
	var TextBox=elementoForm.attr('id');
					var ID="#"+TextBox;
				    $(ID).keydown(function(e) {
						
						verificarCamposInfoAdi($(e.target),pTipo);
                        $(this).removeClass('alert-warning');
						
                    });
					$(ID).keyup(function(e) {
						verificarCamposInfoAdi($(e.target),pTipo);
                        $(this).removeClass('alert-warning');
						
                    });
					 
					  if($(ID).attr('name')=="Tamano1")
						{   
						  
                            $(ID).keypress(function(e) {
								
                                ValidarTamano(e.target,30);
                            });
							$(ID).keyup(function(e) { ValidarTamano(e.target,30);});
                      
						}
				      if($(ID).attr('name')=="Tamano0")
						{
							
							$(ID).keypress(function(e) {
                                ValidarTamano(e.target,9);
                            });
							$(ID).keyup(function(e) { ValidarTamano(e.target,9);});
						}
						 if($(ID).attr('name')=="Tamano2")
						{
							
							$(ID).keypress(function(e) {
                                ValidarTamano(e.target,200);
								$(ID).keyup(function(e) { ValidarTamano(e.target,200);});
                            });
						}
						 if($(ID).attr('name')=="Tamano3")
						{
							
							$(ID).keypress(function(e) {
                                ValidarTamano(e.target,80);
								$(ID).keyup(function(e) { ValidarTamano(e.target,80);});
                            });
						}
	
	}	

ListarFuncionarios();
/*zona de redimencionar*/
$('body div a').click(function(e) {
  funcionModificarTamañoVentana();
});
/*zona de redimencionar*/

 });
 //Fin del ready
 
//--------------------------------------------
		
	function supports_html5_storage() {
		  try {
			return 'localStorage' in window && window['localStorage'] !== null;
		  } catch (e) {
			return false;
		  }
		}		
			

//------------------------
	function elementoGlobales(elementoF){
	var idF=$(elementoF).attr('id');
	var IdForm="#"+idF;
 var elementosFormDatosPersonales=$(IdForm).contents().find('input');	
				
			for(var i=0;i<elementosFormDatosPersonales.length;i++)
			{
				
				if(elementosFormDatosPersonales[i].type=="text")
				 {
					var TextBox=elementosFormDatosPersonales[i];
					var ID="#"+TextBox.id;
				    $(ID).keydown(function(e) {camposFP=false;
						
						verificarCamposGlobal($(e.target).closest('form'));
                        $(this).removeClass('alert-warning');
						
                    });
					$(ID).keyup(function(e) {camposFP=false;
						verificarCamposGlobal($(e.target).closest('form'));
                        $(this).removeClass('alert-warning');
						
                    });
	                if($(ID).attr('name')=="Tamano1")
						{   
						  
                            $(ID).keypress(function(e) {
                                ValidarTamano(e.target,25);
                            });
							$(ID).keyup(function(e) { ValidarTamano(e.target,25);});
                      
						}
				      if($(ID).attr('name')=="Tamano0")
						{
							
							$(ID).keypress(function(e) {
                                ValidarTamano(e.target,9);
                            });
							$(ID).keyup(function(e) { ValidarTamano(e.target,9);});
						}
						
				 }
				
			}
}//fin elemento globales

//----------------------
	function ValidarTamano(elemento,tamano)
	{
	
	 $(elemento).attr('maxlength',tamano);
	//se obtiene padre
	 var divPadre=$(elemento).closest('div');
	 //se pregunta a ver si el campo ya tiene el espacio máximo disponible
     	if(($(elemento).val().length)>=($(elemento).attr('maxlength')))//si, entonces le mostramos al usuario que ya no puede escribir más
		{
			if(divPadre.children("p").length==0){
			var mensajeText= '<p class="help-block text-center alert-info">YA LLENASTE EL ESPACIO DISPONIBLE</p>';
		    divPadre.append(mensajeText);
		    funcionModificarTamañoVentana();}
			
		}
		else{//no entonces preguntamos a ver si el mensaje de aviso existe, si existe se elimina
				  if(divPadre.children("p").length>0)
				  {
					  divPadre.children("p").remove();
					  funcionModificarTamañoVentana();
				  }
				
		    }
}

//------------------------------------	
	var funcionModificarTamañoVentana=function(){
		setTimeout("padre = $(window.parent.document);padre.find('#fPrincipal').animate({'height': $('body').height()});",420);
		}

//-------------------------------------------------	
	function verificarCamposGlobal(elementoForm){
	
	var idF=$(elementoForm).attr('id');
	var IdForm="#"+idF;
	var camposDeForm=$(IdForm).contents().find('input');//obtener form padre
	
	for(var i=0;i<camposDeForm.length;i++)
			{
				
				if(camposDeForm[i].type=="text")//recorrer objetos que se desean validar del form
				 {
					var TextBox=camposDeForm[i];   
					var ID="#"+TextBox.id;
					if($(ID).val()==""){
						$(ID).addClass("alert-warning");
						
						 camposFP=true;
						
						}else{$(ID).removeClass("alert-warning");}
				 
				 }
				
			}

							if(camposFP==true)
							{
								  if(!$("#pDinamicoDL").length)//mostrar un mensaje en la zona de dicho form
								  {
								 
								  AgregarLineaDeTexto("HAY CAMPOS REQUERIDOS SIN RELLENAR O INCORRECTAMENTE LLENOS","pDinamicoDL","alert-warning");
								  funcionModificarTamañoVentana();
								  }
										
							}
							else{
									if($("#pDinamicoDL").length)
										{
										$("#pDinamicoDL").remove();
										funcionModificarTamañoVentana();
										
										}
								}
	
	
	
	
	
	}

	function BuscarUsuario()
	{
		jQuery("#Buscador").keyup(function()
		{
			if( jQuery(this).val() != ""){
				jQuery("#tbContaFunc tbody>tr").hide();
				jQuery("#tbContaFunc td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
			}
			else{
				jQuery("#tablaLaWebera tbody>tr").show();
			}
		});	
		
		jQuery.extend(jQuery.expr[":"], 
		{
			"contiene-palabra": function(elem, i, match, array) {
				return (elem.textContent || elem.innerText || jQuery(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
			}
		});							
	}
 
 
//--------------------------------------------