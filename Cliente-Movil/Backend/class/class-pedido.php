<?php
class Pedido{

	private $nombreProducto;
	private $precioProducto;
	private $descripcionProducto;
	private $empresa;


	public function __construct(
		$nombreProducto,
		$precioProducto,
		$descripcionProducto,
		$empresa
	){

		$this->nombreProducto = $nombreProducto;
		$this->precioProducto = $precioProducto;
		$this->descripcionProducto = $descripcionProducto;
		$this->empresa = $empresa;

	}


	public static function obtenerPedidos(){
		$contenidoArchivoPedidos = file_get_contents("../data/pedidos.json");
		echo $contenidoArchivoPedidos;
	}

	public function agregarPedido(){
		$contenidoArchivoPedidos = file_get_contents("../data/pedidos.json");
		$pedidos = json_decode($contenidoArchivoPedidos, true);


		$pedidos[] = array(
			"nombreProducto" => $this->nombreProducto,
			"precioProducto" => $this->precioProducto,
			"descripcionProducto" => $this->descripcionProducto,
			"empresa" => $this->empresa
		);

		$archivo = fopen('../data/pedidos.json', "w");
		fwrite($archivo, json_encode($pedidos));
		fclose($archivo);

		echo '{"mensaje":"pedido guardado"}';

	}

	public static function eliminarPedido($idPedido){

		$contenidoArchivoPedidos = file_get_contents("../data/pedidos.json");
		$pedidos = json_decode($contenidoArchivoPedidos, true);	
		array_splice($pedidos, $idPedido,1);

		$archivo = fopen('../data/pedidos.json','w');
		fwrite($archivo,json_encode($pedidos));
		fclose($archivo);

		echo "Pedido eliminado";

	}

	public static function eliminarTodos(){

		$archivo = fopen('../data/pedidos.json','w');
		fwrite($archivo,"");
		fclose($archivo);
	}
}
?>