import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
    selector: 'app-nuevo-cliente',
    templateUrl: './nuevo-cliente.component.html',
    styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent implements OnInit {

    empleados: any = [];

    nombre: string = '';
    apellido: string = '';
    contacto: string = '';
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

    constructor(
        private servicio: ApiService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.listarEmpleados();
    }


    camposLlenos(): boolean {
        return this.nombre !== '' &&
            this.apellido !== '' &&
            this.contacto !== '' &&
            this.telefono !== '' &&
            this.fax !== '' &&
            this.dir1 !== '' &&
            this.dir2 !== '' &&
            this.ciudad !== '' &&
            this.region !== '' &&
            this.pais !== '' &&
            this.cpostal !== '' &&
            this.idEmpleado !== '' &&
            this.limitecred !== '';
    }

    onChangeEmpleado(event: any) {
        this.idEmpleado = event.target.value;
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


    addCliente() {
        let datos = {
            accion: 'addCliente',
            nombre1: this.nombre,
            nombre2: this.contacto,
            apellido: this.apellido,
            telefono: this.telefono,
            fax: this.fax,
            dir1: this.dir1,
            dir2: this.dir2,
            ciudad: this.ciudad,
            region: this.region,
            pais: this.pais,
            cpostal: this.cpostal,
            emprep: this.idEmpleado,
            limitecred: this.limitecred,

        }

        this.servicio.postData(datos).subscribe((res: any) => {
            if (res.estado == true) {
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Cliente agregado con éxito', '', {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: 'alert alert-success alert-with-icon',
                    positionClass: 'toast-top-right'
                });
                this.router.navigateByUrl('/clientes');
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al agregar el Cliente', '', {
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