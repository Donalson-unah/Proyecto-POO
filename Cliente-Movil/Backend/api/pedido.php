<?php
 header('Content-Type: application/json');
 include_once('../class/class-pedido.php');
$_POST = json_decode(file_get_contents('php://input'),true);

 switch ($_SERVER['REQUEST_METHOD']) {

 	case 'GET':
           Pedido::obtenerPedidos();
 		break;
 	
    case 'POST':

      $pedido = new Pedido(
         $_POST['nombreProducto'],
         $_POST['precioProducto'],
         $_POST['descripcionProducto'],
         $_POST['empresa']
      );
      
      $pedido->agregarPedido();
      break;


    case 'DELETE':

        if(isset($_GET['id'])){

            Pedido::eliminarPedido($_GET['id']);

        }else{

            Pedido::eliminarTodos();

        }

      break;

 	default:
 		// code...
 		break;
 }



?>