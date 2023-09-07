import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
    selector: 'app-nuevo-cliente',
    templateUrl: './nueva-oficina.component.html',
    styleUrls: ['./nueva-oficina.component.scss']
})
export class NuevaOficinaComponent implements OnInit {

    oficinas: any = [];

    codigo: string = '';
    ciudad: string = '';
    pais: string = '';
    region: string = '';
    cpostal: string = '';
    telefono: string = '';
    dir1: string = '';
    dir2: string = '';
    idOficina: string = '';


    constructor(
        private servicio: ApiService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.listarOficinas();
    }


    camposLlenos(): boolean {
        return this.codigo !== '' &&
            this.ciudad !== '' &&
            this.pais !== '' &&
            this.region !== '' &&
            this.cpostal !== '' &&
            this.telefono !== '' &&
            this.dir1 !== '' &&
            this.dir2 !== '' &&
            this.idOficina !== '' ;

    }

    onChangeOficina(event: any) {
        this.idOficina = event.target.value;
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


    addOficina() {
        let datos = {
            accion: 'addOficina',
            codigo: this.codigo,
            ciudad: this.ciudad,
            pais: this.pais,
            region: this.region,
            cpostal: this.cpostal,
            telefono: this.telefono,
            dir1: this.dir1,
            dir2: this.dir2,
        }

        this.servicio.postData(datos).subscribe((res: any) => {
            if (res.estado == true) {
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Oficina agregado con éxito', '', {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: 'alert alert-success alert-with-icon',
                    positionClass: 'toast-top-right'
                });
                this.router.navigateByUrl('/oficinas');
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al agregar oficina', '', {
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