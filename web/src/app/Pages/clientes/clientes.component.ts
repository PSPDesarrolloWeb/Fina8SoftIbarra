import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: any = [];

  constructor(
      private servicio: ApiService,
      private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
      this.listarClientes();
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

  deleteCliente(id: number) {
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
                  accion: 'deleteCliente',
                  idCliente: id,
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
                          this.listarClientes();
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
