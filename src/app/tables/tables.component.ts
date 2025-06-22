import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input() type: string;
  @Input() selectionMotCampagnes: any[] = [];
  @Input() selectionMotDate: any;
  title = 'Tables';
  
  constructor() { }
  
  ngOnInit(): void {
    console.log('TablesComponent initialized with:', {
      type: this.type,
      selectionMotCampagnes: this.selectionMotCampagnes,
      selectionMotDate: this.selectionMotDate
    });
  }
}