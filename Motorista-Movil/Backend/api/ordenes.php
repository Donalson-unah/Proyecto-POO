<?php

header("Content-Type: application/json");
include_once('../class/class-ordenes.php');
$_POST = json_decode(file_get_contents('php://input'),true);

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		//Obteniendo toda la lista de ordenes que ha aceptado el motorista
		Ordenes::obtenerOrdenes();
		break;
	case 'POST':

	    $orden = new Ordenes(
         $_POST['Ubicacion'],
         $_POST['DescripcionPedido'],
         $_POST['costo'],
         $_POST['imagen']
      );
      
      $orden->agregarOrden();
		break;
	case 'DELETE':

	Ordenes::eliminarOrden($_GET['id']);


		break;
	
	default:
		// code...
		break;
}


?>