import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'ui-1_bell-53', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },

    { path: '/empleados', title: 'Empleados',  icon:'users_circle-08', class: '' },
    { path: '/clientes', title: 'Clientes',  icon:'users_single-02', class: '' },

    // para la pantalla 
    { path: '/pagos', title: 'Pagos',  icon:'shopping_box', class: '' },

    { path: '/pedidos', title: 'Pedidos',  icon:'shopping_box', class: '' },

    { path: '/detalles', title: 'Detalles',  icon:'shopping_box', class: '' },



];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  sidebarVisible: boolean = true; // Esto controlará si la barra lateral está visible o no

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
