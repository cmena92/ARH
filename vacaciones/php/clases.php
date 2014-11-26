<?php

class Solicitud{	
		public $errores;	
		public $Periodos = array();	
		public $Boletas = array();
		public $descrip;	
		public $CarruBoletas;	
		public $ListBoletas;		
		}	
	
	class Periodo{
		public  $PeriodoID;
		public  $Estado;
		public  $FechaIni;
		public  $FechaFin;
		public  $DiasDisponi;
		public  $DiasGozados;
		public  $Extra;
		public  $FunID;
		}	
	
	class Boleta{
		public  $idBoleta;
		public  $FecSolic;
		public  $NumeroBo;
		public  $DiasUtil;
		public  $FecRigeA;
		public  $TipoJorn;
		public  $DiasSald;
		public  $FecVence;
		public  $FecRegre;	
		public  $Desglose;	
			
		}
?>