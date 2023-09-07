import { PagosComponent } from './../../Pages/pagos/pagos.component';
import { Routes } from '@angular/router';


import { ClientesComponent } from '../../Pages/clientes/clientes.component';
import { NuevoClienteComponent } from '../../Pages/clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from '../../Pages/clientes/editar-cliente/editar-cliente.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { EmpleadosComponent } from '../../Pages/empleados/empleados.component';
import { NuevoEmpleadoComponent } from '../../Pages/empleados/nuevo-empleado/nuevo-empleado.component';
import { EditarEmpleadoComponent } from '../../Pages/empleados/editar-empleado/editar-empleado.component';

//importar 

import { NuevoPagoComponent } from '../../Pages/pagos/nuevo-pago/nuevo-pago.component';
import { EditarPagoComponent } from '../../Pages/pagos/editar-pago/editar-pago.component';


import { PedidosComponent } from '../../Pages/pedidos/pedidos.component';
import { DetallesComponent } from '../../Pages/detalles/detalles.component';


import { NuevoPedidoComponent } from '../../Pages/pedidos/nuevo-pedido/nuevo-pedido.component';

import { NuevoDetalleComponent } from '../../Pages/detalles/nuevo-detalle/nuevo-detalle.component';
import { ProductosComponent } from '../../Pages/productos/productos.component';
import { NuevoProductoComponent } from '../../Pages/productos/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from '../../Pages/productos/editar-producto/editar-producto.component';
import { EditarPedidoComponent } from '../../Pages/pedidos/editar-pedido/editar-pedido.component';
import { OficinasComponent } from '../../Pages/oficinas/oficinas.component';
import { NuevaOficinaComponent } from '../../Pages/oficinas/nueva-oficina/nueva-oficina.component';
import { EditarOficinaComponent } from '../../Pages/oficinas/editar-oficina/editar-oficina.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',    component: DashboardComponent },

    { path: 'empleados',    component: EmpleadosComponent },
    { path: 'nuevo-empleado',    component: NuevoEmpleadoComponent },
    { path: 'editar-empleado/:id',    component: EditarEmpleadoComponent },

    { path: 'oficinas',    component: OficinasComponent },
    { path: 'nueva-oficina',    component: NuevaOficinaComponent },
    { path: 'editar-oficina/:codigo',    component: EditarOficinaComponent },

    { path: 'clientes',    component: ClientesComponent },
    { path: 'nuevo-cliente',    component: NuevoClienteComponent },
    { path: 'editar-cliente/:id',    component: EditarClienteComponent },

    { path: 'productos',    component: ProductosComponent },
    { path: 'nuevo-producto',    component: NuevoProductoComponent },
    { path: 'editar-producto/:codigo',    component: EditarProductoComponent },
    
    { path: 'editar-pago/:codigo',    component: EditarPagoComponent },

    // ventanas 
    { path: 'pagos',    component: PagosComponent },

    { path: 'pedidos',    component: PedidosComponent },
    { path: 'nuevo-pedido',    component: NuevoPedidoComponent },
    { path: 'editar-pedido/:codigo',    component: EditarPedidoComponent },


    { path: 'detalles',    component: DetallesComponent },

    { path: 'nuevo-pago',    component: NuevoPagoComponent },


    { path: 'nuevo-detalle',    component: NuevoDetalleComponent },

    { path: 'editar-pago/:id',    component: EditarPagoComponent },



  
];
