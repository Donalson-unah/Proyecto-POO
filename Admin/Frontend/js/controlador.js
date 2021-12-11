/*

axios({
	url:,
	method:,
	responseType:'json'
}).then(res=>{
	console.log(res);
}).catch(error=>{
	console.error(error);
})


*/

var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
})

function empresas(){


	document.querySelector('.modal-title').innerHTML = 'Empresas Registradas:'
	document.querySelector('.modal-body').innerHTML = '';


	axios({
		url:`../../Cliente-Movil/Backend/api/empresa.php`,
		method: 'GET',
		responseType: 'json'
	}).then(res=>{
		for(let i=0; i<res.data.length; i++){
			
			document.querySelector('.modal-body').innerHTML +=`

			<div class="col-12" style="display: flex;justify-content: space-around;margin: 14px;align-content: center;">
				<h6>${i+1}) </h6>
				<h6>${res.data[i].Restaurante}</h6>
				<h6>Cantidad de Productos: ${res.data[i].Productos.length}</h6>
				<button class="btn btn-secondary" onclick="rechazarEmpresa(${i});" style="height: 34px;">Rechazar</button>
			</div>

			`;
		}


	}).catch(error=>{
		console.error(error);
	});


	myModal.show();
}



function rechazarEmpresa(indice){

	axios({
		url:`../../Cliente-Movil/Backend/api/empresa.php?indice=${indice}`,
		method:'DELETE',
		responseType:'json'
	}).then(res=>{
		empresas();
	}).catch(error=>{
		console.error(error);
	})


}



function motoristas(){

	document.querySelector('.modal-body').innerHTML = '';
	document.querySelector('.modal-title').innerHTML = 'Motoristas Registrados:'

	axios({
		url:`../../Motorista-Movil/Backend/api/motorista.php`,
		method: 'GET',
		responseType: 'json'
	}).then(res=>{
		
		for(let i=0; i<res.data.length; i++){

			document.querySelector('.modal-body').innerHTML +=`

			<div class="col-12" style="display: flex;justify-content: space-around;margin: 14px;align-content: center;">
				<h6>Motorista ${i+1}:</h6>
				<h6>${res.data[i].Nombre}</h6>
				<h6>${res.data[i].Edad}</h6>
				<button class="btn btn-secondary" onclick="rechazarMotorista(${i});">Rechazar</button>
			</div>

			`;
		}



	}).catch(error=>{
		console.error(error);
	});


	myModal.show();
}

function rechazarMotorista(indice){

	axios({

		url:`../../Motorista-Movil/Backend/api/motorista.php?indice=${indice}`,
		method:'DELETE',
		responseType:'json'

	}).then(res=>{
		
		motoristas();

	}).catch(error=>{
		console.error(error);
	})

}

function productos(){

	document.querySelector('.modal-title').innerHTML = 'Todos los Productos Registrados:'
	document.querySelector('.modal-body').innerHTML = '';


	axios({
		url:`../../Cliente-Movil/Backend/api/empresa.php`,
		method: 'GET',
		responseType: 'json'
	}).then(res=>{
		
		for(let i=0; i<res.data.length; i++){

			for(let j=0; j<res.data[i].Productos.length;j++){

				
				document.querySelector('.modal-body').innerHTML +=`

				<div class="col-12" style="display: flex;justify-content: space-around;margin: 14px;align-content: center;">
					<h6>(${i+1}.${j+1}) </h6>
					<h6>(${res.data[i].Restaurante}) ${res.data[i].Productos[j].nombreProducto}</h6>
					<button class="btn btn-secondary" style="height: 34px;" onclick="rechazarProducto(${i},${j});">Rechazar</button>
				</div>

				`;
			}
		}


	}).catch(error=>{
		console.error(error);
	});

	myModal.show();

}

function rechazarProducto(indiceEmpresa, indiceProducto){

	axios({

		url:`../../Cliente-Movil/Backend/api/empresa.php?indiceEmpresa=${indiceEmpresa}&indiceProducto=${indiceProducto}`,
		method:'DELETE',
		responseType:'json'

	}).then(res=>{
		
		productos();

	}).catch(error=>{
		console.error(error);
	})

}

function ordenes(){

	document.querySelector('.modal-title').innerHTML = 'Estas son las Ordenes a la Espera de Entrega:'
	document.querySelector('.modal-body').innerHTML = '';

	axios({
		url:`../../Motorista-Movil/Backend/api/pedidos.php`,
		method: 'GET',
		responseType: 'json'
	}).then(res=>{


			
		if(res.data.length>0){

			for(let i=0; i<res.data.length; i++){

			document.querySelector('.modal-body').innerHTML +=`

			<div class="col-12" style="display: flex;justify-content: space-around;margin: 14px;align-content: center;">
				<h6>Pedido ${i+1}:</h6>
				<h6>${res.data[i].Ubicacion}</h6>
				<h6>${res.data[i].DescripcionPedido}</h6>
				<button class="btn btn-primary" onclick="asignar('${res.data[i].Ubicacion}','${res.data[i].DescripcionPedido}','${res.data[i].Costo}','${res.data[i].imagen}',${i})">Asignar Pedido</button>
			</div>
			`;
			}
		}else{

			document.querySelector('.modal-body').innerHTML +=`

			<div class="col-12" style="display: flex;justify-content: space-around;margin: 14px;align-content: center;">
				<h6>No hay Ningun Pedido en Espera!</h6>
			</div>
			`;

		}




	}).catch(error=>{
		console.error(error);
	});

	myModal.show();

}

function asignar(nOrden,dOrden,pOrden,iOrden,indice){

		//pOrden = pOrden.toString();
		//pOrden = pOrden+"$";

		axios({
			url:`../../Motorista-Movil/Backend/api/ordenes.php`,
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
			url:`../../Motorista-Movil/Backend/api/pedidos.php?id=${indice}`,
			method: 'DELETE',
			responseType:'json'
		}).then(res=>{
			console.log(res.data);

		}).catch(error=>{
			console.error(error);
		});

		console.log('Pedido Asignado!');
		ordenes();
}