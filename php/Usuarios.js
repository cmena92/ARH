$(document).ready(function(e) {
    ListarUsuarios();
});

//LISTAR USUARIOS
function ListarUsuarios()
{
	$.ajax({
		url: '../php/ConfUsuar.php',
		type:'post',
		beforeSend: function(){
			$("#tResultadoDeBusqueda").html("<td>Procesando, espere por favor...</td>");
		},
		success: function(response){
			$("#tResultadoDeBusqueda").html(response);
		}
	});
}

