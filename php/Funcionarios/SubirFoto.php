<?php 
if(isset($_POST['pUriLocal']))
	{
		$target_path = "img/fotos/";
		
		$target_path = $target_path . basename( 
			$_FILES[$_POST['pProgPre']]['name']); 
			if(move_uploaded_file($_FILES[$_POST['pProgPre']]['tmp_name'],$target_path)) 
			{ 
				echo "El archivo ". basename( $_FILES[$_POST['pProgPre']]['name']). " ha sido subido";
			} 
			else
			{
				echo "Ha ocurrido un error, trate de nuevo!";
			}
	}
?>
