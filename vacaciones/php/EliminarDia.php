<?php
			  		  
if(isset($_POST['pID']))
{	
	include_once("bd/phpClassConexion.php");
	$conexion= new DBManager();
	if($conexion->Conectar()==true)
	{		
		$consulta="
		DELETE FROM `bd_arh`.`vrh_dia`
		
		WHERE `vrh_dia`.`dia_id` = '".$_POST['pID']."';				
		";
		if($resultado=mysqli_query($conexion->conect,$consulta))
		{
			echo "...";//exito
		}
		else
		{
			echo "!!!";//fallo
		}		
	}
	$conexion->CerrarConexion();
}else
	echo "Error de parametros";
?>