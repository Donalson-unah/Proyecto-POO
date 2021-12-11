<?php
 header('Content-Type: application/json');
 include_once('../class/class-empresas.php');
//$_POST = json_decode(file_get_contents('php://input'),true);

 switch ($_SERVER['REQUEST_METHOD']) {

 	case 'GET':
           Empresa::obtenerEmpresas();
 		break;

    case 'DELETE':

        if(isset($_GET['indiceEmpresa']))
            Empresa::eliminarProducto($_GET['indiceEmpresa'],$_GET['indiceProducto']);
        else
            Empresa::eliminarEmpresa($_GET['indice']);

        
        break;
 	
 	default:
 		// code...
 		break;
 }





?>