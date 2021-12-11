<?php

header("Content-Type: application/json");
include_once("../class/class-entregas.php");
$_POST = json_decode(file_get_contents('php://input'),true);

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':

		Entregas::obtenerEntregas();

		break;
	case 'POST':

	    $entrega = new Entregas(
         $_POST['Ubicacion'],
         $_POST['DescripcionPedido'],
         $_POST['Costo'],
         $_POST['Comision']
      );
      
      $entrega->guardarEntrega();

		break;
	
	default:
		// code...
		break;
}




?>