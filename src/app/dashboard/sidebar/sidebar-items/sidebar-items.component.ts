import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'sidebar-items',
  templateUrl: './sidebar-items.component.html'
})
export class SidebarItemsComponent implements OnInit {

  esGerente : any ;

  constructor(public cookieService: CookieService,
) {}

ngOnInit(): void {
    this.esGerente = this.cookieService.get('esGerente')
    console.log('Es verdadero o falso: ', this.cookieService.get('esGerente'))
}

}
