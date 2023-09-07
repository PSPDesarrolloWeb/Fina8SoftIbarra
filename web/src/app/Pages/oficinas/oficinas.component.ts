import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.scss']
})
export class OficinasComponent implements OnInit {

  oficinas: any = [];

  constructor(
      private servicio: ApiService,
      private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
      this.listarOficinas();
  }

  listarOficinas() {
      let oficinas = {
          accion: 'listarOficinas',
      };
      this.servicio.postData(oficinas).subscribe(
          async (res: any) => {
              if (res.estado == true) {
                  this.oficinas = res.oficinas;
              } else {
              }
          },
          (error) => {
              console.log('Error en la conexión');
          }
      );
  }

  deleteOficina(id: number) {
      swal.fire({
          title: 'Eliminar',
          text: "¿Estás seguro de eliminar esta oficina?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminarlo'
      }).then((result) => {
          if (result.isConfirmed) {
              let datos = {
                  accion: 'deleteOficina',
                  idOficina: id,
              };

              this.servicio.postData(datos).subscribe(
                  async (res: any) => {
                      if (res.estado == true) {
                          this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Oficina eliminado correctamente', '', {
                              timeOut: 8000,
                              closeButton: true,
                              enableHtml: true,
                              toastClass: 'alert alert-success alert-with-icon',
                              positionClass: 'toast-top-right'
                          });
                          this.listarOficinas();
                      } else {
                        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Esta oficina tiene empleados ingresados', '', {
                            timeOut: 8000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: 'alert alert-danger alert-with-icon',
                            positionClass: 'toast-top-right'
                        });
                        console.log(res);                      }
                  },
                  (error) => {
                      console.log('Error en la conexión');
                  }
              );
          }
      });
  }

}
