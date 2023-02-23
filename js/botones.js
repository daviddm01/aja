document.getElementById("btnAyuda").addEventListener("click", function () {
  window.open(
    ".\\tablaAyuda.html",
    "Listado De productos",
    "width=600, height=600"
  );
});



// añadimos los productos a la lista
const formulario = document.getElementById("formulario");
var subTotal=0;
var iva=0;
var total=0;

formulario.addEventListener("submit", function (event) {
  var codigo=document.getElementById("code").value;
  var cantidad = document.getElementById("cant").value;
  // previene el comportamiento por defecto del formulario
  event.preventDefault();

  var http = new XMLHttpRequest();
  http.open("POST", ".\\consulta.php", true); // URL del archivo PHP que procesa el formulario
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      var datos = JSON.parse(http.responseText); // parseamos el json
      var productos = datos.data;
      console.log(productos);
      var fila = document.createElement("tr");
      var codigo = document.createElement("td");
      codigo.innerHTML = productos[0].codigo;
      var cantidadC = document.createElement("td");
      cantidadC.innerHTML = cantidad;
      var descripcion = document.createElement("td");
      descripcion.innerHTML = productos[0].descripcion;
      var precioU = document.createElement("td");
      precioU.innerHTML = productos[0].precio;
      var precioT = document.createElement("td");
      precioT.innerHTML = productos[0].precio * cantidad;
      subTotal+=parseFloat(precioT.innerText);
      iva=subTotal*0.21;
      total=iva+subTotal;

      fila.appendChild(codigo);
      fila.appendChild(cantidadC);
      fila.appendChild(descripcion);
      fila.appendChild(precioU);
      fila.appendChild(precioT);
      document.getElementById("Subtotal").innerHTML=subTotal.toFixed(2);
      document.getElementById("iva").innerHTML=iva.toFixed(2);
      document.getElementById("Total").innerHTML=total.toFixed(2);

      document.getElementById("tablaFacturaBody1").appendChild(fila);

    }
  };
  
  http.send("code="+codigo);
});


document.getElementById("btnLimpiar").addEventListener("click", function () {
   subTotal=0;
   iva=0;
   total=0;
   
   var tbody1=document.getElementById("tablaLimpiar1");
   while (tbody1.firstChild) {
    tbody1.removeChild(tbody1.firstChild);
  }


  var tbodyNuevo1 =document.createElement("tbody");
  tbodyNuevo1.setAttribute("id","tablaFacturaBody1");
  tbody1.appendChild(tbodyNuevo1);

  document.getElementById("Subtotal").innerHTML=subTotal.toFixed(2);
  document.getElementById("iva").innerHTML=iva.toFixed(2);
  document.getElementById("Total").innerHTML=total.toFixed(2);




});
