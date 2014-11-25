<?php


//INGRESAR LOS DATOS PERSONALES DE UN FUNCIONARIO
if(isset($_POST['pNombre']) && isset($_POST['pApelli']) && isset($_POST['pSeApel']) && isset($_POST['pCedula']) && isset($_POST['pNacion']) &&
   isset($_POST['pFoto']) && isset($_POST['pGenero']) && isset($_POST['pEstaCi']) && isset($_POST['pFecNac']))
{	
	$conexion=mysqli_connect("localhost","root","","bd_arh");		
	//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{	
		$consulta="insert into rh_funcionario
			(
				fun_id,
				fun_nombre,
				fun_papellido,
				fun_sapellido,
				fun_cedula,
				fun_nacionalidad,
				fun_sexo,
				fun_estadocivil,
				fun_fechanac,
				fun_foto
			)
			values
			(
			NULL,
			'".$_POST['pNombre']."',
			'".$_POST['pApelli']."',
			'".$_POST['pSeApel']."',
			'".$_POST['pCedula']."',
			'".$_POST['pNacion']."',
			'".$_POST['pGenero']."',
			'".$_POST['pEstaCi']."',
			'".$_POST['pFecNac']."',
			'".$_POST['pFoto']."'
			);
						
		";
		
		
		
	if($resultado=mysqli_query($conexion,$consulta))//INGRESAR DATOS PERSONALES
		{ 
			if ($ResultadoID=mysqli_query($conexion,"
			SELECT rh_funcionario.fun_id 
			FROM rh_funcionario 
			WHERE rh_funcionario.fun_cedula = '".$_POST['pCedula']."'; "))
			{				
			  if($ResultadoID->num_rows!=0)
			  {
				  $row=$ResultadoID->fetch_assoc();
				  
				  //Agrego un usuario asignado a este funcionario
				  		$consulta="insert into rh_usuarios
							(
								`usa_id` ,
								`usu_nombre` ,
								`usu_contra` ,
								`fun_id` ,
								`usu_permisos`,
								`usu_estadoContra`
							)
							values
							(
							NULL,
							'".$_POST['pNombre']."',
							'".$_POST['pFecNac']."',
							'".$row['fun_id']."',
							'F',
							'Defecto'
							);										
						";
					  if($resultado=mysqli_query($conexion,$consulta))//INGRESAR DATOS PERSONALES
					  { 
						 $salida ="".$row['fun_id']."";
					  }	else
					  {
						$salida=-1;  
					   }			 		  
			  }
			  else
			  {
				  $salida=-1;//"ERROR AL OPTENER EL ID DEL FUNCIONARIO RECIEN INGRESADO";
			  }
			}
			echo $salida;	
		}		
		else
		{
		 $error_code = mysqli_errno($conexion);	
		 
		if($error_code==1062)
			echo mysqli_error($conexion);
		else
			echo -2;//"NO SE INGRESO EL FUNCIONARIO DE FORMA CORRECTA";
		
		exit;
		}	
	}
	//cerrar la conexion
	mysqli_close($conexion);
}
?>