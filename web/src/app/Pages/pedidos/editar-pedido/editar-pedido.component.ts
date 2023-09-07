import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {


  clientes: any = [];
  datosPedido: any = [];
  idPedido: string = '';



  fecha_pedido: string = '';
  idCliente: string='';
  fecha_esperada: string = '';
  fecha_entrega: string = '';
  estado: string = '';
  comentarios: string = '';
  idFromUrl: string = '';

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute


  ) { }

  onChangeCliente(clienteId: any) {
    this.idCliente = clienteId;
  }

  ngOnInit(): void {
    this.listarClientes();
    this.route.params.subscribe(params => {
      this.idFromUrl = params['codigo'];
      this.cargarDatosPedido();
    });
  }




  cargarDatosPedido() {
    let datosPedido = {
      accion: 'cargarDatosPedido',
      idPedido: this.idFromUrl,
    };
    this.servicio.postData(datosPedido).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.datosPedido = res.datosPedido;
          this.idCliente = this.datosPedido[0].codigo_cliente;
        } else {
          console.log('Error al consultar datos del pedido');
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }

listarClientes() {
  let pedidos = {
      accion: 'listarClientes',
  };
  this.servicio.postData(pedidos).subscribe(
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



  //tomar en cuenta 
  updatePedido(datos: any) {

    let data = {
      accion: 'updatePedido',
      idPedido: this.idFromUrl,
      fecha_pedido: datos.fecha_pedido,
      codigo_cliente: this.idCliente,
      fecha_esperada: datos.fecha_esperada,
      fecha_entrega: datos.fecha_entrega,
      estado: datos.estado,
      comentarios: datos.comentarios,

    };



    this.servicio.postData(data).subscribe((res: any) => {
      if (res.estado === true) {
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Datos actualizados correctamente', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-top-right'
        });
        this.router.navigateByUrl('/pedidos');
      } else {
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al actualizar datos', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-top-right'
        });
      }
    }, (error) => {
      alert('Error en la conexión');
    });
  }



}