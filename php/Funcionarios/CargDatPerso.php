<?php
	class Funcionario {
		 public $ID;
		 public $Cedula;
		 public $Nombre;
		 public $PriApellido;
		 public $SegApellido;
		 public $Nacionalidad;
		 public $Dependencia;
		 public $Genero;
		 public $EstadoCivil;
		 public $FechaNac;
		 public $Foto;
		 
		 public $Presupuesto;
		 public $FondoFinaci;
		 public $Nombramiento;
		 public $FechaIngreso;
		 public $NumeroPuesto;
		 public $Clase;
		 public $Especialidad;
		 public $GrupoLaboral;
		 public $Cargo;
		 public $Descripcion;	
		 public	$Estado;	
		 public	$TipoJornada;	 
		}
	
	$conexion=mysqli_connect("localhost","root","","bd_arh");
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{	
	    $obj=json_decode($_POST["datos"]);		
		$Consulta ="
		SELECT 
				rh_funcionario.fun_id, 
				rh_funcionario.fun_cedula, 
				rh_funcionario.fun_nombre, 
				rh_funcionario.fun_papellido, 
				rh_funcionario.fun_sapellido,
				rh_funcionario.fun_nacionalidad,
				rh_funcionario.fun_dependencia,
				rh_funcionario.fun_sexo,
				rh_funcionario.fun_estadocivil,
				rh_funcionario.fun_fechanac,
				rh_funcionario.fun_foto,
								
				rh_funcionario.fun_propresupues,
				rh_funcionario.fun_fondofinancia,
				rh_funcionario.fun_nombramiento,
				rh_funcionario.fun_fecingre,
				rh_funcionario.fun_numpuesto,
				rh_funcionario.fun_clase,
				rh_funcionario.fun_especialidad,
				rh_funcionario.fun_gruplaboral,
				rh_funcionario.fun_cargo,
				rh_funcionario.fun_descripcion,
				rh_funcionario.fun_estado,
				rh_funcionario.fun_tipJornada
		FROM 
				rh_funcionario 
		WHERE 
				fun_id='".$obj->{'pID'}."';		
		";	
		
		if ($resultado=mysqli_query($conexion,$Consulta))
		{					
			$Array_Resultado = array();	//<>				  
			if($resultado->num_rows!=0)
			{
				while($row=$resultado->fetch_assoc())
				{
			$Funcion= new Funcionario();      
							$Funcion->ID 			=$row['fun_id'];
							$Funcion->Cedula 		=$row['fun_cedula'];
							$Funcion->Nombre 		=$row['fun_nombre'];
							$Funcion->PriApellido 	=$row['fun_papellido'];
							$Funcion->SegApellido 	=$row['fun_sapellido'];
							$Funcion->Nacionalidad 	=$row['fun_nacionalidad'];
							$Funcion->Dependencia 	=$row['fun_dependencia'];
							$Funcion->Genero 		=$row['fun_sexo'];
							$Funcion->EstadoCivil 	=$row['fun_estadocivil'];
							$Funcion->FechaNac 		=$row['fun_fechanac'];
							$Funcion->Foto 			=$row['fun_foto'];
							
							$Funcion->Presupuesto 	=$row['fun_propresupues'];
							$Funcion->FondoFinaci 	=$row['fun_fondofinancia'];
							$Funcion->Nombramiento 	=$row['fun_nombramiento'];
							$Funcion->NumeroPuesto 	=$row['fun_numpuesto'];
							$Funcion->Clase 		=$row['fun_clase'];
							$Funcion->Especialidad 	=$row['fun_especialidad'];
							$Funcion->GrupoLaboral 	=$row['fun_gruplaboral'];
							$Funcion->Cargo 		=$row['fun_cargo'];
							$Funcion->Descripcion 	=$row['fun_descripcion'];
							$Funcion->Estado 	    =$row['fun_estado'];
							
							$Funcion->FechaIngreso 	=$row['fun_fecingre'];
							$Funcion->TipoJornada =$row['fun_tipJornada'];
																		
				array_push($Array_Resultado,$Funcion);//</>
				echo json_encode($Array_Resultado);
				}
				
			}
		}
	}
	mysqli_close($conexion);
?>

