import { Component, OnInit } from '@angular/core';

import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';


import { AuthenticationService } from '../../../../core/auth/authentication.service';



@Component({
  selector: 'm-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
loadingScreen=false;
fechas:any={};
dataReview:any={};
respuestaFake='Encantados de servirle, le esperamos pronto';
reviews:any=[];
idCentro:any;

  constructor(private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef) {

      var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;

   }

  ngOnInit() {

  


       this.loadingScreen = true;

        this.authService.getEvaluacionesNC({idCentro:this.idCentro})
      .subscribe((data:any) => {

            console.log(data);
          this.reviews = data;
          this.cdr.detectChanges();
         
        },err => {
               this.loadingScreen = false;
                         this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });




        this.authService.getInfoEvaNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
           this.loadingScreen = false;
            console.log(data);
          this.dataReview = data[0];
          this.cdr.detectChanges();
         
        },err => {
               this.loadingScreen = false;
                         this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



  }


changeDate2(){
this.fechas.fin=undefined;	
	}
changeDate1(){	
	

	var inicioX = this.fechas.inicio.getFullYear()+'-'+('0' + (this.fechas.inicio.getMonth()+1)).slice(-2)+'-'+('0' + this.fechas.inicio.getDate()).slice(-2);

	var finX = this.fechas.fin.getFullYear()+'-'+('0' + (this.fechas.fin.getMonth()+1)).slice(-2)+'-'+('0' + this.fechas.fin.getDate()).slice(-2);


	       this.loadingScreen = true;
        this.authService.getEvaluacionesPeriodoNC({idCentro:this.idCentro, 
        inicio:inicioX, fin:finX})
      .subscribe((data:any) => {
           this.loadingScreen = false;
            console.log(data);
          this.reviews = data;
          this.cdr.detectChanges();
         
        },err => {
               this.loadingScreen = false;
                         this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

}


responderCom(item){
	console.log(item);




       this.loadingScreen = true;
        this.authService.responderOpinion(item)
      .subscribe((data:any) => {
           this.loadingScreen = false;

           if(this.fechas.fin){
           this.changeDate1();
           }
           else{
           this.ngOnInit();
           }
         
        },err => {
               this.loadingScreen = false;
                         this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });





}



}
