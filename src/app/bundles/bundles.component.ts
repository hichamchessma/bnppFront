import { Component } from '@angular/core';
import { Traduction } from '../common/Traduction';


@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent {
  protected traduction: any
  
  constructor() { 
    this.traduction=Traduction.get()
  }
  
  ngOnInit(): void {
  }
}