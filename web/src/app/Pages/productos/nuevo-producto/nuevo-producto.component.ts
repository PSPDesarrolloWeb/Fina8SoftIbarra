import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})
export class NuevoProductoComponent implements OnInit {

  idGama: string='';
  gamas: any = [];
  codprod: string='';
  nombre: string='';
  gama: string='';
  dim: string='';
  prov: string='';
  desc: string='';
  stock: string='';
  pv: string='';
  pvp: string='';


  constructor(    
    private servicio: ApiService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.listarGamas();
    }

  onChangeGama(event: any) {
    this.idGama = event.target.value;
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

    addProducto(){
      let datos = {
        accion: 'addProducto',
        codprod: this.codprod,
        nombre: this.nombre,
        gama: this.idGama,
        dim: this.dim,
        prov: this.prov,
        desc: this.desc,
        stock: this.stock,
        pv: this.pv,
        pvp: this.pvp,  
    }
  
    this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado == true) {
            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Producto agregado con éxito', '', {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-top-right'
            });
            this.router.navigateByUrl('/productos');
        } else {
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al agregar el producto', '', {
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
