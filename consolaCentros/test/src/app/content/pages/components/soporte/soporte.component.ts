import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'm-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss']
})
export class SoporteComponent implements OnInit {
loadingScreen = false;
mensajeSoporte:any;
idCentro:any;
asuntoSoporte:any;
  constructor(private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef, private _location: Location) {

      	var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  		this.idCentro = retrievedObject.idCentro;

   }

  ngOnInit() {
  }



  enviarMensaje(){
	 
	 var asunt = this.asuntoSoporte || 'Sin asunto - Soporte Yourbeauty';
	 this.loadingScreen = true;
	 var dataE = {idCentro: this.idCentro, mensaje:this.mensajeSoporte, asunto:asunt};
	 console.log(dataE);

	this.authService.mensajeSoporte(dataE)
	.subscribe((data:any) => {
		console.log(data);
		if(data !== null && data !== 'null' && data[0] && data[0].email){
		alert('su mensaje ha sido enviado con exito');
		this.mensajeSoporte=null;
		this.asuntoSoporte=null;
			 this.loadingScreen = false;
		this.cdr.detectChanges();
		}
		else{alert('Ups! Algo ha salido mal');
					 this.loadingScreen = false;
		this.cdr.detectChanges();}

	},err => {
	this.loadingScreen = false;
	console.log('someError');
	alert('Ups! Algo ha salido mal');
	});


}


}
