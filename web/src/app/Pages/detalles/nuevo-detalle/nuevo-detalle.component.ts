import { Component, OnInit } from '@angular/core';

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';


@Component({
  selector: 'app-nuevo-detalle',
  templateUrl: './nuevo-detalle.component.html',
  styleUrls: ['./nuevo-detalle.component.scss']
})
export class NuevoDetalleComponent implements OnInit {

  pagos: any = [];

  pedidos: any = [];
  productos: any = [];




  codigo_pedido: string = '';
  idPedido: string = '';
  idProducto: string = '';
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

    this.listarPedido();
    this.listarProducto();

  }

  listarPedido() {
    let pedidos = {
      accion: 'listarPedidos',
    };
    this.servicio.postData(pedidos).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.pedidos = res.pedidos;
        } else {
        }
      },
      (error) => {
        console.log('Error en la conexión pedidos');
      }
    );
  }


  listarProducto() {
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

  onChangePedido(event: any) {
    this.idPedido = event.target.value;
    console.log(this.idPedido)
  }

  onChangeProducto(event: any) {
    this.idProducto = event.target.value;
    console.log(this.idProducto)
  }

}
