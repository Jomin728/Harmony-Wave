import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() title=''
  @Input() imageUrl=''
  constructor() { }

  ngOnInit(): void {
  }

}
