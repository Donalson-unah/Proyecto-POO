<?php
header('Content-Type: application/json');
include_once('../class/class-admin.php');

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':

		if(isset($_GET['name']) && isset($_GET['password'])){

			Admin::validarAdmin($_GET['name'],$_GET['password']);

		}else{

			Admin::obtenerAdmins();
		}


		break;
	
	default:
		// code...
		break;
}




?>