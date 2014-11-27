<?php

//RESTABLECER LA CONTRASER LA CONTRASEÑA DE UN USUARIO

if(isset($_POST['id']) && isset($_POST['fechaNac']))
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
				usu_contra='".$_POST['fechaNac']."',
				usu_estadoContra='Defecto'
			where
				fun_id=".$_POST['id'].";
		";
		
		if($resultado=mysqli_query($conexion,$consulta))
		{
			echo "SE HA REESTABLECIDO LA CONTRASEÑA CON ÉXITO...";
		}
		else
		{
			echo "NO SE HA REESTABLECIDO LA CONTRASEÑA...".mysqli_connect_error()."";
		}
		
	}
	//cerrar la conexion
	mysqli_close($conexion);
}
?>