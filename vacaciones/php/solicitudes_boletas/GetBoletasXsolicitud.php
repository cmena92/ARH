<?php
	include_once("../clases.php");
	include_once("../bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	class Respuesta{	
		public $Boletas = array();
		public $CabezBoletas="";
		public $ListaBoletas="";//filas en html 
		public $Codigo;// Para responder errores y notificaciones
	
		}
	$Respuesta=new Respuesta();
	
	$obj=json_decode($_POST["Parametros"]);
			
		if($conexion->Conectar())
		{				
			$Fila=0;							
			$Resul= array();
			if($obj->{'pRol'}=="F")
			{	
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
			}else{
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
            $Respuesta->CabezBoletas.="</tbody>";						
											
			$Consulta="			
					SELECT 
						vrh_boleta.*
				FROM 
						vrh_boleta 
				WHERE 
						vrh_boleta.rep_idSolicitud=".$obj->{'pIdSol'}.";		
			";	
								
			if($listBoletas=mysqli_query($conexion->conect,$Consulta))
			{
				if($listBoletas->num_rows!=0)
				{
					$FilaBoletas=0;
					while($row=$listBoletas->fetch_assoc())
					{								
													
						$Respuesta->ListaBoletas.="
							<tr>
							   <td id='Boleta".$FilaBoletas."'  class=''><a class='btn btn-default' onClick='idBoleConsu=".$row['rep_id']." ImprimirBoleta(".$FilaBoletas.");'>IMPRIMIR</a></td>
								<td><a class='btn btn-danger' onClick='idBoletaConsultada=".$obj->{'pIdSol'}."; EliminarBoleta(".$FilaBoletas.");'>ELIMINAR</a></td>
								<td>".$row['rep_fechaReporte']."</td>
								<td>".$row['rep_fecRegreso']."</td>
								<td name='dg'>".$row['rep_solicitado']."</td>
							</tr>
						";							
						$newBolet=new Boleta();
						$newBolet->idBoleta=$row['rep_id'];
						$newBolet->FecRegre=$row['rep_fecRegreso'];
						$newBolet->FecRigeA=$row['rep_dereDisfutar'];//rep_fecRige
						$newBolet->FecVence=$row['rep_fecVence'];
						$newBolet->Estado=$row['rep_estado'];
						
						array_push($Respuesta->Boletas,$newBolet);
						$FilaBoletas+=1;													
					}
				}
				else
				{
					$Respuesta->Codigo="001, No hay boletas para esta solicitud";
					$Respuesta->ListaBoletas="No hay boletas para esta solicitud";					
				}										
			}
			else
			{ 
				$Respuesta->Codigo="";
			}					
		}
		else{ 
			$error=mysqli_error($conexion);
			$Respuesta->Codigo= "003, error en la consulta !!! ,".$error;		
			}
		
		
		echo json_encode($Respuesta); 
		$conexion->CerrarConexion();		
?>

