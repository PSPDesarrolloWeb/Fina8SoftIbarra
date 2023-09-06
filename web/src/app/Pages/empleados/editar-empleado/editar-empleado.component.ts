import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss']
})
export class EditarEmpleadoComponent implements OnInit {


  datosEmpleado: any = [];
  empleados: any = [];
  oficinas: any = [];
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  extension: string = '';
  email: string = '';
  idOficina: string = '';
  idJefe: string = '';
  puesto: string = '';
  idFromUrl: string = '';

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.listarEmpleados();
    this.listarOficinas();
    this.route.params.subscribe(params => {
      this.idFromUrl = params['id'];
      this.cargarDatosEmpleado();
    });
  }

  onChangeJefe(jefeId: any) {
    this.idJefe = jefeId;

}

onChangeOficina(oficinaId: any) {
    this.idOficina = oficinaId;
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

  cargarDatosEmpleado() {
    let datosEmpleado = {
      accion: 'cargarDatosEmpleado',
      idEmpleado: this.idFromUrl,
    };
    this.servicio.postData(datosEmpleado).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.datosEmpleado = res.datosEmpleado;
          this.idJefe = this.datosEmpleado[0].jefe;
          this.idOficina = this.datosEmpleado[0].oficina;
        } else {
          console.log('Error al consultar datos del producto');
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }


  updateEmpleado(datos: any) {

    let data = {
      accion: 'updateEmpleado',
      idEmpleado: this.idFromUrl,
      nombre: datos.nombre,
      apellido1: datos.apellido1,
      apellido2: datos.apellido2,
      extension: datos.extension,
      email: datos.email,
      idOficina: this.idOficina,
      idJefe: this.idJefe,
      puesto: datos.puesto,
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
        this.router.navigateByUrl('/empleados');
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
