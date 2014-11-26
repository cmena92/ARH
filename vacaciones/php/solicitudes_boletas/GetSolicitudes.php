<?php
	include_once("../clases.php");
	include_once("../bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	class Respuesta{	
		public $Boletas = array();
		public $ListaSolicitudes;
		public $BoletasPorSoli = array();
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
					$Resul= array();
					while($row=$resultado->fetch_assoc())
					{
						$Fila++;
						$Respuesta->ListaSolicitudes.="
							<tr>      
								<td id='solicitud".$Fila."'  class=''><a class='btn btn-default' onClick='idSolicitudConsultada=".$row['sol_id']."; SeleccionarSolicitud(".$Fila.");'>></a></td>
								<td>".$row['sol_fecIni']."</td>
								<td>".$row['sol_fecFin']."</td>
								<td name='ds'>".$row['sol_cantDias']."</td>
								<td class='hidden'>".$row['fun_id']."</td>
							</tr>
						";	
												
						$Consulta2="			
								SELECT 
										vrh_boleta.*
								FROM 
										vrh_boleta 
								WHERE 
										vrh_boleta.rep_idSolicitud=".$row['sol_id'].";		
								";	
								
						if ($listBoletas=mysqli_query($conexion->conect,$Consulta2))
						{
							$listaBoletasPorSol="";
							if($listBoletas->num_rows!=0)
							{
								$FilaBoletas=0;
								while($row2=$listBoletas->fetch_assoc())
								{
									$FilaBoletas+=1;									
									$listaBoletasPorSol.="
									<tr>      
										<td id='Boleta".$FilaBoletas."'  class=''><a class='btn btn-default' onClick='idBoleConsu=".$row2['rep_id']." ImprBolet(".$FilaBoletas.");'>Imprimir</a></td>
										<td>".$row2['rep_fechaReporte']."</td>
										<td>".$row2['rep_fecRegreso']."</td>
										<td name='dg'>".$row2['rep_solicitado']."</td>
									</tr>
									";														
								}
							}
							else
							{
								$listaBoletasPorSol="No hay boletas para esta solicitud";							
							}
								array_push($Respuesta->BoletasPorSoli,$listaBoletasPorSol);							
						}
											
					}
					
				}else
					{ 
						$Respuesta->ListaSolicitudes="No hay solicitudes para este funcionario";
					}
				echo json_encode($Respuesta); 
			}
			else
			{ 
				$error=mysqli_error($conexion);
				echo "error en la consulta !!! ,".$error;		
			}
		}
		$conexion->CerrarConexion();
		
?>

