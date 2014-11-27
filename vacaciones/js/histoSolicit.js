
var solicitudConsultada;
var total=[0,0];
var IdFuncionario;
Jornada="";
VecDiasDispo = [];
var IdUsuario;	
var PerioConsu;
var Accion;
var FilaCons=0;
var idSolicitudConsultada=0;
var Solicitudes;
var usuario;

function EliminarSolicitud(pFilaSol){
		if(Solicitudes.BoletasPorSoli[pFilaSol-1]=="No hay boletas para esta solicitud")
		{			
			var parametros = '{"pAccion":"ELIMINAR","pIdSol":"'+idSolicitudConsultada+'"}';			 
			 $.ajax({
				  async:true,	
				  type:'POST', 
				  dataType:"json",  
				  data:"Parametros="+parametros,
				  url:'php/solicitudes_boletas/Solicitudes.php', 
				  success:function(respuesta){
					  if(respuesta.CodigoRespuesta="000")
					  {
						  	alert("Bien")
							funcionModificarTamañoVentana();
							FuncSolicitudes("LISTAR",usuario[6]);
					  }
					},
				  error:function(respuesta){
						alert("Error al listar solicitudes");
					}
				});	
		}
		else 
			alert("La solicitud contiene boletas")
	}
	
function ImprimirBoleta(pFilaSol){
	
	}
	
function EliminarBoleta(){
	
	}

function FuncSolicitudes(pAccion,pRol){
	var parametros = '{"pIdFunc":"'+IdFuncionario+ '","pAccion":"'+pAccion+'","pRol":"'+pRol+'"}'; // 'elemento==13
	 $.ajax({
		  async:true,	
		  type:'POST', 
		  dataType:"json",  
		  data:"Parametros="+parametros,
		  url:'php/solicitudes_boletas/GetSolicitudes.php', 
		  success:function(respuesta){		
		  		Solicitudes=respuesta;
		  		$("#tbSolicitudes").html(respuesta.CabezSolicitudes);
		  		$("#tbSolicitudesCuerpo").html(respuesta.ListaSolicitudes);
				if(respuesta.ListaSolicitudes!=""){
					var cont=0;
						//Recorre la tabla de periodos y crea un vector y total de dias disponibles
						//Estos dias seran gastados desde los periodos mas antiguos hasta los mas viejos
						$('#tbSolicitudesCuerpo tr td').each(function(){
						 if($(this).attr("name")=="ds")
						 {
							 total[0]+=parseInt($(this).text());
							 VecDiasDispo[cont]=parseInt($(this).text());
							 cont=(parseInt(cont)+1);
						 }
						});					
					$("#tdTotalSoli").text(total[0])	
				}	
						funcionModificarTamañoVentana();
			},
		  error:function(respuesta){
				alert("Error al listar solicitudes");
			}
		});	
						funcionModificarTamañoVentana();
	}


function SeleccionarSolicitud(pFila){
	$("#tbBoletas").html(Solicitudes.CabezBoletas)
	
	$("#tbCuerpoBoletas").html(Solicitudes.BoletasPorSoli[pFila-1]);
	var cont=0;
	total[1]=0;
	$("#tdTotGosad").text(total[1])	
	$('#tbCuerpoBoletas tr td').each(function(){
	 if($(this).attr("name")=="dg")
	 {
		 total[1]+=parseInt($(this).text());
		 VecDiasDispo[cont]=parseInt($(this).text());
		 cont=(parseInt(cont)+1);
	 }
	});					
	$("#tdTotGosad").text(total[1])
	funcionModificarTamañoVentana();
}



//--------------------------------------------------------

	
function SelectFuncPar(){
		total[0]=0;
		total[1]=0;
			IdFuncionario=
				document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[7].innerText+"";	
			
			Jornada=
				document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[5].innerText+"";	
		
		  var parametros={"pId":IdFuncionario};			 
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:parametros,// "datos={"pID:0"}"
		  url:'php/GetFuncionario.php', 
		  success:function(respuesta){
				$("#divFichaTecFuncio").html(respuesta);
				FuncSolicitudes("LISTAR",usuario[6]);
				funcionModificarTamañoVentana();
			},
		  error:function(respuesta){
				alert("FICHA TECNICA cargada con errores")
			}
		  });	
				
		FuncSolicitudes("LISTAR",usuario[6]);
		funcionModificarTamañoVentana();
	}



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
		usuario=us;
		IdUsuario=us[2];
		IdFuncionario=IdUsuario;
		if(us!="..."){
			if(us[6]=="R"){				
				$("#divBuscarFuncionarios").removeClass("collapse");	
				ListarFuncionarios();
				funcionModificarTamañoVentana();		
			}
			else
			{				
				 var parametros={"pId":IdUsuario};			 
				  $.ajax({
				  async:true,	
				  type:'POST',  
				  data:parametros,// "datos={"pID:0"}"
				  url:'php/GetFuncionario.php', 
				  success:function(respuesta){
						$("#divFichaTecFuncio").html(respuesta);						
						FuncSolicitudes("LISTAR",us[6]);
						funcionModificarTamañoVentana();						
					},
				  error:function(respuesta){
						alert("Error al intentar cargar la FICHA TECNICA del funcionario ,"+respuesta )
					}
				  });	
			}
		}
	}
			
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


	