<?php 

if(isset($_POST['pID']))
{
	$conexion=mysqli_connect("localhost","root","","bd_arh");	
	if(mysqli_connect_errno())
	{
		echo "Error al conectar con la BD. ".mysqli_connect_error();
	}
	else
	{		
		$cont=0;
		$salida=""; 
		if ($resultado=mysqli_query($conexion,"SELECT * FROM `rh_hilab` WHERE rh_hilab.fun_id='".$_POST['pID']."'"))
		{
				if($resultado->num_rows!=0)
				{
					while($row=$resultado->fetch_assoc())
						{							
							$cont=$cont+1;					
							$salida .="							
								<tr>
									<td><a class='btn btn-default' onClick='this.focus(); idHacLabConsu=".$row['hla_id']."; fiHacLabConsu=".$cont."; ModificarHistoLab()'>Seleccionar</a></td>								
									<td>".$row['hla_fecini']."</td>  
									<td>".$row['hla_fecfin']."</td> 
									<td>".$row['hla_institucion']."</td> 
									<td>".$row['hla_observac']."</td>
									<td class='collapse'>".$cont."</td>
									<td class='collapse'> ".$row['hla_id']."</td>    
									<td><a class='btn btn-danger' onClick='this.focus(); idHacLabConsu=".$row['hla_id']."; fiHacLabConsu=".$cont."; EliminaUnHistLabo();'>BORRAR</a></td>								
								</tr>
							";
						}
				}
				else
				{
						$salida="
						<tr id='sinDatos'>
							<td> </td>
							<td colspan='6' class='centerTXT'>NO HAY REGISTROS EN LA BD</td>
						</tr>
						";
				}			
				echo $salida;
		}
		else
		{
			echo "Error al realizar la consulta. ".mysqli_connect_error();
			exit;
		}
	}
	//cerrar la conexion
	mysqli_close($conexion);
}else
{
	echo "error al cargar el parametro en php";	
}
?>