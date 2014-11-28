<?php
	include_once("../bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	class Respuesta{
		public $CodigoRespuesta;
		public $Borrar;
	}
		
	$Respuesta=new Respuesta();	
	$obj=json_decode($_POST["Parametros"]);			
	if($conexion->Conectar())
	{	
		$Consulta;
		if($obj->{'pTipo'}=="SOLICITUD"){
			$Consulta ="DELETE FROM `bd_arh`.`vrh_solicitud` WHERE `vrh_solicitud`.`sol_id` = ".$obj->{'pId'}.";";			
		}
		if($obj->{'pTipo'}=="BOLETA"){
			$Consulta ="DELETE FROM `bd_arh`.`vrh_boleta` WHERE vrh_boleta.rep_id = ".$obj->{'pId'}.";";	
			$Respuesta->CodigoRespuesta.="/".$Consulta."/";
		}
		
		if ($resultado=mysqli_query($conexion->conect,$Consulta))
		{				  
			$Respuesta->CodigoRespuesta.="Code:000";
			
			$error_code = mysqli_errno($conexion->conect);	
			$Respuesta->CodigoRespuesta.=",Error:".$error_code;	 
				  
			echo json_encode($Respuesta); 
				  
		}
		else
		{ 
			$error=mysqli_error($conexion);
			$Respuesta->CodigoRespuesta="001 / ".$error;	
			echo json_encode($Respuesta); 	
		}
	}
	$conexion->CerrarConexion();
		
?>

