import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-nuevo-pago',
  templateUrl: './nuevo-pago.component.html',
  styleUrls: ['./nuevo-pago.component.scss']
})
export class NuevoPagoComponent implements OnInit {

  pagos: any = [];
  clientes: any = [];


  forma_pago: string = '';
  idCliente: string='';
  codigo_cliente: string = '';
  fecha_pago: string = '';
  total: string = '';

  // idPago: string = '';

  // limitecred: string = '';


  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.listarPagos();
    this.listarClientes();


  }

//   camposLlenos(): boolean {
//     return this.forma_pago !== '' &&
//         this.codigo_cliente !== '' &&
//         this.fecha_pago !== '' &&
//         this.total !== '' &&
//         this.idPago !== '' ;
// }



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


   

    
    onChangeCliente(event: any) {
      this.idCliente = event.target.value;
      console.log(this.idCliente)
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



addPago() {
  let datos = {
      accion: 'addPago',
      forma_pago: this.forma_pago,
      codigo_cliente: this.idCliente,
      fecha_pago: this.fecha_pago,
      total: this.total,
      // emprep: this.idPago,

  }

  this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
          this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Pago agregado con éxito', '', {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-success alert-with-icon',
              positionClass: 'toast-top-right'
          });
          this.router.navigateByUrl('/pagos');
      } else {
          this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al agregar el Pago', '', {
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
