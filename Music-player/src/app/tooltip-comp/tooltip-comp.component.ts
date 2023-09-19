import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-comp',
  templateUrl: './tooltip-comp.component.html',
  styleUrls: ['./tooltip-comp.component.scss']
})
export class TooltipCompComponent implements OnInit {

  public tooltip:string=''
  left: number = 0;
  top: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
