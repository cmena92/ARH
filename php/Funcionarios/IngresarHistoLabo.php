<?php

//INGRESAR LOS DATOS PERSONALES DE UN FUNCIONARIO 		  
if(isset($_POST['pID']) && isset($_POST['pFecIngr']) && 
   isset($_POST['pFecSali']) && isset($_POST['pEmpresa']) && 
   isset($_POST['pDescrip']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$consulta="INSERT INTO rh_hilab
			(
				fun_id,
				hla_fecfin,
				hla_fecini,
				hla_id,
				hla_institucion,
				hla_observac
			)
			values
			(
			'".$_POST['pID']."',
			'".$_POST['pFecIngr']."',
			'".$_POST['pFecSali']."',
			NULL,
			'".$_POST['pEmpresa']."',
			'".$_POST['pDescrip']."'
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
?>