import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.scss']
})
export class EditarPagoComponent implements OnInit {




  clientes: any = [];
  datosPago: any = [];

  idPago: string = '';


  forma_pago: string = '';
  idCliente: string='';
  codigo_cliente: string = '';
  fecha_pago: string = '';
  total: string = '';
  idFromUrl: string = '';


  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute


  ) { }

  onChangeCliente(PagoId: any) {
    this.idPago = PagoId;
    console.log(this.idPago)

  }

  ngOnInit(): void {
    this.listarClientes();
    this.route.params.subscribe(params => {
      this.idFromUrl = params['id'];
      this.cargarDatosPago();
    });
  }




  cargarDatosPago() {
    let datosPago = {
      accion: 'cargarDatosPago',
      idPago: this.idFromUrl,
    };
    this.servicio.postData(datosPago).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.datosPago = res.datosPago;
          this.idPago = this.datosPago[0].emprep;
        } else {
          console.log('Error al consultar datos del pago');
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
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







  //tomar en cuenta 
  updatePago(datos: any) {

    let data = {
      accion: 'updatePago',
      idPago: this.idFromUrl,
      forma_pago: datos.forma_pago,
      codigo_cliente: this.idCliente,
      fecha_pago: datos.fecha_pago,
      total: datos.total,

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
        this.router.navigateByUrl('/clientes');
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
