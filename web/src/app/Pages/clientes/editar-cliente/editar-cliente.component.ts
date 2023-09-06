import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  empleados: any = [];
  datosCliente: any = [];
  idCliente: string = '';

  nombre: string = '';
  apellido: string = '';
  nombre1: string = '';
  telefono: string = '';
  fax: string = '';
  dir1: string = '';
  dir2: string = '';
  ciudad: string = '';
  region: string = '';
  pais: string = '';
  cpostal: string = '';
  idEmpleado: string = '';
  limitecred: string = '';
  idFromUrl: string = '';

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.listarEmpleados();
    this.route.params.subscribe(params => {
      this.idFromUrl = params['id'];
      this.cargarDatosCliente();
    });
  }

    onChangeEmpleado(empleadoId: any) {
      this.idEmpleado = empleadoId;
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


  cargarDatosCliente() {
    let datosCliente = {
      accion: 'cargarDatosCliente',
      idCliente: this.idFromUrl,
    };
    this.servicio.postData(datosCliente).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.datosCliente = res.datosCliente;
          this.idEmpleado = this.datosCliente[0].emprep;
        } else {
          console.log('Error al consultar datos del producto');
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }


  updateCliente(datos: any) {

    let data = {
      accion: 'updateCliente',
      idCliente: this.idFromUrl,
      nombre1: datos.nombre,
      nombre2: datos.nombre1,
      apellido: datos.apellido,
      telefono: datos.telefono,
      fax: datos.fax,
      dir1: datos.dir1,
      dir2: datos.dir2,
      ciudad: datos.ciudad,
      region: datos.region,
      pais: datos.pais,
      cpostal: datos.cpostal,
      emprep: this.idEmpleado,
      limitecred: datos.limitecred,
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
