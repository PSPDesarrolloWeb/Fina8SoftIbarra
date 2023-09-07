import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  idGama: string = '';
  gamas: any = [];
  datosProducto: any = [];
  codprod: string = '';
  nombre: string = '';
  gama: string = '';
  dim: string = '';
  prov: string = '';
  desc: string = '';
  stock: string = '';
  pv: string = '';
  pvp: string = '';
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
      console.log(this.idFromUrl);
      this.cargarDatosProducto();
    });
    this.listarGamas();
  }

  onChangeGama(GamaId: any) {
    this.idGama = GamaId;
    console.log(this.idGama)
  }


  listarGamas() {
    let gamas = {
      accion: 'listarGamas',
    };
    this.servicio.postData(gamas).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.gamas = res.gamas;
        } else {
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }


  cargarDatosProducto() {
    let datosProducto = {
      accion: 'cargarDatosProducto',
      idProducto: this.idFromUrl,
    };
    this.servicio.postData(datosProducto).subscribe(
      async (res: any) => {
        if (res.estado == true) {
          this.datosProducto = res.datosProducto;
          this.idGama = this.datosProducto[0].gama;
        } else {
          console.log('Error al consultar datos del producto');
        }
      },
      (error) => {
        console.log('Error en la conexión');
      }
    );
  }

  updateProducto(datos: any) {

    let data = {
      accion: 'updateProducto',
      idProducto: this.idFromUrl,
      codprod: datos.codigo,
      nombre: datos.nombre,
      gama: this.idGama,
      dim: datos.dim,
      prov: datos.prov,
      desc: datos.desc,
      stock: datos.stock,
      pv: datos.pv,
      pvp: datos.pvp,
    }

    this.servicio.postData(data).subscribe((res: any) => {
      if (res.estado === true) {
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Datos actualizados correctamente', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-success alert-with-icon',
          positionClass: 'toast-top-right'
        });
        this.router.navigateByUrl('/productos');
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


