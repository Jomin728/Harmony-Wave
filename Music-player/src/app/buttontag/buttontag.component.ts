import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttontag',
  templateUrl: './buttontag.component.html',
  styleUrls: ['./buttontag.component.scss']
})
export class ButtontagComponent implements OnInit {
  @Input() text=""
  constructor() { }

  ngOnInit(): void {
  }
  

}
