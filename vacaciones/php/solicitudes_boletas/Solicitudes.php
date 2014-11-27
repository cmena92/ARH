<?php
	include_once("../bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	class Respuesta{
		public $CodigoRespuesta;
	}
		
	$Respuesta=new Respuesta();	
	$obj=json_decode($_POST["Parametros"]);			
	if($conexion->Conectar())
	{	
		$Consulta ="
		DELETE 
		FROM `bd_arh`.`vrh_solicitud` 
		WHERE `vrh_solicitud`.`sol_id` = ".$obj->{'pIdSol'}.";	
		";	
		
		if (mysqli_query($conexion->conect,$Consulta))
		{				  
			$Respuesta->CodigoRespuesta="000";
			echo json_encode($Respuesta); 
		}
		else
		{ 
			$error=mysqli_error($conexion);
			$Respuesta->CodigoRespuesta="000 / ".$error;	
			echo json_encode($Respuesta); 	
		}
	}
	$conexion->CerrarConexion();
		
?>

