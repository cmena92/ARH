<?php

//============================================================+
// File name   : Reporte Boleta
// Begin       : 2014-11-24
// Last Update : 2014-11-25
//
// Description : Este reporte muestra una boleta de solicitud impresa
//
// Author: Crisman Mena
//
// (c) Copyright:
//               Manuel Sanabria, Crisman Mena
//               Universidad Nacional
//============================================================+

// Include the main TCPDF library (search for installation path).
require_once('../../tcpdf/reportes/tcpdf_include.php');

// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {

	//Page header
	public function Header() {
		// Logo
		$image_file = K_PATH_IMAGES.'logo.jpg';
		$this->Image($image_file, 0, 0, 35, '', 'JPG', '', '', false, 300, '', false, false, 0, false, false, false);
		// Set font
		$this->SetFont('helvetica', 'B', 20);
		// Title
		$this->Ln(6);
		$this->Cell(0, 12, 'BOLETA DE SOLICITUD DE VACACIONES', 0, 1, 'C', 0, '', 0, false, 'M', 'M');
		$this->Ln(1);
		$this->SetFont('helvetica', 'B', 16);
		$this->Cell(0, 10, 'NUMERO DE SOLICITUD X', 0, 1, 'C', 0, '', 0, false, 'M', 'M');
		$this->Ln(1);
		$this->Cell(0, 1, '________________________________________________________________', 0, 1, 'C', 0, '', 0, false, 'M', 'M');
		
	}

	// Page footer
	public function Footer() {
		// Position at 15 mm from bottom
		$this->SetY(-15);
		// Set font
		$this->SetFont('helvetica', 'I', 8);
		// Page number
		$this->Cell(0, 10, 'ARH, Página '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
	}
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Sinac ACLAP RH');
$pdf->SetTitle('Prontuario');
$pdf->SetSubject('Prontuario de Funcionario');
$pdf->SetKeywords('TCPDF, PDF, prontuario, funcionario, laborales');

// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('times', 'BI', 12);




// add a page
$pdf->AddPage();



$html='
<style rel="stylesheet" type="text/css">
.datagrid table { 
	border-collapse: collapse; 
	text-align: left; 
	width: 100%; 
	font-family:"Century Gothic";
} 
.datagrid {
	font: normal 12px/150%; 
	background: #fff;
	overflow: hidden;
}
.datagrid table td, 
.datagrid table th {
	padding: 3px 10px; 
	}
	
.datagrid table thead th,.Encabezado {
	background: #006699;
	background-color:#006699; 
	color:#FFFFFF !important; 
	font-size: 15px; font-weight: bold; 
	border-left: 1px solid #0070A8; 
	} 

.datagrid table .alt td { background: #E1EEf4; height: 10px; color: #00557F; }
	td {
        border: 1px solid black;
        background-color: #ffffee;
    }
	th {
		 border: 1px solid black;
        background-color: #ffffee;
		 text-align: center;
		}
	
 div.dhtmlx_window_active, div.dhx_modal_cover_dv { position: fixed !important; }
</style>
<br>
<br>
	<div class="datagrid" >
		
		            <h3>
							 DATOS DE LA BOLETA
                             </h3>
  			
				   <table id="tbIfoPersonal1" >           
                                <tr class="alt">
									<td width="207"><strong>FECHA DE SOLICITUD</strong> </td>								
									<td width="207">DIAS UTILIZADOS  </td>								
									<td width="206">RIGE EL </td>
                                </tr>
								<tr>
									<td style="text-align:center;">aaaa-mm-dd</td>
									<td style="text-align:center;">X</td> 								
									<td style="text-align:center;">aaaa-mm-dd</td>							
                                </tr>				
                                <tr class="alt">
									<td class="text-success">TIPO DE JORNADA    </td>
									<td class="text-success">DIAS DE SALDO</td> 								
									<td class="text-success">VENCE EL DIA</td>							
                                </tr> 
								<tr>
									<td style="text-align:center;">AD-AC</td>
									<td style="text-align:center;">X</td> 								
									<td style="text-align:center;">aaaa-mm-dd</td>							
                                </tr>
								<tr class="alt">
									<td>DIAS DISPONIBLES   </td>
									<td>REGRESO A TRABAJAR</td>
									<td>PERIODO</td>
                                </tr> 
								<tr>
									<td style="text-align:center;">X</td> 								
									<td style="text-align:center;">aaaa-mm-dd</td>						
									<td style="text-align:center;">aaaa-AAAA</td>							
                                </tr>  
							</table>
							<br>
								<h3 >OBSERVACIONES</h3>
                                <p>____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________</p>
                                
                 			<br><br>
								<h4 >ENCARGADO DE RRHH</h4>
                                <p>_______________________________</p>
                                
							<br>
								<h4 >FUNCIONARIO</h4>
                                <p>_______________________________</p>
                                
		</div>		
	

';


// set some text to print
$txt = <<<EOD


Aqui va el cuerpo
EOD;

// print a block of text using Write()
$pdf->WriteHTML($html,true,false,true,false,'');

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('Prontuario.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+

 ?>