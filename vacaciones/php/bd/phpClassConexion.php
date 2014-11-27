<?php

header('Content-Type: text/html; charset=ISO-8859-1');

class DBManager{
	
    var $conect;//Esta variable guarda la conexion a BD
    var $BaseDatos;//Nombre de la BD
    var $Servidor;//Servidor
    var $Usuario;//Usuario para la BD
    var $Clave;//Contraseña para la BD
    
    //Constructor de la Conexion
    function DBManager(){
		include_once("configuracion.php");
        $this->BaseDatos = $database_Conexion;
        $this->Servidor = $hostname_Conexion;
        $this->Usuario =$username_Conexion;
        $this->Clave = $password_Conexion;
       // $this->Puerto=$port_Conexion;
    }

    //Inicia la conexion, retorna true si fue existosa
    function Conectar() {	 
        $con=mysqli_connect($this->Servidor,$this->Usuario,$this->Clave,$this->BaseDatos);//,$this->Puerto);
		
        if(mysqli_connect_errno()){
            echo "Error al conectar con la BD. ".mysqli_connect_error();
            return false;
        }
        else{
			@mysql_query("SET NAMES 'utf8'",$con);
            $this->conect=$con;
            return true;
        }
    }
    
    function CerrarConexion(){
        mysqli_close($this->conect);
    }
}

?>