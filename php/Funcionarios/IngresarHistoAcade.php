<?php

//INGRESAR LOS DATOS PERSONALES DE UN FUNCIONARIO 	

			 // "pID":idUsActual,
			 // "pNivel":$("#txtNivelAcade").val(), 
			 // "pObser":$("#txtObserAcade").val()
			  
	  
if(isset($_POST['pID']) && isset($_POST['pNivel']) && 
   isset($_POST['pObser']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$consulta="INSERT INTO rh_hisaca
			(
				fun_id,
				hac_id,
				hac_nivel,
				hac_observ
			)
			values
			(
			'".$_POST['pID']."',
			NULL,
			'".$_POST['pNivel']."',
			'".$_POST['pObser']."'
			);
		";
		
		if($resultado=mysqli_query($conexion,$consulta))
		{
			echo "...";
		}
		else
		{
			echo "Error: LOS DATOS NO SE HAN PODIDO INGRESAR...".mysqli_connect_error()."";
		}
		
	}
	//cerrar la conexion
	mysqli_close($conexion);
}