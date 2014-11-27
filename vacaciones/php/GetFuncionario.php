<?php
	include_once("bd/phpClassConexion.php");	
	$conexion=new DBManager();
		
	if(isset($_POST['pId']))
	{
		if($conexion->Conectar())
		{		
			$Consulta ="
			SELECT 
					rh_funcionario.*
			FROM 
					rh_funcionario 
			WHERE 
					fun_id='".$_POST['pId']."';		
			";	
			
			if ($resultado=mysqli_query($conexion->conect,$Consulta))
			{			  
				if($resultado->num_rows!=0)
				{
					$row=$resultado->fetch_assoc();
					
					$Salida="
						<div class='col-md-2'>
						<img id='imgFuncConsu' class='img-circle' alt='140px x 110px' src='../img/fotos/".$row['fun_cedula'].".jpg' style='width:140px !important; height:140px !important;'>
						<script>
						$('#imgFuncConsu').error(function(e) {
						 document.getElementById('imgFuncConsu').src='../img/fotos/default.jpg';   
						});
						</script>
					</div>
					<div class='col-md-3' id='divDatosFunc'  >
					  <p><strong>Cedula</strong> : ".$row['fun_cedula']." </p>
					  <p><strong>Nombre</strong> : ".$row['fun_nombre']." ".$row['fun_papellido']."</p>
					  <p><strong>Cargo</strong> : ".$row['fun_cargo']." </p>
					  <p><strong>Estado Civil</strong> : ".$row['fun_estadocivil']."</p>
					</div>	
					<div class='col-md-3' id='divDatosFunc'  >
					  <p><strong>Dependencia</strong> : ".$row['fun_dependencia']." </p>
					  <p><strong>Nacio</strong> : ".$row['fun_fechanac']."</p>
					  <p><strong>Ingresa el </strong> : ".$row['fun_fecingre']."  </p>
					  <p><strong>Num Puesto</strong> : ".$row['fun_numpuesto']." </p>
					</div>
					 <div class='col-md-4' id='divDatosFunc'  >
					  <p><strong>Presupuesto</strong>: ".$row['fun_propresupues']."</p>
					  <p><strong>Fondo</strong>: ".$row['fun_fondofinancia']."</p>
					  <p><strong>Clase </strong> : ".$row['fun_clase']." </p>
					  <p><strong>Especialidad</strong> : ".$row['fun_especialidad']." </p>
					</div>
					";
					/*
								$Funcion->SegApellido 	=$row['fun_sapellido'];
								$Funcion->Nacionalidad 	=$row['fun_nacionalidad'];
								$Funcion->Genero 		=$row['fun_sexo'];
								
								$Funcion->Nombramiento 	=$row['fun_nombramiento'];
								$Funcion->GrupoLaboral 	=$row['fun_gruplaboral'];
								$Funcion->Descripcion 	=$row['fun_descripcion'];
								$Funcion->Estado 	    =$row['fun_estado'];
								
								$Funcion->FechaIngreso 	=$row[''];
																*/			
					$Salida=utf8_decode($Salida);
					echo $Salida;
				}else
					{ 
					echo "no hay datos";
					}
			}
			else
			{ 
				$error=mysqli_error($conexion);
				echo "error en la consulta !!! ,".$error;		
			}
		}
		$conexion->CerrarConexion();
	}
	else			
		echo "error en parametroo";
				
?>

