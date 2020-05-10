import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-download-image',
  templateUrl: './download-image.component.html',
  styleUrls: ['./download-image.component.scss']
})
export class DownloadImageComponent implements OnInit {
  @Input() src;

  constructor() { }

  ngOnInit(): void {
  }

}
