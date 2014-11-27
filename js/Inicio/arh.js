// JavaScript Document
var num=0;
var vm="";

$(document).ready(function(){ 
   //la primera vez carga a inicio
vm= $('[data-remodal-id=vmModalPrincipal]').remodal();
function actualizar(){
		  resetear();
	      redimencionar();
	 }

actualizar();
//----------------------------------------
$("#fPrincipal").load(function(){	
	 actualizar();
	});
//------------------------------------------	
function resetear(){	
		$("#fPrincipal").height("1px");
	}
	//------------------------------------
function redimencionar(){
		num=$('#fPrincipal').contents().height();
		$("#fPrincipal").height(num+"px");
	}
//----------------------------	
 function todosEventos(){
	//función para activar una pestaña seleccionada
	$('#nav li').each(function(){
	$(this).click(function(e){
		e.preventDefault();
	    removerClaseNav();
		$(this).attr('class','active');		
	});
	
	});
	 
	//función para cargar datos en un iframe principal
	$('#nav a').each(function(){ 
	var href=$(this).attr('href');
	$(this).attr({href:"#"});
	num=0;
	$(this).click(function(e){	
		actualizar();	
		
		$("#fPrincipal").attr('src', href);
		e.preventDefault();
		});
	
	});
 }
 //----------------------------------
todosEventos();
 //---------------------------
//función para poder desactivar la pestaña seleccionada anterior
 function removerClaseNav(){
	   	
		$('#nav li').each(function(){
		
		$(this).attr('class','');
	     if($(this).is("#ultimo")){
								return false;	
									}
	   
	   });
 }
 //Verificar el usuario logueado
function supports_html5_storage() {
		  try {
			return 'localStorage' in window && window['localStorage'] !== null;
		  } catch (e) {
			return false;
		  }
		}

if(supports_html5_storage()){
	
	var us;
	us=window.localStorage.getItem('usuarioARH');
	if(us!="..."){
		////////////////////////
					$("#nav").empty();
					var VectorUsuario=us.split(",");
					$("#nav").html(VectorUsuario[5]);	
					
					//Actualiza Eventos
					$('#nav li').each(function(){
							$(this).click(function(e){
									e.preventDefault();					
							//--remover
							$('#nav li').each(function(){					
								$(this).attr('class','');
								 if($(this).is("#ultimo"))
								 {
									return false;	
								 }					   
							   });
							   
						   //----fin remover
							$(this).attr('class','active');		
						});					
					});
				 
					//función para cargar datos en un iframe principal
					$('#nav a').each(function(){ 
						var href=$(this).attr('href');
						$(this).attr({href:"#"});
						num=0;
						$(this).click(function(e){	
						//actualizar
						$("#fPrincipal").height("1px");	
						num=$('#fPrincipal').contents().height();
							$("#fPrincipal").height(num+"px");
						//fin actualizar
						$("#fPrincipal").attr('src', href);
						e.preventDefault();
						});							
					});
		
		////////////////////////		
		$("#aIngres").addClass("collapse");
		$("#aCuenta").removeClass("collapse");
		$("#aCerrar").removeClass("collapse");
		$("#aNotifi").removeClass("collapse");
		$("#txtMensaje").html("LISTO!! : <h3>"+ us[0].NombreUsuario+" "+us[0].PrApellido+"</h3> "+"<p style='text-right !important;'> PODES REALIZAR DIFERENTES TRANSACCIONES, VISITE LA AYUDA PARA MAS INFORMACION.</p>" );//VM
		$("#txtMensaje").addClass("text-success");
		$("#txtMensajeAyudaRestablecer").addClass("collapse");	
		if(VectorUsuario[7]=="Defecto")
		{
			abreModal("CCO")			
		}
	}
}		


});//fin ready
 
//---------------Ventanas modales

function abreModal(pTipo)
{
	var entroA=false;
		$("#vmModalPrincipall").empty();
	
	if(pTipo=="CCO")
	{
	$("#vmModalPrincipal").html(CambioDeContra);
	entroA=true;
	}
	// Guardar datos personales
	if(pTipo=="DP")
	{
	$("#vmModalPrincipal").html(GuardarDatosPersonales);
	entroA=true;
	}
	//subir imagen
	if(pTipo=="SI")
	{
	$("#vmModalPrincipal").html(SubirImagenString);	
	entroA=true;
		}
	//error id repetido
	if(pTipo=="IR")
	{
	$("#vmModalPrincipal").html(ErrorId);	
	entroA=true;
		}	
	//FUNCIONARIO alamacenado exitosamente
	if(pTipo=="FAE")
	{
	$("#vmModalPrincipal").html(FuncionarioIngresadoConExito);	
	entroA=true;
		}	
	//problema insertar funcionario	
	if(pTipo=="PIF")
	{
	$("#vmModalPrincipal").html(ProblemaAlInsertarFunc);	
	entroA=true;
		}	
	//problema al obtener id de funcionario recien registrado
	if(pTipo=="IFRR")
	{
	$("#vmModalPrincipal").html(ProblemaObtenerIdFuncionario);	
	entroA=true;
		}	
	//guardar datos personales o cargar la página	
	if(pTipo=="GDPCP")
	{
	$("#vmModalPrincipal").html(GuardeDPoCargueN);	
	entroA=true;
		}	
	//num de ppuesto repetido
		if(pTipo=="NPR")
	{
	$("#vmModalPrincipal").html(ErrorNumPuesto);	
	entroA=true;
		}		
	//datos laborales guardados con exito
		if(pTipo=="DLGE")
	{
	$("#vmModalPrincipal").html(FuncionarioDLConExito);	
	entroA=true;
		}
	//campos obligatorios
		if(pTipo=="CO")
	{
	$("#vmModalPrincipal").html(CamposObligatorios);	
	entroA=true;
		}
				
	if(entroA==true)
	 vm.open();
}

function GuardarFuncChild(){
	
	document.getElementById("fPrincipal").contentWindow.GuardarDatosPerso();
	//$('#fPrincipal',top.document).GuardarDatosPerso();
	
	}



var GuardarDatosPersonales="<h2 class='alert-success'>Guardando Datos Personales</h2><p>Estas seguro o segura de que deseas continuar con el proceso de guardar los datos personales de un nuevo funcionario? Si faltan campos obligatorios o hay información inválida no pasará nada, la aplicación te indicará que debes corregir!</p><br><a class='remodal-cancel' href='#'>Cancelar</a><a class='remodal-confirm' href='#' onClick='GuardarFuncChild();  vm.close();'>Guadar</a>";
var FuncionarioIngresadoConExito="<h2 class='alert-succsess'>Éxito</h2><p >Los Datos Personales del funcionario se han almacenado de forma exitosa, las secciones para almacenar información laboral, de contactos y académica del funcionario se han habilitado, puede proseguir!.</p><br><a class='remodal-confirm' href='#' onClick='vm.close();'>Siguiente</a>";
var ProblemaAlInsertarFunc="<h2 class='alert-danger'>Alerta</h2><p >Ocurrio un problema al Insertar el funcionario nuevo en base de datos, intentelo de nuevo!.</p><br><a class='remodal-cancel' href='#' onClick='vm.close();'>Siguiente</a>";
var ProblemaObtenerIdFuncionario="<h2 class='alert-danger'>Alerta</h2><p >Ocurrio un problema al obtener el identificador del funcionario recién registrado!.</p><br><a class='remodal-cancel' href='#' onClick='vm.close();'>Siguiente</a>";
var SubirImagenString="<h2 class='alert-info'>Información</h2><p >Para subir una imagen debes cumplir con dos condiciones, haber guardado los datos personales del usuario nuevo y haber seleccionado una imagen para subir al servidor.</p><br><a class='remodal-confirm btn-info' href='#' onClick='vm.close();'>OK</a>";
var ErrorId="<h2 class='alert-danger'>Alerta</h2><p >Ya existe un funcionario con el número de cédula especificado.</p><br><a class='remodal-cancel' href='#' onClick='vm.close();'>Siguiente</a>";
var ErrorNumPuesto="<h2 class='alert-danger'>Alerta</h2><p >Ya existe un funcionario con el número de de puesto especificado, y este campo es único.</p><br><a class='remodal-cancel' href='#' onClick='vm.close();'>Siguiente</a>";
var FuncionarioDLConExito="<h2 class='alert-succsess'>Éxito</h2><p >Los Datos Laborales del funcionario se han almacenado de forma exitosa!!.</p><br><a class='remodal-confirm' href='#' onClick='vm.close();'>Siguiente</a>";
var GuardeDPoCargueN="<h2 class='alert-warning'>Alerta</h2><p >Primero debe guardar los datos personales, o bien,si rearga la página y ya ha guardado los datoos personales, debe dirigirse a la sección de modificar funcionario!.</p><br><a class='btn-warning' href='#' onClick=''>Siguiente</a>";
var CamposObligatorios="<h2 class='alert-warning'>Alerta</h2><p >Faltan campos obligatorios, la aplicación te indicará donde puede encontrarse el o los posibles problemas!.</p><br><a class='btn btn-warning' href='#' onClick='vm.close();'>Siguiente</a>"; 
var CambioDeContra="<h2 class='alert-warning'>Alerta</h2><p >Recomendamos que cambie su contraseña.</p><br><a class='btn btn-warning' href='#' onClick='vm.close();'>Siguiente</a>";
	    
	