<?php
	include_once("bd/phpClassConexion.php");
	$conexion=new DBManager();
	
	if(isset($_POST['pId'])){
		if($conexion->Conectar())
		{	
			$Salida="";
			$Consulta ="
			SELECT 
					vrh_periodo.*
			FROM 
					vrh_periodo 
			WHERE 
					vrh_periodo.fun_id='".$_POST['pId']."' AND vrh_periodo.per_estado='DISPONIBLE' ORDER BY  `vrh_periodo`.`per_fecIni` DESC ;		
			";	
			
			if ($resultado=mysqli_query($conexion->conect,$Consulta))
			{					
							  
				if($resultado->num_rows!=0)
				{
					$Fila=0;
					while($row=$resultado->fetch_assoc())
					{
						$Fila++;
						$Salida .="
							<tr>      
								<td id='periodo".$Fila."'  class='collapse'><a href='#btnPeriodo".$Fila."' id='btnPeriodo".$Fila."' class='btn btn-danger' onClick='AislarPeriodo(".$Fila.");'>Aislar</a></td>
								<td>".$row['per_fecIni']."</td>
								<td>".$row['per_fecFin']."</td>
								<td name='dd'>".$row['per_diasDispo']."</td>
								<td name='dg'>".$row['per_diasGozados']."</td>
								<td class='hidden'>".$row['per_estado']."</td>
								<td class='hidden'>".$row['per_extra']."</td>
							</tr>
						";						
					}
					echo $Salida;
				}else
					{ 
						echo "no hay periodos para este funcionario";
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
	{ 
		echo "error en parametro";
	}	
?>

