<?php
	include_once("bd/phpClassConexion.php");
	$conexion= new DBManager();
	
	if($conexion->Conectar())
	{	
		//Validar que no genere error la conexión
	
		$Consulta = "SELECT evento.dia_id, evento.dia_fecha, evento.dia_tipo, evento.dia_descripcion
					FROM vrh_dia as evento"; 
		$resultado =mysqli_query($conexion->conect,$Consulta);
		$cuantosRenglones = $resultado -> num_rows;
		$eventos = array();
		$variableTipo;
		$fecha=date('Y',strtotime('now'));
		$fechaAct;
		$anoMenos=$fecha-1;
		$color;
		if($cuantosRenglones >= 1){
			
			while($fila = $resultado -> fetch_assoc())
			{
				$fechaAct=date('Y',strtotime($fila['dia_fecha']));
				$variableTipo=$fila['dia_tipo'];
				if($variableTipo=='FERIADO')
				{
				 $color="green";
				}
				else
				{
				  $color="red";	
				}
				if($fechaAct>$anoMenos){
				array_push($eventos, array(
					'id' => $fila['dia_id'],
					'title' => $fila['dia_descripcion'],
					'start' => date('Y-m-d',strtotime($fila['dia_fecha'])), 
					'end' => date('Y-m-d',strtotime($fila['dia_fecha'])),
					'allDay' => true,
					'tipo'=>$fila['dia_tipo'],	
					'color' => $color
				));}
			}
			
			echo json_encode($eventos);
		}
		else
		{
			echo 'No hay Registros';
		}
			
	}
	$conexion->CerrarConexion();
?>