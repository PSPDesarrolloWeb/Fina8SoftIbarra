import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  detalles: any = [];

  constructor(

    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarDetalles();

  }



  listarDetalles() {
    let detalles = {
      accion: 'listarDetalles',
    };
    this.servicio.postData(detalles).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.detalles = res.detalles;
        } else {
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }

  deleteDetalle(id: number) {
    swal.fire({
        title: 'Eliminar',
        text: "¿Estás seguro de eliminar este detalle del pedido?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            let datos = {
                accion: 'deleteDetalle',
                idDetalle: id,
            };

            this.servicio.postData(datos).subscribe(
                async (res: any) => {
                    if (res.estado == true) {
                        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Detalle del pedido eliminado correctamente', '', {
                            timeOut: 8000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: 'alert alert-success alert-with-icon',
                            positionClass: 'toast-top-right'
                        });
                        this.listarDetalles();
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
