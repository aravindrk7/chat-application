import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('room') room: ElementRef;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  join() {
    let name = this.name.nativeElement.value;
    let room = this.room.nativeElement.value;
    this.router.navigate(['/chat'], { queryParams: { name: name, room: room } });
  }
}
