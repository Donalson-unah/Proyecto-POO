

function registro(){




	document.querySelector('.cuerpoAzul').innerHTML = `


	<div class="container" style="display:flex; justify-content:center;align-items: center;">
		<div class="row">

			<div class="registroCuadro">

				<div class=" tituloRegistro"><p>Registro</p></div>

				<p>Nombre</p>
				<input type="text" id="name" class="input" onfocus="document.querySelector('#error').innerHTML='';">

				<p>Contraseña</p>
				<input type="password" id="password" class="input" onfocus="document.querySelector('#error').innerHTML='';">

				<p>Edad</p>
				<input type="number" id="age" class="input" onfocus="document.querySelector('#error').innerHTML='';"><br>

				<div class="tipoUsuario">
						
					<select id="tipoUsuario" type="text" class="btn" style="color:black">
					<option value="none"><p style="	font-size: 18px;">Tipo de Usuario</p></option>
					<option value="cliente"><p style="	font-size: 18px;">Cliente</p></option>
					<option value="motorista"><p style="	font-size: 18px;">Motorista</p></option>
					</select>
				</div><br>

				<p style="	font-size: 18px; color:red" id="error"></p>
				<button class="col-6 btn boton" onclick="nuevoRegistro();">Registrarme</button>
			</div>

		</div>
	</div>

	`;

}


function nuevoRegistro(){

	if(document.querySelector('#tipoUsuario').value == 'motorista' && document.getElementById('name').value !='' && document.getElementById('password').value !=''){
		if(document.getElementById('age').value >=18 && document.getElementById('age').value<60){
			

			axios({
				url:`../../Motorista-Movil/Backend/api/motorista.php`,
				method: 'POST',
				responseType:'json',
				data:{
					Nombre: document.getElementById('name').value,
					Contraseña: document.getElementById('password').value,
					Edad: document.getElementById('age').value,
					Pais: "Honduras"
				}
			}).then(res=>{
		
					document.querySelector('.registroCuadro').innerHTML =`
						<h2 style="padding-top: 30px;"> Has sido registado con exito! <h2 style="color:#F45C5D;">${res.data.Nombre}</h2></h2><br>
						<h2 style ="text-align: center;"> Espera a que nuestro grupo de administradores apruebe tu registro para iniciar a trabajar!</h2>
						<button class="btn btn-primary" onclick="location.reload();">Entendido</button>
					`;
		
				}).catch(error=>{
					console.error(error);
			})

		}

		

		else{
			document.querySelector('#error').innerHTML = 'Debes ser mayor de 18 años para registrarte!'
		}	

	}
	else if(document.getElementById('age').value >=18 && document.getElementById('age').value<60 && document.querySelector('#tipoUsuario').value == 'cliente' && document.getElementById('name').value !='' && document.getElementById('password').value !='' ){

			axios({
				url:`../../Cliente-Movil/Backend/api/cliente.php`,
				method: 'POST',
				responseType:'json',
				data:{
					Nombre: document.getElementById('name').value,
					Contraseña: document.getElementById('password').value,
					Edad: document.getElementById('age').value,
					Pais: "Honduras"
				}
			}).then(res=>{
		
					document.querySelector('.registroCuadro').innerHTML =`
						<h2 style="padding-top: 30px;"> Has sido registado con exito! <h2 style="color:#F45C5D;">${res.data.Nombre}</h2></h2><br>
						<h2 style ="text-align: center;"> Espera a que nuestro grupo de administradores apruebe tu registro para iniciar a trabajar!</h2>
						<button class="btn btn-primary" onclick="location.reload();">Entendido</button>
					`;
		
				}).catch(error=>{
					console.error(error);
			})
	}

	else{
		document.querySelector('#error').innerHTML = 'Revisa si llenaste bien todos los campos!';
	}

}

function iniciaSesion(){


	document.querySelector('.cuerpoAzul').innerHTML = `


	<div class="container" style="display:flex; justify-content:center;align-items: center;">
		<div class="row">

			<div class="registroCuadro">

				<div class=" tituloRegistro"><p>Inicia Sesion</p></div>

				<p>Nombre</p>
				<input type="text" id="name" class="input" >

				<p>Contraseña</p>
				<input type="password" id="password" class="input" >

				<p style="	font-size: 18px; color:red" id="error"></p>
				<button class="col-6 btn boton" onclick="validar();">Iniciar Sesion</button>
			</div>

		</div>
	</div>

	`;

}

var impresion = true;
function validar(){

	axios({
		url:`../../Cliente-Movil/Backend/api/cliente.php?name=${document.getElementById('name').value}&password=${document.getElementById('password').value}`,
		method: 'GET',
		responseType:'json',
	}).then(res=>{
		if(res.data){
			impresion = res.data;
			window.location.href = "http://localhost/Falcon-Delivery/Cliente-Movil/Frontend/index.html";
		}

	}).catch(error=>{
		console.error(error);
	})

	axios({
		url:`../../Motorista-Movil/Backend/api/motorista.php?name=${document.getElementById('name').value}&password=${document.getElementById('password').value}`,
		method: 'GET',
		responseType:'json',
	}).then(res=>{
		if(res.data){
			impresion = res.data;
			window.location.href = "http://localhost/Falcon-Delivery/Motorista-Movil/Frontend/index.html";
		}


	}).catch(error=>{
		console.error(error);
	})

	axios({
		url:`../../Admin/Backend/api/admin.php?name=${document.getElementById('name').value}&password=${document.getElementById('password').value}`,
		method: 'GET',
		responseType:'json',
	}).then(res=>{
		console.log(res);
		if(res.data){
			impresion = res.data;
			window.location.href = "http://localhost/Falcon-Delivery/Admin/Frontend/index.html";
		}d

	}).catch(error=>{
		console.error(error);
	})

	
	//if(impresion)
	//document.getElementById('error').innerHTML = 'Usuario o Contraseña incorrecto!';

}