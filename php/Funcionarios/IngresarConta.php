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
		$consulta="INSERT INTO  rh_contacto
			(
				con_id,
				fun_id,
				con_tipo,
				con_entorno,
				con_dato,
				con_descrip
			)
			VALUES
			(
				NULL,
				'".$_POST['pID']."',
				'".$_POST['pTipo']."',
				'".$_POST['pEnto']."',
				'".$_POST['pDato']."',
				'".$_POST['pDesc']."'
			)			
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