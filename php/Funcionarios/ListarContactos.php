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
		if ($resultado=mysqli_query($conexion,"SELECT * FROM `rh_contacto` WHERE rh_contacto.fun_id='".$_POST['pID']."'"))
		{
				if($resultado->num_rows!=0)
				{
					while($row=$resultado->fetch_assoc())
						{
							//$consulta="INSERT INTO  rh_contacto
//			(
//				con_id,
//				con_tipo,
//				con_entorno,
//				fun_id,
//				con_descrip
//			  "pID":idUsActual,
//			  "pTipo":$("#cbTipoCont").val(), 
//			  "pEnto":$("#cbContexCont").val(), 
//			  "pDato":$("#txtContaText").val(), 
//			  "pDesc":$("#txtContaText").val()
//			)
//			VALUES
//			(
//				NULL,
//				'".$_POST['pTipo']."',
//				'".$_POST['pEnto']."',
//				'".$_POST['pID']."',
//				'".$_POST['pDato']."'
//			)	
							$cont=$cont+1;					
							$salida .="
							
								<tr>	
									<td><a id='btnSelecFunc".$row['fun_id']."' class='btn btn-default' onClick='this.focus(); ContConsu=".$cont."; ModificarContacto()'>Seleccionar</a></td>								
									<td>".$row['con_tipo']."</td>  
									<td>".$row['con_entorno']."</td>
									<td>".$row['con_dato']."</td>
									<td>".$row['con_descrip']."</td>
									<td class='collapse'>".$cont."</td>
									<td class='collapse'> ".$row['con_id']."</td>   
									<td><a id='btnSelecFunc".$row['fun_id']."'  class='btn btn-danger' onClick='this.focus(); ContConsu=".$row['con_id']."; EliminaUnContacto()'>BORRAR</a></td>	                           
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