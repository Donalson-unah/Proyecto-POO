
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

var pedidosSize = 0;
var myModal = new bootstrap.Modal(document.getElementById('ventanaModal'), {
	  keyboard: false
	})

var myModal2 = new bootstrap.Modal(document.getElementById('modalCompra'), {
	  keyboard: false
	})



cargarPopulares(); //POR DEFECTO VA CARGAR LOS PRODUCTOS POPULARES
actualizarContadorProductos(); //SE ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL CARRITO

function cargarEmpresas () {
	limpiar();
	let campo = document.getElementById('cuerpoPopularesyEmpresas');

	axios({
		url:`../Backend/api/empresa.php`,
		method: 'get',
		responseType:'json'
	}).then(res=>{

	
	for(let i=0; i<res.data.length; i++){

			campo.innerHTML += 
			`			<!-- CARD-->
						<div class="col-6">
							<div class="card">
								<img src="img/${res.data[i].imagen}" class="card-img-top">
								<div class="card-body" onclick="ampliarEmpresa('${i}')">
									<h3>${res.data[i].Restaurante}</h3>
									<div class="container-fluid" style="padding: 0;">
										<div class="row">
											
											<div class="col-12">
												Llegamos hasta donde quieras!
												Te damos facilidades...
											</div>
											
										</div>
									</div>	
								</div>
							</div>				
						</div>`;
	}


	}).catch(error=>{
		console.error(error);
	})




}//Termina funcion Cargar Empresas

function cargarPopulares() {
	limpiar();

	let campo = document.getElementById('cuerpoPopularesyEmpresas');


	axios({
			url:`../Backend/api/empresa.php`,
			method: 'get',
			responseType:'json'
		}).then(res=>{


			for(let i=0; i<res.data.length; i++){

				for(let j=0; j<res.data[i].Productos.length; j++){

					campo.innerHTML += 
					`			<!-- CARD-->
								<div class="col-6">
									<div class="card" onclick="ampliarProducto('${res.data[i].Productos[j].nombreProducto}','${res.data[i].Productos[j].descripcionProducto}','${res.data[i].Productos[j].precioProducto}','${res.data[i].Restaurante}')">
										<img src="img/${res.data[i].imagen}" class="card-img-top">
										<div class="card-body">
											<h3>${res.data[i].Productos[j].nombreProducto}</h3>
											<div class="container-fluid" style="padding: 0;">
												<div class="row">
													
													<div class="col-12">
														${res.data[i].Productos[j].descripcionProducto}
													</div><br>
													<div class="col-12" style="margin-top: auto;">
														<h4 style="padding-top: 6px;"><small>${res.data[i].Productos[j].precioProducto}</small></h4>
													</div>
												</div>
											</div>	
										</div>
									</div>				
								</div>`;
					}

			}


		}).catch(error=>{
			console.error(error);
		})


}//Termina funcion de cargar productos populares

function ampliarEmpresa(indiceEmpresa) {



axios({
		url:`../Backend/api/empresa.php`,
		method: 'get',
		responseType:'json'
	}).then(res=>{




	
document.getElementById('modalCompraLabel').innerHTML = `${res.data[indiceEmpresa].Restaurante}`;
document.getElementById('modalCompraBody').innerHTML = "";

		for(let j=0; j<res.data[indiceEmpresa].Productos.length; j++){

			document.getElementById('modalCompraBody').innerHTML += 
			`			<!-- CARD-->
						<div class="col-6" style="padding-left: 0px !important;">
							<div class="card">
								<img src="img/${res.data[indiceEmpresa].imagen}" class="card-img-top">
								<div class="card-body" 
								onclick="ampliarProducto('${res.data[indiceEmpresa].Productos[j].nombreProducto}','${res.data[indiceEmpresa].Productos[j].descripcionProducto}','${res.data[indiceEmpresa].Productos[j].precioProducto}','${res.data[indiceEmpresa].Restaurante}')">
									<h3>${res.data[indiceEmpresa].Productos[j].nombreProducto}</h3>
									<div class="container-fluid" style="padding: 0;">
										<div class="row">
											
											<div class="col-12">
												${res.data[indiceEmpresa].Productos[j].descripcionProducto}
											</div><br>
											<div class="col-12" style="margin-top: auto;">
												<h4 style="padding-top: 6px;"><small>${res.data[indiceEmpresa].Productos[j].precioProducto}</small></h4>
											</div>
										</div>
									</div>	
								</div>
							</div>				
						</div>`;

						//console.log(res.data[indiceEmpresa].Restaurante);
			}

	

document.getElementById('modalComprafooter').innerHTML = `
<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
`;

	}).catch(error=>{
		console.error(error);
	})




myModal2.show();



}

function ampliarProducto(nombreProducto,descripcionProducto,precioProducto,empresaProducto) {

document.getElementById('modalCompraLabel').innerHTML = `${nombreProducto}`;

document.getElementById('modalCompraBody').innerHTML = 
`
								<div class="col-12">
									<h4>${descripcionProducto}</h4>
									<div class="row">
										<div class="col-6" style="padding-top:10px;">
											<h6>${precioProducto}</h6>
										</div>
									</div>
								</div>
`;

document.getElementById('modalComprafooter').innerHTML = `
<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
<button class="btn btn-secondary" 
onclick="pedir('${nombreProducto}','${descripcionProducto}','${precioProducto}','${empresaProducto}');">Pedir</button>
`;

myModal2.show();

}

function pedir(nProducto,dProducto,pProducto,pEmpresa) {

axios({
		url:`../backend/api/pedido.php`,
		method: 'post',
		responseType:'json',
		data:{
			nombreProducto: nProducto,
			precioProducto: pProducto,
			descripcionProducto: dProducto,
			empresa: pEmpresa
		}
	}).then(res=>{
		console.log(res.data);

	}).catch(error=>{
		console.error(error);
	})

//pedidos.push(productoTemporal); 
//localStorage.setItem('pedidosStorage',JSON.stringify(pedidos));


myModal2.hide();
actualizarContadorProductos();
}


function mostrarMenuHamburguesa(){
	document.querySelector('.menuLateral').classList.add("menuActivo");

	let campo = document.querySelectorAll('.card')

	for(let i=0; i<campo.length; i++){

	campo[i].style.display = 'none';
	}

}

function cerrarBurger(argument) {
	document.querySelector('.menuLateral').classList.remove("menuActivo");

	let campo = document.querySelectorAll('.card')

	for(let i=0; i<campo.length; i++){

	campo[i].style.display = 'block';
	}
}

function toggleSeccion(seccion) {

	if(seccion == 'Empresas'){

		document.getElementById('Populares').style.backgroundColor = 'white';
		document.getElementById('Empresas').style.backgroundColor = '#0F4A81';
		cargarEmpresas();

	}
	else{
		document.getElementById('Populares').style.backgroundColor = '#0F4A81';
		document.getElementById('Empresas').style.backgroundColor = 'white';
		cargarPopulares();	

	}

}


function abrirCarrito (){

actualizarContadorProductos();
axios({
		url:`../Backend/api/pedido.php`,
		method: 'get',
		responseType:'json'
	}).then(res=>{
		var totalCosto = 0;
	
		if(res.data.length != 0){

			document.getElementById('carritoBody').innerHTML = "";
			for(let i = 0; i<res.data.length; i++){

				document.getElementById('carritoBody').innerHTML+=`

												<div class="col-12" style="padding: 15px;">
												<h3><b>${res.data[i].nombreProducto}</b></h3>
												<h6 class="w">${res.data[i].descripcionProducto}</h6>
												<div class="row">
													<div class="col-6">
														<h4>${res.data[i].precioProducto}</h4>
													</div>
													<div class="col-6">
														<button class="btn btn-warning" onclick="eliminar(${i});">Quitar</button><br>
													</div>
												</div>
											</div><hr>


				`;

					let costo = `${res.data[i].precioProducto}`;
					costo = costo.substring(0, costo.length - 1); 
					totalCosto += parseInt(costo);
	
			}
				let finale = totalCosto+100;

				document.querySelector('#carritoFooter').innerHTML = `
					<div class="col-12" style="width: 100%; padding: 5px 24px;">
						<h4>Productos: ${totalCosto}$</h4>
						<h4>Envio: 100$</h4>
						<h4>Total: ${finale}$</h4>
					</div><br>
					<button class="btn btn-secondary" onclick="finalizar();">Finalizar la Compra!</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="padding: 6px 31px;">Cerrar</button>
				`;



		}else{
			document.getElementById('carritoBody').innerHTML = "<h2>Aun no has agregado nada!</h2>";
			document.querySelector('#carritoFooter').innerHTML = `
			<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
			<button type="button" class="btn btn-secondary" disabled>Finalizar Compra!</button>
			`;

		}

	}).catch(error=>{
		console.error(error);
	})




	myModal.show();

}

function eliminar (indice) {


	//pedidos.splice(indice,1);
	//localStorage.setItem('pedidosStorage',JSON.stringify(pedidos));
	
	axios({
		url:`../backend/api/pedido.php?id=${indice}`,
		method: 'DELETE',
		responseType:'json',
	}).then(res=>{
		console.log(res.data);
		actualizarContadorProductos();
	}).catch(error=>{
		console.error(error);
	})



	abrirCarrito();
	

}

function limpiar() {

	document.getElementById('cuerpoPopularesyEmpresas').innerHTML = "";

}

function actualizarContadorProductos() {

	axios({
		url:`../backend/api/pedido.php`,
		method: 'GET',
		responseType:'json',
	}).then(res=>{
		pedidosSize = res.data.length;
		document.querySelector('.contadorCompras').innerHTML = `${pedidosSize}`
	}).catch(error=>{console.error(error);
	})

	
}


function finalizar(){
	myModal.hide();
	limpiar();
	document.querySelector('#categorias').innerHTML = '';
	document.getElementById('cuerpoPopularesyEmpresas').style.flexDirection = 'column';

	document.getElementById('cuerpoPopularesyEmpresas').innerHTML = `
	
	<h2  style="text-align: center; padding-top: 6%">
		Ingresa tu ubicación:
	</h2><br>
	<h2 id="errorUbicacion" style="font-family: Roboto; color:red;font-size: 19px;text-align: center;"></h2>
	<input type="text" placeholder="Ejemplo: Col. Loarque" style="width:auto" id="Ubicacion" onclick="document.querySelector('#errorUbicacion').innerHTML ='';"><br>

	<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d61920.89992530866!2d-87.1497728!3d14.073856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2shn!4v1639161344733!5m2!1ses!2shn" style="border:1px solid black; height:400px;" allowfullscreen="" loading="lazy"></iframe>

	<button class="btn btn-primary" style="width:auto; margin-top:20px" onclick="validarUbicacion();">Finalizar!</button>
	`;

}

function validarUbicacion(){

	if(document.getElementById('Ubicacion').value != ''){
		agregarNuevoPedido();
	}else{
		document.querySelector('#errorUbicacion').innerHTML ='Porfavor cocola la ubicacion en el recuadro';
	}
}

function agregarNuevoPedido(){


	axios({
		url:`../Backend/api/pedido.php`,
		method: 'GET',
		responseType:'json'

	}).then(res=>{


			for(let i = 0; i<res.data.length; i++){
		
			let concatena = `(${res.data[i].empresa}) `+`${res.data[i].nombreProducto} `+`${res.data[i].descripcionProducto}`;

				axios({
					url:`../../Motorista-Movil/Backend/api/pedidos.php`,
					method: 'POST',
					responseType:'json',
					data:{
						Ubicacion: document.querySelector('#Ubicacion').value,
						DescripcionPedido: concatena,
						Costo:res.data[i].precioProducto,
						imagen: "almuerzo.jpg",
						empresa:res.data[i].empresa
					}
				}).then(res=>{
					
						axios({
							url:`../backend/api/pedido.php`,
							method: 'DELETE',
							responseType:'json',
						}).then(res=>{

						document.getElementById('cuerpoPopularesyEmpresas').innerHTML = `
							
							<h2  style="text-align: center; padding-top: 16%">
								Muchas Gracias por tu compra!
								Tu pedido ha sido enviado a la espera de que un motorista lo tome!!
							</h2><br>

							<button class="btn btn-primary" style="width:auto; margin-top:20px" onclick="window.location.reload();">Volver a Inicio!</button>
							`;


						}).catch(error=>{
							console.error(error);
						})

				}).catch(error=>{
					console.error(error);
				})

			}//for 


	}).catch(error=>{
		console.error(error);
	})




}