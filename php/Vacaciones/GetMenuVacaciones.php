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
					<div class='thumbnail'>
						<img src='img/imagenes del sitio/normal.png' alt='300x200' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
						  <a href='vacaciones/solicitudNormal.html' onclick='funcionModificarTamañoVentana();'>SOLICITUD NORMAL</a>												
						</div>
				  </div>
				</div>
				<div class='col-md-2'>
					<div class='thumbnail'>
						<img src='img/imagenes del sitio/calendario.ico' alt='300x200' >
						<div class='caption'>
							<a href='vacaciones/EtiquetarDias.html'>ASUETOS Y FERIADOS</a>							
						</div>
				  </div>
				</div>
				<div class='col-md-2'>
					<div class='thumbnail'>
						<img alt='300x200' src='img/imagenes del sitio/incapacidad.png' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
							<a>INCAPACIDADES (Pendiente)</a>							
					  </div>
				  </div>
				</div>
				<div class='col-md-2'>
					<div class='thumbnail'>
						<img alt='300x200' src='img/imagenes del sitio/adelantadas.ico' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>
							<a>VACACIONES ADELANTADAS (Pendiente)</a>							
					  </div>
				  </div>
				</div>				
				<div class='col-md-2'>
					<div class='thumbnail'>
						<img alt='300x200' src='img/imagenes del sitio/varios.png' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>
							<a>SOLICITUDES MULTIPLES (Pendiente / Opcional)</a>							
					  </div>
				  </div>
				</div>
				 <div class='col-md-2'>
					<div class='thumbnail'>
						<img alt='300x200' src='img/imagenes del sitio/historial0.png' style='max-width:128px !important; max-height:128px !important;'>
						<div class='caption'>
							<a href='vacaciones/periodos.html'>PERIODOS</a>							
					  </div>
				  </div>
				";
			}else
			{
			echo "
				<div class='col-md-2 '> 
					<div class='thumbnail'>
						<img src='img/imagenes del sitio/normal.png' alt='300x200' style='max-width:128px !important; max-height:128px !important;' >
						<div class='caption'>
						  <a href='vacaciones/solicitudNormal.html' onclick='funcionModificarTamañoVentana();'>SOLICITUD NORMAL</a>												
						</div>
				  </div>
				</div>
				";
			}
					
		}			 
		
		mysqli_close($conexion);
	}
?>