//Guardar Datos Personales
	var idUsActual=0;//variable para guardar el ID del usuario guardado
	
    var generoEstCiv="";//variable para guardar genero
    var camposDPR=false;//variable para campos de datos personales requeridos
	var camposDLR=false;//variable para campos de datos LABORALES requeridos
	var camposContacto=false;
	var camposHistAca=false;
	var camposLab=false;
	 var mensajeLink;
	var auxOpcionMenu;//controlar cambios de color de menu si no se han ingresado datos personales
	
	
/*redimencionar iframe*/	
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



textareasSize($("#txtObser"));
textareasSize($("#txtContaText"));
textareasSize($("#txtDescHistoLabo"));
textareasSize($("#txtObserAcade"));
$("#cbTipoCont").change(function(e) {
	$("#txtConta").val("");
   AgregarTerminacionCorreo(); 
});	
$("#cbContexCont").change(function(e) {
	$("#txtConta").val("");
    AgregarTerminacionCorreo();
});


function archivo(evt) {
		  var files = evt.target.files;	 
		  // Obtenemos la imagen del campo "file".
		  for (var i = 0, f; f = files[i]; i++) {
			//Solo admitimos imágenes.
			if (!f.type.match('image.*')) {
				continue;
			}
	 
			var reader = new FileReader();
	 
			reader.onload = (function(theFile) {
				return function(e) {
				 document.getElementById("imgFunc").src= [e.target.result].join('');
				 document.getElementById("imgFunc").Style="height:140px; width:140px;";
				};
			})(f);
	 
			reader.readAsDataURL(f);
		  }
	  }
                                         
   document.getElementById('files').addEventListener('change', archivo, false);
  
   ///////////////termina lo de imagen////////////////
//primera llamada, inhabilitamos los accesos para obligar a usuario a llenar primero datos personales
     inhabilitarMenu();
	 cargarComportamientoLink();
/*----------------------------------------*/	
	$('#txtCedu').keydown(function(e) {
		
		
	  $(this).hasClass('alert-danger')
	  {
        $(this).removeClass('alert-danger'); 
	  } 
	   
});
	$('#txtNumPues').keydown(function(e) {
		
		
	  $(this).hasClass('alert-danger')
	  {
        $(this).removeClass('alert-danger'); 
	  } 
	 
});
//---------------------TODOS LOS TEXTBOX

//función para obtener objetos de un form y darles comportamientos
function elemntoGlobales(elementoF){
	var idF=$(elementoF).attr('id');
	var IdForm="#"+idF;
 var elementosFormDatosPersonales=$(IdForm).contents().find('input');	
				
			for(var i=0;i<elementosFormDatosPersonales.length;i++)
			{				
				if(elementosFormDatosPersonales[i].type=="text")
				 {
					var TextBox=elementosFormDatosPersonales[i];
					var ID="#"+TextBox.id;
				    $(ID).keydown(function(e) {
						
						verificarCamposGlobal($(e.target).closest('form'));
                        $(this).removeClass('alert-warning');						
                    });
					
					$(ID).keyup(function(e) {
						verificarCamposGlobal($(e.target).closest('form'));
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
				
			}
}//fin elemento globales
//-------------///////////////////////////CARGAR FORMS Y COMPORTAMINENTOS///////////////////////---------------------------------//
//-------------//////////////////////////DATOS PERSONALES//////////////////////---------------------------------//

elemntoGlobales($("#frmDatPerso"));
//---------------change de textbox para volverlos al estado normal una vez que sean marcados como requeridos y se llenen, o bien paradarles comportamientos, asignarles eventos dinamicos

//-----------daTEPICKER de fecha de nacimiento
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
$('#txtFechNac').val(today);

var initDateBounds = function() {
  
  $('#txtFechNac').prop('max', today);

}
initDateBounds();
//--------------------------------	

    $('body div a').click(function(e) { 
	
	funcionModificarTamañoVentana();

});
/****************************************************/



//------------------modificar combobox
		
	$("#cbGenero").change(function(){
	 var miTexto;

		var valorAux=$("#cbGenero").val();
		if(valorAux=="MASCULINO"){						
			$('#cbEstaCiv > option').each(function() {
				miTexto =$(this).text();
				
              if(miTexto=="SOLTERA")
			    {
					$(this).text("SOLTERO");
					$(this).val("SOLTERO");
				}
				if(miTexto=="CASADA")
			    {
					$(this).text("CASADO");
					$(this).val("CASADO");
				}
				if(miTexto=="DIVORCIADA")
			    {
					$(this).text("DIVORCIADO");
					$(this).val("DIVORCIADO");
				}
				if(miTexto=="VIUDA")
			    {
					$(this).text("VIUDO");
					$(this).val("VIUDO");
				}
				
           });
			
		}
		if(valorAux=="FEMENINO"){	
			$('#cbEstaCiv > option').each(function() {
				miTexto =$(this).text();			
              if(miTexto=="SOLTERO")
			    {	
					$(this).text("SOLTERA");
					$(this).val("SOLTERA");
				}
					if(miTexto=="CASADO")
			    {	
					$(this).text("CASADA");
					$(this).val("CASADA");
				}
				if(miTexto=="DIVORCIADO")
			    {
					$(this).text("DIVORCIADA");
					$(this).val("DIVORCIADA");
				}
				if(miTexto=="VIUDO")
			    {
					$(this).text("VIUDA");
					$(this).val("VIUDA");
				}
				
           });
			
		}
  });
  
  
	
//******************************************

//-------------///////////////////////////DATOS PERSONALES///////////////////////---------------------------------//
//-------------///////////////////////////DATOS LABORALES///////////////////////---------------------------------//	
elemntoGlobales($("#frmDatLab"));
//datepicker de fecha de ingreso
var now2 = new Date();
var day2 = ("0" + now.getDate()).slice(-2);
var month2 = ("0" + (now.getMonth() + 1)).slice(-2);
var today2 = now2.getFullYear()+"-"+(month2)+"-"+(day2) ;
$('#txtFecIng').val(today2);



//-------------///////////////////////////DATOS LABORALES///////////////////////---------------------------------//	
//-----------datepickers de hist laboral

var now4 = new Date();
var day4 = ("0" + now4.getDate()).slice(-2);
var month4 = ("0" + (now4.getMonth() + 1)).slice(-2);
var today4 = now4.getFullYear()+"-"+(month4)+"-"+(day4) ;
var monthAux=("0" + (now4.getMonth()+1 + 1)).slice(-2);
$('#txtFechFinHistLabo').val(today4);
var today4plus= now4.getFullYear()+"-"+(monthAux)+"-"+(day4); 
var initDateBounds4 = function() {
  
  $('#txtFechFinHistLabo').prop('max', today4plus);

}
initDateBounds4();

$('#txtFechIniHistLabo').val(today4);






//--------------------------------------------contacto
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


agregarComportamientoInfoAdicional($("#txtConta"),1);
agregarComportamientoInfoAdicional($("#txtContaText"),1);


agregarComportamientoInfoAdicional($("#txtNivelAcade"),2);
agregarComportamientoInfoAdicional($("#txtObserAcade"),2);


agregarComportamientoInfoAdicional($("#txtDescHistoLabo"),3);
agregarComportamientoInfoAdicional($("#txtEmprHistoLabo"),3);


});//fin del document.ready

function ValidaSoloNumeros() {
 if((event.keyCode < 48) || (event.keyCode > 57)||(event.keyCode == 08))
  event.returnValue = false;
}
///función para guardar valor de combobox genero	
	
////*************************************************

	
	function GuardarDatosPerso()
	{		
	
	  	verificarCamposGlobal($("#frmDatPerso"));
		if(camposDPR==false){
			
		var parametros={
			"pNombre":$("#txtNombre").val(), 
			"pApelli":$("#txtPrApe").val(), 
			"pSeApel":$("#txtSeApe").val(), 
			"pCedula":$("#txtCedu").val(), 
			"pNacion":$("#txtNaciona").val(), 
			"pFoto":'sinfoto',
			"pGenero":$("#cbGenero").val(),
			"pEstaCi":$("#cbEstaCiv").val(),
			"pFecNac":$("#txtFechNac").val()	
		};
		
		$.ajax({
			data: parametros,
			url: 'php/Funcionarios/IngresarDatos.php',
			type: 'POST',
			beforeSend: function(){
				$("#ResultadoRestablecer").html("Ingresando Datos, espere por favor...");				
			},
			success: function(response){
				if(response==-1){
					//problema para recuperar el id de usuario recien ingresado
					
					//$("#ResultadoRestablecer").html("ERROR AL OPTENER EL ID DEL FUNCIONARIO RECIEN INGRESADO");
					//$("#ResultadoRestablecer").addClass("text-danger");	
					//abreModal("IFRR");
					
				}
				if(response==-2){	
				//problema general de insertar funcionario				
					//abreModal("PIF");
					//$("#ResultadoRestablecer").html("NO SE INGRESO EL FUNCIONARIO DE FORMA CORRECTA");
					//$("#ResultadoRestablecer").addClass("text-danger");	
				}
				if(/fun_cedula/.test(response)){
					
					if(/fun_cedula/.test(response))
						{
							
								//id repetidoIR
					//abreModal('IR');
					$("#txtCedu").addClass('alert-danger');
					$("#ResultadoRestablecer").addClass("text-danger");	
							funcionModificarTamañoVentana();
					    }
				
					//manejo de mensaje cuando hay cedula repetida
					
					
					
					}
				if(response!=-1&&response!=-2&&response!=-3)	
				{						
					//$("#ResultadoRestablecer").html("SE INGRESO EL FUNCIONARIO DE FORMA CORRECTA");
					//$("#ResultadoRestablecer").addClass("text-danger");	
					//datos personales alamcenados exitosamente
					window.parent.abreModal("FAE");
					
					idUsActual=response;
					
					$("#btnGuardarDatPerso").addClass("disabled");
					$("#datPersTodos").addClass("disabled");
					$("#btnModificaDatPerso").removeClass("disabled");
				    $("#tbContaFunc").removeClass("hidden");
				    $("#tbHistoAca").removeClass("hidden");
				    $("#tbHistoLab").removeClass("hidden");
					
					//segundo llamado, habilita los links para que usuario continue
					inhabilitarMenu();
		            
				}
			}
		});
		
		}else
		{
			
		    //no pasa nada
			}
			$("#btnGuardarDatPerso").focus();
	}	
	
	function GuardarDatosLabora()
	{	
		verificarCamposGlobal($("#frmDatLab"));
		 if(camposDLR==false){
	 
		if(idUsActual!=0){
		  var parametros={
			  "pID":idUsActual,
			  "pEstaLab":$("#cbEstaLab").val(), 
			  "pNombram":$("#cbNombramiento").val(), 
			  "pFecIngr":$("#txtFecIng").val(), 
			  "pNumPues":$("#txtNumPues").val(), 
			  "pEspePue":$("#txtEspePues").val(), 
			  "pProgPre":$("#cbPrograPre").val(),
			  "pCargo":$("#txtCargo").val(),
			  "pGrupLab":$("#cbGrupoLab").val(),
			  "pClase":$("#txtClase").val(),
			  "pFondFin":$("#cbFondoFinan").val(),
			  "pObserva":$("#txtObser").val(),
			  "pDepemd":$("#cbDepende").val(),
			  "pTipJor":$("#cbTipoJornada").val()	
		  };
		 
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/IngresarDaLab.php',
			  type: 'POST',
			  beforeSend: function(){
				  $("#ResultadoRestablecer").html("Ingresando Datos, espere por favor...");				
			  },
			  success: function(response){				 
					  if(/fun_numpuesto/.test(response))
						{
						
					//alert("YA HAY UN FUNCIONARIO REGISTRADO CON ESE NÚMERO DE PUESTO");
					//num puesto repetido
			       // abreModal("NPR");
					$("#txtNumPues").addClass('alert-danger');
					$("#ResultadoRestablecer").addClass("text-danger");	
							funcionModificarTamañoVentana();
						}
					else
					{
				  $("#ResultadoRestablecer").html(response);
				  $("#ResultadoRestablecer").addClass("text-danger");
//				  abreModal("DLGE");
}
			  }
		  });	
		}
		else
		{
			//error falta datos personales o cargar de nuevo la página
	//		abreModal("GDPCP");
			
		}
		 }//if de campoSDLR
	else
	{
//		  	abreModal("CO");
			
		}
	}



//-----------Manejo de mensajes----------------------------------
	
function AgregarLineaDeTexto(TextoLinea,id,tipo,formPadre) {
	if(formPadre=="frmDatPerso")  {  
		var d= '<p id="'+id+'" class="help-block text-center '+tipo+'">'+TextoLinea+'</p>';
       $("#dMensajes").append(d);}
	   if(formPadre=="frmDatLab")  {
		  var d2= '<p id="'+id+'" class="help-block text-center '+tipo+'">'+TextoLinea+'</p>';
       $("#dMensajesL").append(d2); 
		    }
    }

//--------------tamaño de iframe	
var funcionModificarTamañoVentana=function(){setTimeout("padre = $(window.parent.document);padre.find('#fPrincipal').animate({'height': $('body').height()});",420);}
	
	
	
//---------------función inhabilitar y habilitar menu de inserción de datos
function inhabilitarMenu(){
	for(var i=1;i<=4;i++)
	{	
		var idAux="#menu"+(i);
			
		if(!$(idAux).hasClass('disabled'))
		      { 
			   $(idAux).addClass('disabled');
			  }
		else
		  {
		
			   $(idAux).removeClass('disabled');
		  }
	}
	
}	
//función para hacer focus()
function focusMenu(){
	for(var i=1;i<=4;i++)
	{	
		var idAux="#menu"+(i);
	    $(idAux).click(function(e) {
          $(e.target).focus(); 
        });
		 
	}
	
}

//------------------función para guíar a usuario a hacer las cosas en el orden correcto
function cargarComportamientoLink(){
	var dArray=[
	"#pnlDatLaborales"
	,"#pnlContacto"	
	,"#pnlHistAca"
	,"#pnlHistLab"	
	];
	
	for(var i=0;i<dArray.length;i++)
	{	
		
		$(dArray[i]).mouseover(function(e) {
			
		verificarCamposGlobal($("#frmDatLab"));
		auxOpcionMenu=$(e.target).children('div');
		if($(e.target).children('div').hasClass('disabled')){
			auxOpcionMenu.addClass('divDisabled');
		if($("#dAlertasLinks").children('p').length<1)
		  { 
			  mensajeLink= '</br><p class="help-block text-center alert-info">EL LINK SE ENCUENTRA DESHABILITADO HASTA GUARDAR LOS DATOS PERSONALES DEL FUNCIONARIO NUEVO</p>';
			  $("#dAlertasLinks").html(mensajeLink);
		    funcionModificarTamañoVentana();
			
					  } 
					  
		}//if disabled  
     });//mouseover
	 
	 $(dArray[i]).mouseleave(function(e) {
		 
	   
		auxOpcionMenu=$(e.target).children('div');
		auxOpcionMenu.removeClass('divDisabled');	
		if($("#dAlertasLinks").children('p').length>0)
		  {
		    $("#dAlertasLinks").empty();
		    funcionModificarTamañoVentana();
		
		  }
		  });//mouseleave
       
	}
}	
//---------------------------------------------------------------------

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
	
//verificarCampoGlobal
function verificarCamposGlobal(elementoForm){
	
	var idF=$(elementoForm).attr('id');
	var IdForm="#"+idF;
	var camposDeForm=$(IdForm).contents().find('input');//obtener form padre
	if(idF=="frmDatLab"){camposDLR=false};//limpiar banderas
	if(idF=="frmDatPerso"){camposDPR=false};
	for(var i=0;i<camposDeForm.length;i++)
			{
				
				if(camposDeForm[i].type=="text")//recorrer objetos que se desean validar del form
				 {
					var TextBox=camposDeForm[i];
					var ID="#"+TextBox.id;
					if(TextBox.value=="" && ID!="#txtObser"){
						$(ID).addClass("alert-warning");
						if(idF=="frmDatLab")
						 {camposDLR=true;}
						else
						  {camposDPR=true;}
						}
				 
				 }
				
			}
	if(idF=="frmDatLab"){//en caso de form laboral
							if($("#txtFecIng").css("border-color")=="rgb(255, 0, 0)")
							{
										camposDLR=true;
							}
							if(camposDLR==true)
							{
								  if(!$("#pDinamicoDL").length)//mostrar un mensaje en la zona de dicho form
								  {
								 
								  AgregarLineaDeTexto("HAY CAMPOS REQUERIDOS SIN RELLENAR O INCORRECTAMENTE LLENOS","pDinamicoDL","alert-warning",idF);
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
	if(idF=="frmDatPerso"){//en caso de form de datos personales
	         if($("#txtFechNac").css("border-color")=="rgb(255, 0, 0)")
			 {
				camposDPR=true;
			 }	
			if(camposDPR==true)
			{
				if(!$("#pDinamicoCR").length)//mostrar mensajes en zona de datos personales
				{
					
				AgregarLineaDeTexto("HAY CAMPOS REQUERIDOS SIN RELLENAR O INCORRECTAMENTE LLENOS","pDinamicoCR","alert-warning",idF);
				funcionModificarTamañoVentana();
				}
				
			}
			else{
					if($("#pDinamicoCR").length)
					    {
						$("#pDinamicoCR").remove();
						funcionModificarTamañoVentana();
						}
				}
		
		}
	
	
	}
	
	
	///-------------------------crisman
		/////////////CONTACTOS
	
	//CONSULTA PARA PODER MODIFICAR
	var ContConsu=0;
	function ModificarContacto()
	{
		$("#cbTipoCont").val(		
		document.getElementById("tLisContactos").rows[ContConsu-1].cells[1].innerText+"");				
		
		$("#cbContexCont").val(		
		document.getElementById("tLisContactos").rows[ContConsu-1].cells[2].innerText+"");
		
		$("#txtConta").val(
		document.getElementById("tLisContactos").rows[ContConsu-1].cells[3].innerText+"");				
		
		$("#txtContaText").val(
		document.getElementById("tLisContactos").rows[ContConsu-1].cells[4].innerText+"");
	
	}
	//LLENA LA LISTA CON LOS CONTACTOS DE LA BD
	function CargarContactos()
	{
		 var parametros = {"pID":idUsActual}; // '{"pID:0"}'	
		 
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:parametros,//"datos={"pID:0"}
		  url:'php/Funcionarios/ListarContactos.php', 
		  success:function(response){						
				$("#tLisContactos").html(response);		
								
		  	},
		  error:function(response)
		  	{
				alert("ERROR al ejecutar el jSon");
		  	}		
		});	
		funcionModificarTamañoVentana();
	}
	//GUARDA UN CONTACTO NUEVO
	function CancelarCambiosDeContacto()
	{
		ContConsu=0;
		$("#cbTipoCont").val("");
		$("#cbContexCont").val("");
		$("#txtConta").val("");
		$("#txtContaText").val("");
	}
	
	function AgregarContacto()
	{ 
	 
	  camposContacto=false;
	  verificarCamposInfoAdi($("#txtConta"),1);
	  if(camposContacto==false){
		var parametros={
			  "pID":idUsActual,
			  "pTipo":$("#cbTipoCont").val(), 
			  "pEnto":$("#cbContexCont").val(), 
			  "pDato":$("#txtConta").val(), 
			  "pDesc":$("#txtContaText").val()	
		  };
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/IngresarConta.php',
			  type: 'POST',			  
			  success: function(response){
				  
				  if(response=="...")
				  {//exito
				  	CargarContactos();					 
				  }else
				  {
					alert("ERROR AL AGREGAR");
				  }
			  }
		  });}//ifcampos contacto
		  else
		  {alert("campos vacios");}
		funcionModificarTamañoVentana();  
		 
	}
	
	function EliminaUnContacto()
	{
		 var parametros={
			  "pID":ContConsu	
		  };
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/EliminarContacto.php',
			  type: 'POST',
			  beforeSend: function(){
				  $("#ResultadoRestablecer").html("Ingresando Datos, espere por favor...");				
			  },
			  success: function(response){
				  if(response=="...")
				  {//exito
				  	CargarContactos();
				  }else
				  {
					alert("ERROR AL AGREGAR");  
				   }
			  }
		  });
		  funcionModificarTamañoVentana();
	}
	
	function GuardarCambiosDeContacto()
	{		
		var idContactoConsultado=document.getElementById("tLisContactos").rows[ContConsu-1].cells[6].innerText;
		var parametros={
			  "pID":idContactoConsultado,
			  "pTipo":$("#cbTipoCont").val(), 
			  "pEnto":$("#cbContexCont").val(), 
			  "pDato":$("#txtConta").val(), 
			  "pDesc":$("#txtContaText").val()	
		  };
		  
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/ModicarContacto.php',
			  type: 'POST',			  
			  success: function(response){
				  if(response=="...")
				  {
				  	CargarContactos();					 
				  }else
				  {
					alert("ERROR AL AGREGAR");
				  }
			  }
		  });	
	}
	///////////////////////////////////////
	
	
	
	/////////////HISTORIAL ACADEMICO
	
	//CONSULTA PARA PODER MODIFICAR
	var FilaHacAcaConsu=0;//fila
	var IdHacAcaCons=0;
	function CancelarCambiosHiAcContacto()
	{
		idHacLabConsu=0;
		FilaHacAcaConsu=0;
		$("#txtNivelAcade").val(""); 
		$("#txtObserAcade").val("");
	}
	
	function ModificarHistoAcad()
	{
		$("#txtNivelAcade").val(		
		document.getElementById("tLisAcade").rows[FilaHacAcaConsu-1].cells[1].innerText+"");				
		
		$("#txtObserAcade").val(		
		document.getElementById("tLisAcade").rows[FilaHacAcaConsu-1].cells[2].innerText+"");		
	
	}
	//LLENA LA LISTA CON LOS HISTORICOS DE LA BD
	function CargarHistorialAcademico()
	{
		  var parametros = {"pID":idUsActual}; // '{"pID:0"}'	
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:parametros,//"datos={"pID:0"}
		  url:'php/Funcionarios/ListarHistoAcademico.php', 
		  success:function(response){						
				$("#tLisAcade").html(response);						
		  	},
		  error:function(response)
		  	{
				alert("ERROR al ejecutar el jSon");
		  	}		
		});	
		funcionModificarTamañoVentana();
	}
	
	//AGREGA UN NUEVO REGISTRO DE HISTORIAL ACADEMICO
	function AgregarHistAcad(){	
		
		camposHistAca=false;			
			
		  verificarCamposInfoAdi($("#txtNivelAcade"),2);
			
			if(camposHistAca==false){
			  var parametros={
				  "pID":idUsActual,
				  "pNivel":$("#txtNivelAcade").val(), 
				  "pObser":$("#txtObserAcade").val()
			  };
			  $.ajax({
				  data: parametros,
				  url: 'php/Funcionarios/IngresarHistoAcade.php',
				  type: 'POST',
				  beforeSend: function(){
					  $("#tLisAcade").html("Ingresando Datos, espere por favor...");				
				  },
				  success: function(response){
					  if(response=="...")
					  {//exito
						CargarHistorialAcademico();	
					  }else
					  {
						alert("ERROR AL AGREGAR");  
					   }
				  }
			  });	
			}//if historial Aca
			else{alert("Campos vacíos");}
			funcionModificarTamañoVentana();
			
	}
		
	function EliminarHistAcad()
	{
		var parametros={
			 "pID":IdHacAcaCons	
			  };
			  $.ajax({
				  data: parametros,
				  url: 'php/Funcionarios/EliminarHistAcad.php',
				  type: 'POST',
				  beforeSend: function(){
					  $("#ResultadoRestablecer").html("Ingresando Datos, espere por favor...");				
				  },
				  success: function(response){
					  if(response=="...")
					  {//exito
						CargarHistorialAcademico();
					  }else
					  {
						alert("ERROR AL AGREGAR");  
					   }
				  }
			  });
			  funcionModificarTamañoVentana();	
	}
	
	function GuardarCambiosDeHistAcad()
	{
		 var parametros={
			  "pID":IdHacAcaCons,
			  "pNivel":$("#txtNivelAcade").val(), 
			  "pObser":$("#txtObserAcade").val()
		  };
		  
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/ModicarHistoAcade.php',
			  type: 'POST',
			   beforeSend: function(){
				  $("#tLisAcade").html("Ingresando Datos, espere por favor...");				
			  },			  
			  success: function(response){
				  if(response=="...")
				  {
				  	CargarHistorialAcademico();					 
				  }else
				  {
					alert("ERROR AL AGREGAR");
				  }
			  }
		  });
	}
	///////////////////////////////////////
	
	
	
	/////////////HISTORIAL LABORAL	
	
    var idHacLabConsu =0;	
	var fiHacLabConsu =0;
	//LLENA LA LISTA CON LOS HISTORICOS DE LA BD
	
	function CancelarCambiosHiLa()
	{
		idHacLabConsu=0;
		fiHacLabConsu=0;
		$("#txtFechIniHistLabo").val(""); 
		$("#txtFechFinHistLabo").val(""); 
		$("#txtEmprHistoLabo").val("");
		$("#txtDescHistoLabo").val("");
	}
	
	function CargarHistorialLaboral()
	{
		  var parametros = {"pID":idUsActual}; // '{"pID:0"}'	
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:parametros,//"datos={"pID:0"}
		  url:'php/Funcionarios/ListarHistoLaboral.php', 
		   beforeSend: function(){
				  $("#taBodHistoLab").html("Listando, espere por favor...");				
			  },
		  success:function(response){						
				$("#taBodHistoLab").html(response);						
		  	},
		  error:function(response)
		  	{
				alert("ERROR al ejecutar el jSon");
		  	}		
		});	
		funcionModificarTamañoVentana();
	}	
	//CONSULTA PARA PODER MODIFICAR
	function ModificarHistoLab()
	{
		$("#txtFechIniHistLabo").val(		
		document.getElementById("taBodHistoLab").rows[fiHacLabConsu-1].cells[1].innerText+"");				
		
		$("#txtFechFinHistLabo").val(		
		document.getElementById("taBodHistoLab").rows[fiHacLabConsu-1].cells[2].innerText+"");		
		
		$("#txtEmprHistoLabo").val(		
		document.getElementById("taBodHistoLab").rows[fiHacLabConsu-1].cells[3].innerText+"");				
		
		$("#txtDescHistoLabo").val(		
		document.getElementById("taBodHistoLab").rows[fiHacLabConsu-1].cells[4].innerText+"");			
	}
	//AGREGA UN NUEVO REGISTRO DE HISTORIAL LABORAL
	function AgregarUnHistLabo()
	{		
	  camposLab=false;
	  verificarCamposInfoAdi($("#txtEmprHistoLabo"),3);
	  if($("#txtFechFinHistLabo").css("border-color")=="rgb(255, 0, 0)")
			 {
				camposLab=true;
			 }	
	  if(camposLab==false){		
		  var parametros={
			  "pID":idUsActual,
			  "pFecIngr":$("#txtFechIniHistLabo").val(), 
			  "pFecSali":$("#txtFechFinHistLabo").val(), 
			  "pEmpresa":$("#txtEmprHistoLabo").val(), 
			  "pDescrip":$("#txtDescHistoLabo").val()	
		  };
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/IngresarHistoLabo.php',
			  type: 'POST',
			  beforeSend: function(){
				  $("#taBodHistoLab").html("Ingresando Datos, espere por favor...");				
			  },
			  success: function(response){				  
				  if(response=="...")
				  {//exito
				  	CargarHistorialLaboral();	
				  }else
				  {
					alert("ERROR AL AGREGAR");  
				   }
			  }
		  });}//if campos lab
		  else
		  {alert("campos vacíos");}	
		  funcionModificarTamañoVentana();					
	}
	function EliminaUnHistLabo()
	{		
		var parametros={
			 "pID":idHacLabConsu	
			  };			  
			  $.ajax({
				  data: parametros,
				  url: 'php/Funcionarios/EliminarHistoLaboral.php',
				  type: 'POST',
				  beforeSend: function(){
					  $("#ResultadoRestablecer").html("Ingresando Datos, espere por favor...");				
				  },
				  success: function(response){
					  if(response=="...")
					  {//exito
						CargarHistorialLaboral();
					  }else
					  {
						alert("ERROR AL AGREGAR");  
					   }
				  }
			  });
			  funcionModificarTamañoVentana();	
	}	
	function GuardarUnHistLabo()
	{
		 var parametros={
			  "pID":idHacLabConsu,
			  "pFecIngr":$("#txtFechIniHistLabo").val(), 
			  "pFecSali":$("#txtFechFinHistLabo").val(), 
			  "pEmpresa":$("#txtEmprHistoLabo").val(), 
			  "pDescrip":$("#txtDescHistoLabo").val()	
		  };		  
		  $.ajax({
			  data: parametros,
			  url: 'php/Funcionarios/ModificarHistoLaboral.php',
			  type: 'POST',
			   beforeSend: function(){
				  $("#tLisAcade").html("Ingresando Datos, espere por favor...");				
			  },			  
			  success: function(response){
				  if(response=="...")
				  {
				  	CargarHistorialLaboral();					 
				  }else
				  {
					alert("ERROR AL AGREGAR");
				  }
			  }
		  });
	}
	
//--------------------------Sección de formularios de información adicional------------------------------------------------------------------//
	//---tipo 1 es contacto, tipo 2 es historial academico, tipo 3 es historial Laboral
function verificarCamposInfoAdi(elementoForm,pTipo){
	    
		var TextBox=elementoForm;
					var ID="#"+TextBox.attr('id');
					
					if($(ID).val()==""){
						$(ID).addClass("alert-warning");
						if(pTipo==1)
						 {camposContacto=true;}
						 if(pTipo==2)
						 {camposHistAca=true;}
						 if(pTipo==3)
						 {
							   
							 
							 camposLab=true;}
						}
	}	

//------------------------------------------Subir Imagen al servidor------------------------

function SubirImagen(){
		if($("#files").val()!="" && idUsActual!=0){	
		  var archivos = document.getElementById("files");
		  var archivo = archivos.files; 
		
		  var data = new FormData();
			data.append("archivo1",archivo[0]);
		 
		  data.append("name",$("#txtCedu").val());
		
		  $.ajax({
			url:'php/Funcionarios/subir1.php', //Url a donde la enviaremos
			type:'POST', //Metodo que usaremos
			contentType:false, //Debe estar en false para que pase el objeto sin procesar
			data:data, //Le pasamos el objeto que creamos con los archivos
			processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
			cache:false //Para que el formulario no guarde cache
		  }).done(function(msg){
			 //si entra aqui Mostrara los archivos cargados en el div con el id "Cargados"
		  });
		}else
		{
			//ventana modal al subir imagen
			abreModal("SI");
			
		}
	}		
	
//---------------------------------
function AgregarTerminacionCorreo(){
	var VecNombre;
	var NombreCompleto=$("#txtNombre").val();
	VecNombre=NombreCompleto.split(" ");
	if((VecNombre[0]!="")&&($("#txtPrApe").val()!="")&&($("#cbContexCont").val()=="LABORAL")&&($("#cbTipoCont").val()=="EMAIL")){
		if($("#txtConta").val()=="")
			$("#txtConta").val(VecNombre[0].toLowerCase()+"."+$("#txtPrApe").val().toLowerCase()+"@sinac.cr.com");
		
		}
	}	
	

//--------------textareas
function textareasSize(elemento){
elemento.keypress(function(e) {
                                ValidarTamano(e.target,200);
								elemento.keyup(function(e) { ValidarTamano(e.target,200);});
                            });
	
	
}
