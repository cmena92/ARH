<?php
include_once("../bd/phpClassConexion.php");

$conexion= new DBManager();
$salida="";
if(isset($_POST['pEstado']) && isset($_POST['pFecIni']) && isset($_POST['pFecFin']) && isset($_POST['pDiaDis']) && isset($_POST['pDiaGoz']) &&
   isset($_POST['pExtra']) && isset($_POST['pFunId'])&& isset($_POST['pPerId'])&& isset($_POST['pAccion']))
{
	if($conexion->Conectar()==true)
	{	
		if($_POST['pAccion']=="AGREGAR")
		{	
		   if($resultado=mysqli_query($conexion->conect,"
				INSERT INTO `bd_arh`.`vrh_periodo` 
				(`per_id`, 
				`per_estado`, 
				`per_fecIni`, 
				`per_fecFin`, 
				`per_diasDispo`, 
				`per_diasGozados`, 
				`per_extra`, 
				`fun_id`) 
				VALUES (
				NULL, 
				'".$_POST['pEstado']."', 
				'".$_POST['pFecIni']."', 
				'".$_POST['pFecFin']."', 
				'".$_POST['pDiaDis']."', 
				'".$_POST['pDiaGoz']."', 
				'".$_POST['pExtra']."', 
				'".$_POST['pFunId']."');")
				)
				{
					$salida="Bien";
				}
				else{
					$code=mysqli_connect_errno();
					$error=mysqli_error($conexion);		
					$salida ="Error #".$code." en la Consulta :".$error." ->cone_error".mysqli_connect_error();
					echo $salida;
				}
		}
		if($_POST['pAccion']=="ELIMINAR")
		{	
		   if($resultado=mysqli_query($conexion->conect,"
				DELETE FROM `bd_arh`.`vrh_periodo` 
				WHERE `vrh_periodo`.`per_id` = '".$_POST['pPerId']."'")
				)
				{
					$salida="Bien";
				}
				else{
					$code=mysqli_connect_errno();
					$error=mysqli_error($conexion);		
					$salida ="Error #".$code." en la Consulta :".$error." ->cone_error".mysqli_connect_error();
					echo $salida;
				}
			$consulta="		
			DELETE FROM `bd_arh`.`rh_funcionario`		
			WHERE `rh_funcionario`.`fun_id` = '".$_POST['pFunId']."';	
			";
		}
		if($_POST['pAccion']=="MODIFICAR")
		{	
		   if($resultado=mysqli_query($conexion->conect,"
			   UPDATE  `bd_arh`.`vrh_periodo` 
					SET	
						per_estado='".$_POST['pEstado']."',
						per_fecIni='".$_POST['pFecIni']."',
						per_fecFin='".$_POST['pFecFin']."',
						per_diasDispo='".$_POST['pDiaDis']."',
						per_diasGozados='".$_POST['pDiaGoz']."',
						per_extra='".$_POST['pExtra']."'
										
					WHERE
					`vrh_periodo`.`per_id` = '".$_POST['pPerId']."'")
				)
				{
					$salida="Bien";
				}
				else{
					$code=mysqli_connect_errno();
					$error=mysqli_error($conexion);		
					$salida ="Error #".$code." en la Consulta :".$error." ->cone_error".mysqli_connect_error();
					echo $salida;
				}
			$consulta="		
			DELETE FROM `bd_arh`.`rh_funcionario`		
			WHERE `rh_funcionario`.`fun_id` = '".$_POST['pFunId']."';	
			";
		}
		$conexion->CerrarConexion();
			echo $salida;
	}
	}
	else 
		echo "Error de parametros Ajax";
?>