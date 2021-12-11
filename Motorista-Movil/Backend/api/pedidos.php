<?php

header("ContenT-Type: application/json");
include_once('../class/class-pedidos.php');
$_POST = json_decode(file_get_contents('php://input'),true);

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		//Obteniendo toda la lista de pedidos
		Pedidos::obtenerPedidos();
		break;
	case 'POST':

	    $pedido = new Pedidos(
         $_POST['Ubicacion'],
         $_POST['DescripcionPedido'],
         $_POST['Costo'],
         $_POST['imagen']
      );
      
      $pedido->agregarNuevoPedido();

		break;
	case 'DELETE':

		Pedidos::eliminarPedido($_GET['id']);
		break;
	default:
		// code...
		break;
}


?>