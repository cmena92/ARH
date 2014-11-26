<?php
	include_once("../clases.php");
	include_once("../bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	class Respuesta{	
		public $CabezSolicitudes;
		public $CabezBoletas;
		public $ListaSolicitudes;
		public $Boletas = array();
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
					if($obj->{'pRol'}=="F")
									{									
									$Respuesta->CabezSolicitudes="
										<thead>
											<tr class='success'>
												<td>CONSULTAR</td>
												<td>DE</td><td>HASTA</td>
												<td>DIAS SOLICITADOS</td>
												<td></td>
											</tr>
										</thead>
										<tbody id='tbSolicitudesCuerpo'></tbody > 
												  <tfoot>
												  	<tr>
													  <td>TOTAL</td>
													  <td></td>
													  <td></td>
													  <td id='tdTotalSoli'  class='danger'>y</td>
													</tr>
												  </tfoot>                           
										";
									$Respuesta->CabezBoletas="
											<thead>
											<tr class='success'>
												<td>CONSULTAR</td>
												<td>ELIMINAR</td>
												<td>DE</td><td>HASTA</td>
												<td>DIAS SOLICITADOS</td>
												<td></td>
											</tr>
										</thead>
										<tbody id='tbSolicitudesCuerpo'></tbody > 
												  <tfoot>
												  	<tr>
													  <td>TOTAL</td>
													  <td></td>
													  <td></td>
													  <td id='tdTotalSoli'  class='danger'>y</td>
													</tr>
												  </tfoot> 
									";
									}
									else{									
									$Respuesta->CabezSolicitudes="
												<thead>
													  <tr class='success'>
													  <td>CONSULTAR</td>
													  <td>ELIMINAR</td>
													  <td>DE</td>
													  <td>HASTA</td>
													  <td>DIAS SOLICITADOS</td>
													  <td class='collapse'></td>
													</tr>
												</thead>
												<tbody id='tbSolicitudesCuerpo'>      
												
												<tbody > 
													<tr>
													  <td>TOTAL</td>
													  <td></td>
													  <td></td>
													  <td id='tdTotalSoli'  class='danger'>y</td>                                  
													</tr>                               
												</tfoot>                        
										";
									$Respuesta->CabezBoletas="
									 <thead>
												<tr class='success'>
												  <td>IMPRIMIR</td>
												  <td>ELIMINAR</td>
												  <td>SOLICITADA EL</td>
												  <td>DIA DE REGRESO</td>
												  <td>DIAS GOZADOS</td>
												</tr>
											</thead>
											<tbody id='tbCuerpoBoletas' >
											
											</tbody>
											<tfoot>
												<tr>
												  <td>TOTAL</td>
												  <td></td>
												  <td></td>
												  <td id='tdTotGosad'  class='danger'>y</td>                                  
												</tr>                               
											</tfoot>
									";
									}	
					
					while($row=$resultado->fetch_assoc())
					{
						$Fila++;
							if($obj->{'pRol'}=="F")
									{	
								$Respuesta->ListaSolicitudes.="
									<tr>      
										<td id='solicitud".$Fila."'><a class='btn btn-default' onClick='idSolicitudConsultada=".$row['sol_id']."; SeleccionarSolicitud(".$Fila.");'>CONSULTAR</a></td>
										<td>".$row['sol_fecIni']."</td>
										<td>".$row['sol_fecFin']."</td>
										<td name='ds'>".$row['sol_cantDias']."</td>
										<td class='hidden'>".$row['fun_id']."</td>
									</tr>
								";	
							}else
							{
								$Respuesta->ListaSolicitudes.="
									<tr>      
										<td id='solicitud".$Fila."'><a class='btn btn-default' onClick='idSolicitudConsultada=".$row['sol_id']."; SeleccionarSolicitud(".$Fila.");'>CONSULTAR</a></td>
										<td><a class='btn btn-default' onClick='idSolicitudConsultada=".$row['sol_id']."; EliminarSolicitud(".$Fila.");'>ELIMINAR</a></td>
										<td>".$row['sol_fecIni']."</td>
										<td>".$row['sol_fecFin']."</td>
										<td name='ds'>".$row['sol_cantDias']."</td>
										<td class='hidden'>".$row['fun_id']."</td>
									</tr>
								";	
							}
												
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
								$cabezaBoleta="";
								while($row2=$listBoletas->fetch_assoc())
								{
									$PermiElimi="";									
									if($obj->{'pRol'}=="F")
									{																			
										$listaBoletasPorSol.="
											<tr>      
												<td id='Boleta".$FilaBoletas."'  class=''><a class='btn btn-default' onClick='idBoleConsu=".$row2['rep_id']." ImprimirBoleta(".$FilaBoletas.");'>IMPRIMIR</a></td>
												<td>".$row2['rep_fechaReporte']."</td>
												<td>".$row2['rep_fecRegreso']."</td>
												<td name='dg'>".$row2['rep_solicitado']."</td>
											</tr>
											";	
									}									
									else
									{									
										$listaBoletasPorSol.="
											<tr>      
												<td id='Boleta".$FilaBoletas."'  class=''><a class='btn btn-default' onClick='idBoleConsu=".$row2['rep_id']." ImprimirBoleta(".$FilaBoletas.");'>IMPRIMIR</a></td>
												<td><a class='btn btn-default' onClick='idBoletaConsultada=".$row['sol_id']."; EliminarBoleta(".$FilaBoletas.");'>ELIMINAR</a></td>
												<td>".$row2['rep_fechaReporte']."</td>
												<td>".$row2['rep_fecRegreso']."</td>
												<td name='dg'>".$row2['rep_solicitado']."</td>
											</tr>
											";	
									}
									
									$FilaBoletas+=1;													
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
					
                           $Respuesta->ListaSolicitudes.="</tbody>";
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

