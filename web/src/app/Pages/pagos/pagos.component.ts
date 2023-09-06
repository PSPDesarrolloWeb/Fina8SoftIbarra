import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  pagos: any = [];


  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarPagos();

  }


  listarPagos() {
    let pagos = {
        accion: 'listarPagos',
    };
    this.servicio.postData(pagos).subscribe(
        async (res: any) => {
            if (res.estado == true) {
                this.pagos = res.pagos;
            } else {
            }
        },
        (error) => {
            console.log('Error en la conexión');
        }
    );
}


deletePago(id: number) {
  swal.fire({
      title: 'Eliminar',
      text: "¿Estás seguro de eliminar este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
      if (result.isConfirmed) {
          let datos = {
              accion: 'deletePago',
              idPago: id,
          };

          this.servicio.postData(datos).subscribe(
              async (res: any) => {
                  if (res.estado == true) {
                      this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Cliente eliminado correctamente', '', {
                          timeOut: 8000,
                          closeButton: true,
                          enableHtml: true,
                          toastClass: 'alert alert-success alert-with-icon',
                          positionClass: 'toast-top-right'
                      });
                      this.listarPagos();
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
