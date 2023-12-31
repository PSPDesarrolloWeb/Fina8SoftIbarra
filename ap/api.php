<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type,Authorization, Accept, X-Request-Width, x-xsrf-token');
header('ContentType: application/json; charset=utf-8');

include ('bd.php');
$respone=array();
$post=json_decode(file_get_contents('php://input'),true);

////////////////////////////////////////////////CRUD EMPLEADOS//////////////////////////////////////////////////
///////////////////-----------------------------LISTAR EMPLEADOS---------------//////////////////////////
if ($post['accion'] == 'listarEmpleados') {
    $sentencia = "SELECT e.*, CONCAT(j.nombre, ' ', j.apellido1) AS nombre_completo_jefe
    FROM empleado e
    LEFT JOIN empleado j ON e.codigo_jefe = j.codigo_empleado
    ORDER BY e.nombre ASC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $empleados = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($empleados, array(
            'codigo' => $row['codigo_empleado'],
            'nombre' => $row['nombre'],
            'apellido1' => $row['apellido1'],
            'apellido2' => $row['apellido2'],
            'extension' => $row['extension'],
            'email' => $row['email'],
            'oficina' => $row['codigo_oficina'],
            'jefe' => $row['nombre_completo_jefe'],
            'puesto' => $row['puesto'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'empleados'=>$empleados));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}




///////////////////////------------AÑADIR EMPLEADO---------/////////////////////
if ($post['accion']=='addEmpleado'){
    $sentencia = sprintf(
        "INSERT INTO empleado (
            nombre, apellido1, apellido2, extension,
            email, codigo_oficina, codigo_jefe, puesto
        ) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        $post['nombre'],$post['apellido1'],$post['apellido2'],$post['extension'],$post['email'],
        $post['idOficina'],$post['idJefe'],$post['puesto']);
    

$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}

///////////////////-------------------CARGAR DATOS DEL EMPLEADO---------------///////////////////
if ($post['accion'] == 'cargarDatosEmpleado') {

    $idEmpleado = $post['idEmpleado'];
    $sentencia = "SELECT * FROM empleado WHERE codigo_empleado = '$idEmpleado'";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $datosEmpleado = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($datosEmpleado, array(
            'codigo' => $row['codigo_empleado'],
            'nombre' => $row['nombre'],
            'apellido1' => $row['apellido1'],
            'apellido2' => $row['apellido2'],
            'extension' => $row['extension'],
            'email' => $row['email'],
            'oficina' => $row['codigo_oficina'],
            'jefe' => $row['codigo_jefe'],
            'puesto' => $row['puesto'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'datosEmpleado'=>$datosEmpleado));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}

/////////////////-----------ACTUALIZAR EMPLEADO--------------///////////
if ($post['accion'] == 'updateEmpleado') {
    $sentencia = sprintf(
        "UPDATE empleado SET 
        nombre='%s', apellido1='%s', apellido2='%s', extension='%s',
        email='%s', codigo_oficina='%s', codigo_jefe='%s', puesto='%s'
        WHERE codigo_empleado='%s'",
        $post['nombre'],$post['apellido1'],$post['apellido2'],$post['extension'],$post['email'],$post['idOficina'],
        $post['idJefe'],$post['puesto'],$post['idEmpleado']
    );
    $result = mysqli_query($mysql, $sentencia);
    if ($result) {
        $envio = json_encode(array('estado' => true));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}

/////////////////-----------ELIMINAR EMPLEADO--------------///////////
if ($post['accion']=='deleteEmpleado')
{
$sentencia =sprintf(
    "DELETE FROM empleado WHERE codigo_empleado='%s'",$post['idEmpleado']);
$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}

////////////////////////////////////////////////CRUD CLIENTES//////////////////////////////////////////////////
///////////////////-----------------------------LISTAR CLIENTES---------------//////////////////////////
if ($post['accion'] == 'listarClientes') {
    $sentencia = "SELECT c.*, CONCAT(e.nombre, ' ', e.apellido1) AS nombre_rep_ventas
                 FROM cliente c
                 LEFT JOIN empleado e ON c.codigo_empleado_rep_ventas = e.codigo_empleado ORDER BY codigo_cliente DESC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $clientes = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($clientes, array(
            'id' => $row['codigo_cliente'],
            'nombre1'  => $row['nombre_cliente'],
            'nombre2'  => $row['nombre_contacto'],
            'apellido'  => $row['apellido_contacto'],
            'telefono'  => $row['telefono'],
            'fax'  => $row['fax'],
            'dir1'  => $row['linea_direccion1'],
            'dir2'  => $row['linea_direccion2'],
            'ciudad'  => $row['ciudad'],
            'region'  => $row['region'],
            'pais'  => $row['pais'],
            'cpostal'  => $row['codigo_postal'],
            'emprep'  => $row['codigo_empleado_rep_ventas'],
            'nombre_rep_ventas'  => $row['nombre_rep_ventas'], // Nuevo campo agregado
            'limitecred'  => $row['limite_credito'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'clientes'=>$clientes));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}



///////////////////////------------AÑADIR CLIENTE---------/////////////////////
if ($post['accion']=='addCliente'){
    $sentencia = sprintf(
        "INSERT INTO cliente (
        nombre_cliente, nombre_contacto, apellido_contacto,
        telefono, fax, linea_direccion1, linea_direccion2,
        ciudad, region, pais, codigo_postal,
        codigo_empleado_rep_ventas, limite_credito
        ) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        $post['nombre1'],$post['nombre2'],$post['apellido'],$post['telefono'],$post['fax'],
        $post['dir1'],$post['dir2'],$post['ciudad'],$post['region'],$post['pais'],$post['cpostal'],
        $post['emprep'],$post['limitecred']);
    

$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}

///////////////////-------------------CARGAR DATOS DEL CLIENTE---------------///////////////////
if ($post['accion'] == 'cargarDatosCliente') {
    $idCliente = $post['idCliente'];
    $sentencia = "SELECT * FROM cliente WHERE codigo_cliente = '$idCliente'";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $datosCliente = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($datosCliente, array(
            'id' => $row['codigo_cliente'],
            'nombre'  => $row['nombre_cliente'],
            'nombre1'  => $row['nombre_contacto'],
            'apellido'  => $row['apellido_contacto'],
            'telefono'  => $row['telefono'],
            'fax'  => $row['fax'],
            'dir1'  => $row['linea_direccion1'],
            'dir2'  => $row['linea_direccion2'],
            'ciudad'  => $row['ciudad'],
            'region'  => $row['region'],
            'pais'  => $row['pais'],
            'cpostal'  => $row['codigo_postal'],
            'emprep'  => $row['codigo_empleado_rep_ventas'],
            'limitecred'  => $row['limite_credito'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'datosCliente'=>$datosCliente));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}

/////////////////-----------ACTUALIZAR CLIENTE--------------///////////
if ($post['accion'] == 'updateCliente') {
    $sentencia = sprintf(
        "UPDATE cliente SET 
        nombre_cliente='%s', nombre_contacto='%s', apellido_contacto='%s',
        telefono='%s', fax='%s', linea_direccion1='%s', linea_direccion2='%s',
        ciudad='%s', region='%s', pais='%s', codigo_postal='%s',
        codigo_empleado_rep_ventas='%s', limite_credito='%s'
        WHERE codigo_cliente='%s'",
        $post['nombre1'],$post['nombre2'],$post['apellido'],$post['telefono'],$post['fax'],
        $post['dir1'],$post['dir2'],$post['ciudad'],$post['region'],$post['pais'],$post['cpostal'],
        $post['emprep'],$post['limitecred'],$post['idCliente']
    );
    $result = mysqli_query($mysql, $sentencia);
    if ($result) {
        $envio = json_encode(array('estado' => true));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}

/////////////////-----------ELIMINAR CLIENTE--------------///////////
if ($post['accion']=='deleteCliente')
{
$sentencia =sprintf(
    "DELETE FROM cliente WHERE codigo_cliente='%s'",$post['idCliente']);
$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}

//////////////////////////////////////////CRUD OFICINA////////////////////////////////////////////////////////
///////////////////-----------------------------LISTAR OFICINA---------------//////////////////////////
if ($post['accion'] == 'listarOficinas') {
    $sentencia = "SELECT * FROM oficina ORDER BY codigo_oficina ASC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $oficinas = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($oficinas, array(
            'codigo' => $row['codigo_oficina'],
            'ciudad' => $row['ciudad'],
            'pais' => $row['pais'],
            'region' => $row['region'],
            'cpostal' => $row['codigo_postal'],
            'telefono' => $row['telefono'],
            'dir1' => $row['linea_direccion1'],
            'dir2' => $row['linea_direccion2'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'oficinas'=>$oficinas));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}
///////////////////////------------AÑADIR OFICINA---------/////////////////////
if ($post['accion']=='addOficina'){
    $sentencia = sprintf(
        "INSERT INTO oficina (
        codigo_oficina, ciudad, pais,
        region, codigo_postal, telefono, linea_direccion1,
        linea_direccion2
        ) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        $post['codigo'],$post['ciudad'],$post['pais'],$post['region'],$post['cpostal'],
        $post['telefono'],$post['dir1'],$post['dir2']);
    

$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}


///////////////////-------------------CARGAR DATOS OFICINA---------------///////////////////
if ($post['accion'] == 'cargarDatosOficina') {
    $idOficina = $post['idOficina'];
    $sentencia = "SELECT * FROM oficina WHERE codigo_oficina = '$idOficina'";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $datosOficina = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($datosOficina, array(
            'codigo' => $row['codigo_oficina'],
            'ciudad' => $row['ciudad'],
            'pais' => $row['pais'],
            'region' => $row['region'],
            'cpostal' => $row['codigo_postal'],
            'telefono' => $row['telefono'],
            'dir1' => $row['linea_direccion1'],
            'dir2' => $row['linea_direccion2'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'datosOficina'=>$datosOficina));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}
/////////////////-----------ACTUALIZAR OICINA--------------///////////
if ($post['accion'] == 'updateOficina') {
    $sentencia = sprintf(
        "UPDATE oficina SET 
        codigo_oficina='%s', ciudad='%s', pais='%s',
        region='%s', codigo_postal='%s', telefono='%s', linea_direccion1='%s',
        linea_direccion2='%s'
        WHERE codigo_oficina='%s'",
        $post['codigo'],$post['ciudad'],$post['pais'],$post['region'],$post['cpostal'],
        $post['telefono'],$post['dir1'],$post['dir2'],$post['idOficina'] );
    $result = mysqli_query($mysql, $sentencia);
    if ($result) {
        $envio = json_encode(array('estado' => true));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}
/////////////////-----------ELIMINAR OFICINA--------------///////////
if ($post['accion']=='deleteOficina')
{
$sentencia =sprintf(
    "DELETE FROM oficina WHERE codigo_oficina='%s'",$post['idOficina']);
$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}


//////////////////////////////////////////////CRUD DE PAGOS ////////////////////////////////////////////////////
///////////////////-----------------------------LISTAR PAGOS---------------//////////////////////////


if ($post['accion'] == 'listarPagos') {
    $sentencia = "SELECT p.*, c.nombre_cliente 
    FROM pago p
    INNER JOIN cliente c ON p.codigo_cliente = c.codigo_cliente
    ORDER BY p.fecha_pago DESC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $pagos = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($pagos, array(
            'codigo' => $row['id_transaccion'],
            'forma_pago' => $row['forma_pago'],
            'cliente' => $row['nombre_cliente'],
            'fecha_pago' => $row['fecha_pago'],
            'total' => $row['total'],           
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'pagos'=>$pagos));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}


///////////////////////------------AÑADIR PAGO---------/////////////////////
if ($post['accion']=='addPago'){
    $sentencia = sprintf(
        "INSERT INTO pago (
        forma_pago, codigo_cliente, fecha_pago,
        total
        ) values ('%s', '%s', '%s', '%s');",
        $post['forma_pago'],$post['codigo_cliente'],$post['fecha_pago'],$post['total']);
    

        $result=mysqli_query($mysql,$sentencia);
        if($result)
        {
            $envio=json_encode(array('estado'=>true));
        }
        else
        {
            $envio=json_encode(array('estado'=>false));
        }
        echo $envio;
        }




///////////////////-------------------CARGAR DATOS DEL PAGO---------------///////////////////
if ($post['accion'] == 'cargarDatosPago') {
    $idPago = $post['idPago'];
    $sentencia = "SELECT * FROM pago WHERE id_transaccion = '$idPago'";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $datosPago = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($datosPago, array(
            'id' => $row['id_transaccion'],
            'forma_pago'  => $row['forma_pago'],
            'codigo_cliente'  => $row['codigo_cliente'],
            'fecha_pago'  => $row['fecha_pago'],
            'total'  => $row['total'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'datosPago'=>$datosPago));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}

/* ----------------EDITAR PAGOS-------------------- */
if ($post['accion'] == 'updatePago') {
    $sentencia = sprintf(
        "UPDATE pago SET 
        forma_pago= '%s', codigo_cliente='%s', fecha_pago='%s',
        total='%s' WHERE id_transaccion='%s'",
        $post['forma_pago'],$post['codigo_cliente'],$post['fecha_pago'],$post['total'],$post['idPago']
    );
    $result = mysqli_query($mysql, $sentencia);
    if ($result) {
        $envio = json_encode(array('estado' => true));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}



/////////////////-----------ELIMINAR PAGO--------------///////////
if ($post['accion']=='deletePago')
{
$sentencia =sprintf(
    "DELETE FROM pago WHERE id_transaccion='%s'",$post['idPago']);
$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}


// nueva tabla pedidos


//////////////////////////////////////////////CRUD DE PEDIDOS ////////////////////////////////////////////////////
///////////////////-----------------------------LISTAR PEDIDOS---------------//////////////////////////


if ($post['accion'] == 'listarPedidos') {
    $sentencia = "SELECT p.*, c.nombre_cliente 
                 FROM pedido p
                 INNER JOIN cliente c ON p.codigo_cliente = c.codigo_cliente
                 ORDER BY p.codigo_pedido DESC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $pedidos = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($pedidos, array(
            'codigo' => $row['codigo_pedido'],
            'fecha_pedido' => $row['fecha_pedido'],
            'fecha_esperada' => $row['fecha_esperada'],
            'fecha_entrega' => $row['fecha_entrega'],
            'estado' => $row['estado'],           
            'comentarios' => $row['comentarios'],           
            'nombre_cliente' => $row['nombre_cliente'], // Cambiamos 'codigo_cliente' por 'nombre_cliente'
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado' => true, 'pedidos' => $pedidos));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}




///////////////////////------------AÑADIR PEDIDOS---------/////////////////////
if ($post['accion']=='addPedido'){
    $sentencia = sprintf(
        "INSERT INTO pedido (
        fecha_pedido, fecha_esperada, fecha_entrega,
        estado,comentarios,codigo_cliente
        ) values ('%s', '%s', '%s', '%s', '%s', '%s');",
        $post['fecha_pedido'],$post['fecha_esperada'],$post['fecha_entrega'],$post['estado'],$post['comentarios'],$post['codigo_cliente']);
    

        $result=mysqli_query($mysql,$sentencia);
        if($result)
        {
            $envio=json_encode(array('estado'=>true));
        }
        else
        {
            $envio=json_encode(array('estado'=>false));
        }
        echo $envio;
        }


        //Cargar pedidos
if ($post['accion'] == 'cargarDatosPedido') {
    $idPedido = $post['idPedido'];
    $sentencia = "SELECT * FROM pedido WHERE codigo_pedido = '$idPedido'";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $datosPedido = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($datosPedido, array(
            'id' => $row['codigo_pedido'],
            'fecha_pedido'  => $row['fecha_pedido'],
            'fecha_esperada'  => $row['fecha_esperada'],
            'fecha_entrega'  => $row['fecha_entrega'],
            'estado'  => $row['estado'],
            'comentarios'  => $row['comentarios'],
            'codigo_cliente'  => $row['codigo_cliente'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'datosPedido'=>$datosPedido));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}

/* ----------------EDITAR PEDIDOS-------------------- */
if ($post['accion'] == 'updatePedido') {
    $sentencia = sprintf(
        "UPDATE pedido SET 
        fecha_pedido= '%s', fecha_esperada='%s', fecha_entrega='%s', estado='%s',
        comentarios='%s', codigo_cliente='%s' WHERE codigo_pedido='%s'",
        $post['fecha_pedido'],$post['fecha_esperada'],$post['fecha_entrega'],$post['estado'],$post['comentarios'],$post['codigo_cliente'] ,$post['idPedido']
    );
    $result = mysqli_query($mysql, $sentencia);
    if ($result) {
        $envio = json_encode(array('estado' => true));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}

//////////////////////////////////ELIMINAR PEDIDOS//////////////////////////////////////
if ($post['accion'] == 'deletePedido') {
    $idPedido = $post['idPedido'];
            mysqli_begin_transaction($mysql);
            $sentenciaDetalle = sprintf(
        "DELETE FROM detalle_pedido WHERE codigo_pedido='%s'",
        $idPedido
    );
    $resultDetalle = mysqli_query($mysql, $sentenciaDetalle);

    if ($resultDetalle) {
        $sentenciaPedido = sprintf(
            "DELETE FROM pedido WHERE codigo_pedido='%s'",
            $idPedido
        );
        $resultPedido = mysqli_query($mysql, $sentenciaPedido);

        if ($resultPedido) {
            mysqli_commit($mysql);
            $envio = json_encode(array('estado' => true));
        } else {
            mysqli_rollback($mysql);
            $envio = json_encode(array('estado' => false));
        }
    } else {
        mysqli_rollback($mysql);
        $envio = json_encode(array('estado' => false));
    }

    echo $envio;
}


//////////////////////////////////////////////CRUD DE DETALLE_PEDIDOS ////////////////////////////////////////////////////
///////////////////-----------------------------LISTAR DETALLE_PEDIDOS---------------//////////////////////////


if ($post['accion'] == 'listarDetalles') {
    $sentencia = "SELECT * FROM detalle_pedido ORDER BY codigo_pedido ASC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $detalles = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($detalles, array(
            'codigo_pedido' => $row['codigo_pedido'],
            'codigo_producto' => $row['codigo_producto'],
            'cantidad' => $row['cantidad'],
            'precio_unidad' => $row['precio_unidad'],           
            'numero_linea' => $row['numero_linea'],           
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'detalles'=>$detalles));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}



///////////////////////------------AÑADIR DETALLE---------/////////////////////
if ($post['accion']=='addDetalle'){
    $sentencia = sprintf(
        "INSERT INTO detalle_pedido (
        codigo_pedido, codigo_producto,cantidad,
        precio_unidad,numero_linea
        ) values ('%s', '%s', '%s', '%s', '%s');",
        $post['codigo_pedido'],$post['codigo_producto'],$post['cantidad'],$post['precio_unidad'],$post['numero_linea']);
    

        $result=mysqli_query($mysql,$sentencia);
        if($result)
        {
            $envio=json_encode(array('estado'=>true));
        }
        else
        {
            $envio=json_encode(array('estado'=>false));
        }
        echo $envio;
        }


//listar de prodcutos y pedidos 

if ($post['accion'] == 'listarProductos') {
    $sentencia = "SELECT * FROM producto ORDER BY nombre ASC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $productos = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($productos, array(
            'codigo' => $row['codigo_producto'],
            'nombre' => $row['nombre'],
            'gama' => $row['gama'],
            'dim' => $row['dimensiones'],
            'prov' => $row['proveedor'],
            'desc' => $row['descripcion'],
            'stock' => $row['cantidad_en_stock'],
            'pv' => $row['precio_venta'],
            'pvp' => $row['precio_proveedor'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'productos'=>$productos));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}

//////////////////////------------AÑADIR PRODUCTO---------/////////////////////
if ($post['accion']=='addProducto'){
    $sentencia = sprintf(
        "INSERT INTO producto (
        codigo_producto, nombre, gama, dimensiones, proveedor, descripcion, cantidad_en_stock,
        precio_venta, precio_proveedor
        ) values ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        $post['codprod'],$post['nombre'],$post['gama'],
        $post['dim'],$post['prov'],$post['desc'],$post['stock'],
        $post['pv'],$post['pvp']);
    

        $result=mysqli_query($mysql,$sentencia);
        if($result)
        {
            $envio=json_encode(array('estado'=>true));
        }
        else
        {
            $envio=json_encode(array('estado'=>false));
        }
        echo $envio;
        }

        ///////////////////-------------------CARGAR DATOS DEL PRODUCTO---------------///////////////////
if ($post['accion'] == 'cargarDatosProducto') {
    $idProducto = $post['idProducto'];
    $sentencia = "SELECT * FROM producto WHERE codigo_producto = '$idProducto'";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $datosProducto = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($datosProducto, array(
            'codigo' => $row['codigo_producto'],
            'nombre' => $row['nombre'],
            'gama' => $row['gama'],
            'dim' => $row['dimensiones'],
            'prov' => $row['proveedor'],
            'desc' => $row['descripcion'],
            'stock' => $row['cantidad_en_stock'],
            'pv' => $row['precio_venta'],
            'pvp' => $row['precio_proveedor'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'datosProducto'=>$datosProducto));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}

/////////////////-----------ACTUALIZAR PRODUCTO--------------///////////
if ($post['accion'] == 'updateProducto') {
    $sentencia = sprintf(
        "UPDATE producto SET 
        codigo_producto='%s', nombre='%s', gama='%s', dimensiones='%s', proveedor='%s', descripcion='%s',
        cantidad_en_stock='%s', precio_venta='%s', precio_proveedor='%s'
        WHERE codigo_producto='%s'",
        $post['codprod'],$post['nombre'],$post['gama'],$post['dim'],$post['prov'],
        $post['desc'],$post['stock'],$post['pv'],$post['pvp'],$post['idProducto']
    );
    $result = mysqli_query($mysql, $sentencia);
    if ($result) {
        $envio = json_encode(array('estado' => true));
    } else {
        $envio = json_encode(array('estado' => false));
    }
    echo $envio;
}


/////////////////-----------ELIMINAR PRODUCTO--------------///////////
if ($post['accion']=='deleteProducto')
{
$sentencia =sprintf(
    "DELETE FROM producto WHERE codigo_producto='%s'",$post['idProducto']);
$result=mysqli_query($mysql,$sentencia);
if($result)
{
    $envio=json_encode(array('estado'=>true));
}
else
{
    $envio=json_encode(array('estado'=>false));
}
echo $envio;
}

//////////////////////////////////CRUD GAMA///////////////////////////////////////
////////////////////-------------LISTAR GAMAS------------------------////////////////////
if ($post['accion'] == 'listarGamas') {
    $sentencia = "SELECT * FROM gama_producto ORDER BY gama ASC;";
    $result = mysqli_query($mysql, $sentencia);
    $f = mysqli_num_rows($result);
    $gamas = array();
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($gamas, array(
            'gama' => $row['gama'],
            'desc' => $row['descripcion_texto'],
            'descht' => $row['descripcion_html'],
            'img' => $row['imagen'],
        ));
    }
    if ($f > 0) {
        $envio = json_encode(array('estado'=>true, 'gamas'=>$gamas));
    } else {
        $envio = json_encode(array('estado'=>false));
    }
    echo $envio;
}


?>


  