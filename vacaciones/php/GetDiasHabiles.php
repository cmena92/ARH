<?php	
	function QueTipoEs($pDia,$Calendario){			
		foreach($Calendario as $Dia)
		{		
			if($Dia ==$pDia){				
				return "Libre ";
			}
		}
		return "Habil";
	}
	
	class Respuesta{
		public  $CantDiasVacaci;
		public  $Respuesta;
		public  $TipoJornada;
		public  $FechaDeSolicitud;
		public  $DiasHabilesUtilizados;
		public  $DiasDeSaldo;
		public  $Rige;
		public  $Vence;
		public  $Regreso;
		public  $Boleta;
		}	
		
		include_once("bd/phpClassConexion.php");	
		$conexion=new DBManager();
		
		if($conexion->Conectar())
		{		
			$obj=json_decode($_POST["Parametros"]);	
			$Array_Resultado = array();					
			$Calendario = array();	//dias feriados y asuetos				
			$CantDias=0;
			$FechaFin;	//Finaliza el rango los dias feriados y asuetos, que se traen de la BD, $Calendario.	
			$TipoDeHorario=$obj->{'pJornada'};//ACUMULATIVA - ADMINISTRATIVO	
			$fechaInicio;//Inicia  la solicitud	
			$fechaFin;   //Ternina la solicitud	
					
			$TipoSol=$obj->{'pTipo'};//por cant dias o por rango de fechas
			$CantDias;
			$Respuesta= new Respuesta();
			
			$Respuesta->Respuesta.= "<h3>DESGLOSE DE LA SOLICITUD</h3><br> <!--<a href='#Desplegable1' onclick='VerDesglose(2);'>Ver la Boleta</a>--><br>";
			
			$i=strtotime($obj->{'pFechaIni'});							
					$Cantador=60;//Busca desde la fecha inicial hasta 2 meses despues en la lista de feriados
								 //esto para evitar problemas con el dia de regreso
					for(;$Cantador>0;$i+=86400){		
						$fechIndex=date("Y-m-d", $i);
						$FechaFin=$fechIndex;
						if($Cantador==$obj->{'pCantDias'})
						{
							$fechaFin=date($fechIndex);//dia de que finaliza en caso de ser jornada Acumulativa
						}
						$Cantador-=1;
					}
			
			if($obj->{'pJornada'}=="ADMINISTRATIVA")
			{					
				$Consulta ="
				SELECT 
						vrh_dia.*
				FROM 
						vrh_dia 
				WHERE 
						vrh_dia.dia_fecha >='".$obj->{'pFechaIni'}."' and
						vrh_dia.dia_fecha <='".$FechaFin."' ;		
				";	
				$fechaInicio=$obj->{'pFechaIni'};//Inicia la solicitud
				$fechaFin=$obj->{'pFechaFin'};
												
				$f1 = new DateTime($fechaInicio);
				$f2 = new DateTime($fechaFin);
				
				$interval = $f1->diff($f2);	
				
				if($TipoSol=="Numero")
				{
					$CantDias=$obj->{'pCantDias'};
				}	
				else					
				$CantDias=($interval->format('%a')+1);//cantidad de dias que se recorrera para analizar dia a dia la solicitud
				
			}
			else
			{	
				//Formamos la consulta dependiendo del tipo de parametros sea FECHAS LIMITES o NUMERO DE DIAS
				$Consulta ="
					SELECT 
							vrh_dia.*
					FROM 
							vrh_dia 
					WHERE 
							vrh_dia.dia_fecha >='".$obj->{'pFechaApa'} ."' and
							vrh_dia.dia_fecha <='".$FechaFin."' ;		
					";	
				$fechaInicio=$obj->{'pFechaApa'};//Inicia la solicitud
				$CantDias=$obj->{'pCantDias'};//cantidad de dias que se recorrera para analizar dia a dia la solicitud
				
			}
			//Tenemos los parametros y las dos consultas una para J Adminis y la otra para J Acumula
			
			//preguntamos si la BD entre las fechas tiene registros de dias feriado y asuetos
			
			$CantDiasGratis=0;//libres por ley	
			$CantDiasLibres=0;//libres por tipo jornada	
			$CantDiasVacaci=0;//vacaciones por tipo jornada	
			$Vence;//Dia en que queda al final del desgloce inicial
			if ($resultado=mysqli_query($conexion->conect,$Consulta))
			{			
				if($resultado->num_rows!=0)//si hay feriados y asuetos en estos dias
				{
					$ContDeIntera=0;					
					while($row=$resultado->fetch_assoc())
					{						
						array_push($Calendario,$row['dia_fecha']);
						//if($ContDeIntera<$CantDias)	
						//	{$CantDiasGratis+=1; }
						//$ContDeIntera+=1;
					}
				}//else no hay dias feriado o asuetos entre este rango de fechas
						
				if($TipoDeHorario=="ADMINISTRATIVA")
				{
					//anotemos los dias que no son fines de semana
					$i=$CantDias;
					$j=strtotime($fechaInicio);
					while($i>0){						
						$fechIndex=date("Y-m-d", $j);	
						//si es fin o si es feriado
						$NumeroDeDia = date('N', strtotime($fechIndex));//L 1 , M 2, I 3, ... D 7				
						if($NumeroDeDia==7 || $NumeroDeDia==6)
						{
							$sacar=date($fechIndex)."->Fin de Semana";
							if(QueTipoEs($fechIndex,$Calendario)!="Habil")//Porque puede ser un fin feriado
							{
								$sacar.=date($fechIndex)."->Asueto o Feriado<br>";
							}
							else
							{
								$Respuesta->Respuesta.=$sacar."<br>"; 
							}	
							$CantDiasLibres+=1;//libres por tipo jornada							
						}
						else
						{
							if(QueTipoEs($fechIndex,$Calendario)!="Habil")
							{
								$Respuesta->Respuesta.= date($fechIndex)."->Asueto o Feriado<br>";
							}
							else{
								$Respuesta->Respuesta.= date($fechIndex)."->Habil<br>";
								$CantDiasVacaci+=1;
								}
						}
						$Vence=date($fechIndex);						
						
					$j+=86400;
					$i-=1;
					}			
				}
				else //ACUMULATIVA
				{
					$i=$CantDias;
					$j=strtotime($fechaInicio);
					
					$fechIndex=date("Y-m-d", $j);					
					$FechIniDiasLibres;					
					while($i>0){						
						$FechIniDiasLibres=date("Y-m-d", $j+86400);//el dia siguiente
						//si es fin o si es feriado	
						if(QueTipoEs($fechIndex,$Calendario)!="Habil")
						{
							$Respuesta->Respuesta.= date($fechIndex)."->Asueto o Feriado<br>";
						}
						else{
							$Respuesta->Respuesta.= date($fechIndex)."->Habil<br>";
							$CantDiasVacaci+=1;
							$i-=1;
							}
								
					$fechIndex=date("Y-m-d", $j+86400);			
					$j+=86400;
					}
					
					$CantDiasLibres=$CantDias/2;
					$i=	$CantDias/2;//Calcular la cantidad de dias libres
					$j=strtotime(date($FechIniDiasLibres));					
					while($i>0){						
						$fechIndex=date("Y-m-d", $j);	
						//si es fin o si es feriado	
						if(QueTipoEs($fechIndex,$Calendario)!="Habil")
						{
							$Respuesta->Respuesta.= date($fechIndex)."-> Libre por horario -> Asueto o Feriado <br>";
						}
						else{
							$Respuesta->Respuesta.= date($fechIndex)."->Libre por horario<br>";							
							}						
						$Vence=date($fechIndex);							
						$j+=86400;
						$i-=1;
					}	
				}
					
					//calculamos el dia de regreso 
					$Listo=false;
					$i=strtotime($Vence);
					$i+=86400;			//Dia siguiente al vencimiento 
					
					if($TipoDeHorario=="ADMINISTRATIVA")							
					for(;$Listo==false;$i+=86400)
					{		
						$fechIndex=date("Y-m-d", $i);
						if($TipoDeHorario=="ADMINISTRATIVA")
						{
							$NumeroDeDia = date('N', strtotime($fechIndex));//L 1 , M 2, I 3, ... D 7				
							if($NumeroDeDia!=7 && $NumeroDeDia!=6)
							{			
								if(QueTipoEs($fechIndex,$Calendario)=="Habil"){
									//echo date($fechIndex)."<br>";		
									$Regreso=$fechIndex;	
									$Listo=true;
									$Respuesta->Respuesta.= ($fechIndex)."->Dia de Regreso <br>";	
								}
								else
								{
									$Respuesta->Respuesta.= ($fechIndex)."->Libre por Asueto o Feriado<br>";
								}
							}
							else
							{
								$Respuesta->Respuesta.= $fechIndex."->Fin de semana <br>";								
							}				
						} //else seria en la acumulativa, jornada que, aunque se acabe el mundo debe regresar al brete						
						else
						{
							$Regreso=date("Y-m-d", $i);
						}
					}
					else{
						$Regreso=date("Y-m-d", $i);
						}				
				/*	
				$Respuesta->Respuesta.= "<br>CONCLUCIONES PARA ESTE RANGO DE FECHAS<br>";
				$Respuesta->Respuesta.= "<br>DIAS LIBRES POR LEY 2(Feriados o Asuetos) :".$CantDiasGratis;
				$Respuesta->Respuesta.= "<br>DIAS LIBRES POR JORNADA :".$TipoDeHorario." :".$CantDiasLibres;
			    $Respuesta->Respuesta.= "<br>DIAS VACACIONES QUE UTILIZA :".$CantDiasVacaci;
			    $Respuesta->Respuesta.= "<br>Regresar :".$Regreso;
				*/
				
				$Respuesta->CantDiasVacaci=	$CantDiasVacaci;
				$Respuesta->TipoJornada=$TipoDeHorario;
				$Respuesta->FechaDeSolicitud=date("Y-m-d");
				$Respuesta->DiasHabilesUtilizados=$CantDiasVacaci;
				$Respuesta->DiasDeSaldo=0;
				$Respuesta->Rige=$fechaInicio;
				$Respuesta->Vence=$fechaFin;
				$Respuesta->Regreso=$Regreso;
				$Respuesta->Boleta="
				<br><h3>BOLETA DE LA SOLICITUD</h3><br>
				<!--<a href='#Desplegable1' onclick='VerDesglose(1);' >Ver el desgloce</a>-->
				<table class='table' id='tbUsua' >
								<thead>
								<th colspan='8' class='success text-center'>RESULTADOS DE LA SOLICITUD</th>
							   
								<tbody class='TablaScroll'>
									<tr><td class='text-success'>FECHA DE SOLICITUD </td><td>".date("Y-m-d")."</td><td class='text-success'>DIAS UTILIZADOS  </td><td>".$CantDiasVacaci."</td><td class='text-success'>RIGE A PARTIR DEL </td><td>".$fechaInicio."</td> </tr>
									<tr><td class='text-success'>TIPO DE JORNADA    </td><td>".$TipoDeHorario."</td><td class='text-success'>DIAS DE SALDO</td> <td id='datDiasSaldo' >x</td> <td class='text-success'>VENCE EL DIA</td><td>".$fechaFin."</td></tr>
									<tr><td class='text-success' >DIAS DISPONIBLES   </td><td id='datDiasDispo'>x</td><td>                   </td><td></td><td class='text-success'>REGRESO A TRABAJAR</td><td>".$Regreso."</td></tr>
								</tbody>
							</table>
						";
				
				
				
				
				array_push($Array_Resultado,$Respuesta);	
					echo json_encode($Array_Resultado); 	
					
			}
			else
			{ 
				$error=mysqli_error($conexion);
				$Respuesta->Respuesta.= "Error en la Consulta C0045 :".$error;		
			}	
		}
		$conexion->CerrarConexion();
?>

