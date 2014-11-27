<?php

if(isset($_POST['pID']) && isset($_POST['pNivel']) && 
   isset($_POST['pObser']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$consulta="UPDATE  rh_hisaca
			SET	
				hac_nivel='".$_POST['pNivel']."',
				hac_observ='".$_POST['pObser']."'			
			WHERE
				hac_id='".$_POST['pID']."';
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
}else{echo "error al cargar parametros";}
?>