<?php 

//LISTAR USUARIOS
$conexion=mysqli_connect("localhost","root","","bd_arh");

//COMPROBAR SI HUBO UN ERROR EN LA CONEXION
if(mysqli_connect_errno())
{
	echo "Error al conectar con la BD. ".mysqli_connect_error();
}
else
{
	$cont=0;
	$salida=""; 
	if ($resultado=mysqli_query($conexion,"SELECT rh_funcionario.fun_id, rh_funcionario.fun_cedula, rh_funcionario.fun_nombre, rh_funcionario.fun_papellido, rh_funcionario.fun_sapellido FROM rh_funcionario WHERE 1"))
	{
		if($resultado->num_rows!=0)
		{
			while($row=$resultado->fetch_assoc())
			{
				$cont=$cont+1;
				$salida .="
					<tr>	
						<td><a id='btnSelecFunc".$row['fun_id']."' href='#DesplegableFunc".$row['fun_id']."' class='btn btn-default' onClick='this.focus(); FilaConsu=".$cont."; idSeleccionado=".$row['fun_id']."; Seleccionar();'>Seleccionar</a></td>
						<td  class='collapse'>".$row['fun_id']."</td>
						<td>".$row['fun_cedula']."</td>
						<td>".$row['fun_nombre']."</td>
						<td>".$row['fun_papellido']."</td>
						<td>".$row['fun_sapellido']."</td>  
						<td class='collapse'>".$cont."</td>    
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
?>