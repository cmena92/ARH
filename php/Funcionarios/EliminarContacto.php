<?php
			  		  
if(isset($_POST['pID']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$consulta="
		DELETE FROM `bd_arh`.`rh_contacto`
		
		WHERE `rh_contacto`.`con_id` = '".$_POST['pID']."';				
		";
		if($resultado=mysqli_query($conexion,$consulta))
		{
			echo "...";//exito
		}
		else
		{
			echo "!!!";//fallo
		}		
	}
	//cerrar la conexion
	mysqli_close($conexion);
}
?>