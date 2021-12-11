<?php
class Pedidos{

	private $Ubicacion;
	private $DescripcionPedido;
	private $Costo;
	private $imagen;


	public function __construct(
		$Ubicacion,
		$DescripcionPedido,
		$Costo,
		$imagen
	){
		$this->Ubicacion = $Ubicacion;
		$this->DescripcionPedido = $DescripcionPedido;
		$this->Costo = $Costo;
		$this->imagen = $imagen;

	}

	public static function obtenerPedidos(){
		$contenidoArchivoPedidos = file_get_contents("../data/pedidos.json");
		echo $contenidoArchivoPedidos;
	} 

	public function agregarNuevoPedido(){

		$contenidoArchivoPedidos = file_get_contents("../data/pedidos.json");
		$pedidos = json_decode($contenidoArchivoPedidos,true);

		$pedidos[]=array(
			"Ubicacion" => $this->Ubicacion,
			"DescripcionPedido" => $this->DescripcionPedido,
			"Costo" => $this->Costo,
			"imagen" => $this->imagen
		);

		$archivo = fopen('../data/pedidos.json', "w");
		fwrite($archivo, json_encode($pedidos));
		fclose($archivo);

	}

	public static function eliminarPedido($id){
		$contenidoArchivoPedidos = file_get_contents("../data/pedidos.json");
		$pedidos = json_decode($contenidoArchivoPedidos, true); //arreglo asociativo

		array_splice($pedidos, $id,1);

		$archivo = fopen('../data/pedidos.json','w');
		fwrite($archivo,json_encode($pedidos));
		fclose($archivo);

		echo '{"mensaje":"pedido eliminado"}';
	}


}
?>