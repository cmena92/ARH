<?php

if(isset($_POST['pID']) && isset($_POST['pTipo']) && isset($_POST['pEnto']) &&
   isset($_POST['pDato']) && isset($_POST['pDesc']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$consulta="UPDATE  rh_contacto
			SET	
				con_tipo='".$_POST['pTipo']."',
				con_entorno='".$_POST['pEnto']."',
				con_dato='".$_POST['pDato']."',
				con_descrip='".$_POST['pDesc']."'			
			WHERE
				con_id='".$_POST['pID']."';
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