import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ApiService } from '../../../Services/api.service';

@Component({
    selector: 'app-nuevo-empleado',
    templateUrl: './nuevo-empleado.component.html',
    styleUrls: ['./nuevo-empleado.component.scss']
})
export class NuevoEmpleadoComponent implements OnInit {

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


    constructor(
        private servicio: ApiService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.listarEmpleados();
        this.listarOficinas();
    }


    camposLlenos(): boolean {
        return this.nombre !== '' &&
            this.apellido1 !== '' &&
            this.apellido2 !== '' &&
            this.extension !== '' &&
            this.email !== '' &&
            this.idOficina !== '' &&
            this.idJefe !== '' &&
            this.puesto !== '';
    }

    onChangeJefe(event: any) {
        this.idJefe = event.target.value;
        console.log(this.idJefe);

    }

    onChangeOficina(event: any) {
        this.idOficina = event.target.value;
        console.log(this.idOficina);
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


    addEmpleado() {
        let datos = {
            accion: 'addEmpleado',
            nombre: this.nombre,
            apellido1: this.apellido1,
            apellido2: this.apellido2,
            extension: this.extension,
            email: this.email,
            idOficina: this.idOficina,
            idJefe: this.idJefe,
            puesto: this.puesto,
        }

        this.servicio.postData(datos).subscribe((res: any) => {
            if (res.estado == true) {
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Empleado agregado con éxito', '', {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: 'alert alert-success alert-with-icon',
                    positionClass: 'toast-top-right'
                });
                this.router.navigateByUrl('/empleados');
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Error al agregar el Empleado', '', {
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