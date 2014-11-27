<?php 
	include_once("bd/phpClassConexion.php");
	$conexion= new DBManager();
		
	if($conexion->Conectar())
	{
		$cont=0;
		$salida=""; 
		if ($resultado=mysqli_query($conexion->conect,"SELECT rh_funcionario.*FROM rh_funcionario WHERE 1"))
		{
			if($resultado->num_rows!=0)
			{
				while($row=$resultado->fetch_assoc())
				{
					$cont=$cont+1;
					$salida .="
						<tr>	
							<td><a id='btnSelecFunc".$row['fun_id']."' class='btn btn-default' onClick='this.focus(); FilaConsu=".$cont."; SelectFuncPar();'>Seleccionar</a></td>						
							<td>".$row['fun_cedula']."</td>
							<td>".$row['fun_nombre']."</td>
							<td>".$row['fun_papellido']."</td>
							<td>".$row['fun_sapellido']."</td>  
							<td>".$row['fun_tipJornada']."</td>
							<td class='collapse'>".$cont."</td>  
							<td class='collapse'>".$row['fun_id']."</td>  
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
		$conexion->CerrarConexion();
?>