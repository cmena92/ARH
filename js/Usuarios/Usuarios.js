$(document).ready(function(e) {
    ListarUsuarios();
	
	
	

});



//LISTAR USUARIOS
	function ListarUsuarios()
	{
		$.ajax({
			url: 'php/Usuarios/ListarUsuarios.php',
			type:'post',
			beforeSend: function(){
				$("#tResultadoDeBusqueda").html("<td>Procesando, espere por favor...</td>");
			},		
			success: function(response){
				$("#tResultadoDeBusqueda").html(response);
			}
		});	
						  
					  
 
		
		
	}	
	
	var idCons=0;
	 

	function ConsultarUsuar()
	{		  
		document.getElementById("txtNombre").value=
		document.getElementById("tResultadoDeBusqueda").rows[idCons-1].cells[1].innerText+"";				
		document.getElementById("txtContra").value=
		document.getElementById("tResultadoDeBusqueda").rows[idCons-1].cells[3].innerText+"";		
	}
	
	
		
	function Restablecer()
	{
		if(idCons!=0)
		{
			RestablecerContrasena();
		}else{
			$("#ResultadoRestablecer").removeClass("text-success");
				$("#ResultadoRestablecer").html("NO HAY UN USUARIO SELECCIONADO");				
			}
		idCons=0;
		LimpiarForm();
			
	}

	function RestablecerContrasena()
	{
		var parametros={
			"id":idCons,
			"fechaNac":document.getElementById("tResultadoDeBusqueda").rows[idCons-1].cells[5].innerText
		};
		$.ajax({
			data: parametros,
			url: 'php/Usuarios/ReestablecerContrasena.php',
			type: 'POST',
			beforeSend: function(){
				$("#ResultadoRestablecer").html("Procesando, espere por favor...");
			},
			success: function(response){
				$("#ResultadoRestablecer").html(response);
				$("#ResultadoRestablecer").addClass("text-danger");
			}
		});
	}
	
	function LimpiarForm()
	{
	  var frm=document.getElementById("FrmPrincipal");
	  var textbox=frm.getElementsByTagName('input');
	  for(var i=0;i<textbox.length;i++)
	  {textbox[i].value="";}
	}
	function BuscarUsuario()
	{
		jQuery("#Buscador").keyup(function()
		{
			if( jQuery(this).val() != ""){
				jQuery("#tbUsua tbody>tr").hide();
				jQuery("#tbUsua td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
			}
			else{
				jQuery("#tablaLaWebera tbody>tr").show();
			}
		});	
		
		jQuery.extend(jQuery.expr[":"], 
		{
			"contiene-palabra": function(elem, i, match, array) {
				return (elem.textContent || elem.innerText || jQuery(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
			}
		});							
	}	