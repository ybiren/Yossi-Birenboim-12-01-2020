import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public env = environment;
  constructor(private location: Location) { }

  ngOnInit() {
  }

  isCurrUrl(url: string) {
    return this.location.path().startsWith(url);
  }

}
