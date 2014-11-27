	
	
	
function supports_html5_storage() {
		  try {
			return 'localStorage' in window && window['localStorage'] !== null;
		  } catch (e) {
			return false;
		  }
		}
		
	function CerrarSecion(){ //Cambio
		if (supports_html5_storage() )
		{
			var borrar="...";
			window.localStorage.setItem('usuarioARH', borrar);
		}					
		//modificar los link de menu de login
		$("#aIngres").removeClass("collapse");
		$("#aCuenta").addClass("collapse");
		$("#aCerrar").addClass("collapse");
		$("#aNotifi").addClass("collapse");			
	}
	
	function validar(){	
		
		var datosUsuario = $("#txtUsuario").val()
		var datosContra = $("#txtCotrase").val()	
		
		var parametros = '{"usu_nombre":"'+datosUsuario+'","usu_contra":"'+datosContra+'"}'; // '{"pID:0"}'	
		
		$.ajax({
			async:true,
			type: 'POST',
			data: "Parametros="+parametros,	
			url: 'php/Acceso/Acceso.php',
			dataType:'json',
			beforeSend: function(){
				$("#txtMensaje").html("PROCESANDO LA AUTENTICACION");
			},
			success: function(response){				
				var nom=response;	
                var cadena=nom[0].Cedula+","+nom[0].PrApellido+","+nom[0].IdFunc+","+nom[0].NombreUsuario+","+nom[0].ContraUsuario+","+nom[0].ListaDeAcceso+","+nom[0].Permisos+","+nom[0].EstadoContra;		
				//cedula,apellido,idFunc,NombreUsua,ContrUsuar,ListaAcce,Permisos,EstadoContra 
				//0     ,1       ,2     ,3         ,4         ,5		,6	     ,7
								
				if(nom[0].ListaDeAcceso!="...")
				{		
					if (supports_html5_storage() )
					{
						window.localStorage.setItem('usuarioARH', cadena);
					}
					$("#nav").empty();
					$("#nav").html(nom[0].ListaDeAcceso);	
					
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
					
					if(nom[0].IdFunc!=0){//alguien si ingreso
						//modificar los link de menu de login //Cambio
						$("#aIngres").addClass("collapse");
						$("#aCuenta").removeClass("collapse");
						$("#aCerrar").removeClass("collapse");
						$("#aNotifi").removeClass("collapse");
						if(nom[0].EstadoContra=="Defecto")
							$("#txtMensaje").html("LISTO!! : <p class='text-danger' >ARH recomienda que cambie la contrasena. </p> <h3>"+ nom[0].NombreUsuario+" "+nom[0].PrApellido+"</h3> "+"<p style='text-right !important;'> PODES REALIZAR DIFERENTES TRANSACCIONES, VISITE LA AYUDA PARA MAS INFORMACION.</p>" );//VM
						else 
							$("#txtMensaje").html("LISTO!! : <h3>"+ nom[0].NombreUsuario+" "+nom[0].PrApellido+"</h3> "+"<p style='text-right !important;'> PODES REALIZAR DIFERENTES TRANSACCIONES, VISITE LA AYUDA PARA MAS INFORMACION.</p>" );//VM
						
						$("#txtMensaje").addClass("text-success");
						$("#txtMensajeAyudaRestablecer").addClass("collapse");	
					}
					
				}else
				{
					$("#txtMensaje").html("ACCESO DENEGADO, VERIFIQUE LOS DATOS DE USUARIO Y CONTRASENA");//VM
					$("#txtMensaje").addClass("text-warning");
					$("#txtMensajeAyudaRestablecer").removeClass("collapse");					
				}
				},
			error: function(response){
					$("#txtMensaje").html("ERROR AL EJECUTAR LA SENTENCIA EN EL SERVIDOR, DOC-01.PHP");//VM
			}
			});	
		
	}	    
	
function CambiarContrase(){	
	var usuarioActual;
	if($("#txtCotraseCambio").val()==$("#txtCotraseConfir").val()){
		
		if (supports_html5_storage() )
		{						
			us=window.localStorage.getItem('usuarioARH');
			usuarioActual=us.split(",");
		}
		else
		{
			alert("ESTE EXPLORADOR NO PERMITE GUARDAR DATOS LOCALES, GOOGLE CHROME SI LO SOPORTA");//mv
		}	
		
		var parametros={
			    "pID":usuarioActual[2],
				"pContra":$("#txtCotraseCambio").val()
		};
		
		$.ajax({
			data: parametros,
			url: 'php/Acceso/CambiarContrase.php',
			type: 'POST',
			success: function(response){
				if(response=="...")
				{ 					
					$("#mensajeCambiarContra").html("LISTO!! : <h3>"+ usuarioActual[3]+" "+usuarioActual[1]+"</h3> "+"<p style='text-right !important;'> HAS CAMBIADO TU CONTRASENA CORRECTAMENTE.</p>" );
					$("#mensajeCambiarContra").addClass("text-success");
					$("#mensajeCambiarContra").removeClass("text-danger");
				}
			},
			error:function(response)
		  	{
				$("#mensajeCambiarContra").html(response);
				$("#mensajeCambiarContra").addClass("text-danger");
				$("#mensajeCambiarContra").removeClass("text-success");
		  	}
		});
	}else
	{
		$("#mensajeCambiarContra").html("ERROR!! : <p> CONTRASENAS DIFERENTES.</p>" );//VM
		$("#mensajeCambiarContra").addClass("text-danger");
		$("#mensajeCambiarContra").removeClass("text-success");
	}
	
}
	
	