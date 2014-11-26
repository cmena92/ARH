<?php
	if(isset($_POST['Permiso']))
	{	
		$conexion=mysqli_connect("localhost","root","","bd_arh");	
		if(mysqli_connect_errno())
		{
			echo "Error al conectar con la BD. ".mysqli_connect_error();
		}
		else
		{				
			if($_POST['Permiso']=="R"){
				echo "
				<div class='col-md-2 '> 
					<div class='thumbnail text-center'>
						<a href='vacaciones/solicitudNormal.html' onclick='funcionModificarTamañoVentana();'>
                        <img src='img/imagenes del sitio/cocktail.png' alt='300x200' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
						  SOLICITUD NORMAL</a>												
						</div>
				  </div>
				</div>				
				<div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a href='vacaciones/historialSolicitudes.html'>
                        <img alt='300x200' src='img/imagenes del sitio/varios.png' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>							
							HISTORICO DE SOLICITUDES</a>							
					  </div>
				  </div>
				</div>
				<div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a  href='vacaciones/EtiquetarDias.html'>
                        <img src='img/imagenes del sitio/calendario.ico' alt='300x200' >
						<div class='caption'>
							ASUETOS Y FERIADOS</a>							
						</div>
				  </div>
				</div>
                
				 <div class='col-md-2'>
					<div class='thumbnail text-center'>
                    <a href='vacaciones/periodos.html'>
						<img alt='300x200' src='img/imagenes del sitio/historial0.png' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>
							PERIODOS</a>							
					  </div>
				  </div>
				</div>
                
                  <div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a >
                        <img alt='300x200' src='img/imagenes del sitio/adelantadas.ico' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>
							VACACIONES ADELANTADAS (Pendiente)</a>							
					  </div>
				  </div>
                  </div>
                  
				<div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a>
                        <img alt='300x200' src='img/imagenes del sitio/incapacidad.png' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
							INCAPACIDADES (Pendiente)</a>							
					  </div>
				  </div>
				</div>
				";
			}else
			{
			echo "
				<div class='col-md-2 '> 
					<div class='thumbnail text-center'>
						<a href='vacaciones/solicitudNormal.html' onclick='funcionModificarTamañoVentana();'>
                        <img src='img/imagenes del sitio/cocktail.png' alt='300x200' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
						  SOLICITUD NORMAL</a>												
						</div>
				  </div>
				</div>				
				<div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a href='vacaciones/historialSolicitudes.html'>
                        <img alt='300x200' src='img/imagenes del sitio/varios.png' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>							
							HISTORICO DE SOLICITUDES</a>							
					  </div>
				  </div>
				</div>
				<div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a  href='vacaciones/EtiquetarDias.html'>
                        <img src='img/imagenes del sitio/calendario.ico' alt='300x200' >
						<div class='caption'>
							ASUETOS Y FERIADOS</a>							
						</div>
				  </div>
				</div>
				<div class='col-md-2'>
					<div class='thumbnail text-center'>
						<a>
                        <img alt='300x200' src='img/imagenes del sitio/incapacidad.png' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
							INCAPACIDADES (Pendiente)</a>							
					  </div>
				  </div>
				</div>
				";
			}
					
		}			 
		
		mysqli_close($conexion);
	}
?>