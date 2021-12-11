
/*
axios({
		url:`../backend/api/tweet.php`,
		method: 'post',
		responseType:'json',
		data:{
			idUsuario: idUsuarioActual,
			usuario: usuarioActual,
			tweet: texto.value,
			hashtags: hashtagsUsados.value,
			nombre:nombreActual,
			urlImagen:imagenUsuario,
		}
	}).then(res=>{

		console.log(res.data);
	}).catch(error=>{
		console.error(error);
	})


	*/

	var UBI;
	var DES;
	var PRC;
	var CMC;
	var TotalOrdenes=0;
	
	var myModal = new bootstrap.Modal(document.getElementById('ventanaModal'), {
		keyboard: false
	})

	var myModal2 = new bootstrap.Modal(document.getElementById('modalCompra'), {
		keyboard: false
	})



toggleSeccion('Empresas');


function cargarPedidos() {
	limpiar();

	let campo = document.getElementById('cuerpoPopularesyEmpresas');

	axios({
		url:`../Backend/api/pedidos.php`,
		method: 'GET',
		responseType:'json'
	}).then(res=>{

	if(res.data.length>0){

	

		for(let i=0; i<res.data.length; i++){

			campo.innerHTML += 
			`			
			<!-- CARD-->
			<div class="col-6">
			<div class="card" onclick="ampliarPedido('${res.data[i].Ubicacion}','${res.data[i].DescripcionPedido}','${res.data[i].Costo}','${res.data[i].imagen}',${i})">
			<img src="img/${res.data[i].imagen}" class="card-img-top">
			<div class="card-body">
			<h3>${res.data[i].Ubicacion}</h3>
			<div class="container-fluid" style="padding: 0;">
			<div class="row">

			<div class="col-12">
			${res.data[i].DescripcionPedido}
			</div><br>
			<div class="col-12" style="margin-top: auto;">
			<h4 style="padding-top: 6px;"><small>${res.data[i].Costo}</small></h4>
			</div>
			</div>
			</div>	
			</div>
			</div>				
			</div>
			`;

		}
	}else{
		campo.innerHTML = '<h1 style="text-align:center;padding:20%;color:black;"> No hay ningun pedido disponible!</h1>'
	}

	}).catch(error=>{
		console.error(error);
	})

	axios({
		url:`../Backend/api/ordenes.php`,
		method: 'GET',
		responseType:'json'
	}).then(res=>{
		TotalOrdenes = res.data.length;
	})



}//Termina funcion de cargar productos populares


function MisOrdenes () {
	limpiar();
	let campo = document.getElementById('cuerpoPopularesyEmpresas');
	axios({
		url:`../Backend/api/ordenes.php`,
		method: 'GET',
		responseType:'json'
	}).then(res=>{

		if(res.data.length>0){

			TotalOrdenes = res.data.length;
			for(let i=0; i<res.data.length; i++){

				campo.innerHTML += 
				`			
				<!-- CARD-->
				<div class="col-6">
				<div class="card">
				<img src="img/${res.data[i].imagen}" class="card-img-top">
				<div class="card-body" >
				<h3>${res.data[i].Ubicacion}</h3>
				<div class="container-fluid" style="padding: 0;">
				<div class="row">

				<div class="col-12">
				${res.data[i].DescripcionPedido}
				</div><br>
				<div class="col-12" style="margin-top: auto;">
				<h4 style="padding-top: 6px;">
				<small>${res.data[i].costo}</small></h4>
				</div>  
				<button class="btn btn-danger" onclick="confirma('${res.data[i].Ubicacion}','${res.data[i].DescripcionPedido}','${res.data[i].costo}','${res.data[i].imagen}',${i});">Marcar como entregada!</button>
				</div>
				</div>	
				</div>
				</div>				
				</div>

				`;
			}


			let precio =  res.data[0].costo.substring(0, res.data[0].costo.length - 1);
			let comision = Number(precio)*(0.90);
			comision = parseInt(comision);

			UBI = res.data[0].Ubicacion;
			DES = res.data[0].DescripcionPedido;
			PRC = res.data[0].costo;
			CMC = comision;

		}else{
			campo.innerHTML = `
			<h2 style="text-align:center;padding-top:25%;">Aún no tienes ninguna Orden Tomada/Activa!</h2>`;
		}

	}).catch(error=>{
		console.error(error);
	})




}//Termina funcion Cargar Empresas



function ampliarPedido(nombrePedido,descripcionPedido,precioPedido,imagenPedido,indice) {
	
	precioPedido =  precioPedido.substring(0, precioPedido.length - 1);
	let comision = Number(precioPedido)*(0.90);
	comision = parseInt(comision);

	document.getElementById('modalCompraLabel').innerHTML = `${nombrePedido}`;

	document.getElementById('modalCompraBody').innerHTML = 
	`
	<h4>Descripcion de este Pedido: </h4><br><br>
	<div class="col-12">
	<small>${descripcionPedido}</small><br><br>
		<div class="row">
			<div class="col-6" style="padding-top:10px;">
			<h6>El cliente te pagará:</h6>
			</div>
			<div class="col-6" style="padding:0px 10px;">
			<h6 style="float:right;padding:10px">${precioPedido}$</h6>
			</div>
		</div>
	<div class="col-12">
		<div class="row">
			<div class="col-6" style="padding-top:10px;">
			<h6>Tú recibirás como comisión:</h6>
			</div>
			<div class="col-6" style="padding:0px 10px;">
			<h6 style="float:right;padding:10px">${comision}$</h6>
		</div>
	</div>
	</div>
	</div>
	`;

	document.getElementById('modalComprafooter').innerHTML = `
	<button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="width:100px !important;">Cancelar</button>
	<button class="btn btn-secondary" 
	onclick="tomarOrden('${nombrePedido}','${descripcionPedido}','${precioPedido}','${imagenPedido}',${indice});">Tomar Orden</button>
	`;

	myModal2.show();


}

function tomarOrden(nOrden,dOrden,pOrden,iOrden,indice) {

	if(TotalOrdenes<1){
		TotalOrdenes = 1;
		pOrden = pOrden.toString();
		pOrden = pOrden+"$";


		axios({
			url:`../Backend/api/ordenes.php`,
			method: 'POST',
			responseType:'json',
			data:{
				Ubicacion: nOrden,
				DescripcionPedido: dOrden,
				costo: pOrden,
				imagen:iOrden
			}
		}).then(res=>{
			console.log(res.data);

		}).catch(error=>{
			console.error(error);
		})

		axios({
			url:`../Backend/api/pedidos.php?id=${indice}`,
			method: 'DELETE',
			responseType:'json'
		}).then(res=>{

			cargarPedidos();
		}).catch(error=>{
			console.error(error);
		});
		myModal2.hide();

	}else{

		//console.log('Ordenes llenas');
		document.getElementById('modalCompraLabel').innerHTML = `No puedes tomar más de 1 pedido`;
		document.getElementById('modalCompraBody').innerHTML = 'Nuestras politicas no permiten a motoristas tomar mas de 1 pedido a la vez, nuestras sinceras disculpas.';

	}

}


function mostrarMenuHamburguesa(){
	document.querySelector('.menuLateral').classList.add("menuActivo");
	document.querySelector('.dropdown').style.display = "none";

	let campo = document.querySelectorAll('.card')

	for(let i=0; i<campo.length; i++){

		campo[i].style.display = 'none';
	}

}

function cerrarBurger(argument) {
	document.querySelector('.menuLateral').classList.remove("menuActivo");
	document.querySelector('.dropdown').style.display = "block";

	let campo = document.querySelectorAll('.card')

	for(let i=0; i<campo.length; i++){

		campo[i].style.display = 'block';
	}
}

function toggleSeccion(seccion) {

	if(seccion == 'Empresas'){

		document.getElementById('Populares').style.backgroundColor = 'white';
		document.getElementById('Empresas').style.backgroundColor = '#0F4A81';
		MisOrdenes();

	}
	else{
		document.getElementById('Populares').style.backgroundColor = '#0F4A81';
		document.getElementById('Empresas').style.backgroundColor = 'white';
		cargarPedidos();	

	}

}


function abrirEntregas (){


axios({
		url:`../Backend/api/entregas.php`,
		method: 'GET',
		responseType:'json'
	}).then(res=>{
		let ganancia=0;

		if(res.data.length != 0){

			document.getElementById('carritoBody').innerHTML = "";
			for(let i = 0; i<res.data.length; i++){
				ganancia +=res.data[i].Comision;
				document.getElementById('carritoBody').innerHTML+=`

												<div class="col-12" style="padding: 15px;">
												<h3 class="b">${res.data[i].Ubicacion}</h3>
												<h6 class="w">${res.data[i].DescripcionPedido}</h6>
												
												<div class="row b">
													<div class="col-6">
														<h5 style="width:auto;">El cliente pagó:</h5>
													</div>
													<div class="col-6">
													<h5 style="float: right;">${res.data[i].Costo}</h5>
													</div>
													
													<div class="col-6"><h5>La comisión fue:</h5></div>
													<div class="col-6">
														<h5 style="float: right;">${res.data[i].Comision}$</h5>
													</div>
												</div>

											</div><hr>

				`;
			}
			document.getElementById('carritoBody').innerHTML +=`
				
				<br>
				<div class="row b">
					<div class="col-6"><h4>Ganancia de hoy: </h4></div>
					<div class="col-6"><h4 style="float:right;">${ganancia}$</h4></div>
				</div>

				`;

			document.querySelector('#carritoFooter').innerHTML = `
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
				`;

		}else{
			document.getElementById('carritoBody').innerHTML = "<h2>Aun no has hecho tu primera entrega del día!</h2>";
			document.querySelector('#carritoFooter').innerHTML = `
			<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
			`;

		}

	}).catch(error=>{
		console.error(error);
	})


	myModal.show();

}

function confirma(Ubicacion,DescripcionPedido,costo,imagen,indice){
	//console.log(Ubicacion);
	//console.log(DescripcionPedido);
	//console.log(costo);
	//console.log(imagen);


	document.getElementById('modalCompraLabel').innerHTML = `¿Estás Seguro?`;

	document.getElementById('modalCompraBody').innerHTML = 
	`
	Porfavor confirma que entregaste esta Orden


	`;

	document.getElementById('modalComprafooter').innerHTML = `
	<button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="width:100px !important;">Cancelar</button>
	<button class="btn btn-secondary" onclick="eliminarOrden(${indice});">Sí Confirmo</button>
	`;

	myModal2.show();

}


function eliminarOrden(indice) {
myModal2.hide();

	axios({
		url:`../Backend/api/ordenes.php?id=${indice}`,
		method: 'DELETE',
		responseType:'json',
	}).then(res=>{
		//console.log(res.data);
	}).catch(error=>{
		console.error(error);
	})

	axios({
		url:`../Backend/api/entregas.php`,
		method: 'POST',
		responseType:'json',
		data:{
			Ubicacion: UBI,
			DescripcionPedido: DES,
			Costo: PRC,
			Comision: CMC
		}
	}).then(res=>{
		//console.log(res.data);
	}).catch(error=>{
		console.error(error);
	})


	MisOrdenes();

}

function limpiar() {

	document.getElementById('cuerpoPopularesyEmpresas').innerHTML = "";

}


function estado(etiqueta){


	console.log(etiqueta);
	document.getElementById('dropdownMenuButton1').innerHTML = etiqueta;
}