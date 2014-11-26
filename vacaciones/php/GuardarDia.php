<?php  
	date_default_timezone_set(date_default_timezone_get());
	include_once("bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	//INGRESAR LOS DATOS PERSONALES DE UN FUNCIONARIO
	if(isset($_POST['pFecha']) && isset($_POST['pTipo']) && isset($_POST['pDescripcion']))
	{	
		//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
		if($conexion->Conectar())
		{	
			$consulta="insert into vrh_dia
				(
					dia_id,
					dia_fecha,
					dia_tipo,
					dia_descripcion
				)
				values
				(
				NULL,
				'".$_POST['pFecha']."',
				'".$_POST['pTipo']."',
				'".$_POST['pDescripcion']."'
				);
			";			
						
		if($resultado=mysqli_query($conexion->conect,$consulta))//INGRESAR DATOS PERSONALES
			{ 
				if ($ResultadoID=mysqli_query($conexion->conect,"SELECT vrh_dia.dia_id FROM vrh_dia WHERE vrh_dia.dia_Fecha = '".date('Y-m-d',strtotime($_POST['pFecha']))."' AND vrh_dia.dia_Descripcion = '".$_POST['pDescripcion']."' AND vrh_dia.dia_tipo = '".$_POST['pTipo']."'  order by vrh_dia.dia_id desc limit 1; "))
				{				
				  if($ResultadoID->num_rows!=0)
				  {
					  $row=$ResultadoID->fetch_assoc();
					  $salida ="".$row['dia_id']."";				  
				  }
				  else
				  {
					  $salida="Error al obtener ultimo registro";//"ERROR AL OPTENER EL ID DEL FUNCIONARIO RECIEN INGRESADO";
				  }
				}
				echo $salida;	
			}		
			else
			{
			 
				echo "Error al ingresar la fecha";
			
				exit;
			}	
		}	
		$conexion->CerrarConexion();	
	}else echo "Error de parametros"

?>