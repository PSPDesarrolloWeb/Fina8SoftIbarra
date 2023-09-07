import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-oficina.component.html',
  styleUrls: ['./editar-oficina.component.scss']
})
export class EditarOficinaComponent implements OnInit {

  oficinas: any = [];
  datosOficina: any = [];
  idOficina: string = '';

  codigo: string = '';
  ciudad: string = '';
  pais: string = '';
  region: string = '';
  cpostal: string = '';
  telefono: string = '';
  dir1: string = '';
  dir2: string = '';
  idFromUrl: string = '';

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idFromUrl = params['codigo'];
      this.cargarDatosOficina();
    });
  }

    onChangeEmpleado(oficinaId: any) {
      this.idOficina = oficinaId;
    }



  cargarDatosOficina() {
    let datosOficina = {
      accion: 'cargarDatosOficina',
      idOficina: this.idFromUrl,
    };
    this.servicio.postData(datosOficina).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.datosOficina = res.datosOficina;
          this.idOficina = this.datosOficina[0].emprep;
        } else {
          console.log('Error al consultar datos de la oficina');
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }


  updateOficina(datos: any) {

    let data = {
      accion: 'updateOficina',
      idOficina: this.idFromUrl,
      codigo: datos.codigo,
      ciudad: datos.ciudad,
      pais: datos.pais,
      region: datos.region,
      cpostal: datos.cpostal,
      telefono: datos.telefono,
      dir1: datos.dir1,
      dir2: datos.dir2,
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
        this.router.navigateByUrl('/oficinas');
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
