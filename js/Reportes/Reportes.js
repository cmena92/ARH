//variabls globales


//inicia document ready
$(document).ready(function(e) {
  
$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 450);
});

$(window).bind('resizeEnd', function() {
     funcionModificarTamañoVentana();  
});  
	
ListarFuncionarios();	
	
funcionModificarTamañoVentana();	
	
});//fin document ready

var funcionModificarTamañoVentana=function(){setTimeout("padre = $(window.parent.document);padre.find('#fPrincipal').animate({'height': $('body').height()});",420);}

function ListarFuncionarios(){
	$.ajax({
			url: 'php/Funcionarios/ListarFuncionarios.php',
			type:'post',
			beforeSend: function(){
				$("#tResultadoFunc").html("<td>Procesando, espere por favor...</td>");
			},		
			success: function(response){
				$("#tResultadoFunc").html(response);
			}
		});	
	} 

function BuscarUsuarioReportes()
	{
		jQuery("#Buscador").keyup(function()
		{
			if( jQuery(this).val() != ""){
				jQuery("#tbContaFunc tbody>tr").hide();
				jQuery("#tbContaFunc td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
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