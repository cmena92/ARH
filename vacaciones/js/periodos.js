
var total=[0,0];
var IdFuncionario;
Jornada="";
VecDiasDispo = [];
var IdUsuario;	
var PerioConsu;
var Accion;
function ModificarPeriodo(){	
	if(PerioConsu!=null){
		$("#btnGuaPer").removeClass("collapse");	
		$("#AccionDeMantenimiento").html("MODIFICANDO");
			Accion="MODIFICAR";
	}
	else
		$("#AccionDeMantenimiento").html("SELECCIONE UN PERIODO");		
}
function EliminarPeriodo(){
	if(PerioConsu!=null){
	$("#btnGuaPer").removeClass("collapse");
		$("#AccionDeMantenimiento").html("ELIMINANDO");
		if(confirm("¿Realmente desea eliminarlo? ")){
			EjecutarCosulta("ELIMINAR");
		}
	}
	else
		$("#AccionDeMantenimiento").html("SELECCIONE UN PERIODO");	
}

function AgregarPeriodo(){
	if(IdFuncionario!=null){
		$("#btnGuaPer").removeClass("collapse");
		$("#AccionDeMantenimiento").html("AGREGANDO");
		$("#cmbEstado").val("DISPONIBLE")
		RestablecerFechas()
		$("#txtCantDiasDispo").val(15)
		$("#txtCantDiasGozad").val(0)
		Accion="AGREGAR";
	}else
		$("#AccionDeMantenimiento").html("SELECCIONE UN FUNCIONARIO");
}
function GuardarPeriodo(){
	$("#btnGuaPer").addClass("collapse");
	$("#btnModPer").addClass("collapse");
	$("#btnEliPer").addClass("collapse");
	$("#AccionDeMantenimiento").html("GUARDADO");
	EjecutarCosulta(Accion+"");		
}

function EjecutarCosulta(pAccion)
{
	if(PerioConsu==null)PerioConsu=0;
	var Parametros={
			"pEstado":$("#cmbEstado").val(),
			"pFecIni":$("#dtpDesde").val(), 
			"pFecFin":$("#dtpHasta").val(), 
			"pExtra":"Extra", 
			"pFunId":IdFuncionario, 
			"pPerId":PerioConsu, 
			"pDiaDis":$("#txtCantDiasDispo").val(), 
			"pDiaGoz":$("#txtCantDiasGozad").val(), 
			"pAccion":pAccion
		};								 
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:Parametros,// "datos={"pID:0"}"
		  url:'php/periodos/IngresarPeriodo.php', 
		  beforeSend: function(){
				$("#AccionDeMantenimiento").html("En proceso, por favor espere...");
			},
		  success:function(respuesta){
			if(respuesta=="Bien"){
				$("#AccionDeMantenimiento").html(respuesta);
				$("#cmbEstado").val("DISPONIBLE")
				RestablecerFechas()
				$("#txtCantDiasDispo").val(15)
				$("#txtCantDiasGozad").val(0)	
				ListarPeriodos();
				PerioConsu=null;	
			}
			else
				$("#divErrores").html(respuesta);
			},
		  error:function(respuesta){
				$("#divErrores").html(respuesta);
			}
		});	
}


var FilaCons=0;
function ConsultarPeriodo(pFila){	
	$("#btnModPer").removeClass("collapse");
	$("#btnEliPer").removeClass("collapse");
	$("#btnGuaPer").removeClass("collapse");

	var a,b;	
	a=document.getElementById("tbPeriodosCuerpo").rows[FilaCons-1].cells[1].innerText+"";			
	b=document.getElementById("tbPeriodosCuerpo").rows[FilaCons-1].cells[2].innerText+"";
	c=document.getElementById("tbPeriodosCuerpo").rows[FilaCons-1].cells[3].innerText+"";			
	d=document.getElementById("tbPeriodosCuerpo").rows[FilaCons-1].cells[4].innerText+"";
	
	$("#dtpDesde").html(a);
	$("#dtpHasta").html(b);
	$("#txtCantDiasDispo").val(c);
	$("#txtCantDiasGozad").val(d);
		
	$("#AccionDeMantenimiento").html("Periodo "+ pFila);
		
}





















function RestablecerFechas(){
	var now = new Date();	
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	$('#dtpDesde').val(today);
	$('#dtpHasta').val(today);
	}

$(document).ready(function(){ 

	RestablecerFechas()
		
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
		IdUsuario=us[2];
		if(us!="..."){
			if(us[6]=="R"){				
				$("#divBuscarFuncionarios").removeClass("collapse");	
				ListarFuncionarios();			
			}
		}
	}
	
	funcionModificarTamañoVentana();		
});//fin ready

 var FilaConsu=0;
 function ListarFuncionarios(){
	$.ajax({
			url: 'php/ListarFuncionarios.php',
			type:'post',
			beforeSend: function(){
				$("#tResultadoFunc").html("<td>Procesando, espere por favor...</td>");
			},		
			success: function(response){
				$("#tResultadoFunc").html(response);
			}
		});	
	} 	
	
	

	function SelectFuncPar(){
		total[0]=0;
		total[1]=0;
		IdFuncionario=
		document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[7].innerText+"";	
		Jornada=
		document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[5].innerText+"";	
		
		//ficha tecnica
		  var parametros={"pId":IdFuncionario};			 
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:parametros,// "datos={"pID:0"}"
		  url:'php/GetFuncionario.php', 
		  success:function(respuesta){
				$("#divFichaTecFuncio").html(respuesta);
			},
		  error:function(respuesta){
				alert("Error al intentar cargar la FICHA TECNICA del funcionario ,"+respuesta )
			}
		});	
		////////////////////
				
		ListarPeriodos();
		
		//Parametros Relevantes
		Jornada=
		document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[5].innerText+"";
		if(Jornada=="ACUMULATIVA"){
			$("#divTipoSolicitud").addClass("collapse");	
			$("#divConDias").removeClass("collapse");			
			$("#divFechasLimite").addClass("collapse");
		}else
		{
			$("#divTipoSolicitud").removeClass("collapse");									
			$("#divConDias").addClass("collapse");			
			$("#divFechasLimite").removeClass("collapse");
		}
		funcionModificarTamañoVentana();
	}

function ListarPeriodos(){
	//Lista de periodos		
		 var parametros={"pId":IdFuncionario};			 
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:parametros,// "datos={"pID:0"}"
		  url:'php/periodos/GetPeriodosMante.php', 
		  success:function(respuesta){
				$("#tbPeriodosCuerpo").html(respuesta);				
				
				var cont=0;
					//Recorre la tabla de periodos y crea un vector y total de dias disponibles
					//Estos dias seran gastados desde los periodos mas antiguos hasta los mas viejos
					$('#tbPeriodosCuerpo tr td').each(function(){
					 if($(this).attr("name")=="dd")
					 {
						 total[0]+=parseInt($(this).text());
						 VecDiasDispo[cont]=parseInt($(this).text());
					 	 cont=(parseInt(cont)+1);
					 }
					 if($(this).attr("name")=="dg")
					 {
						 total[1]+=parseInt($(this).text());
					 }
					});					
				$("#tdTotDispo").text(total[0])
				$("#tdTotGosad").text(total[1])		
				//alert(VecDiasDispo[0]+" "+VecDiasDispo[1]+" "+VecDiasDispo[2])			
			},
		  error:function(respuesta){
				alert("Error al intentar cargar la FICHA TECNICA del funcionario ,"+respuesta )
			}
		});	
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

var funcionModificarTamañoVentana=function(){
		setTimeout("padre = $(window.parent.document);padre.find('#fPrincipal').animate({'height': $('body').height()});",420);
		}
	
//---------------Ventanas modales
function abreModal(pTipo)
{
	var entroA=false;
		$("#vmModalPrincipall").empty();
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

	    
	