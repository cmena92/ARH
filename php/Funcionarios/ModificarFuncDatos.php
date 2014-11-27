<?php		 

if(	isset($_POST['pNombre']) && isset($_POST['pApelli']) && isset($_POST['pSeApel']) 
	&& isset($_POST['pCedula']) && isset($_POST['pNacion']) && isset($_POST['pDepemd']) 
	&&  isset($_POST['pGenero']) && isset($_POST['pEstaCi']) 
	&& isset($_POST['pFecNac']) && isset($_POST['pID']) && isset($_POST['pEstaLab']) 
	&& isset($_POST['pNombram']) && isset($_POST['pFecIngr']) && isset($_POST['pNumPues']) 
	&& isset($_POST['pEspePue']) && isset($_POST['pProgPre']) && isset($_POST['pCargo']) && 
	isset($_POST['pGrupLab']) && isset($_POST['pFondFin']) && isset($_POST['pObserva']) && 
	isset($_POST['pClase']) && isset($_POST['pCedulaUsuar']) && isset($_POST['pTipJor']))
	{	
		$conexion=mysqli_connect("localhost","root","","bd_arh");	
		
		if(mysqli_connect_errno())
		{
			echo "Error al conectar con la BD. ".mysqli_connect_error();
		}
		else
		{	
			$consulta="
			
			UPDATE  rh_funcionario
				SET	
					fun_nombre='".$_POST['pNombre']."',
					fun_papellido='".$_POST['pApelli']."',
					fun_sapellido='".$_POST['pSeApel']."',
					fun_cedula='".$_POST['pCedula']."',
					fun_nacionalidad='".$_POST['pNacion']."',
					fun_dependencia='".$_POST['pDepemd']."',
					fun_sexo='".$_POST['pGenero']."',
					fun_estadocivil='".$_POST['pEstaCi']."',
					fun_fechanac='".$_POST['pFecNac']."',
					fun_estado='".$_POST['pEstaLab']."',
					fun_propresupues='".$_POST['pProgPre']."',
					fun_fondofinancia='".$_POST['pFondFin']."',
					fun_nombramiento='".$_POST['pNombram']."',
					fun_fecingre='".$_POST['pFecIngr']."',
					fun_numpuesto='".$_POST['pNumPues']."',
					fun_clase='".$_POST['pClase']."',
					fun_especialidad='".$_POST['pEspePue']."',
					fun_gruplaboral='".$_POST['pGrupLab']."',
					fun_cargo='".$_POST['pCargo']."',
					fun_descripcion='".$_POST['pObserva']."',
					fun_cedusuaactua='".$_POST['pCedulaUsuar']."',
				fun_tipJornada='".$_POST['pTipJor']."'				
				WHERE
					fun_id='".$_POST['pID']."';
			";
			
			if($resultado=mysqli_query($conexion,$consulta))
			{			
				echo "...";	
			}		
			else
			{				
				 $error_code = mysqli_errno($conexion);	
				 if($error_code==1062)
			      echo mysqli_error($conexion);	
				 else
				  echo "!!!" ;
			}		
		}
		mysqli_close($conexion);
	}else{echo "parametros malos";}
?>