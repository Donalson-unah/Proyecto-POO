<?php  
class Entregas{

	private $Ubicacion;
	private $DescripcionPedido;
	private $Costo;
	private $Comision;


	public function __construct(
		$Ubicacion,
		$DescripcionPedido,
		$Costo,
		$Comision){
		$this->Ubicacion = $Ubicacion;
		$this->DescripcionPedido = $DescripcionPedido;
		$this->Costo = $Costo;
		$this->Comision = $Comision;
	}

	public static function obtenerEntregas(){
		$contenidoArchivoEntregas = file_get_contents("../data/entregas.json");


		echo $contenidoArchivoEntregas;
	}

	public function guardarEntrega(){
		$contenidoArchivoEntregas = file_get_contents("../data/entregas.json");
		$entregas = json_decode($contenidoArchivoEntregas,true);

		$entregas[]= array(
			"Ubicacion" => $this->Ubicacion,
			"DescripcionPedido" => $this->DescripcionPedido,
			"Costo" => $this->Costo,
			"Comision" => $this->Comision
		);

		$archivo = fopen('../data/entregas.json', "w");
		fwrite($archivo, json_encode($entregas));
		fclose($archivo);

		echo "{'mensaje':'Entrega guardada'}";

	}



}
?>