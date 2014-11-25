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
		DELETE FROM `bd_arh`.`rh_funcionario`		
		WHERE `rh_funcionario`.`fun_id` = '".$_POST['pID']."';	
		";		
		
		if($resultado=mysqli_query($conexion,$consulta))
		{
			echo "Bien";//exito
		}
		else
		{
			$error_code = mysqli_errno($conexion);	
			echo "El Funcionario Puede Tener Mas Datos Asociados (Contactos, Historiales, ect), CodError: ".$error_code." Descripcion :".mysqli_error($conexion);//fallo
		}		
	}
	//cerrar la conexion
	mysqli_close($conexion);
}else{
	echo "Error de parametros E0012";
	}
?>