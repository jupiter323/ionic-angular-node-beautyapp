import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'm-detallecita',
  templateUrl: './detallecita.component.html',
  styleUrls: ['./detallecita.component.scss']
})
export class DetallecitaComponent implements OnInit {






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
loadingScreen=false;
tiempoLibre:any={};
diasSemana:any={domingo:{},lunes:{},martes:{},miercoles:{},jueves:{},viernes:{},sabado:{}};
idCentro:any;
empleados=[];
miembroSeleccionado : any = {};

keys:any=[];
valorOferta:any;
serviciosValues:any=[];

horarioEmpleado :any=[];
horarioEspecial :any=[];
paramId:any;

    serviciosCita:any= [];
    citasCliente:any;
    clienteInfo:any;
citaSeleccionada:any;

typesOfShoes = ['Juan Mario', 'Clogs Leys', 'Loafers Ramires', 'Juana R', 'Ines Sacnes'];

selected :any;

  constructor(private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef,private _location: Location,
  private activatedRoute: ActivatedRoute,
  private router: Router) {

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
     this.activatedRoute.queryParams.subscribe(params => {
 
                const id = params.id;
                
                if(this.paramId){
                this.selected=this.paramId;
                }
                else{
                this.selected=id;
                }
                
                this.authService.getCitaDetalleNC({idCita:this.selected, idCentro:this.idCentro})
                .subscribe((data:any) => {
                console.log(data);
                this.serviciosCita= data.serviciosCita;
                /*
                if(this.paramId){
                 this.citaSeleccionada= data.citas.filter(word => word.idCita == this.paramId)[0];
                this.itemSelectedChange2(this.citaSeleccionada);
                }
                else{
                 this.citaSeleccionada= data.citas.filter(word => word.idCita == id)[0];
                }
                */
                this.citaSeleccionada= data.citas.filter(word => word.idCita == this.selected)[0];
                this.citasCliente= data.citas;
                this.clienteInfo= data.infoCli[0];

                if(data.infoCli[0].idCentro !== this.idCentro){
                //si intentan entrar a cita q no correspnd
                this.goBack();
                }

                this.loadingScreen = false;
                this.cdr.detectChanges();           

                },err => {
                this.loadingScreen = false;
                this.cdr.detectChanges();
                console.log('someError');
                alert('Ups! Algo ha salido mal');
                });

              });
  
  }

borrarBloque(id){
	
	        this.authService.deleteLibresNC({idEmpleadoBloqueLibre:id})
      .subscribe((data:any) => {

      	console.log(data);
      			
      			this.itemSelectedChange(this.miembroSeleccionado);

        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


}

completarCita(){

  console.log(this.citaSeleccionada);

       this.loadingScreen = true;

  var datE ={idCita : this.citaSeleccionada.idCita};

console.log(datE);
            this.authService.completasssrCita(datE)
      .subscribe((data:any) => {

        console.log(data);
            this.loadingScreen = false;
           this.paramId =  this.citaSeleccionada.idCita;
            this.ngOnInit();

        },err => {
            this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });





}
getHoras(hora){
  
  
  return Math.floor(hora/60);
}




cambiarEstado(cita, estadoX){
     this.loadingScreen = true;
  
  console.log(estadoX);
  console.log(cita);
  
  var datE ={estado:estadoX,
              idServicioCita:cita.idServicioCita,
              idCita : cita.idCita};
console.log(datE);
            this.authService.cambiarServicioCitaNC(datE)
      .subscribe((data:any) => {

        console.log(data);
            this.loadingScreen = false;

           //  this.router.navigateByUrl(this.router.url.replace(this.paramId, cita.idCita));
           this.paramId =  cita.idCita;
            this.ngOnInit();

        },err => {
            this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



}





agregarBloque(){

	var inicio = this.tiempoLibre.inicio.getFullYear()+'-'+('0' + (this.tiempoLibre.inicio.getMonth()+1)).slice(-2)+'-'+('0' + this.tiempoLibre.inicio.getDate()).slice(-2);


	var fin = this.tiempoLibre.fin.getFullYear()+'-'+('0' + (this.tiempoLibre.fin.getMonth()+1)).slice(-2)+'-'+('0' + this.tiempoLibre.fin.getDate()).slice(-2);

	console.log(inicio,fin);

	
		this.authService.addDiasLibresNC({idEmpleado:this.selected,inicio:inicio,fin:fin})
		.subscribe((data:any) => {

		this.tiempoLibre.inicio=undefined;
		this.tiempoLibre.fin=undefined;	
		this.itemSelectedChange(this.miembroSeleccionado);
		console.log(data);

		},err => {
		console.log('someError');
		alert('Ups! Algo ha salido mal');
		});
	

}

  itemSelectedChange2(i){
  this.paramId = i.idCita;
  this.ngOnInit();
  /*
  this.selected = i.idCita;
   this.citaSeleccionada=i;
   console.log(this.citaSeleccionada);
     this.loadingScreen = true;

          this.authService.serviciosCitaNC({idCita:i.idCita})
      .subscribe((data:any) => {
console.log(data);
      this.serviciosCita= data.servicios;
      this.loadingScreen = false;
      this.cdr.detectChanges();

        },err => {
            this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
        });

  */
  }


  itemSelectedChange(i){


this.diasSemana.domingo={diaSemana:0, estado:0};
this.diasSemana.lunes={diaSemana:1, estado:0};
this.diasSemana.martes={diaSemana:2, estado:0};
this.diasSemana.miercoles={diaSemana:3, estado:0};
this.diasSemana.jueves={diaSemana:4, estado:0};
this.diasSemana.viernes={diaSemana:5, estado:0};
this.diasSemana.sabado={diaSemana:6, estado:0};


  this.selected = i.idEmpleado;
  this.miembroSeleccionado = i;



        this.authService.getInfoEmpleadoNC({idEmpleado:i.idEmpleado, idCentro: this.idCentro})
      .subscribe((data:any) => {

		//this.cdr.detectChanges();
        console.log(data);
       	this.keys = Object.keys(data.servicios);
		this.serviciosValues = Object.values(data.servicios);
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
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
        });


  }

	guardarHorario(){

	console.log(Object.values(this.diasSemana));
	//this.serviciosValues = Object.values(data.servicios);

	var dataEnv = {horario:Object.values(this.diasSemana),idEmpleado:this.selected};
	//dataEnv.horario = Object.values(this.diasSemana);
	//dataEnv.idEmpleado = this.selected;

	        this.authService.guardarHorarioNC(dataEnv)
      .subscribe((data:any) => {

      	console.log(data);
      	alert('Horario Editado Correctamente');

        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
        });


	}


    goBack() {
       this._location.back();
  //  let _backUrl = 'servicios';

    //this.router.navigateByUrl(_backUrl);
  }



	OnChange($event,i){

	console.log($event);
	console.log(i);
	var estadoC = $event.checked ? 1 : 0;

	        this.authService.cambiarEstadoSE({idEmpleado:this.selected,idServicio:i.idServicio, estado:estadoC})
      .subscribe((data:any) => {

       //   this.empleados = data;
       //   this.cdr.detectChanges();

          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


}





}
