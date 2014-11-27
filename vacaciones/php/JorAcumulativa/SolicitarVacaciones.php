<?php	
		include_once("../clases.php");
		include_once("../bd/phpClassConexion.php");
		
						
		$Solicitud= new Solicitud();
		$Solicitud->CarruBoletas="
		<div class='carousel slide ' id='carousel-838964'>
                        <ol class='carousel-indicators'>
                            <li class='active' data-slide-to='0' data-target='#carousel-838964'>
                            </li>
                            <li data-slide-to='1' data-target='#carousel-838964'>
                            </li>
                            <li data-slide-to='2' data-target='#carousel-838964'>
                            </li>
                        </ol>
                        <div class='carousel-inner '>
		";				
		
		$conexion= new DBManager();
		
		if($conexion->Conectar()==true)
		{
			$obj=json_decode($_POST["Parametros"]);					
			$Calendario = array();	//dias feriados y asuetos	
								
			$FechaFin;	//Finaliza el rango los dias feriados y asuetos, que se traen de la BD, $Calendario.			
			$CantDiasGratis=0;//libres por ley	
			$CantDiasLibres=0;//libres por tipo jornada	
			$CantDiasVacaci=0;//vacaciones por tipo jornada	
			$Vence;//Dia en que queda al final del desgloce inicial	
			$IdFunc=$obj->{'pIdUs'};;	
			$TipoDeHorario=$obj->{'pJornada'};//ACUMULATIVA - ADMINISTRATIVO	
			$fechaInicio=$obj->{'pFechaIni'};	//Inicia  la solicitud	
			$fechaFinSol;   //Ternina la solicitud	
			$CantDias=$obj->{'pCantDias'};//cantidad de dias que se recorrera para analizar dia a dia la solicitud
		
			$i=strtotime($obj->{'pFechaIni'});							
					$Cantador=180;//Busca desde la fecha inicial hasta 2 meses despues en la lista de feriados
								 //esto para evitar problemas con el dia de regreso
					for(;$Cantador>0;$i+=86400){		
						$fechIndex=date("Y-m-d", $i);
						$FechaFin=$fechIndex;						
						$Cantador-=1;
					}			
			//seleccionar de la bd los dias feriados y asuetos			
			$Consulta ="
					SELECT 
							vrh_dia.*
					FROM 
							vrh_dia 
					WHERE 
							vrh_dia.dia_fecha >='".$obj->{'pFechaIni'}."' and
							vrh_dia.dia_fecha <='".$FechaFin."' ;		
					";	
					
			//selecciona los periodos correspondientes del usuario
			$Consulta2 ="
					SELECT 
							vrh_periodo.*
					FROM 
							vrh_periodo 
					WHERE 
						vrh_periodo.fun_id='".$obj->{'pIdUs'}."' AND vrh_periodo.per_estado='DISPONIBLE' ORDER BY  `vrh_periodo`.`per_fecIni` DESC ;		
					";	
			
			//preguntamos si la BD entre las fechas tiene registros de dias feriado y asuetos	
			if ($ferAsue=mysqli_query($conexion->conect,$Consulta)  )
			{			
				if($ferAsue->num_rows!=0)//si hay feriados y asuetos en estos dias
				{
					$ContDeIntera=0;					
					while($row=$ferAsue->fetch_assoc())
					{						
						array_push($Calendario,$row['dia_fecha']);	
						$CantDiasGratis+=1;
					}
				}
				//else no hay dias feriado o asuetos entre este rango de fechas
				$ultimaBoleta=new Boleta();	
				if ($ResPeriodos=mysqli_query($conexion->conect,$Consulta2)  )
				{
					if($ResPeriodos->num_rows!=0)//si hay feriados y asuetos en estos dias
					{
						$ContDeIntera=0;
						while($row=$ResPeriodos->fetch_assoc())
						{		
							$NuevoPeriodo =new Periodo();							
							$NuevoPeriodo->PeriodoID=$row['per_id'];
							$NuevoPeriodo->Estado=$row['per_estado'];
							$NuevoPeriodo->FechaIni=$row['per_fecIni'];
							$NuevoPeriodo->FechaFin=$row['per_fecFin'];
							$NuevoPeriodo->DiasDisponi=$row['per_diasDispo'];
							$NuevoPeriodo->DiasGozados=$row['per_diasGozados'];
							$NuevoPeriodo->Extra=$row['per_extra'];
							$NuevoPeriodo->FunID=$row['fun_id'];							
								array_push($Solicitud->Periodos ,$NuevoPeriodo);
						}					
					
					//empesamos a recorrer los periodos, por cada uno se hace una boleta hasta que se acaben los dias de solicitud				
					$NumeroDeBoleta=0;
					$VenceAnterior=NULL;
					for($i=0;$i < count($Solicitud->Periodos); $i++)
						{
							$pasoPorAnterior=false;
							if( $Solicitud->Periodos[$i]->DiasDisponi >= $CantDias && $i==0)
							{									
									$bolet=new Boleta();
									$bolet=RealizarBoleta($NumeroDeBoleta,$CantDias,$fechaInicio,$TipoDeHorario,$Calendario,$Solicitud->Periodos[$i]->DiasDisponi);
									$pasoPorAnterior=true;
									$Solicitud->CarruBoletas.=$bolet->Ficha;
									array_push($Solicitud->Boletas,$bolet);
									$ultimaBoleta=$bolet;
									break; 
							}
							if($Solicitud->Periodos[$i]->DiasDisponi < $CantDias)
							{
									if($VenceAnterior==NULL){
										$bolet=new Boleta();
										$bolet=RealizarBoleta($NumeroDeBoleta,$Solicitud->Periodos[$i]->DiasDisponi,$fechaInicio,$TipoDeHorario,$Calendario,$Solicitud->Periodos[$i]->DiasDisponi);
										$VenceAnterior=$bolet->FecRegre;
									$Solicitud->CarruBoletas.=$bolet->Ficha;
										array_push($Solicitud->Boletas,$bolet);
									}else{
										$bolet=new Boleta();
										$bolet=RealizarBoleta($NumeroDeBoleta,$Solicitud->Periodos[$i]->DiasDisponi,$VenceAnterior,$TipoDeHorario,$Calendario,$Solicitud->Periodos[$i]->DiasDisponi);
										$VenceAnterior=$bolet->FecRegre;
									$Solicitud->CarruBoletas.=$bolet->Ficha;
										array_push($Solicitud->Boletas,$bolet);
									}									
									$pasoPorAnterior=true;
							}
							if($Solicitud->Periodos[$i]->DiasDisponi>=$CantDias )
							{
									$bolet=new Boleta();
									$bolet=RealizarBoleta($NumeroDeBoleta,$CantDias,$VenceAnterior,$TipoDeHorario,$Calendario,$Solicitud->Periodos[$i]->DiasDisponi);
									$Solicitud->CarruBoletas.=$bolet->Ficha;
									array_push($Solicitud->Boletas,$bolet);
									$ultimaBoleta=$bolet;
									break;
							}
							$NumeroDeBoleta+=1;
							$CantDias= $CantDias-$Solicitud->Periodos[$i]->DiasDisponi;
						}
						//fin de reccorer periodos	
					}else
						{							
							$Solicitud->errores.= "El funcionario no tiene periodos";
						}								
				}
				if(count($Solicitud->Boletas)>1)
				$Solicitud->CarruBoletas.="                                              
                        </div>  
                        <a class='left carousel-control' href='#carousel-838964' data-slide='prev'><span class='glyphicon glyphicon-chevron-left'></span></a> 
                        <a class='right carousel-control' href='#carousel-838964' data-slide='next'><span class='glyphicon glyphicon-chevron-right'></span></a>
                    </div> ";
				else
					$Solicitud->CarruBoletas.="                                              
                        </div> </div> ";
						
				$insertarSolicitud="
		INSERT INTO  `bd_arh`.`vrh_solicitud` (
				`sol_id` ,
				`sol_fecIni` ,
				`sol_fecFin` ,
				`sol_descripcion` ,
				`sol_cantDias` ,
				`fun_id`
				)
				VALUES (
				NULL,  '".$fechaInicio."',  '".$ultimaBoleta->FecRegre."',  '".$Solicitud->descrip."',  '".$CantDias."',  '".$IdFunc."'
				);
					
		";
				if($ResSolicitud=mysqli_query($conexion->conect,$insertarSolicitud))
				{
					$Solicitud->errores="ingreso solicitud exitosa";
					$selecionarSolicitud="
						SELECT `sol_id`
						FROM `vrh_solicitud` 		
						WHERE 
								`sol_fecIni` = '".$fechaInicio."' AND
								`sol_fecFin` = '".$ultimaBoleta->FecRegre."' AND
								`sol_cantDias` = ".$CantDias." AND
								`fun_id`= ".$IdFunc.";		
						";
					if($ResSolicitud=mysqli_query($conexion->conect,$selecionarSolicitud))
					{
						$Solicitud->errores="seleccion exitosa";
						if($ResSolicitud->num_rows!=0)
						{	
							$NumSolicitud=0;		
							$Solicitud->errores="correcto";	
							while($row=$ResSolicitud->fetch_assoc())
							{						
								$NumSolicitud=$row['sol_id'];
							}
							
							//por cada boleta un insertar
							$cont=0;
							while($cont<count($Solicitud->Boletas))
							{	
								$perActual=new Periodo();			
								$perActual=$Solicitud->Periodos[$cont];
								$bolActual=new Boleta();			
								$bolActual=$Solicitud->Boletas[$cont];
								$cont+=1;	
								$insertarBoleta="
								INSERT INTO  `bd_arh`.`vrh_boleta` (
									`rep_id` ,
									`rep_idSolicitud` ,
									`rep_idPeriodo` ,
									`rep_dereDisfutar` ,
									`rep_observaciones` ,
									`rep_disfrutado` ,
									`rep_saldoXdisf` ,
									`rep_solicitado` ,
									`rep_fecRige` ,
									`rep_fecVence` ,
									`rep_fecRegreso` ,
									`rep_fechaReporte`
									)
									VALUES (
									NULL ,  
									'".$NumSolicitud."',  
									'".$perActual->PeriodoID."',  
									'".$perActual->DiasDisponi."',  
									'...',  
									'".$perActual->DiasGozados."',  
									'".$bolActual->DiasSald."',  
									'".$bolActual->DiasUtil."',  
									'".$bolActual->FecRigeA."',  
									'".$bolActual->FecVence."',  
									'".$bolActual->FecRegre."',  
									'".$bolActual->FecSolic."'
									);
								";
								//$Solicitud->errores=$insertarBoleta;
								$ResSolicitud=mysqli_query($conexion->conect,$insertarBoleta);
								$actualizarPeriodo="
									UPDATE `vrh_periodo` 
									SET 
									`per_diasDispo`=".$bolActual->DiasSald.",
									`per_diasGozados`=".$bolActual->DiasUtil.",
									`fun_id`=".$IdFunc."
									WHERE 
									`per_id`=".$perActual->PeriodoID."
								";
								$ResSolicitud=mysqli_query($conexion->conect,$actualizarPeriodo);
							}
						}
					}
					
				}

						
					echo json_encode($Solicitud); 
			}
		}
		$conexion->CerrarConexion();
		
		
		
	function RealizarBoleta($pNumero,$pCantDias,$pFecIni,$pTipJor,$Calendario,$pCantDiasPeriodo)
	{	
		$CantDiasVacaci=0;
		$CantDiasLibres=0;
		$Vence="";
		$NuevaBoleta=new Boleta();
		
		$NuevaBoleta->Desglose.="<br><h3>DESGLOSE DE LA BOLETA #".$pNumero."</h3>";
		$EstadoFicha="";
		if($pNumero==0) $EstadoFicha="active";
		$NuevaBoleta->Ficha="			
                            <div class='item  ".$EstadoFicha."' >
                                <img src='recursos/boleta.png' alt='imgAlt' />
                                <div class='carousel-caption ' style='color:black;'>
									<p'><h4> BOLETA ".$pNumero."</h4>
									<li> <a href='#footResultados' onClick='DesgloseBoleta(".$pNumero.");'>Ver Desgloce</a></li>
									<li> <a href='#footResultados' onClick='Boleta(".$pNumero.")'>Ver Boleta</a> </
									</p>							
                                </div>
                          </div> 
		";
		$ContadoDias=1;
		//combierte a par la solicitud por si las moscas, como es jornada aculualtiva
		if($pCantDias%2!=0){
				$pCantDias-=1;
			}
		if($pCantDias!=0)
		{	
				$i=$pCantDias;
				$j=strtotime($pFecIni);
				$fechIndex=date("Y-m-d", $j);					
				$FechIniDiasLibres="";	
				
				while($i>0){	
					$FechIniDiasLibres=date("Y-m-d", $j+86400);//el dia siguiente
					if(QueTipoEs($fechIndex,$Calendario)!="Habil")
					{
						$NuevaBoleta->Desglose.= $ContadoDias++." /// ".date($fechIndex)."->Asueto o Feriado<br>";
					}
					else
					{
						$NuevaBoleta->Desglose.= $ContadoDias++." /// ".date($fechIndex)."->Habil<br>";
						$CantDiasVacaci+=1;
						$i-=1;
					}						
					$fechIndex=date("Y-m-d", $j+86400);			
					$j+=86400;
				}
			
				$CantDiasLibres=$pCantDias/2;
				$i=	$pCantDias/2;//Calcular la cantidad de dias libres
				
				$j=strtotime(date($FechIniDiasLibres));					
				while($i>0){						
					$fechIndex=date("Y-m-d", $j);	
					//si es fin o si es feriado	
					if(QueTipoEs($fechIndex,$Calendario)!="Habil")
					{
						$NuevaBoleta->Desglose.= $ContadoDias++." /// ".date($fechIndex)."-> Libre por horario -> Pierde el Asueto o Feriado <br>";
					}
					else{
						$NuevaBoleta->Desglose.= $ContadoDias++." /// ".date($fechIndex)."->Libre por horario<br>";							
						}						
					$Vence=date($fechIndex);							
					$j+=86400;
					$i-=1;
				}
			
	
			
			//calculamos el dia de regreso 		
			$Listo=false;
			$i=strtotime($Vence);
			$i+=86400;			//Dia siguiente al vencimiento 
			$Regreso=date("Y-m-d", $i);								
			
			
			$NuevaBoleta->Resumen= "<br><br>FECHA DE SOLICITUD:".date("d-m-y")."<br>
						  NUMERO DE BOLETA  :".$pNumero."<br>
						  DIAS UTILIZADOS   :".$CantDiasVacaci."<br>
						  RIGE A PARTIR DEL :".$pFecIni."<br>
						  TIPO DE JORNADA   :".$pTipJor."<br>
						  DIAS DE SALDO     :".($pCantDiasPeriodo-$pCantDias)."<br>
						  VENCE EL DIA		:".$Vence."<br>
						  REGRESO A TRABAJAR: ".$Regreso."<br>
						";	
						
				$NuevaBoleta->FecSolic=date("Y-m-d");	
				$NuevaBoleta->NumeroBo=$pNumero;	
				$NuevaBoleta->DiasUtil=$CantDiasVacaci;	
				$NuevaBoleta->FecRigeA=$pFecIni;	
				$NuevaBoleta->TipoJorn=$pTipJor;	
				$NuevaBoleta->DiasSald=($pCantDiasPeriodo-$pCantDias);	
				$NuevaBoleta->FecVence=$Vence;	
				$NuevaBoleta->FecRegre=$Regreso;		
		}else
		{
			$NuevaBoleta->Desglose.="Esto no es un error, es una situacion peculiar de la jornada Acumulativa<br>¡Porque pasa esto! <a href=''>Ver Poque?<a><br>";
		}	
		return $NuevaBoleta;		
		
	}
	
	function QueTipoEs($pDia,$Calendario)
		{			
			foreach($Calendario as $Dia)
			{		
				if($Dia ==$pDia)
				{				
					return "Libre ";
				}
			}
			return "Habil";
		}			
?>