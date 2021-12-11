<?php
class Motorista{

	private $Nombre;
	private $Contraseña;
	private $Edad;
	private $Pais;


	public function __construct(
		$Nombre,
		$Contraseña,
		$Edad,
		$Pais
	){
		$this->Nombre = $Nombre;
		$this->Contraseña = $Contraseña;
		$this->Edad = $Edad;
		$this->Pais = $Pais;

	}

	public static function validarMotorista($name,$password){
		$contenidoArchivoMotoristas = file_get_contents('../data/motoristas.json');
		$motoristas = json_decode($contenidoArchivoMotoristas,true);
		$mensaje = 'false';

		for($i=0; $i<sizeof($motoristas); $i++){


			if($motoristas[$i]["Nombre"] == $name && $motoristas[$i]["Contraseña"] == $password){
				$mensaje = 'true';
				break;
			}
		}

		echo $mensaje;
	}

	public static function obtenerMotoristas(){
		$contenidoArchivoMotoristas = file_get_contents('../data/motoristas.json');

		echo $contenidoArchivoMotoristas;
	}

	public function registrarMotorista(){
		$contenidoArchivoMotoristas = file_get_contents('../data/motoristas.json');
		$motoristas = json_decode($contenidoArchivoMotoristas,true);

		$motoristas[] = array(
			"Nombre" => $this->Nombre,
			"Contraseña" => $this->Contraseña,
			"Edad" => $this->Edad,
			"Pais" => $this->Pais
		);

		$archivo = fopen('../data/motoristas.json', "w");
		fwrite($archivo, json_encode($motoristas));
		fclose($archivo);

		echo json_encode(end($motoristas));

	}

	public static function eliminarMotorista($indice){
		$contenidoArchivoMotoristas = file_get_contents('../data/motoristas.json');
		$motoristas = json_decode($contenidoArchivoMotoristas,true);

		array_splice($motoristas, $indice,1);

		$archivo = fopen('../data/motoristas.json','w');
		fwrite($archivo,json_encode($motoristas));
		fclose($archivo);

	}


}
?>