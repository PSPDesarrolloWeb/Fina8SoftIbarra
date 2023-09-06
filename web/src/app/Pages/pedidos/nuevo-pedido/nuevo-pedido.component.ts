import { Component, OnInit } from '@angular/core';

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent implements OnInit {

  pagos: any = [];
  clientes: any = [];


  fecha_pedido: string = '';
  idCliente: string='';
  codigo_cliente: string = '';
  fecha_esperada: string = '';
  fecha_entrega: string = '';

  estado: string = '';

  comentarios: string = '';



  pedidos: any = [];
  productos: any = [];




  codigo_pedido: string = '';
  idPedido: string='';
  idProducto: string='';
  codigo_producto: string = '';
  cantidad: string = '';
  precio_unidad: string = '';
  numero_linea: string = '';


  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.listarClientes();
    this.listarProductos();
  }


  onChangeCliente(event: any) {
    this.idCliente = event.target.value;
    console.log(this.idCliente)
}

onChangeProducto(event: any) {
  this.idPedido = event.target.value;
  console.log(this.idPedido)
}


  listarClientes() {
    let clientes = {
        accion: 'listarClientes',
    };
    this.servicio.postData(clientes).subscribe(
        async (res: any) => {
            if (res.estado == true) {
                this.clientes = res.clientes;
            } else {
            }
        },
        (error) => {
            console.log('Error en la conexión');
        }
    );
  }

  listarProductos() {
    let productos = {
        accion: 'listarProductos',
    };
    this.servicio.postData(productos).subscribe(
        async (res: any) => {
            if (res.estado == true) {
                this.productos = res.productos;
            } else {
            }
        },
        (error) => {
            console.log('Error en la conexión');
        }
    );
  }




  
addPedido() {
  let datos = {
      accion: 'addPedido',
      fecha_pedido: this.fecha_pedido,
      fecha_esperada: this.fecha_esperada,
      fecha_entrega: this.fecha_entrega,
      estado: this.estado,
      comentarios: this.comentarios,
      codigo_cliente: this.idCliente,
      // emprep: this.idPago,

  }

  this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
          this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Pedido agregado con éxito', '', {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-success alert-with-icon',
              positionClass: 'toast-top-right'
          });
          this.router.navigateByUrl('/pedidos');
      } else {
          this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al agregar el Pedido', '', {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-danger alert-with-icon',
              positionClass: 'toast-top-right'
          });
          console.log(res);
      }
  });
}


}
