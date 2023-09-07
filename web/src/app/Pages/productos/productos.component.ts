import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any = [];

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarProductos();

  }


  
  listarProductos() {
    let productos = {
        accion: 'listarProductos',
    };
    this.servicio.postData(productos).subscribe(
        async (res: any) => {
            if (res.estado == true) {
                this.productos = res.productos;
            } else {
            }
        },
        (error) => {
            console.log('Error en la conexión');
        }
    );
}

deleteProducto(id: number) {
  swal.fire({
      title: 'Eliminar',
      text: "¿Estás seguro de eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
      if (result.isConfirmed) {
          let datos = {
              accion: 'deleteProducto',
              idProducto: id,
          };

          this.servicio.postData(datos).subscribe(
              async (res: any) => {
                  if (res.estado == true) {
                      this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Producto eliminado correctamente', '', {
                          timeOut: 8000,
                          closeButton: true,
                          enableHtml: true,
                          toastClass: 'alert alert-success alert-with-icon',
                          positionClass: 'toast-top-right'
                      });
                      this.listarProductos();
                  } else {
                      console.log('Error al eliminar el producto');
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
