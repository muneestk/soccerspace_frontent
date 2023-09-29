import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-admin',
  templateUrl: './popup-admin.component.html',
  styleUrls: ['./popup-admin.component.css']
})
export class PopupAdminComponent implements OnInit{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ){}

  ngOnInit(): void {
     console.log(this.data);
  }
}
