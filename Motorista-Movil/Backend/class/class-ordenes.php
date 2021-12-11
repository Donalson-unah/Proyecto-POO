<?php
class Ordenes{

	private $Ubicacion;
	private $DescripcionPedido;
	private $costo;
	private $imagen;


	public function __construct(
		$Ubicacion,
		$DescripcionPedido,
		$costo,
		$imagen
	){
		$this->Ubicacion = $Ubicacion;
		$this->DescripcionPedido = $DescripcionPedido;
		$this->costo = $costo;
		$this->imagen = $imagen;

	}

	public static function obtenerOrdenes(){
		$contenidoArchivoOrdenes = file_get_contents("../data/Ordenes.json");
		echo $contenidoArchivoOrdenes;
	} 

	public function agregarOrden(){
		$contenidoArchivoOrdenes = file_get_contents("../data/Ordenes.json");
		$ordenes = json_decode($contenidoArchivoOrdenes, true); //arreglo asociativo

		$ordenes[] = array(
			"Ubicacion" => $this->Ubicacion,
			"DescripcionPedido" => $this->DescripcionPedido,
			"costo" => $this->costo,
			"imagen" => $this->imagen
		);

		$archivo = fopen('../data/ordenes.json', "w");
		fwrite($archivo, json_encode($ordenes));
		fclose($archivo);

		echo '{"mensaje":"pedido agregado"}';
	}

	public static function eliminarOrden($indice){
		$contenidoArchivoOrdenes = file_get_contents("../data/Ordenes.json");
		$ordenes = json_decode($contenidoArchivoOrdenes, true); //arreglo asociativo

		array_splice($ordenes, $indice,1);

		$archivo = fopen('../data/ordenes.json','w');
		fwrite($archivo,json_encode($ordenes));
		fclose($archivo);

		echo '{"mensaje":"pedido eliminado"}';

	}


}
?>