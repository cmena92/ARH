<?php
	include_once("../clases.php");
	include_once("../bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	class Respuesta{	
		public $CodigoRespuesta;	  //Codigo de salida_ Para errores y salida de errores	
		public $Solicitudes = array();//Lista de objetos de tipo solicitud
		public $ListaSolicitudes;	  //Filas de la tabla en html 
	}
		
	$Respuesta=new Respuesta();	
	$obj=json_decode($_POST["Parametros"]);
		if($conexion->Conectar())
		{	
			$Consulta ="
			SELECT 
					vrh_solicitud.*
			FROM 
					vrh_solicitud 
			WHERE 
					vrh_solicitud.fun_id='".$obj->{'pIdFunc'}."' ORDER BY  `vrh_solicitud`.`sol_fecFin` DESC   ;		
			";	
			
			if ($resultado=mysqli_query($conexion->conect,$Consulta))
			{				  
				if($resultado->num_rows!=0)
				{					
					$Fila=0;							
					while($row=$resultado->fetch_assoc())
					{	
						$NewSolicitud=new Solicitud();													
						$Respuesta->ListaSolicitudes.="
							<tr>  
								<td><a class='btn btn-default' onClick='FilaCons=".$Fila."; idSolicitudConsultada=".$row['sol_id']."; SeleccionarSolicitud(".$row['sol_id'].");'>CONSULTAR</a></td>
								<td>".$row['sol_fecIni']."</td>
								<td>".$row['sol_fecFin']."</td>
								<td name='ds'>".$row['sol_cantDias']."</td>
								<td class='hidden'>".$row['fun_id']."</td>
							</tr>
						";
						$NewSolicitud->idSol=$row['sol_id'];
						$NewSolicitud->Fechaini=$row['sol_fecIni'];
						$NewSolicitud->FechaFin=$row['sol_fecFin'];
						$NewSolicitud->Descripc=$row['sol_descripcion'];
						$NewSolicitud->CantDias=$row['sol_cantDias'];
						$NewSolicitud->funId=$row['fun_id'];
							
						$rowcount=0;
						if($result=mysqli_query($conexion->conect,"SELECT vrh_boleta.* FROM  `vrh_boleta` WHERE  `vrh_boleta`.`rep_idSolicitud` =".$row['sol_id'].";"))
						$NewSolicitud->CantBoletas=mysqli_num_rows($result);						
						
						$NewSolicitud->FichaTecnica="						 
							 <table>
								<tr><td>Fecha Inicio :</td><td>".$row['sol_fecIni']."</td></tr>
								<tr><td>Fecha Fin :</td><td>".$row['sol_fecFin']."</td></tr>
								<tr><td>Descripcion :</td><td>".$row['sol_descripcion']."</td></tr>
								<tr><td>Cantidad de Dias :</td><td>".$row['sol_cantDias']."</td></tr>  
								<tr><td>Cantidad de Boletas :</td><td>".$NewSolicitud->CantBoletas."</td></tr>                        
							</table>
						";
						
						array_push($Respuesta->Solicitudes,$NewSolicitud);
						$Fila++;				
					}
				}
				else
				{ 
					$Respuesta->CodigoRespuesta="001, No hay solicitudes para este funcionario";
					$Respuesta->ListaSolicitudes="No hay solicitudes para este funcionario";
				}					
			}
			else
			{ 
				$error=mysqli_error($conexion);
				$Respuesta->CodigoRespuesta= "003, Error en la consulta !!! ,".$error;		
			}
		}
		else{
				$Respuesta->CodigoRespuesta="002, No hay coneccion con el servidor de BD";
			}
		echo json_encode($Respuesta);
		$conexion->CerrarConexion();
		
?>

