import { Component, OnInit } from '@angular/core';

import {Location} from '@angular/common';
import {formatDate} from '@angular/common';


import {ElementRef, ViewChild, NgZone,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { MouseEvent } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'm-reprogramacion',
  templateUrl: './reprogramacion.component.html',
  styleUrls: ['./reprogramacion.component.scss']
})
export class ReprogramacionComponent implements OnInit {

idCitaR:any;
idCentro:any;
mensajeSoporte:any;
diaCerrado:any;
horasDisponibles:any=[];
servicioSeleccionado:any;
serviciosCita:any=[];
originalData:any=[];
datasCita:any={};
serviciosCentro:any;
detallePage:any;
fechaSeleccionadaN:any;
cita:any={};
horarioCentro:any;
fechaMin= new Date(Date.now());
empleadoInfo:any={};
loadingScreen:any=false;
  constructor(public fb: FormBuilder,private ngZone: NgZone,private cdr: ChangeDetectorRef,
  private authService: AuthenticationService,private _location: Location,private activatedRoute: ActivatedRoute,
  private router: Router) {
console.log(this.fechaMin);
  	          var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
          this.idCentro = retrievedObject.idCentro;


   }

  ngOnInit() {
  this.activatedRoute.queryParams.subscribe(params => {
  //console.log(params);
    this.idCitaR = params.id;
    this.detallePage  = params.detalle;
  });
/*
    this.activatedRoute.queryParams.subscribe(params => {

    
      console.log(params);
   this.loadingScreen = true;
                    this.authService.getDataCita({idCita:params.id})
      .subscribe((data:any) => {

            this.loadingScreen = false;
            this.datasCita = data.cita[0];
           	this.horarioCentro = data.horario;
            this.fechaSeleccionadaN = this.datasCita.horaInicio.split('T')[0];
     
           	this.serviciosCita = data.servicios.map(item=>{

              item.inicio = item.horaInicio.split('T')[1].substring(0,8);
              item.fin = item.horaFin.split('T')[1].substring(0,8);
              return item;
            });

            //this.procesarData(this.serviciosCita[0].inicio);
            this.procesarData();
          this.cdr.detectChanges();
         	 console.log(data);
        },err => {
              this.loadingScreen = false;
                    this.cdr.detectChanges();

               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });
   


      });
 */
		
  }


getHoras(hora){
  
  
  return Math.floor(hora/60);
}


    myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.

    var elemento = this.horarioCentro.find(function(element) {
  		return day == element.diaSemana;
	});

	if(elemento && elemento.estado == 1){
	return true;
	}
	else{
	return false;
	}

   // return day !== 0 && day !== 6;
  }

  addServicio(item){


  var found = this.serviciosCentro.find((element)=> {
  return element.idServicio == item;
});
/*
  var found2 = this.serviciosCentro.find((element)=> {
  return element.idServicio == item;
});
*/
	//let ss = Object.create(found);
	//let ss2 = Object.create(found2);
	//this.originalData.push(ss2);
    this.serviciosCita.push(JSON.parse(JSON.stringify(found)));
  this.procesarData();
  }

quitarItem(ind){
	this.serviciosCita.splice(ind, 1);
	this.cdr.detectChanges();
	  this.procesarData();
}

getMinH(){

var d = new Date(this.fechaSeleccionadaN+' 12:00:00');
var dia = d.getDay();
console.log(this.fechaSeleccionadaN);
console.log(d);
console.log(dia);

var horarioFix = '00:00';


if(this.horarioCentro.find(x => x.diaSemana == dia)){
    this.diaCerrado = false;
   horarioFix = this.horarioCentro.find(x => x.diaSemana == dia).horaAbrir;
}

return  horarioFix;


}








getMaxH(){
var horarioFix = '00:00';
var d = new Date(this.fechaSeleccionadaN+' 12:00:00');
var dia = d.getDay();

if(this.horarioCentro.find(x => x.diaSemana == dia)){
 horarioFix = this.horarioCentro.find(x => x.diaSemana == dia).horaCerrar;
}



return  horarioFix;

}

moveDate(date){
console.log(date);
this.procesarData();
}

reprogramarCita(){
  
  var datE ={estado:2,
              idCita : this.idCitaR,
              comentario:this.mensajeSoporte};
              console.log(datE);

     this.loadingScreen = true;

        this.authService.cambiarServicioCitaNCREPRO(datE).subscribe((data:any) => {

            this.loadingScreen = false;
           console.log(data);
          this.cdr.detectChanges();
          this.goBack();

        },err => {
              this.loadingScreen = false;
                    this.cdr.detectChanges();

               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



}


guardarCita(){
	//precioFinal
  /*
	var fechaSeleccionada = this.cita.fecha.getFullYear()+'-'+('0' + (this.cita.fecha.getMonth()+1)).slice(-2)+'-'+('0' + this.cita.fecha.getDate()).slice(-2);
*/

	var dataE= {
	idCentro:this.idCentro,
  fecha:this.fechaSeleccionadaN,
	inicio:this.fechaSeleccionadaN+' '+this.serviciosCita[0].inicio,
	fin:this.fechaSeleccionadaN+' '+this.serviciosCita[this.serviciosCita.length-1].fin,
	total:this.getTotal(),
	servicios:this.serviciosCita
	}

console.log(dataE);

            this.loadingScreen = true;

                    this.authService.reprogramarCitaNC(dataE)
      .subscribe((data:any) => {

            this.loadingScreen = false;
           console.log(data);
          this.cdr.detectChanges();
         	this._location.back();
        },err => {
              this.loadingScreen = false;
                    this.cdr.detectChanges();

               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

}


		goBack() {


  this.activatedRoute.queryParams.subscribe(params => {
  console.log(params);



    if(params.detalle=="true" || params.detalle==true){

    this.router.navigate(['/detallecita'],{queryParams: {id: this.idCitaR}});

    }
    else{this.router.navigateByUrl('/calendario');}

  });



		
	}



sinEmpleado(){
  var sinEmpleado = false;
  if(this.serviciosCita.length<1){ sinEmpleado = true;}

  this.serviciosCita.forEach(item=>{

    if(!item.empleadoSeleccionado){
      sinEmpleado = true;
    }


  });
  return sinEmpleado;
}


getTotal(){
  var total = 0;
  this.serviciosCita.forEach(item=>{
  item.precioFinal = item.precio;
    total+=item.precio;
  });
  return total;
}


async  procesarData(tiemp=null){
if(true){
	let valueE:any=[];
	let value:any=[];
	//this.serviciosCita = [];
	this.serviciosCita = this.serviciosCita.map((x)=>{
	delete x.empleados;
	delete x.empleadoSeleccionado;
	delete x.inicio;
	delete x.fin;
	return x;
	});
	console.log(this.serviciosCita);
      this.loadingScreen = true;
var darr = {};
var indexx = 0;
var d = new Date(this.datasCita.horaInicio);
var diaS = d.getDay();
  console.log(d);

var fechaSeleccionada = d.getFullYear()+'-'+('0' + (d.getMonth()+1)).slice(-2)+'-'+('0' + d.getDate()).slice(-2);

//var fechaSeleccionada = this.datasCita.horaInicio.split('T')[0];
this.fechaSeleccionadaN = fechaSeleccionada;
console.log(this.fechaSeleccionadaN);


  for(const  item of this.serviciosCita){

    darr = {
    duracion: item.duracion,
    fechaSeleccionada: fechaSeleccionada,
    horaAbrir: (value && value.length>0) ? value[0].fin.split(' ')[1] : tiemp ? tiemp : this.getMinH(),
    horaCerrar: this.getMaxH(),
    idServicio: item.idServicio,
    idCentro: this.idCentro,
    index:indexx

    };

    console.log(darr);
     value = await this.delayedLog(darr);
      console.log(value);
    if(value.length>0){
    if(indexx==0 && !tiemp){
    this.horasDisponibles = value; 
    }

    console.log(value[0].inicio.split(' ')[1]);
    console.log(diaS);

    item.inicio = value[0].inicio.split(' ')[1];
   	item.fin = value[0].fin.split(' ')[1];
   
	item.index=indexx;       
    var dataEmpleados={idServicio:item.idServicio,
                       idCentro:this.idCentro,
                       fecha:(fechaSeleccionada+' '+item.inicio),
                       fechaF:(fechaSeleccionada+' '+item.fin),
                       diaN:diaS,
                       soloHI:item.inicio,
                       soloHF:item.fin};
                       console.log(dataEmpleados);
    valueE = await this.delayedLog2(dataEmpleados);
    item.empleados = valueE;
    if(item.empleados.length>0){
    item.empleadoSeleccionado = item.empleados[0];
    }

    }
   
    indexx += 1;
  }
      this.loadingScreen = false;
  
         this.cdr.detectChanges();
             console.log( this.serviciosCita);
}
}

getHorasFormat(dat){
	var ww = formatDate(dat, 'h:mm a', 'es');
	return ww;
}
getHorasFormat2(dat){
	//console.log(dat);
	var dat2=this.fechaSeleccionadaN+' '+dat;
	var ww = formatDate(dat2, 'h:mm a', 'es');
	return ww;
}

changeTime(time){
	console.log(time);
	var tiempo = time.value.split(' ')[1];
	this.procesarData(tiempo);
}



 delayedLog(item){

return new Promise((resolve, reject) => {
      this.authService.getHorasDispo(item).subscribe(data => {
        //  console.log(data);
          resolve(data);
          });
});
     
}

    delayedLog2(item){
      return new Promise((resolve, reject) => {
        this.authService.getEmpleadosDisponibles(item).subscribe(data => {
     //   console.log(data);
        resolve(data);
        });
      });     
    }



}
