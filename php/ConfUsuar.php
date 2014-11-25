

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
	$salida="";
	if ($resultado=mysqli_query($conexion,"SELECT rh_funcionario.fun_id, rh_funcionario.fun_cedula, rh_funcionario.fun_nombre, rh_funcionario.fun_papellido,rh_usuarios.usu_contra, rh_usuarios.usu_permisos, rh_funcionario.fun_fechanac FROM rh_funcionario, rh_usuarios WHERE rh_usuarios.usa_id = rh_funcionario.fun_id ;"))
	{
		if($resultado->num_rows!=0)
		{
			while($row=$resultado->fetch_assoc())
			{
				$salida .="
					<tr>
						<td class=''>".$row['fun_id']."</td>
						<td>".$row['fun_nombre']."</td>
						<td>".$row['usu_permisos']."</td>
						<td class='hidden'>".$row['usu_contra']."</td>
						<td class='hidden'>".$row['fun_cedula']."</td>
						<td class='hidden'>".$row['fun_fechanac']."</td>
						<td><a href='#' id='btnConsUsuar' class='btn btn-default' onClick='ConsultarUsuar(".$row['fun_fechanac'].");'>Consultar</a></td>
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