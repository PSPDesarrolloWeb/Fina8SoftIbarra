import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  empleados: any = [];

  constructor(
      private servicio: ApiService,
      private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
      this.listarEmpleados();
  }

  listarEmpleados() {

      let empleados = {
          accion: 'listarEmpleados',
      };
      this.servicio.postData(empleados).subscribe(
          async (res: any) => {
              if (res.estado == true) {
                  this.empleados = res.empleados;
              } else {
              }
          },
          (error) => {
              console.log('Error en la conexión');
          }
      );
  }

  deleteEmpleado(id: number) {
    console.log()
      swal.fire({
          title: 'Eliminar',
          text: "¿Estás seguro de eliminar este empleado?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminarlo'
      }).then((result) => {
          if (result.isConfirmed) {
              let datos = {
                  accion: 'deleteEmpleado',
                  idEmpleado: id,
              };

              this.servicio.postData(datos).subscribe(
                  async (res: any) => {
                      if (res.estado == true) {
                          this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Empleado eliminado correctamente', '', {
                              timeOut: 8000,
                              closeButton: true,
                              enableHtml: true,
                              toastClass: 'alert alert-success alert-with-icon',
                              positionClass: 'toast-top-right'
                          });
                          this.listarEmpleados();
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
