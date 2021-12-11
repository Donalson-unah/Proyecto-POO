<?php
class Cliente{

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

	public static function validarCliente($name,$password){
		$contenidoArchivoClientes = file_get_contents('../data/clientes.json');
		$clientes = json_decode($contenidoArchivoClientes,true);
		$mensaje = 'false';

		for($i=0; $i<sizeof($clientes); $i++){


			if($clientes[$i]["Nombre"] == $name && $clientes[$i]["Contraseña"] == $password){
				$mensaje = 'true';
				break;
			}
		}

		echo $mensaje;
	}

	public static function obtenerClientes(){
		$contenidoArchivoClientes = file_get_contents('../data/clientes.json');

		echo $contenidoArchivoClientes;
	}

	public function registrarCliente(){
		$contenidoArchivoClientes = file_get_contents('../data/clientes.json');
		$clientes = json_decode($contenidoArchivoClientes,true);

		$clientes[] = array(
			"Nombre" => $this->Nombre,
			"Contraseña" => $this->Contraseña,
			"Edad" => $this->Edad,
			"Pais" => $this->Pais
		);

		$archivo = fopen('../data/clientes.json', "w");
		fwrite($archivo, json_encode($clientes));
		fclose($archivo);

		echo json_encode(end($clientes));

	}


}
?>