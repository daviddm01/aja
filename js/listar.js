var http = new XMLHttpRequest();
http.open(
  "GET",
  ".\\consulta2.php", //datos en json de la consulta
  true
);
http.onreadystatechange = function () {
  if (http.readyState === 4 && http.status === 200) {
    var datos = JSON.parse(http.responseText); // parseamos el json
    var productos = datos.data;
    console.log(productos);
    for (var i = 0; i < productos.length; i++) {
      var fila = document.createElement("tr");
      var codigo = document.createElement("td");
      codigo.innerHTML = productos[i].codigo;
      var descripcion = document.createElement("td");
      descripcion.innerHTML = productos[i].descripcion;
      var precio = document.createElement("td");
      precio.innerHTML = productos[i].precio;

      fila.appendChild(codigo);
      fila.appendChild(descripcion);
      fila.appendChild(precio);
      document.getElementById("tablaProductosBody").appendChild(fila);


    }
  }
};
http.send();
