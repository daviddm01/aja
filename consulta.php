<?php
// hay que ponerlo para asegurarnos el paso de informacion a javascript
header('Content-type: application/json; charset=utf8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
// Conexión a la base de datos usando PDO
$dbHost = 'localhost';
$dbName = 'producto'; //nombre de base de datos
$dbUser = 'root';
$dbPass = '';

try {
    $conexion = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

} catch (PDOException $ex) {
    echo '<div class="alert alert-danger">' . "No se pudo conectar a la Base de Datos de usuarios!! :( <br/>" . $ex->getMessage() . '</div>';
}

//Definimos la instrucción SQL parametrizada 
    if(isset($_POST)){
        $codigo=$_POST['code'];
    $sql = "SELECT * FROM productos WHERE codigo = $codigo";
    $result=mysqli_query($conexion,$sql);
    if(mysqli_num_rows($result) == 0){
        $arreglo["data"][] = ["codigo"=>"0 registros", "descripcion"=>"sin datos", "precio"=>"0"];
    }else{
        while($data=mysqli_fetch_assoc($result)){
            $arreglo["data"][]=$data;
        }
        
    }
    }




    echo json_encode($arreglo);
    mysqli_free_result($result);
    mysqli_close($conexion);


?>
