import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {Location} from '@angular/common';

import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'm-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

loadingScreen=false;
configuracion:any={};
idCentro:any;
  constructor(private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef, private _location: Location) { 


    	    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;

console.log(this.idCentro);
  }

  ngOnInit() {



  			      this.loadingScreen = true;
          this.authService.getConfiguracionNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
      this.loadingScreen = false;
 		console.log(data);
 		if(data.length>0){
 		this.configuracion = data[0];
 		}
 		else{
 		this.configuracion={};
 		}
 		
		this.cdr.detectChanges();
         
        },err => {
           this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



  }
editarConf(){
	
	 this.loadingScreen = true;
	 this.configuracion.idCentro = this.idCentro;
	 if(!this.configuracion.confirmacionAutomatica){
	 	this.configuracion.confirmacionAutomatica = 0;
	 }
	 else{
	 this.configuracion.confirmacionAutomatica=1;
	 }
     this.authService.UpdateconfiguracionCentroNC(this.configuracion)
      .subscribe((data:any) => {
      this.ngOnInit();
        },err => {
           this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



	console.log(this.configuracion);
}
  		goBack() {
		   this._location.back();
	//	let _backUrl = 'servicios';

		//this.router.navigateByUrl(_backUrl);
	}


}
