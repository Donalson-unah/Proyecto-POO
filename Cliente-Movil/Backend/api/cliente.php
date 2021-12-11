<?php

header("Content-Type: application/json");
include_once('../class/class-cliente.php');
$_POST = json_decode(file_get_contents('php://input'),true);

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		if(isset($_GET['name']) && isset($_GET['password'])){

			Cliente::validarCliente($_GET['name'],$_GET['password']);

		}else{

			Cliente::obtenerClientes();
		}

		break;
	case 'POST':

		$cliente = new Cliente(
			$_POST['Nombre'],
			$_POST['Contraseña'],
			$_POST['Edad'],
			$_POST['Pais']
		);

		$cliente->registrarCliente();
		break;
	default:
		// code...
		break;
}


?>