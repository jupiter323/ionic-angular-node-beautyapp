import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';


import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'm-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {



dateArray:any=[];
horarioHoras = [
{'text':'5:00 AM','valor':'05:00:00'},
{'text':'5:05 AM','valor':'05:05:00'},
{'text':'5:10 AM','valor':'05:10:00'},
{'text':'5:15 AM','valor':'05:15:00'},
{'text':'5:20 AM','valor':'05:20:00'},
{'text':'5:25 AM','valor':'05:25:00'},
{'text':'5:30 AM','valor':'05:30:00'},
{'text':'5:35 AM','valor':'05:35:00'},
{'text':'5:40 AM','valor':'05:40:00'},
{'text':'5:45 AM','valor':'05:45:00'},
{'text':'5:55 AM','valor':'05:55:00'},
{'text':'6:00 AM','valor':'06:00:00'},
{'text':'6:05 AM','valor':'06:05:00'},
{'text':'6:10 AM','valor':'06:10:00'},
{'text':'6:15 AM','valor':'06:15:00'},
{'text':'6:20 AM','valor':'06:20:00'},
{'text':'6:25 AM','valor':'06:25:00'},
{'text':'6:30 AM','valor':'06:30:00'},
{'text':'6:35 AM','valor':'06:35:00'},
{'text':'6:40 AM','valor':'06:40:00'},
{'text':'6:45 AM','valor':'06:45:00'},
{'text':'6:55 AM','valor':'06:55:00'},
{'text':'7:00 AM','valor':'07:00:00'},
{'text':'7:05 AM','valor':'07:05:00'},
{'text':'7:10 AM','valor':'07:10:00'},
{'text':'7:15 AM','valor':'07:15:00'},
{'text':'7:20 AM','valor':'07:20:00'},
{'text':'7:25 AM','valor':'07:25:00'},
{'text':'7:30 AM','valor':'07:30:00'},
{'text':'7:35 AM','valor':'07:35:00'},
{'text':'7:40 AM','valor':'07:40:00'},
{'text':'7:45 AM','valor':'07:45:00'},
{'text':'7:55 AM','valor':'07:55:00'},
{'text':'8:00 AM','valor':'08:00:00'},
{'text':'8:05 AM','valor':'08:05:00'},
{'text':'8:10 AM','valor':'08:10:00'},
{'text':'8:15 AM','valor':'08:15:00'},
{'text':'8:20 AM','valor':'08:20:00'},
{'text':'8:25 AM','valor':'08:25:00'},
{'text':'8:30 AM','valor':'08:30:00'},
{'text':'8:35 AM','valor':'08:35:00'},
{'text':'8:40 AM','valor':'08:40:00'},
{'text':'8:45 AM','valor':'08:45:00'},
{'text':'8:55 AM','valor':'08:55:00'},
{'text':'9:00 AM','valor':'09:00:00'},
{'text':'9:05 AM','valor':'09:05:00'},
{'text':'9:10 AM','valor':'09:10:00'},
{'text':'9:15 AM','valor':'09:15:00'},
{'text':'9:20 AM','valor':'09:20:00'},
{'text':'9:25 AM','valor':'09:25:00'},
{'text':'9:30 AM','valor':'09:30:00'},
{'text':'9:35 AM','valor':'09:35:00'},
{'text':'9:40 AM','valor':'09:40:00'},
{'text':'9:45 AM','valor':'09:45:00'},
{'text':'9:55 AM','valor':'09:55:00'},
{'text':'10:00 AM','valor':'10:00:00'},
{'text':'10:05 AM','valor':'10:05:00'},
{'text':'10:10 AM','valor':'10:10:00'},
{'text':'10:15 AM','valor':'10:15:00'},
{'text':'10:20 AM','valor':'10:20:00'},
{'text':'10:25 AM','valor':'10:25:00'},
{'text':'10:30 AM','valor':'10:30:00'},
{'text':'10:35 AM','valor':'10:35:00'},
{'text':'10:40 AM','valor':'10:40:00'},
{'text':'10:45 AM','valor':'10:45:00'},
{'text':'10:55 AM','valor':'10:55:00'},
{'text':'11:00 AM','valor':'11:00:00'},
{'text':'11:05 AM','valor':'11:05:00'},
{'text':'11:10 AM','valor':'11:10:00'},
{'text':'11:15 AM','valor':'11:15:00'},
{'text':'11:20 AM','valor':'11:20:00'},
{'text':'11:25 AM','valor':'11:25:00'},
{'text':'11:30 AM','valor':'11:30:00'},
{'text':'11:35 AM','valor':'11:35:00'},
{'text':'11:40 AM','valor':'11:40:00'},
{'text':'11:45 AM','valor':'11:45:00'},
{'text':'11:55 AM','valor':'11:55:00'},
{'text':'12:00 PM','valor':'12:00:00'},
{'text':'12:05 PM','valor':'12:05:00'},
{'text':'12:12 PM','valor':'12:12:00'},
{'text':'12:15 PM','valor':'12:15:00'},
{'text':'12:20 PM','valor':'12:20:00'},
{'text':'12:25 PM','valor':'12:25:00'},
{'text':'12:30 PM','valor':'12:30:00'},
{'text':'12:35 PM','valor':'12:35:00'},
{'text':'12:40 PM','valor':'12:40:00'},
{'text':'12:45 PM','valor':'12:45:00'},
{'text':'12:55 PM','valor':'12:55:00'},
{'text':'1:00 PM','valor':'13:00:00'},
{'text':'1:05 PM','valor':'13:05:00'},
{'text':'1:01 PM','valor':'13:01:00'},
{'text':'1:15 PM','valor':'13:15:00'},
{'text':'1:20 PM','valor':'13:20:00'},
{'text':'1:25 PM','valor':'13:25:00'},
{'text':'1:30 PM','valor':'13:30:00'},
{'text':'1:35 PM','valor':'13:35:00'},
{'text':'1:40 PM','valor':'13:40:00'},
{'text':'1:45 PM','valor':'13:45:00'},
{'text':'1:55 PM','valor':'13:55:00'},
{'text':'2:00 PM','valor':'14:00:00'},
{'text':'2:05 PM','valor':'14:05:00'},
{'text':'2:10 PM','valor':'14:10:00'},
{'text':'2:15 PM','valor':'14:15:00'},
{'text':'2:20 PM','valor':'14:20:00'},
{'text':'2:25 PM','valor':'14:25:00'},
{'text':'2:30 PM','valor':'14:30:00'},
{'text':'2:35 PM','valor':'14:35:00'},
{'text':'2:40 PM','valor':'14:40:00'},
{'text':'2:45 PM','valor':'14:45:00'},
{'text':'2:55 PM','valor':'14:55:00'},
{'text':'3:00 PM','valor':'15:00:00'},
{'text':'3:05 PM','valor':'15:05:00'},
{'text':'3:03 PM','valor':'15:03:00'},
{'text':'3:15 PM','valor':'15:15:00'},
{'text':'3:20 PM','valor':'15:20:00'},
{'text':'3:25 PM','valor':'15:25:00'},
{'text':'3:30 PM','valor':'15:30:00'},
{'text':'3:35 PM','valor':'15:35:00'},
{'text':'3:40 PM','valor':'15:40:00'},
{'text':'3:45 PM','valor':'15:45:00'},
{'text':'3:55 PM','valor':'15:55:00'},
{'text':'4:00 PM','valor':'16:00:00'},
{'text':'4:05 PM','valor':'16:05:00'},
{'text':'4:10 PM','valor':'16:10:00'},
{'text':'4:15 PM','valor':'16:15:00'},
{'text':'4:20 PM','valor':'16:20:00'},
{'text':'4:25 PM','valor':'16:25:00'},
{'text':'4:30 PM','valor':'16:30:00'},
{'text':'4:35 PM','valor':'16:35:00'},
{'text':'4:40 PM','valor':'16:40:00'},
{'text':'4:45 PM','valor':'16:45:00'},
{'text':'4:55 PM','valor':'16:55:00'},
{'text':'5:00 PM','valor':'17:00:00'},
{'text':'5:05 PM','valor':'17:05:00'},
{'text':'5:10 PM','valor':'17:15:00'},
{'text':'5:15 PM','valor':'17:15:00'},
{'text':'5:20 PM','valor':'17:20:00'},
{'text':'5:25 PM','valor':'17:25:00'},
{'text':'5:30 PM','valor':'17:30:00'},
{'text':'5:35 PM','valor':'17:35:00'},
{'text':'5:40 PM','valor':'17:40:00'},
{'text':'5:45 PM','valor':'17:45:00'},
{'text':'5:55 PM','valor':'17:55:00'},
{'text':'6:00 PM','valor':'18:00:00'},
{'text':'6:05 PM','valor':'18:05:00'},
{'text':'6:10 PM','valor':'18:10:00'},
{'text':'6:15 PM','valor':'18:15:00'},
{'text':'6:20 PM','valor':'18:20:00'},
{'text':'6:25 PM','valor':'18:25:00'},
{'text':'6:30 PM','valor':'18:30:00'},
{'text':'6:35 PM','valor':'18:35:00'},
{'text':'6:40 PM','valor':'18:40:00'},
{'text':'6:45 PM','valor':'18:45:00'},
{'text':'6:55 PM','valor':'18:55:00'},
{'text':'7:00 PM','valor':'19:00:00'},
{'text':'7:05 PM','valor':'19:05:00'},
{'text':'7:10 PM','valor':'19:10:00'},
{'text':'7:15 PM','valor':'19:15:00'},
{'text':'7:20 PM','valor':'19:20:00'},
{'text':'7:25 PM','valor':'19:25:00'},
{'text':'7:30 PM','valor':'19:30:00'},
{'text':'7:35 PM','valor':'19:35:00'},
{'text':'7:40 PM','valor':'19:40:00'},
{'text':'7:45 PM','valor':'19:45:00'},
{'text':'7:55 PM','valor':'19:55:00'},
{'text':'8:00 PM','valor':'20:00:00'},
{'text':'8:05 PM','valor':'20:05:00'},
{'text':'8:10 PM','valor':'20:10:00'},
{'text':'8:15 PM','valor':'20:15:00'},
{'text':'8:20 PM','valor':'20:20:00'},
{'text':'8:25 PM','valor':'20:25:00'},
{'text':'8:30 PM','valor':'20:30:00'},
{'text':'8:35 PM','valor':'20:35:00'},
{'text':'8:40 PM','valor':'20:40:00'},
{'text':'8:45 PM','valor':'20:45:00'},
{'text':'8:55 PM','valor':'20:55:00'},
{'text':'9:00 PM','valor':'21:00:00'},
{'text':'9:05 PM','valor':'21:05:00'},
{'text':'9:10 PM','valor':'21:10:00'},
{'text':'9:15 PM','valor':'21:15:00'},
{'text':'9:20 PM','valor':'21:20:00'},
{'text':'9:25 PM','valor':'21:25:00'},
{'text':'9:30 PM','valor':'21:30:00'},
{'text':'9:35 PM','valor':'21:35:00'},
{'text':'9:40 PM','valor':'21:40:00'},
{'text':'9:45 PM','valor':'21:45:00'},
{'text':'9:55 PM','valor':'21:55:00'},
{'text':'10:00 PM','valor':'22:00:00'},
{'text':'10:05 PM','valor':'22:05:00'},
{'text':'10:10 PM','valor':'22:10:00'},
{'text':'10:15 PM','valor':'22:15:00'},
{'text':'10:20 PM','valor':'22:20:00'},
{'text':'10:25 PM','valor':'22:25:00'},
{'text':'10:30 PM','valor':'22:30:00'},
{'text':'10:35 PM','valor':'22:35:00'},
{'text':'10:40 PM','valor':'22:40:00'},
{'text':'10:45 PM','valor':'22:45:00'},
{'text':'10:55 PM','valor':'22:55:00'},
{'text':'11:00 PM','valor':'23:00:00'},
{'text':'11:05 PM','valor':'23:05:00'},
{'text':'11:10 PM','valor':'23:10:00'},
{'text':'11:15 PM','valor':'23:15:00'},
{'text':'11:20 PM','valor':'23:20:00'},
{'text':'11:25 PM','valor':'23:25:00'},
{'text':'11:30 PM','valor':'23:30:00'},
{'text':'11:35 PM','valor':'23:35:00'},
{'text':'11:40 PM','valor':'23:40:00'},
{'text':'11:45 PM','valor':'23:45:00'},
{'text':'11:55 PM','valor':'23:55:00'},
];

	loadingScreen = false;

tiempoLibre:any={};
diasSemana:any={domingo:{},lunes:{},martes:{},miercoles:{},jueves:{},viernes:{},sabado:{}};
idCentro:any;
horario :any=[];
horarioEmpleado :any=[];
horarioEspecial :any=[];

  constructor(private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef) {



  	    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;


this.diasSemana.domingo={diaSemana:0, estado:0};
this.diasSemana.lunes={diaSemana:1, estado:0};
this.diasSemana.martes={diaSemana:2, estado:0};
this.diasSemana.miercoles={diaSemana:3, estado:0};
this.diasSemana.jueves={diaSemana:4, estado:0};
this.diasSemana.viernes={diaSemana:5, estado:0};
this.diasSemana.sabado={diaSemana:6, estado:0};




   }

  ngOnInit() {

              this.loadingScreen = true;
          this.authService.getHorarioNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
      this.loadingScreen = false;
      		this.horarioEmpleado = data.horario;
      		this.horarioEspecial = data.horarioEspecial; 


		this.horarioEmpleado.forEach(item=>{


			if(item.diaSemana==0){this.diasSemana.domingo=item};
			if(item.diaSemana==1){this.diasSemana.lunes=item};
			if(item.diaSemana==2){this.diasSemana.martes=item};
			if(item.diaSemana==3){this.diasSemana.miercoles=item};
			if(item.diaSemana==4){this.diasSemana.jueves=item};
			if(item.diaSemana==5){this.diasSemana.viernes=item};
			if(item.diaSemana==6){this.diasSemana.sabado=item};


		});

		this.cdr.detectChanges();
          console.log(data);
        },err => {
              this.loadingScreen = false;
                  this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



  }

setDate2(){
  
  this.tiempoLibre.fin=this.tiempoLibre.inicio;
  this.getDatesBet();

}
              
 getDatesBet() {

 //JSON.parse(JSON.stringify(this.tiempoLibre.inicio));
        var fromDate = new Date(this.tiempoLibre.inicio);
        var toDate =  new Date(this.tiempoLibre.fin);

        this.dateArray = [];
        var nextDate = fromDate;
        while (nextDate <= toDate) {

             var da = nextDate.getFullYear()+'-'+('0' + (nextDate.getMonth()+1)).slice(-2)+'-'+('0' + nextDate.getDate()).slice(-2);

            this.dateArray.push(da);
            nextDate.setDate(fromDate.getDate() + 1);

              
        }

        //console.log(dateArray);
      
    }

borrarBloque(id){
	this.loadingScreen = true;
	        this.authService.borrarFechaEspecial({idHorarioEspecial:id})
      .subscribe((data:any) => {
this.loadingScreen = false;
      	console.log(data);
      			
      			 this.ngOnInit();

        },err => {
        this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


}


guardarHS(){
console.log(this.dateArray);
 
      this.loadingScreen = true;
      var inicio = this.tiempoLibre.inicio.getFullYear()+'-'+('0' + (this.tiempoLibre.inicio.getMonth()+1)).slice(-2)+'-'+('0' + this.tiempoLibre.inicio.getDate()).slice(-2);

      var timespanw = Math.floor(Math.random() * 1000000) + 1;


       if(this.tiempoLibre.centroCerrado){
            console.log('cerrado');
            var dataEnv2 = {horaAbrir:null, 
            horaCerrar:null,
            timespan:timespanw,
            fecha:this.dateArray,idCentro:this.idCentro, estado:0
            };

            this.authService.agregarHENC(dataEnv2)
            .subscribe((data:any) => {

            this.loadingScreen = false;
            this.ngOnInit();
            console.log(data);

            },err => {
            this.loadingScreen = false;
            this.tiempoLibre.inicio = undefined;
            this.tiempoLibre.centroCerrado = undefined;
            console.log('someError');
            alert('Ups! Algo ha salido mal');
            });

       }
       else{
            console.log('abierto');
            var dataEnv = {horaAbrir:this.tiempoLibre.horaAbrir, horaCerrar:this.tiempoLibre.horaCerrar,
            timespan:timespanw,
            fecha:this.dateArray,idCentro:this.idCentro, estado:1
            };

            console.log(dataEnv);
            this.tiempoLibre.inicio = undefined;
             this.tiempoLibre.fin = undefined;
            this.tiempoLibre.horaAbrir = undefined; 
            this.tiempoLibre.horaCerrar = undefined; 

            this.authService.agregarHENC(dataEnv)
            .subscribe((data:any) => {

            this.loadingScreen = false;
            this.ngOnInit();
            console.log(data);

            },err => {
            this.loadingScreen = false;
            console.log('someError');
            alert('Ups! Algo ha salido mal');
            });

          }

 

}




  guardarHorario(){
       this.loadingScreen = true;

 	var dataEnv = {horario:Object.values(this.diasSemana),idCentro:this.idCentro};
	//dataEnv.horario = Object.values(this.diasSemana);
	//dataEnv.idCentro = this.idCentro;
	console.log(dataEnv);

	        this.authService.guardarHorarioCentroNC(dataEnv)
      .subscribe((data:any) => {
           this.loadingScreen = false;
           this.cdr.detectChanges();
      	console.log(data);
      	alert('Horario guardado Correctamente');
      	this.ngOnInit();

        },err => {
             this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
        });



  }





}
