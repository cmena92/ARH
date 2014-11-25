<?php

if(isset($_POST['pID']) && isset($_POST['pFecIngr']) && 
   isset($_POST['pFecSali']) && isset($_POST['pEmpresa']) && 
   isset($_POST['pDescrip']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$consulta="UPDATE  rh_hilab
			SET					
				hla_fecfin='".$_POST['pFecSali']."',
				hla_fecini='".$_POST['pFecIngr']."',
				hla_institucion='".$_POST['pEmpresa']."',
				hla_observac='".$_POST['pDescrip']."'			
			WHERE
				hla_id='".$_POST['pID']."';
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