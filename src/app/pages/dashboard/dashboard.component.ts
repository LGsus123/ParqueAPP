import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    // s.src = "../assets/js/main.js";
    // s.src = "../../../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
