import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // header: boolean;
  // @ViewChild('container') container: ElementRef;
  // constructor(private router: Router) {
  //   this.router.events.subscribe((event: any) => {
  //     if (event instanceof NavigationEnd) {
  //       if (event.url === '/register' || event.url === '/login') {
  //         this.header = false;
  //         this.container.nativeElement.style.gridTemplateRows = '100vh';
  //       } else {
  //         this.header = true;
  //         this.container.nativeElement.style.gridTemplateRows = '50px minmax(500px, auto)';
  //       }
  //     }
  //   });
  // }
}
