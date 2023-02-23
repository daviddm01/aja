<?php

// hay que ponerlo para asegurarnos el paso de informacion a javascript
header('Content-type: application/json; charset=utf8');
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
    $sql = "SELECT * FROM productos";
    $result=mysqli_query($conexion,$sql);
    if(!$result){
        die("error");
    

    }else{
        while($data=mysqli_fetch_assoc($result)){
            $arreglo["data"][]=$data;
        }
        echo json_encode($arreglo);
    }
    mysqli_free_result($result);
    mysqli_close($conexion);


?>