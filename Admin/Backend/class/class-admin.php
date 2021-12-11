<?php
class Admin{

	private $Nombre;
	private $Contraseña;

	public function __construct($Nombre,$Contraseña){

		$this->Nombre = $Nombre;
		$this->Contraseña = $Contraseña;
	}

	public static function obtenerAdmins(){
		$contenidoArchivoAdmins = file_get_contents('../data/admins.json');


		echo $contenidoArchivoAdmins;
	}

	public static function validarAdmin($name,$password){
		$contenidoArchivoAdmins = file_get_contents('../data/admins.json');
		$admins = json_decode($contenidoArchivoAdmins,true);
		$mensaje = 'false';

		for($i=0; $i<sizeof($admins); $i++){


			if($admins[$i]["Nombre"] == $name && $admins[$i]["Contraseña"] == $password){
				$mensaje = 'true';
				break;
			}
		}

		echo $mensaje;
	}





}
?>