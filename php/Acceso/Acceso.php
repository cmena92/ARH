<?php

	//el nombre de usuario unido al apellido de funcionario terminan diciendo el nombre completo del funcionario y usuario
	class usuario{
		public $Cedula;
		public $PrApellido;
		public $IdFunc=0;
		 
		public $NombreUsuario;
		public $ContraUsuario;
		public $EstadoContra;		
		public $ListaDeAcceso;
		public $Permisos;		
	}
	
	
		$conexion=mysqli_connect("localhost","root","","bd_arh");	
		if(mysqli_connect_errno())
		{
			echo "Error al conectar con la BD. ".mysqli_connect_error();
		}
		else
		{	
			$obj=json_decode($_POST["Parametros"]);			
			$Array_Resultado = array();				
			$InsUsua= new usuario(); 
			$Consulta="
				SELECT `rh_usuarios`.usu_nombre,
					   `rh_usuarios`.usu_contra,
					   `rh_usuarios`.usu_permisos,	
					   `rh_usuarios`.usu_estadoContra,
					   `rh_funcionario`.fun_papellido,
					   `rh_funcionario`.fun_id,
					   `rh_funcionario`.fun_cedula

				FROM `rh_usuarios`,`rh_funcionario` 
				WHERE rh_usuarios.usu_nombre='".$obj->{'usu_nombre'}."' AND 
					  rh_usuarios.usu_contra='".$obj->{'usu_contra'}."' AND 
					  rh_funcionario.fun_id = `rh_usuarios`.fun_id;
				";
			
			if ($resultado=mysqli_query($conexion,$Consulta))
			{				
				if($resultado->num_rows!=0)
				{								
					$row=$resultado->fetch_assoc();						
					$InsUsua->Cedula=$row['fun_cedula'];
					$InsUsua->PrApellido=$row['fun_papellido'];
					$InsUsua->IdFunc=$row['fun_id'];
					
					$InsUsua->NombreUsuario=$row['usu_nombre'];
					$InsUsua->ContraUsuario=$row['usu_contra'];	
					$InsUsua->Permisos=$row['usu_permisos'];
										
					$InsUsua->EstadoContra=$row['usu_estadoContra'];
					
					if($row['usu_permisos']=='R')
					{// Es personal de RH
					$InsUsua->ListaDeAcceso=
					"					
						<li class='active' >
							<a href='inicio.html' class='dropdown-toggle'>ARH</a>
						</li>
						<li >
							<a href='ayuda.html' class='dropdown-toggle'>AYUDA</a>
						</li>				
						<li >
							<a href='vacaciones.html' class='dropdown-toggle'>SISTEMA DE VACACIONES </a>				
						</li>				
						<li>
							<a href='AddFunc.html' class='dropdown-toggle'>AGREGAR FUNCIONARIOS </a>				
						</li >				
						<li>
							<a href='ModFunc.html' class='dropdown-toggle'>MODIFICAR FUNCIONARIOS </a>				
						</li>
						<li>
							<a href='Lista.html' class='dropdown-toggle'>LISTA DE FUNCIONARIOS</a>				
						</li>				
						<li>
							<a href='reportes.html' class='dropdown-toggle'>REPORTES </a>				
						</li>
						<li>
							<a href='consultas.html' class='dropdown-toggle'>CONSULTAS </a>				
						</li>
						<li>
							<a href='usuarios.html' class='dropdown-toggle'>SEGURIDAD</a>
						</li>	
						<!--id para frenar un ciclo-->
						<li id='ultimo' class='dropdown-toggle collapse' >
							<a href='nosotros.html'>NOSOTROS</a>				
						</li>
					";
					}
					else//Son permisos de Funcionario Normales
					{
					$InsUsua->ListaDeAcceso=
						"
						<li class='active' >
							<a href='inicio.html' class='dropdown-toggle'>ARH</a>
						</li>
						<li >
							<a href='ayuda.html' class='dropdown-toggle'>AYUDA</a>
						</li>				
						<li >
							<a href='reportes.html' class='dropdown-toggle'>PERFIL </a>				
						</li>			
						<li >
							<a href='vacaciones.html' class='dropdown-toggle'>SISTEMA DE VACACIONES </a>				
						</li>							
						<!--id para frenar un ciclo-->
						<li id='ultimo' class='dropdown-toggle collapse' >
							<a href='nosotros.html'>NOSOTROS</a>				
						</li>					
						";
					}
				}
				else
				{//  El usuario no esta en la BD
					$InsUsua->ListaDeAcceso="...";
				}	
					array_push($Array_Resultado,$InsUsua);	
					echo json_encode($Array_Resultado); 					
				}				
		}			 
		
		mysqli_close($conexion);
?>