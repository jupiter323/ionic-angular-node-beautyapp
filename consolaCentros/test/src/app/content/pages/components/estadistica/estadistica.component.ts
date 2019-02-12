import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';


import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'm-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

idCentro:any;
	loadingScreen = false;
	info:any=[];
	ingresos:any=[];
	bests:any=[];

  constructor(private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef) { 

    	    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;


}

  ngOnInit() {


  			      this.loadingScreen = true;
          this.authService.getInfoCentroNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
      this.loadingScreen = false;
 		console.log(data);

 		this.info=data.info[0];
 		this.ingresos=data.dataV[0];
 		this.bests=data.clientes;

		this.cdr.detectChanges();
         
        },err => {
           this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



  }

}
