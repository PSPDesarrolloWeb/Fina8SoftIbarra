import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: any = [];

  constructor(
    private servicio: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.listarPedidos();

  }


  
  listarPedidos() {
    let pedidos = {
        accion: 'listarPedidos',
    };
    this.servicio.postData(pedidos).subscribe(
        async (res: any) => {
            if (res.estado == true) {
                this.pedidos = res.pedidos;
            } else {
            }
        },
        (error) => {
            console.log('Error en la conexión');
        }
    );
}

}
