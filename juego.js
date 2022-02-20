function crearTablero(dim, prob) {
	// creo el arreglo
	var tablero = new Array(dimTablero);
	for (var i = 0; i < tablero.length; i++)
		tablero[i] = new Array(dimTablero);

	// lo inicializo
	for (var i = 0; i < dim; i++)
		for (var j = 0; j < dim; j++)
			if (Math.random() < prob/100) // deflacto
				tablero[i][j] = 1;
			else
				tablero[i][j] = 0;

			return tablero;
}


function dibujarTablero(tableData) {
	// borro todo lo anterior
	$("#tablero tr").remove();

	// dibujo
	var table = document.getElementById('tablero');
	var tableBody = document.createElement('tbody');

	tableData.forEach(function(rowData) {
		var row = document.createElement('tr');

		rowData.forEach(function(cellData) {
			var cell = document.createElement('td');

			if (cellData == 0) {
				cell.appendChild(document.createTextNode("\xa0"));
				cell.style.backgroundColor = "#ffffff";
			} else if (cellData == 1){
				cell.appendChild(document.createTextNode("P"));
				cell.style.backgroundColor = "#ff2c2c";
			} else {
				cell.appendChild(document.createTextNode("C"));
				cell.style.backgroundColor = "#71cd48";
			}

			row.appendChild(cell);
		});

		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);
	table = tableBody;
}


function hayCamino(tablero, inicio_i, inicio_j, fin_i, fin_j){
	if (objTablero.tablero[fin_i][fin_j] == 1)
		return false;
	else if ((inicio_i >= dimTablero || inicio_j >= dimTablero) || (inicio_i < 0 || inicio_j < 0))
		return false;
	else if (objTablero.tablero[inicio_i][inicio_j] != 0)
		return false;
	else if (inicio_i == fin_i && inicio_j == fin_j) {
		objTablero.tablero[inicio_i][inicio_j] = 2;
		ruta.push("(" + inicio_i + "," + inicio_j + ")");
		return true;
	} else {
		objTablero.tablero[inicio_i][inicio_j] = 2;
		ruta.push("(" + inicio_i + "," + inicio_j + ")");

		var der = hayCamino(tablero, inicio_i, inicio_j+1, fin_i, fin_j);
		if (!der){
			var aba = hayCamino(tablero, inicio_i+1, inicio_j, fin_i, fin_j);
			if (!aba){
				var izq = hayCamino(tablero, inicio_i, inicio_j-1, fin_i, fin_j);
				if (!izq){
					var arr = hayCamino(tablero, inicio_i-1, inicio_j, fin_i, fin_j);
					if (!arr){
						objTablero.tablero[inicio_i][inicio_j] = 0;
						ruta.pop();
						return false;
					}
				}
			}
		}
		return true;
	}
}

function invocarDibujarTablero(){
	dimTablero = parseInt(document.getElementById("dim").value);
	probPeones = parseInt(document.getElementById("prob").value);
	objTablero = { tablero : crearTablero(dimTablero, probPeones)};
	dibujarTablero(objTablero.tablero);
	document.getElementById("res").innerHTML = "";
	$( "#titulo_tablero" ).show();

	// borro rutas
	ruta = [];
	$("#lista_ruta li").remove();
	$("#titulo_ruta").hide();

	$("#btn_jugar").show();
}

function invocarJugar(){
	// capturo valores al momento de la jugada
	iInicial = parseInt(document.getElementById("iInicial").value);
	jInicial = parseInt(document.getElementById("jInicial").value);
	iFinal = parseInt(document.getElementById("iFinal").value);
	jFinal = parseInt(document.getElementById("jFinal").value);

	resultado = hayCamino(objTablero, iInicial, jInicial, iFinal, jFinal)
	dibujarTablero(objTablero.tablero);

	if (resultado){
		document.getElementById("res").innerHTML = "SÍ hay camino.";
		$("#titulo_ruta").show();
	} else
	document.getElementById("res").innerHTML = "NO hay camino.";

	ruta.forEach(function(currentValue, index, array){
		var ul = document.getElementById("lista_ruta");
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(currentValue));
		ul.appendChild(li);
	});

	ruta = [];

	$("#btn_jugar").hide();
}
