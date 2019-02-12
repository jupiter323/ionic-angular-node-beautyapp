import { Component, Optional,OnInit, Inject,EventEmitter,ViewChild,ElementRef, Renderer2  } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';

import {Location} from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import {Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as moment from 'moment'; 

import {

  HostBinding,
  HostListener,
  Input
  
} from '@angular/core';

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'callback',
    pure: false
})

/*
export class CallbackPipe implements PipeTransform {
    transform(items: any[], callback: (item: any) => boolean): any {
        if (!items || !callback) {
            return items;
        }
        return items.filter(item => callback(item));
    }
}

*/



/**/

@Component({
  selector: 'm-modalcalen',
  template: `

  <div style="    min-width: 500px;">
    <div style="border-radius: 6px; background: #fff;border: 1px solid #c3c1bc;box-shadow: 5px 12px 40px 0 rgba(0,0,0,.2);display: block;padding: 20px;">
      <div>

        <div class="popOverDate" [ngClass]="{'citaE3sb':dataCita.estadoServicio == 3, 'citaE2sb': dataCita.estadoServicio == 2, 'citaE1sb':dataCita.estadoServicio == 1, 'citaE0sb':dataCita.estadoServicio == 0,'citaE4sb':dataCita.estadoServicio == 4}">
        <span>{{ dataCita.fechaServicio | date:'LLL' }}</span>
        <span>{{ dataCita.fechaServicio | date:'dd' }}</span>
        <span>{{dataCita.inicioServicio}}</span>
        </div>

        <div style="     padding-left: 18px;   display: inline-block;"> 
          <div class="tagStaff2" [ngClass]="{'citaE3sb3':dataCita.estadoServicio == 3, 'citaE2sb3': dataCita.estadoServicio == 2, 'citaE1sb3':dataCita.estadoServicio == 1, 'citaE0sb3':dataCita.estadoServicio == 0, 'citaE4sb3':dataCita.estadoServicio == 4}">
          {{dataCita.estadoServicio == 0 ? 'POR CONFIRMAR' : 
            dataCita.estadoServicio == 1 ? 'CONFIRMADA' : 
            dataCita.estadoServicio == 2 ? 'POR CONFIRMAR CLIENTE' : 
            dataCita.estadoServicio == 3 ? 'COMPLETADA' : 
            dataCita.estadoServicio == 4 ? 'CANCELADO' :'INVALIDA'}}
          </div>
          <div style="    margin-top: 23px;">
          <img style='    display: inline-block; margin: auto;     height: 37px;
    width: 37px;
    border-radius: 27px;' matListAvatar src="https://50.116.17.150:8443/{{dataCita.empleadoFoto}}" 
    onError="this.src='assets/app/media/img/userB.png'">
          <span style="   margin-left: 5px;font-size: 16px;font-weight: 400; display: inline-block;">{{dataCita.nombreEmpleado}}</span>
          </div>    
        </div>

        <div style='    display: inline-block;
    float: right;
    font-size: 15px;'>ID Reserva {{dataCita.idCita}}</div>
      </div>
      <hr>
      <div>
        <span style="font-weight: 500;color: #383734;font-size: 16px;">
        {{dataCita.nombreServicio}}
        </span>
        <mat-icon style='color: #888;vertical-align: middle;margin: 0px 3px;'>chevron_right</mat-icon>
        <span style="color: #383734;font-size: 16px;">{{dataCita.nombreCliente}}</span>
        <span style="    margin-left: 15px;color: #888;font-size: 16px;">
        {{getHoras(dataCita.duracion)}}h {{dataCita.duracion % 60}}min
        </span>
      </div>
      <hr>
      <div>

          <button  [routerLink]="['/detallecita']" [queryParams]="{id: dataCita.idCita}" mat-dialog-close class="btn btn-sm btn-success" style="" color="primary" >Detalle de Cita</button>
         
          <button mat-dialog-close style="    float: right;" class="btn btn-sm btn-outline-success"  color="primary" [hidden]='dataCita.cantEmpleados>1 || dataCita.estadoCita == 5 || dataCita.estadoCita == 4 || dataCita.estadoCita == 7 || 
          dataCita.estadoCita == 3 || dataCita.clienteReferencia'
           [routerLink]="['/reprogramacion']" [queryParams]="{id: dataCita.idCita}" skipLocationChange >
          Reprogramar
           </button>
      </div>
    </div>  
  </div>

`,
 styleUrls: ['./calendario.component.scss']
})
export class ModalcalenComponent {

dataCita:any;

  onAdd3 = new EventEmitter();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,
    private dialogRef:MatDialogRef<ModalcalenComponent>,
  ) {

     console.log(this.data);
     this.dataCita = this.data;
     //this.cdr.detectChanges();
  }
    cerrarDialog(){
      //this.onAdd3.emit(dataServicio);
      this.dialogRef.close();
    }

getHoras(hora){
  
  
  return Math.floor(hora/60);
}


}






@Component({
  selector: 'm-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

selectedDate:any;
closeResult:any;
textFilter:any;
textFilter2:any;
idCentro:any;
tipoCalendario = 1;
	loadingScreen = false;
	info:any=[];

   horasCalen = [{txt:'8 AM', val:'08'},
{txt:'9 AM', val:'09'},
{txt:'10 AM', val:'10'},
{txt:'11 AM', val:'11'},
{txt:'12 AM', val:'12'},
{txt:'1 PM', val:'13'},
{txt:'2 PM', val:'14'},
{txt:'3 PM', val:'15'},
{txt:'4 PM', val:'16'},
{txt:'5 PM', val:'17'},
{txt:'6 PM', val:'18'},
{txt:'7 PM', val:'19'},
{txt:'8 PM', val:'20'},
{txt:'9 PM', val:'21'},
{txt:'10+ PM', val:'22'}];

estadoFiltro:any=[1,0,3,4,2];
estadoFiltroEmpleados:any;
  empleados:any=[];
  dataTotal:any=[];
	ingresos:any=[];
  dataCalendario:any=[];
    dataCalendarioDia:any=[];
	bests:any=[];
    diasSemana:any;
  dateSelected:any;
    diasAdelante:any=[];
    private onDestroy$ = new Subject<void>();
todayDate:any;

budge:any;
     notis :any=[];

  specialDates = [];


@ViewChild('content') private content;
  constructor(   private elRef: ElementRef,
    private renderer: Renderer2,private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef,public dialog: MatDialog,
   private router: Router, private modalService: NgbModal,
   public location: Location,  private activatedRoute: ActivatedRoute) { 

    	    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;
    this.dateSelected = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.todayDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.diasSemana={};



    Observable.interval(180000).takeUntil(this.onDestroy$).subscribe(x => { 

     if(this.tipoCalendario==1){this.getCitasCalendario();}
     if(this.tipoCalendario==2){this.getCalendarioDia();}
     

    });

      this.specialDates = [
      { date: '2018-01-01', title: 'New Years Day' },
      { date: '2018-03-31', title: 'Good Friday' },
      { date: '2018-04-01', title: 'Easter Sunday' },
      { date: '2018-04-02', title: 'Easter Monday' },
      { date: '2018-05-21', title: 'Victoria Day' },
      { date: '2018-07-01', title: 'Canada Day' },
      { date: '2018-09-03', title: 'Labour Day' },
      { date: '2018-10-08', title: 'Thanksgiving' },
      { date: '2018-10-31', title: 'Halloween' },
      { date: '2018-11-11', title: 'Remembrance Day' },
      { date: '2018-12-25', title: 'Christmas' },
      { date: '2018-12-26', title: 'Boxing Day' },
      { date: '2018-12-31', title: 'New Years Eve' },
      { date: {}, title: 'today' }];

      


}

  chosenMonthHandler(ss) {
  console.log(ss);

  }
  updateDayStyles2() {
  setTimeout(function() {
  this.updateDayStyles();
}.bind(this), 200);
  }

  updateDayStyles() {
  moment.locale('es');
    let elements = document.querySelectorAll(".mat-calendar-content");
    console.log(elements);
    let x: any = elements.length > 0 ? elements[0].querySelectorAll('.mat-calendar-body-cell') : [];

    //this.loadingScreen = true;
    var mesN = moment(x[0].getAttribute('aria-label'),'LL').format('MM');
    var yearN = moment(x[0].getAttribute('aria-label'),'LL').format('YYYY');

    this.authService.getActualizacionMes2({idCentro:this.idCentro, mes:mesN, year:yearN})
    .subscribe((data:any) => {
    //this.loadingScreen = false;

    x.forEach(y => {

      data['porconfirmar'].forEach(t => {
        let f = moment(y.getAttribute('aria-label'),'LL');
        let g = moment(t.date, 'YYYY-MM-DD');

        if (f.isSame(g, 'day')) {
        let div = y.querySelectorAll('div')[0];
        let span = document.createElement('span');
        span.innerHTML = t.cant;
        span.classList.add('tooltiptext');
        div.appendChild(span);

        }
      });


            data['confirmados'].forEach(t => {
        let f = moment(y.getAttribute('aria-label'),'LL');
        let g = moment(t.date, 'YYYY-MM-DD');

        if (f.isSame(g, 'day')) {
        let div = y.querySelectorAll('div')[0];
        div.style.backgroundColor = "#34bfa3";
        div.style.color = "white";
            this.cdr.detectChanges();
        }
      });



    });

    this.cdr.detectChanges();

    },err => {
    //this.loadingScreen = false;
    console.log('someError');
    alert('Ups! Algo ha salido mal');
    });


 
  }


ngOnDestroy(): void {
    this.onDestroy$.next();
}

    open(content) {
        this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

        private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }


  ngOnInit() {


this.loadingScreen = true;
           this.authService.getStaff({idCentro:this.idCentro})
          .subscribe((data:any) => {
          this.loadingScreen = false;
          this.empleados = data;
          this.estadoFiltroEmpleados = data.map((item)=>{
          return item.idEmpleado;
          })
               this.cdr.detectChanges();
               this.moverFechas();
          console.log(data);
          },err => {
          console.log('someError');
          alert('Ups! Algo ha salido mal');
          });

         
  }

  ngAfterViewInit() {

       this.activatedRoute.queryParams.subscribe(params => {
                if(params.p == 1){
                   setTimeout(() =>{    
                      this.open(this.content);
                      this.location.replaceState('calendario')
                                  }
                   );
                }
                });


      var classname = document.getElementsByClassName("mat-calendar-next-button");
      var classname2 = document.getElementsByClassName("mat-calendar-previous-button");

      var myFunction = ()=>{
      console.log('next');
      this.updateDayStyles();
      };

      for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', myFunction, false);
      }
      for (var i = 0; i < classname2.length; i++) {
      classname2[i].addEventListener('click', myFunction, false);
      }

  }


  buscarR(){
  



   this.loadingScreen = true;
   var dataE = {idCentro: this.idCentro, idCita:this.textFilter2};
   console.log(dataE);

  this.authService.goReserva(dataE)
  .subscribe((data:any) => {
    console.log(data);
    if(data !== null && data !== 'null' && data[0] && data[0].idCita){

        this.router.navigate(['/detallecita'], {queryParams:{id: data[0].idCita}});

    }
    else{
      alert('Reserva no encontrada en tu negocio');
      this.loadingScreen = false;
      this.cdr.detectChanges();
    }

  },err => {
  this.loadingScreen = false;
  console.log('someError');
  alert('Ups! Algo ha salido mal');
  });




  }

   filterUser = (user)=> {
  //console.log(parseInt(this.textFilter));
  var buscarPor = parseInt(this.textFilter);
  //console.log(user.idCita);

  if(!buscarPor){return true;}
  else{return user.idCita == buscarPor;}
  
  }


 moverFechas(){

  this.diasAdelante=[];
  this.diasAdelante[0] = this.dateSelected;

  var date = new Date(this.dateSelected);
  console.log(date);
  
   for (let i = 1; i < 5; i++) { 

   date.setDate(date.getDate() + 1);
   this.diasAdelante[i] = formatDate(date, 'yyyy/MM/dd', 'en');

    }

    console.log(this.diasAdelante);

     this.cdr.detectChanges();

     if(this.tipoCalendario==1){this.getCitasCalendario();}
     if(this.tipoCalendario==2){this.getCalendarioDia();}
 }

getIntS(st){
  
  return parseInt(st)<8 ;
}

getIntS2(st){
  
  return parseInt(st)>22;
}

vistaDia(){

  this.tipoCalendario = 2;
  this.cdr.detectChanges();
  this.getCalendarioDia();

}
vistaSemana(){

  this.tipoCalendario = 1;
  this.cdr.detectChanges();
  this.moverFechas();

}
  moverFechasAA(valueRow){

  var date = new Date(this.dateSelected);

  if(valueRow == 1){

  date.setDate(date.getDate() + 5);
  this.dateSelected = formatDate(date, 'yyyy/MM/dd', 'en');

  }
  if(valueRow == 2){

    date.setDate(date.getDate() - 5);
  this.dateSelected = formatDate(date, 'yyyy/MM/dd', 'en');

  }

  this.moverFechas();

 }

  moverFechasAA2(valueRow){

  var date = new Date(this.dateSelected);

  if(valueRow == 1){

  date.setDate(date.getDate() + 1);
  this.dateSelected = formatDate(date, 'yyyy/MM/dd', 'en');

  }
  if(valueRow == 2){

    date.setDate(date.getDate() - 1);
  this.dateSelected = formatDate(date, 'yyyy/MM/dd', 'en');

  }

  this.moverFechas();

 }

changeFilter(ev){
  console.log(ev.value);
  console.log(this.estadoFiltro);
}

changeFilter2(ev){
  console.log(ev.value);
  console.log(this.estadoFiltroEmpleados);
}


filtroEstado(ev){
  console.log(ev.source.value);
  console.log(ev.source.selected);
  console.log(this.estadoFiltro);
  
}
aplicarFiltros(estado){

return this.estadoFiltro.includes(estado);

}

  getKeys(item){
 // console.log(item);

const result = this.dataTotal.filter(word => word.fechaServicio == item).length;
return result;
  }


  getKeys2(item){
  //console.log(item);

const result = this.dataTotal.filter(word => word.idEmpleado == item).length;
return result;
  }


aplicarFiltros2(dd){

return this.estadoFiltroEmpleados.includes((Object.values(dd)[0][0].idEmpleado));

}


aplicarFiltros3(dd){

return this.estadoFiltroEmpleados.includes(dd);

}



showSome2(dd){
  return (Object.values(dd)[0][0].empleadoFoto);

}

showSome(dd){
  return (Object.values(dd)[0][0].nombreEmpleado);

}
  getValues(item){

  return item;
  }
//getCalendarioNC


  getCalendarioDia(){


      this.loadingScreen = true;
      this.authService.getCalendarioDayNC({idCentro:this.idCentro, fecha:this.dateSelected})
      .subscribe((data:any) => {

      this.loadingScreen = false;
      console.log(data);

      //this.dataCalendario = data.servEmp;
      this.dataTotal = data.servAll;
      this.dataCalendarioDia = Object.values(data.servEmp);
      console.log(this.dataCalendarioDia);


      this.budge = data.budge;
      this.notis = data.notis;

      this.cdr.detectChanges();
      this.updateDayStyles();
      },err => {

      this.loadingScreen = false;
      console.log('someError');
      alert('Ups! Algo ha salido mal');

      });


  }


  getCitasCalendario(){


      this.loadingScreen = true;
      this.authService.getCalendarioNC({idCentro:this.idCentro, fecha:this.dateSelected})
      .subscribe((data:any) => {

      this.loadingScreen = false;
      console.log(data);

      this.dataCalendario = data.servEmp;
      this.dataTotal = data.servAll;

      this.budge = data.budge;
      this.notis = data.notis;


      this.cdr.detectChanges();
      this.updateDayStyles();

      },err => {

      this.loadingScreen = false;
      console.log('someError');
      alert('Ups! Algo ha salido mal');

      });


  }

changeCalen(fecha){
   this.dateSelected = formatDate(fecha, 'yyyy/MM/dd', 'en');
   this.moverFechas();

}


  openDialogCita(item){
       // const dialogRef = this.dialog.open(Modal3Component,{data:this.horarioGuardado});
        const dialogRef = this.dialog.open(ModalcalenComponent,{data:item});
  }

  }




