<?php

header("Content-Type: application/json");
include_once('../class/class-motorista.php');
$_POST = json_decode(file_get_contents('php://input'),true);

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		if(isset($_GET['name']) && isset($_GET['password'])){

			Motorista::validarMotorista($_GET['name'],$_GET['password']);

		}else{

			Motorista::obtenerMotoristas();
		}

		break;
	case 'POST':

		$motorista = new Motorista(
			$_POST['Nombre'],
			$_POST['Contraseña'],
			$_POST['Edad'],
			$_POST['Pais']
		);

		$motorista->registrarMotorista();
		break;

	case 'DELETE':

		Motorista::eliminarMotorista($_GET['indice']);


		break;
	default:
		// code...
		break;
}


?>