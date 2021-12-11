<?php
class Empresa{

private $Restaurante;
private $imagen;
private $Productos;
private $nombreProducto;
private $precioProducto;
private $descripcionProducto;


public function __construct(
	$Restaurante,
	$imagen,
	$Productos,
	$nombreProducto,
	$precioProducto,
	$descripcionProducto
){

	$this->Restaurante = $Restaurante;
	$this->imagen = $imagen;
	$this->Productos = $Productos;
	$this->nombreProducto = $nombreProducto;
	$this->precioProducto = $precioProducto;
	$this->descripcionProducto = $descripcionProducto;

}

public function __toString(){

	return "Funcion tostring de empresas";
}


public static function obtenerEmpresas(){

	$contenidoArchivoEmpresas = file_get_contents("../data/empresas.json");

	echo $contenidoArchivoEmpresas;
}

public static function eliminarEmpresa($indice){

	$contenidoArchivoEmpresas = file_get_contents("../data/empresas.json");
	$empresas = json_decode($contenidoArchivoEmpresas, true); 

	array_splice($empresas, $indice,1);

	$archivo = fopen("../data/empresas.json", "w");
	fwrite($archivo, json_encode($empresas));
	fclose($archivo);

}

public static function eliminarProducto($indiceEmpresa,$indiceProducto){
	
	$contenidoArchivoEmpresas = file_get_contents("../data/empresas.json");
	$empresas = json_decode($contenidoArchivoEmpresas, true); 
	$productos = array();

	for($i=0; $i<sizeof($empresas[$indiceEmpresa]["Productos"]); $i++){
		$productos[] = $empresas[$indiceEmpresa]["Productos"][$i];
	}

	array_splice($productos, $indiceProducto,1);

	$empresas[$indiceEmpresa]["Productos"] = array();

	for($i=0; $i<sizeof($productos); $i++){

	$empresas[$indiceEmpresa]["Productos"][] = $productos[$i];
	}


	$archivo = fopen("../data/empresas.json", "w");
	fwrite($archivo, json_encode($empresas));
	fclose($archivo);

}






}
?>