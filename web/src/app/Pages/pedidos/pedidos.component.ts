import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: any = [];

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarPedidos();

  }


  
  listarPedidos() {
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
            console.log('Error en la conexión');
        }
    );
}

deletePedido(id: number) {
  swal.fire({
      title: 'Eliminar',
      text: "¿Estás seguro de eliminar este pedido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
      if (result.isConfirmed) {
          let datos = {
              accion: 'deletePedido',
              idPedido: id,
          };

          this.servicio.postData(datos).subscribe(
              async (res: any) => {
                  if (res.estado == true) {
                      this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Pedido eliminado correctamente', '', {
                          timeOut: 8000,
                          closeButton: true,
                          enableHtml: true,
                          toastClass: 'alert alert-success alert-with-icon',
                          positionClass: 'toast-top-right'
                      });
                      this.listarPedidos();
                  } else {
                      console.log('Error al eliminar el cliente');
                  }
              },
              (error) => {
                  console.log('Error en la conexión');
              }
          );
      }
  });
}

}
