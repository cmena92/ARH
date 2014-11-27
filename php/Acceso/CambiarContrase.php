<?php

//RESTABLECER LA CONTRASER LA CONTRASEÑA DE UN USUARIO

if(isset($_POST['pID']) && isset($_POST['pContra']))
{
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{
		$consulta="update rh_usuarios
			set 
				usu_contra='".$_POST['pContra']."',
				usu_estadoContra='Defecto'
			where
				fun_id=".$_POST['pID'].";
		";
		
		if($resultado=mysqli_query($conexion,$consulta))
		{
			echo "...";
		}
		else
		{
			$error=mysqli_error($conexion);
			$Nerror=mysqli_erno($conexion);
			echo "!!!,".$error.",".$Nerror;
		}
		
	}
	//cerrar la conexion
	mysqli_close($conexion);
}
?>