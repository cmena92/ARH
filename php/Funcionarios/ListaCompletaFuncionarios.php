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
	if ($resultado=mysqli_query($conexion,"SELECT rh_funcionario.* FROM rh_funcionario WHERE 1"))
	{
		if($resultado->num_rows!=0)
		{
			while($row=$resultado->fetch_assoc())
			{
				$cont=$cont+1;
				$salida .="
					<tr>	
						<td><a id='btnElimiFunc".$row['fun_id']."' href='#DesplegableFunc".$row['fun_id']."' class='btn btn-danger' onClick='this.focus(); FilaConsu=".$cont."; idSeleccionado=".$row['fun_id']."; Eliminar();'>Eliminar</a></td>
						<td  class='collapse'>".$row['fun_id']."</td>
						<td>".$row['fun_cedula']."</td>
						<td>".$row['fun_nombre']."</td>
						<td>".$row['fun_papellido']."</td>
						<td>".$row['fun_sapellido']."</td>
						<td>".$row['fun_nacionalidad']."</td>  
						<td>".$row['fun_estadocivil']."</td>  
						<td>".$row['fun_fechanac']."</td>  
						<td>".$row['fun_dependencia']."</td>  
						<td>".$row['fun_sexo']."</td>  
						<td>".$row['fun_propresupues']."</td>  
						<td>".$row['fun_fondofinancia']."</td>  
						<td>".$row['fun_nombramiento']."</td>  
						<td>".$row['fun_fecingre']."</td>  
						<td>".$row['fun_numpuesto']."</td>  
						<td>".$row['fun_clase']."</td>  
						<td>".$row['fun_especialidad']."</td>  
						<td>".$row['fun_gruplaboral']."</td>  
						<td>".$row['fun_cargo']."</td>  
						<td>".$row['fun_estado']."</td>  
						<td>".$row['fun_tipJornada']."</td>    
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