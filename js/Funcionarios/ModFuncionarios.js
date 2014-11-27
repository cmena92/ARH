//MANUEL INTERFAZ
var camposFP=false;//variable para campos de form principal requeridos
var camposContacto=false;
var camposHistAca=false;
var camposLab=false;
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


agregarComportamientoInfoAdicional($("#txtConta"),1);
agregarComportamientoInfoAdicional($("#txtContaText"),1);


agregarComportamientoInfoAdicional($("#txtNivelAcade"),2);
agregarComportamientoInfoAdicional($("#txtObserAcade"),2);


agregarComportamientoInfoAdicional($("#txtEmprHistoLabo"),3);
agregarComportamientoInfoAdicional($("#txtEmprHistoLabo"),3);




//-----------------------








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


ListarFuncionarios();
/*zona de redimencionar*/


$('body div a').click(function(e) {
  funcionModificarTamañoVentana();
});


/*zona de redimencionar*/

//cambiar el cambo box según genero

function cambiarDatosComboGenero(valorAux){
	
	var miTexto;
		
		if(valorAux=="MASCULINO"){
						
			$('#cbECivil > option').each(function() {
				miTexto =$(this).text();
				
              if(miTexto=="SOLTERA")
			    {
					$(this).text("SOLTERO");
					$(this).value("SOLTERO");
				}
				if(miTexto=="CASADA")
			    {
					$(this).text("CASADO");
					$(this).value("CASADO");
				}
				if(miTexto=="DIVORCIADA")
			    {
					$(this).text("DIVORCIADO");
					$(this).value("DIVORCIADO");
				}
				if(miTexto=="VIUDA")
			    {
					$(this).text("VIUDO");
					$(this).value("VIUDO");
				}
				
           });
			
		}
		
		if(valorAux=="FEMENINO"){
						
			$('#cbECivil > option').each(function() {
				miTexto =$(this).text();
			
              if(miTexto=="SOLTERO")
			    {
					$(this).text("SOLTERA");
					$(this).value("SOLTERA");
				}
					if(miTexto=="CASADO")
			    {
					$(this).text("CASADA");
					$(this).value("CASADA");
				}
				if(miTexto=="DIVORCIADO")
			    {
					$(this).text("DIVORCIADA");
					$(this).value("DIVORCIADA");
				}
				if(miTexto=="VIUDO")
			    {
					$(this).text("VIUDA");
					$(this).value("VIUDA");
				}
				
           });
			
		}
}

$("#cbGenero").change(function(){
	cambiarDatosComboGenero($("#cbGenero").val());
  });
  

 
 //----------------------------------------------------
 //función sólo números 
 $("#txtNPuesto").keydown(function(event) {
   if(event.shiftKey)
   {
        event.preventDefault();
   }
 
   if (event.keyCode == 46 || event.keyCode == 8)    {
   }
   else {
        if (event.keyCode < 95) {
          if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
          }
        } 
        else {
              if (event.keyCode < 96 || event.keyCode > 105) {
                  event.preventDefault();
              }
        }
      }
   });
 //---------------------------------------------------------------
 //-FUNCION CONTROL DEL TEXTAREA
  var max_chars = 150;   

    $("#txtObservaciones").keyup(function() {
        var chars = $(this).val().length;
        var diff = max_chars - chars;
		if(diff==0)
        {$("#aMostrar").text("Ya no hay más espacio disponible para almacenar información.");}   
		else
		{$("#aMostrar").text("");}   
    });
 //-------------------------------------------------------------  
 });
//--------------------------------------------
var idSeleccionado=0;
var FilaConsu=0;
function Contador(){
	if(clicks==0){
		clicks++;
		}else{
			clicks=0;
			}
	}
	
function ListarFuncionarios(){
	$.ajax({
			url: 'php/Funcionarios/ListarFuncionarios.php',
			type:'post',
			beforeSend: function(){
				$("#tResultadoFunc").html("<td>Procesando, espere por favor...</td>");
			},		
			success: function(response){
				$("#tResultadoFunc").html(response);
			}
		});	
	} 	
		
  function Seleccionar(){		
		  var Datos=
		  document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[2].innerText+" "+
		  document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[3].innerText+" "+
		  document.getElementById("tResultadoFunc").rows[FilaConsu-1].cells[4].innerText+" "	
		  ;	
		  $("#LabFuncConsul").text(Datos);			
		  
		  //funcion que va a bd y carga los campos con los datos
		  CargarDatos();
		  CargarContactos();
		  CargarHistorialAcademico();
		  CargarHistorialLaboral();
	  }		
		
	function CargarDatos()
	{	
		//FALTA foto
		$("#frmP1").get(0).reset();
		 $("#frmP2").get(0).reset();
		  var parametros = '{"pID":'+idSeleccionado+'}'; // '{"pID:0"}'	
		  $.ajax({
		  async:true,	
		  type:'POST',  
		  data:"datos="+parametros,// "datos={"pID:0"}"
		  url:'php/Funcionarios/CargDatPerso.php', 
		  dataType:'json', //esto es el cambio que jode todo, esto lo que hace es enviar y recibir un vector por asi decirlo.. es una estrucutura de datos
		  success:function(response){
			var nom=response;
			      
				document.getElementById("imgFunc").src="img/fotos/"+nom[0].Cedula+".jpg";
				$("#imgFunc").error(function(e) {
                 document.getElementById("imgFunc").src="img/fotos/default.jpg";   
                });
								
				$("#txtCedula").val(nom[0].Cedula);
				$("#txtNombre").val(response[0].Nombre);
				$("#txtApellido1").val(response[0].PriApellido);
				$("#txtApellido2").val(response[0].SegApellido);
				$("#txtNacionalidad").val(response[0].Nacionalidad);
				$("#cbDependencia").val(response[0].Dependencia);
				
				$("#cbGenero").val(response[0].Genero);
				
				var valorAux=response[0].Genero;

				if(valorAux=="MASCULINO"){
								
					$('#cbECivil > option').each(function() {
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
						
			$('#cbECivil > option').each(function() {
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
				
				
				$("#cbECivil").val(response[0].EstadoCivil);
				$("#txtFecNac").val(response[0].FechaNac);
				$("#cbPP").val(response[0].Presupuesto);
				$("#cbFF").val(response[0].FondoFinaci);
				$("#cbNombramiento").val(response[0].Nombramiento);				
				$("#txtNPuesto").val(response[0].NumeroPuesto);	
								
				$("#txtClase").val(response[0].Clase);					
				$("#txtEspecialidad").val(response[0].Especialidad);					
				$("#cbGLaboral").val(response[0].GrupoLaboral);					
				$("#txtCargo").val(response[0].Cargo);		
							
				$("#txtObservaciones").val(response[0].Descripcion);
				$("#cbEstaLab").val(response[0].Estado);
			    $("#txtFecIng").val(response[0].FechaIngreso);
				//$("#exampleInputFile").val(response[0].Foto);
			  	$("#cbTipoJornada").val(response[0].TipoJornada);
				ValidarTextBox();
				
		  	},
		  error:function(response)
		  	{
				alert("ERROR al ejecutar el jSon");
		  	}
		});	
	
	}
		
	function supports_html5_storage() {
		  try {
			return 'localStorage' in window && window['localStorage'] !== null;
		  } catch (e) {
			return false;
		  }
		}		
		
	function GuardarCambioDatosGenerales ()
	{
	    camposFP=false;
		ValidarTextBox();
		
		var usuarioActual;
		if (supports_html5_storage() )
		{						
			us=window.localStorage.getItem('usuarioARH');
			usuarioActual=us.split(",");
		}else
		{
			alert("ESTE EXPLORADOR NO PERMITE GUARDAR DATOS LOCALES, GOOGLE CHROME SI LO SOPORTA");//mv
		}	
				
		if(camposFP==false){
		//-----------------//
		var parametros={
			    "pID":idSeleccionado,
				"pNombre":$("#txtNombre").val(), 
				"pApelli":$("#txtApellido1").val(), 
				"pSeApel":$("#txtApellido2").val(), 
				"pCedula":$("#txtCedula").val(), 
				"pNacion":$("#txtNacionalidad").val(), 
				"pDepemd":$("#cbDependencia").val(),
				"pFoto":$("#exampleInputFile").val(),
				"pGenero":$("#cbGenero").val(),
				"pEstaCi":$("#cbECivil").val(),
				"pFecNac":$("#txtFecNac").val(),
				"pEstaLab":$("#cbEstaLab").val(), 
			    "pNombram":$("#cbNombramiento").val(), 
			    "pFecIngr":$("#txtFecIng").val(),				 
			    "pNumPues":$("#txtNPuesto").val(), 
			    "pEspePue":$("#txtEspecialidad").val(), 
			    "pProgPre":$("#cbPP").val(),
			    "pCargo":$("#txtCargo").val(),
			    "pGrupLab":$("#cbGLaboral").val(),
		  	    "pClase":$("#txtClase").val(),
			    "pFondFin":$("#cbFF").val(),
			    "pObserva":$("#txtObservaciones").val(),	
				"pCedulaUsuar":usuarioActual[0],
			  	"pTipJor":$("#cbTipoJornada").val()	
		};
		
		$.ajax({
			data: parametros,
			url: 'php/Funcionarios/ModificarFuncDatos.php',
			type: 'POST',
			success: function(response){
					if(/fun_cedula/.test(response))
						{
							
							alert("EXISTE UN FUNCIONARIO REGISTRADO CON LA CÉDULA ESPECIFICADA");
					        $("#txtCedula").addClass('alert-danger');
							funcionModificarTamañoVentana();
					    }
					if(/fun_numpuesto/.test(response))
						{
						
							 alert("EXISTE UN FUNCIONARIO REGISTRADO CON ESE NÚMERO DE PUESTO");
					        $("#txtNPuesto").addClass('alert-danger');
							funcionModificarTamañoVentana();
						}

				if(response=="...")
				 { 
					alert("LISTO");
				 }
			},
			error:function(response)
		  	{
				alert("ERRO COD:"+response);
		  	}
		});
		
		//------------------------//
		}else{
		alert("CAMPOS NO VÁLIDOS");
		}
	}
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
		 var parametros = {"pID":idSeleccionado}; // '{"pID:0"}'	
		 
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
				alert("ERROR AL CARGAR CONTACTOS");
		  	}		
		});	
	}
	//GUARDA UN CONTACTO NUEVO
	function AgregarContacto()
	{	
	camposContacto=false;
	verificarCamposInfoAdi($("#txtConta"),1);
		if(camposContacto==false){
		var parametros={
			  "pID":idSeleccionado,
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
		  });}//fin if
		  else{
			  alert("FALTA CAMPO IMPORTANTE")
			  }
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
	}
	
	function GuardarCambiosDeContacto()
	{		
		var idContactoConsultado=document.getElementById("tLisContactos").rows[ContConsu-1].cells[6].innerText;
		camposContacto=false;
	verificarCamposInfoAdi($("#txtConta"),1);
		if(camposContacto==false){
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
		  });}//fin if
		  else{
			  alert("FALTA CAMPO IMPORTANTE");
			  }	
	}
	///////////////////////////////////////
	
	
	
	/////////////HISTORIAL ACADEMICO
	
	//CONSULTA PARA PODER MODIFICAR
	var FilaHacAcaConsu=0;//fila
	var IdHacAcaCons=0;
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
		  var parametros = {"pID":idSeleccionado}; // '{"pID:0"}'	
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
				alert("ERROR AL CARGAR EL HISTORIAL");
		  	}		
		});	
	}
	
	//AGREGA UN NUEVO REGISTRO DE HISTORIAL ACADEMICO
	function AgregarHistAcad(){	
	
			camposHistAca=false;
		verificarCamposInfoAdi($("#txtNivelAcade"),2);
		if(camposHistAca==false){
		  var parametros={
			  "pID":idSeleccionado,
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
		  });	}//fin if
		  else
		  {alert("FALTA CAMPO IMPORTANTE");
			  }				
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
	}
	
	function GuardarCambiosDeHistAcad()
	{
		camposHistAca=false;
		verificarCamposInfoAdi($("#txtNivelAcade"),2);
		if(camposHistAca==false){
		
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
		  });}//fin if
		  else{alert("FALTA CAMPO IMPORTANTE");}
	}
	///////////////////////////////////////
	
	
	
	/////////////HISTORIAL LABORAL	
	
    var idHacLabConsu =0;	
	var fiHacLabConsu =0;
	//LLENA LA LISTA CON LOS HISTORICOS DE LA BD
	function CargarHistorialLaboral()
	{
		  var parametros = {"pID":idSeleccionado}; // '{"pID:0"}'	
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
				alert("ERROR AL CARGAR EL HISTORIAL LABORAL");
		  	}		
		});	
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
		if(camposLab==false){			
		  var parametros={
			  "pID":idSeleccionado,
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
		  });}else{alert("FALTA CAMPO IMPORTANTE");}						
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
						CargarHistorialAcademico();
					  }else
					  {
						alert("ERROR AL AGREGAR");  
					   }
				  }
			  });	
	}	
	function GuardarUnHistLabo()
	{
		camposLab=false;
		verificarCamposInfoAdi($("#txtEmprHistoLabo"),3);
		if(camposLab==false){
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
		  });}//---fin if
		  else{alert("FALTA CAMPO IMPORTANTE");}
		  
	}
	
	//------------------------------------------Subir Imagen al servidor------------------------

function SubirImagen(){
		if(idSeleccionado!=0){	
		  var archivos = document.getElementById("files");
		  var archivo = archivos.files; 
		
		  var data = new FormData();
			data.append("archivo1",archivo[0]);
		 
		  data.append("name",$("#txtCedula").val());
		
		  $.ajax({	
			url:'php/Funcionarios/subir1.php', //Url a donde la enviaremos
			type:'POST', //Metodo que usaremos
			contentType:false, //Debe estar en false para que pase el objeto sin procesar
			data:data, //Le pasamos el objeto que creamos con los archivos
			processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
			cache:false //Para que el formulario no guarde cache
		  }).done(function(msg){
			alert("CORRECTO"); //Mostrara los archivos cargados en el div con el id "Cargados"
		  });
		}else
		{
			alert("PRIMERO, SELECCIONE UNA IMAGEN Y GUARDE LOS DATOS PERSONALES")
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
	
	
function AgregarLineaDeTexto(TextoLinea,id,tipo) {
	  
		var d= '<p id="'+id+'" class="help-block text-center '+tipo+'">'+TextoLinea+'</p>';
       $("#dMensajes").append(d);
	   
    }
function ValidarTextBox(aux){
	camposFP=false;
	verificarCamposGlobal($("#frmP1"));
	verificarCamposGlobal($("#frmP2"));
		if($("#txtFecIng").css("border-color")=="rgb(255, 0, 0)")
							{
										camposFP=true;
							}
		if($("#txtFecNac").css("border-color")=="rgb(255, 0, 0)")
							{
										camposFP=true;
							}					
						
	}
	//-------------------------------------------
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
	//-------------------------------------
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