import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PagesComponent } from './Pages/pages.component';
import { ClientesComponent } from './Pages/clientes/clientes.component';
import { NuevoClienteComponent } from './Pages/clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './Pages/clientes/editar-cliente/editar-cliente.component';
import { EmpleadosComponent } from './Pages/empleados/empleados.component';
import { NuevoEmpleadoComponent } from './Pages/empleados/nuevo-empleado/nuevo-empleado.component';
import { EditarEmpleadoComponent } from './Pages/empleados/editar-empleado/editar-empleado.component';
import { PagosComponent } from './Pages/pagos/pagos.component';
import { NuevoPagoComponent } from './Pages/pagos/nuevo-pago/nuevo-pago.component';
import { EditarPagoComponent } from './Pages/pagos/editar-pago/editar-pago.component';
import { PedidosComponent } from './Pages/pedidos/pedidos.component';
import { NuevoPedidoComponent } from './Pages/pedidos/nuevo-pedido/nuevo-pedido.component';
import { DetallesComponent } from './Pages/detalles/detalles.component';
import { NuevoDetalleComponent } from './Pages/detalles/nuevo-detalle/nuevo-detalle.component';
import { ProductosComponent } from './Pages/productos/productos.component';
import { NuevoProductoComponent } from './Pages/productos/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './Pages/productos/editar-producto/editar-producto.component';
import { EditarPedidoComponent } from './Pages/pedidos/editar-pedido/editar-pedido.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(), ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PagesComponent,
    ClientesComponent,
    NuevoClienteComponent,
    EditarClienteComponent,
    EmpleadosComponent,
    NuevoEmpleadoComponent,
    EditarEmpleadoComponent,
    PagosComponent,
    NuevoPagoComponent,
    EditarPagoComponent,
    PedidosComponent,
    NuevoPedidoComponent,
    DetallesComponent,
    NuevoDetalleComponent,
    ProductosComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    EditarPedidoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
