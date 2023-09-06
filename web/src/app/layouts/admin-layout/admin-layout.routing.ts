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






export const AdminLayoutRoutes: Routes = [
    { path: '',    component: DashboardComponent },

    { path: 'empleados',    component: EmpleadosComponent },
    { path: 'nuevo-empleado',    component: NuevoEmpleadoComponent },
    { path: 'editar-empleado/:id',    component: EditarEmpleadoComponent },
    { path: 'clientes',    component: ClientesComponent },
    { path: 'nuevo-cliente',    component: NuevoClienteComponent },
    { path: 'editar-cliente/:id',    component: EditarClienteComponent },

    // ventanas 
    { path: 'pagos',    component: PagosComponent },

    { path: 'nuevo-pago',    component: NuevoPagoComponent },

    { path: 'editar-pago/:id',    component: EditarPagoComponent },



  
];
