import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodApp';
  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      // console.log(event);
    });
  }
}
