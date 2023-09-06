import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  detalles: any = [];

  constructor(

    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarDetalles();

  }


    
  listarDetalles() {
    let detalles = {
        accion: 'listarDetalles',
    };
    this.servicio.postData(detalles).subscribe(
        async (res: any) => {
            if (res.estado == true) {
                this.detalles = res.detalles;
            } else {
            }
        },
        (error) => {
            console.log('Error en la conexión');
        }
    );
}

}
