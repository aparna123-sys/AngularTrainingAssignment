import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: string[] = [];
  opened!: boolean;
  constructor() { }

  ngOnInit(): void {
  }


  shouldRun =true;
}

