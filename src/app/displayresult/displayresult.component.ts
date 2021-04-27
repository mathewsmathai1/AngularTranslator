import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-displayresult',
  templateUrl: './displayresult.component.html',
  styleUrls: ['./displayresult.component.css']
})
export class DisplayresultComponent implements OnInit {
  
  @Input() buttonChildText : string =""
  constructor() { }

  ngOnInit(): void {
  }

}
