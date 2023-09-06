import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  pagos: any = [];


  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarPagos();

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



}
