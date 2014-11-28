
var total=[0,0];
Jornada="";
VecDiasDispo = [];
var IdSol=0;

//Variables de Consulta
var usuario;
var IdUsuario;
var IdFuncionario;
var FilaCons=0;	
var idSolicitudConsultada=0;
var ObjetoDeSolicitudes;
function ListarSolicitudes(){		
		var parametros = '{"pIdFunc":"'+IdFuncionario+ '","pRol":"'+usuario[6]+'"}'; 
		 $.ajax({
			  async:true,	
			  type:'POST', 
			  dataType:"json",  
			  data:"Parametros="+parametros,
			  url:'php/solicitudes_boletas/GetSolicitudes.php', 
			  success:function(respuesta){		
					ObjetoDeSolicitudes=respuesta;
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
	/*
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
	*/
	}

function SeleccionarSolicitud(pIdSol){
	idSolicitudConsultada=pIdSol;
	$("#divSolCons").html(ObjetoDeSolicitudes.Solicitudes[FilaCons].FichaTecnica);
	
	var parametros = '{"pIdSol":"'+pIdSol+ '","pRol":"'+usuario[6]+'"}'; 
		 $.ajax({
			  async:true,	
			  type:'POST', 
			  dataType:"json",  
			  data:"Parametros="+parametros,
			  url:'php/solicitudes_boletas/GetBoletasXsolicitud.php', 
			  success:function(respuesta){					
					$("#tbBoletas").html(respuesta.CabezBoletas)
					$("#tbCuerpoBoletas").html(respuesta.ListaBoletas);
					$("#btnBorrSoli").removeClass("collapse");
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
				},
			  error:function(respuesta){
					alert("Error al listar solicitudes");
				}
			});		
	
}

function EliminarObjetos(pTipo,pId){	
	if(confirm("¿Realmente desea borrar el registro?")){
		 var parametros = '{"pId":"'+pId+'","pTipo":"'+pTipo+'"}'; 
		 $.ajax({
			  async:true,	
			  type:'POST', 
			  dataType:"json",  
			  data:"Parametros="+parametros,
			  url:'php/solicitudes_boletas/EliminarObjetos.php', 
			  success:function(respuesta){	
			  		SeleccionarSolicitud(idSolicitudConsultada);
				},
			  error:function(respuesta){
					alert("Error al listar solicitudes");
				}
			});	
		}
	}
	
function EliminarSolici(){	
	//alert("FC/"+FilaCons+"/Cant boletas/"+ObjetoDeSolicitudes.Solicitudes[FilaCons].CantBoletas)
	if(ObjetoDeSolicitudes.Solicitudes[FilaCons].CantBoletas==0)
		EliminarObjetos("SOLICITUD",idSolicitudConsultada)
	else
		alert("La solicitud no puede ser borrada, ya que posee boletas.")
}
	
function EliminarBoleta(pFilaBol){		
		var estado=BoletaConsul.Boletas[pFilaBol].Estado;
		if(estado=="SOLICITADA")
		{//alert("La boleta puede ser eliminada")	
			EliminarObjetos("BOLETA",BoletaConsul.Boletas[pFilaBol].idBoleta);
		}
		else 
			alert("La boleta ya esta en vigencia o vencida")
	
	}
	
		
function ImprimirBoleta(pFilaSol){
	
	}
	

		
function EliminarSolicitud(pFila){
		
		if(confirm("¿Realmente desea borrar el registro?")){
			var estado=BoletaConsul.Boletas[pFilaBol].Estado;
			if(estado=="SOLICITADA")
			{//alert("La boleta puede ser eliminada")	
				EliminarObjetos("BOLETA",BoletaConsul.Boletas[pFilaBol].idBoleta);
			}
			else 
				alert("La boleta ya esta en vigencia o vencida")
		}	
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
				ListarSolicitudes();
				funcionModificarTamañoVentana();
			},
		  error:function(respuesta){
				alert("FICHA TECNICA cargada con errores")
			}
		  });	
				
		ListarSolicitudes();
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
						ListarSolicitudes();
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


	