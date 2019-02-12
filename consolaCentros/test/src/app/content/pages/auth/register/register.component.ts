import {
	Component,
	Injectable,
	OnInit,
  Optional,
	Input,
  Inject,
	Output,
  EventEmitter,
   NgZone,
	ViewChild,
	ElementRef
} from '@angular/core';

import { MatStepper } from '@angular/material';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
	selector: 'm-modal3',
	template: `
<mat-dialog-content>
  <div class="modal-header">
        <h4 class="modal-title" style="    font-size: 25px;
    line-height: 34px;
    font-weight: 300;">Agregando Horario</h4>
        <button type="button" class="close" aria-label="Close"  mat-dialog-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="padding: 0px !important">
        <div class="col-xl-12" style="" >
          <div style='    padding: 30px 0px 0px 0px;'>

          


 
          
      


        <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.lunes.open" >
              <span class='labelBy horarioSpan'>Lunes</span>
            </mat-checkbox>
                  <div class="conteinInput" *ngIf='!horarioSeleccionado.lunes.open' > 
      CERRADO
      </div>

      <div class="conteinInput"  *ngIf='horarioSeleccionado.lunes.open'> 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.lunes.abrir" class='inputBy w50b ssdd'>
                <mat-option  *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.lunes.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div>  
 
      <hr>

                <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.martes.open" >
              <span class='labelBy horarioSpan'>Martes</span>
            </mat-checkbox>

      <div class="conteinInput" *ngIf='!horarioSeleccionado.martes.open' > 
      CERRADO
      </div>

      <div class="conteinInput"  *ngIf='horarioSeleccionado.martes.open'> 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.martes.abrir" class='inputBy w50b ssdd'>
                <mat-option  *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.martes.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div>  
 

      <hr>

        <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.miercoles.open" >
              <span class='labelBy horarioSpan'>Miercoles</span>
            </mat-checkbox>

                    <div class="conteinInput" *ngIf='!horarioSeleccionado.miercoles.open' > 
      CERRADO
      </div>

      <div class="conteinInput"  *ngIf='horarioSeleccionado.miercoles.open'> 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.miercoles.abrir" class='inputBy w50b ssdd'>
                <mat-option  *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.miercoles.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div>  
 
      <hr>


         <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.jueves.open" >
              <span class='labelBy horarioSpan'>Jueves</span>
            </mat-checkbox>
                  <div class="conteinInput" *ngIf='!horarioSeleccionado.jueves.open' > 
      CERRADO
      </div>
      <div class="conteinInput"  *ngIf='horarioSeleccionado.jueves.open'> 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.jueves.abrir" class='inputBy w50b ssdd'>
                <mat-option  *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.jueves.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div>  
 
      <hr>


         <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.viernes.open" >
              <span class='labelBy horarioSpan'>Viernes</span>
            </mat-checkbox>
      <div class="conteinInput" *ngIf='!horarioSeleccionado.viernes.open' > 
      CERRADO
      </div>
      <div class="conteinInput"  *ngIf='horarioSeleccionado.viernes.open'> 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.viernes.abrir" class='inputBy w50b ssdd'>
                <mat-option  *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.viernes.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div>  
 

      <hr>


         <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.sabado.open" >
              <span class='labelBy horarioSpan'>Sabado</span>
            </mat-checkbox>
      <div class="conteinInput" *ngIf='!horarioSeleccionado.sabado.open' > 
      CERRADO
      </div>
      <div class="conteinInput" *ngIf='horarioSeleccionado.sabado.open' > 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.sabado.abrir" class='inputBy w50b ssdd'>
                <mat-option  *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.sabado.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div>  
 
<hr>
        <div class="horarioContainer">
            <mat-checkbox color='primary' [(ngModel)]="horarioSeleccionado.domingo.open" >
              <span class='labelBy horarioSpan'>Domingo</span>
            </mat-checkbox>

                              <div class="conteinInput" *ngIf='!horarioSeleccionado.domingo.open' > 
      CERRADO
      </div>

      <div class="conteinInput"  *ngIf='horarioSeleccionado.domingo.open'> 
            <div style="display: flex">
                <mat-select [(ngModel)]="horarioSeleccionado.domingo.abrir" class='inputBy w50b ssdd'>
                <mat-option *ngFor="let h of horarioHoras; let ii = index" value="{{h.valor}}">
                {{h.text}}
                </mat-option>
          </mat-select>
          <div class="separatorHours"> - </div>
                <mat-select [(ngModel)]="horarioSeleccionado.domingo.cerrar" class='inputBy w50b ssdd'>
                  <mat-option  *ngFor="let h of horarioHoras; let i = index" value="{{h.valor}}">
                    {{h.text}}
                  </mat-option>
                </mat-select>
            </div>
      </div>
        </div> 



          
          </div>
        </div>
      </div>
      <div class="modal-footer">

        <button type="button" class="btn"  mat-raised-button color="primary" (click)='guardarHorario()'>Guardar
        </button>

      </div>
</mat-dialog-content>
`,
 styleUrls: ['./register.component.scss']
})
export class Modal3Component {



onAdd2 = new EventEmitter();



diasSemana = [{nombre:'Domingo', dia:0},
              {nombre:'Lunes', dia:1},
              {nombre:'Martes', dia:2},
              {nombre:'Miercoles', dia:3},
              {nombre:'Jueves', dia:4},
              {nombre:'Viernes', dia:5},
              {nombre:'Sabado', dia:6}];



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

  horarioSeleccionado:any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,public authNoticeService: AuthNoticeService,
    private dialogRef:MatDialogRef<Modal3Component>,
        public dialog: MatDialog,private _formBuilder: FormBuilder,private cdr: ChangeDetectorRef){

console.log(this.data);
if(this.data){
    this.horarioSeleccionado = this.data;
}else{
  
  this.horarioSeleccionado = {
                       domingo:{diaSemana:0, open:false},
                       lunes:{diaSemana:1, open:false},
                       martes:{diaSemana:2, open:false},
                       miercoles:{diaSemana:3, open:false},
                       jueves:{diaSemana:4, open:false},
                       viernes:{diaSemana:5, open:false},
                       sabado:{diaSemana:6, open:false},
                       };
}

    }

    guardarHorario(){
      this.onAdd2.emit(this.horarioSeleccionado);
   this.dialogRef.close();
    }

}







@Component({
  selector: 'm-modal4',
  template: `
<mat-dialog-content>
  <div class="modal-header">
        <h4 class="modal-title" style="    font-size: 25px;
    line-height: 34px;
    font-weight: 300;">Agregar Servicio</h4>
        <button type="button" class="close" aria-label="Close" mat-dialog-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="    width: 500px;padding: 0px !important">
          <div  style="" >

        <div style='padding: 30px 0px;'>
            <div style="margin-bottom: 0px;
    background: white;
    padding: 0px;
    font-size: 16px;">
           
  
              
      <form [formGroup]="firstFormGroupService"  #f4="ngForm">
     

     <mat-form-field  color="primary" style='    padding: 0px 25px;width: 50% !important;font-size: 16px !important;'>
        <input style='    padding-top: 10px !important;' matInput placeholder="Nombre del servicio" formControlName="nombreServicio" autocomplete="off" required>
         <mat-label><mat-icon style='  vertical-align: middle;  font-size: 25px !important;'>spa</mat-icon>Nombre Servicio</mat-label>
      </mat-form-field>



           <mat-form-field  color="primary" style='    padding: 0px 25px;width: 50% !important;font-size: 16px !important;'>
            <span matPrefix>$ &nbsp;</span>
        <input type='number' style='    padding-top: 10px !important;' matInput placeholder="Precio del servicio" formControlName="precioServicio" autocomplete="off" required>
         <mat-label><mat-icon style='  vertical-align: middle;  font-size: 25px !important;'>attach_money</mat-icon>Precio sin itbms</mat-label>
      </mat-form-field>




<div style='    display: flex;'>
    <mat-select (selectionChange)="getSubs($event)" formControlName="categoriaServicio" required placeholder="Categoria" class='inputBy w50b mauto' style='border: solid 1px #e1e1e1;padding: 5px;' >

              <mat-option  *ngFor="let c of categorias" value="{{c.idCategoria}}">
              {{c.nombre}}
              </mat-option>

    </mat-select>


    <mat-select  (selectionChange)="subName($event)" formControlName="subcategoriaServicio" placeholder="SubCategoria" class='inputBy w50b mauto' style='border: solid 1px #e1e1e1;padding: 5px;' >

              <mat-option  *ngFor="let sc of subcategorias" value="{{sc.idSubcategoria}}">
              {{sc.nombre}}
              </mat-option>
    </mat-select>

</div>





<p style='margin-top: 20px; margin-left: 25px;'>Duración</p>
<div style='    display: flex;'>

    <mat-select formControlName="horaServicio" placeholder="hora" class='inputBy w50b mauto' style='border: solid 1px #e1e1e1;padding: 5px;' >

              <mat-option value="0">0 horas</mat-option>
              <mat-option value="60">1 hora</mat-option>
              <mat-option value="120">2 horas</mat-option>
              <mat-option value="180">3 horas</mat-option>
              <mat-option value="240">4 horas</mat-option>
              <mat-option value="300">5 horas</mat-option>




    </mat-select>


    <mat-select formControlName="minutoServicio" placeholder="minutos" class='inputBy w50b mauto' style='border: solid 1px #e1e1e1;padding: 5px;' >
              <mat-option value="0">0 minutos</mat-option>
              <mat-option value="5">5 minutos</mat-option>
              <mat-option value="10">10 minutos</mat-option>
              <mat-option value="15">15 minutos</mat-option>
              <mat-option value="20">20 minutos</mat-option>
              <mat-option value="25">25 minutos</mat-option>
              <mat-option value="30">30 minutos</mat-option>
              <mat-option value="35">35 minutos</mat-option>
              <mat-option value="40">40 minutos</mat-option>
              <mat-option value="45">45 minutos</mat-option>
              <mat-option value="50">50 minutos</mat-option>
              <mat-option value="55">55 minutos</mat-option>


    </mat-select>

</div>




    </form>



  <div  >
    <div style="padding: 40px 60px 0px 60px; ">
      <div style="color:darkgray;font-size: 16px;font-weight: 500 !important;margin-bottom: 20px;">
      Empleados que dan este servicio</div>
          <div style="border: solid 1px lightgray;padding: 20px;">



            

            <p *ngFor="let e of empleados; let i = index">
            <mat-checkbox color='primary' [(ngModel)]="e.checked" name="{{i}}-name">
            <img  class='imgCheckBox' src="assets/app/media/img/userB.png">
            <span class="txtF">{{e.nombre}}</span>
            </mat-checkbox>
            </p>

            
          </div>

    </div>
  </div>


          
             </div>
          
            </div>
          </div>
  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn"  mat-raised-button color="primary" (click)='guardarServicio()' [disabled]='!f4.form.valid || verificarLenSer()<1' >Guardar</button>

      </div>
</mat-dialog-content>
`,
 styleUrls: ['./register.component.scss']
})
export class Modal4Component {

  firstFormGroupService: FormGroup;
  empleados:any;
  onAdd3 = new EventEmitter();
categorias=[];
subcategorias=[];
categoriaName ='';
idCentro:any;
subcategoriaName='';
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,private translate: TranslateService,private _formBuilder: FormBuilder,private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,
    private dialogRef:MatDialogRef<Modal4Component>,
  ) {


     this.idCentro = this.data;
     console.log(this.idCentro);


       //this.searchControl = new FormControl();
             this.firstFormGroupService = this._formBuilder.group({
      nombreServicio: ['', Validators.required],
      precioServicio: ['', Validators.required],
      categoriaServicio:['', Validators.required],
      subcategoriaServicio:['', Validators.required],
      horaServicio:['', Validators.required],
      minutoServicio:['', Validators.required]
    });


      this.authService.getCategorias()
      .subscribe((data:any) => {
          this.categorias = data;
          this.cdr.detectChanges();
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



          this.authService.getStaff({idCentro:this.idCentro})
          .subscribe((data:any) => {
          console.log(data);
          this.empleados = data;
          this.cdr.detectChanges();

          },err => {
          console.log('someError');
          alert('Ups! Algo ha salido mal');
          });




  }
      verificarLenSer(){
    var len = this.empleados.filter(ep => ep.checked == true).length;
    console.log(len);
    return len;

      }

    guardarServicio(){

    var dataServicio = this.firstFormGroupService.value;
    dataServicio.empleados=  this.empleados.filter(ep => ep.checked == true);
    dataServicio.subcategoriaName = this.subcategoriaName;
      dataServicio.categoriaName =this.categoriaName;
    //console.log(dataServicio);
  //  console.log(this.empleados);
      this.onAdd3.emit(dataServicio);
   this.dialogRef.close();
    }

      subName(eve){
      this.subcategoriaName = (eve.source.selected._element.nativeElement.innerText.trim());
      }


      getSubs(eve){
      console.log(eve);
      this.categoriaName = (eve.source.selected._element.nativeElement.innerText.trim());
            this.authService.getSubcategorias({idCategoria:eve.value})
      .subscribe((data:any) => {
          this.subcategorias = data;
          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

      }


}



@Component({
	selector: 'm-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


terminosycondiciones = false;
indexStaff = 0;
tipoStaff=0;
     editarStaff = false;
  isLinear = true;
  firstFormGroup: FormGroup;
  addFormGroup: FormGroup;
  secondFormGroup: FormGroup;
    infoFormGroup: FormGroup;
  

  horarioGuardado={
                       domingo:{diaSemana:0, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       lunes:{diaSemana:1, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       martes:{diaSemana:2, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       miercoles:{diaSemana:3, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       jueves:{diaSemana:4, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       viernes:{diaSemana:5, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       sabado:{diaSemana:6, open:false,abrir:'00:00:00',cerrar:'00:00:00'},
                       };


  direccionText='';
  avanceSteper = 0;
  empleadosAgregados = [];
   public searchControl: FormControl;
   modalReference: any;

   urlImg:any;
   urlImg2:any;
loaderValidator=false;
emailTaken=false;
loaderValidator2=false;
emailTaken2=false;
centroId = 0;
selectedFile: File;
selectedFile2: File;
  nombreCentroGlobal='';
  temData:any;
configuracion:any={};
	public model: any = { email: '' };
	@Input() action: string;
	@Output() actionChange = new Subject<string>();
	public loading = false;
  serviciosAgregados=[];
  public loadingScreen = false;
	@ViewChild('f') f: NgForm;
	errors: any = [];
cred:any={};
	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};
 @ViewChild('stepper') stepper: MatStepper;
	constructor(

		private authService: AuthenticationService,private modalService: NgbModal,
		public authNoticeService: AuthNoticeService,
		public dialog: MatDialog,
    private _ngZone: NgZone,
    private router: Router,
		private translate: TranslateService,private _formBuilder: FormBuilder,
		private mapsAPILoader: MapsAPILoader,private cdr: ChangeDetectorRef
	) {

	  	 this.searchControl = new FormControl();

	}

	ngOnInit() {

            if(localStorage.getItem('tempADby2as')!=='undefined' && localStorage.getItem('tempADby2as')!=='null' && localStorage.getItem('tempADby2as')!==null && localStorage.getItem('tempADby2as')!==undefined){
            console.log(localStorage.getItem('tempADby2as'));
            var retrievedObject = JSON.parse(localStorage.getItem('tempADby2as'));
             //this.idCentro = retrievedObject.idCentro;

                console.log(retrievedObject);
                this.temData = retrievedObject;
                
                this.centroId = retrievedObject.idCentro;
                this.nombreCentroGlobal = retrievedObject.nombreCentro;
                this.cred = { email: retrievedObject.email,
                password: retrievedObject.ps };


                //Completo solo el primer paso, brinca a
                //Agregar Staff

                if(retrievedObject.pasos == 1){
                this.avanceSteper = 15;

                this.empleadosAgregados.push({
                "nombre":retrievedObject.nombreTitular,
                "tipo": 1,
                "descripcion":'Administrador del Negocio',
                "telefono":'',
                "email":retrievedObject.email,
                idCentro : this.centroId
                });

                this.stepper.selectedIndex = retrievedObject.pasos;
                }

                if(retrievedObject.pasos == 2){
                this.avanceSteper = 30;
                this.stepper.selectedIndex = retrievedObject.pasos;
                }

                if(retrievedObject.pasos == 3){
                this.avanceSteper = 45;
                this.stepper.selectedIndex = retrievedObject.pasos;
                }

                if(retrievedObject.pasos == 4){
                this.avanceSteper = 60;
                this.stepper.selectedIndex = retrievedObject.pasos;
                }

                if(retrievedObject.pasos == 5){
                this.avanceSteper = 75;
                this.stepper.selectedIndex = retrievedObject.pasos;
                }


                if(retrievedObject.pasos == 6){
                this.avanceSteper = 90;
                this.stepper.selectedIndex = retrievedObject.pasos;
                }

                if(retrievedObject.pasos == 7){
                this.avanceSteper = 99;
                this.stepper.selectedIndex = retrievedObject.pasos;
                }



  
                localStorage.setItem('tempADby2as', undefined);
      
      
       
             }


	    this.firstFormGroup = this._formBuilder.group({
      nombreNegocio: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
           ruc: [''],
                nombreFactura: [''],
      correoElectronico: ['', Validators.required, this.checkUsername.bind(this)],
      password: ['', Validators.required],
       terminos: ['', Validators.required]
    });

          this.addFormGroup = this._formBuilder.group({
      nombreStaff: ['', Validators.required],
      puestoStaff: ['', Validators.required],
      telefonoStaff: ['', [Validators.pattern(/^\d{7}$|^\d{8}$/)]],
      correoStaff: ['', Validators.required,  this.checkUsername2.bind(this)]
    });


    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

      this.infoFormGroup = this._formBuilder.group({
      telefonoNegocio: ['', [Validators.required,Validators.pattern(/^\d{7}$|^\d{8}$/)]],
      descripcion: ['', Validators.required],
      webUsuario: ['', Validators.pattern(reg)],
      latitud: ['', Validators.required],
       longitud: ['', Validators.required],
        direccion: [''],
    });




	}

   get fs() { return this.addFormGroup.controls; }
   get ffg() { return this.firstFormGroup.controls; }
      get ifg() { return this.infoFormGroup.controls; }

  moveSt(index: number) {
    this.stepper.selectedIndex = index;
  }



getVal22(text){
  return text.split(' ').join('').replace(/á|Á/gi,'a').replace(/é|É/gi,'e').replace(/í|Í/gi,'i').replace(/ó|Ó/gi,'o').replace(/ñ|Ñ/gi,'n').replace(/ú|Ú/gi,'u').replace(/[^a-zA-Z0-9-_]/g, '');


}
setValueInp(){
 return this.firstFormGroup.value.accesoweb+'@.com';
}



quitarSpinner(){
  console.log('dd22');
}



 checkUsername2(control: FormControl): any {
  console.log(control.value);
 this.loaderValidator2=true;

    return new Promise(resolve => {

        this.authService.verificarEmail2({email:control.value})
      .subscribe((data:any) => {

          if(data.length>0){
            this.loaderValidator2=false;
            this.emailTaken2 = false;
            this.cdr.detectChanges();
            resolve({
            "username taken": true
            });
          }
          else{
            this.loaderValidator2=false;
            this.emailTaken2 = true;
            this.cdr.detectChanges();
            resolve(null);
          }


        },err => {
                console.log(err);
               this.cdr.detectChanges();
               console.log('someError');
  
            });

    });
    
  }

 checkUsername(control: FormControl): any {
  console.log(control.value);
 this.loaderValidator=true;

 console.log('here');




 //         this.cdr.detectChanges();

    return new Promise(resolve => {
 
      //Fake a slow response from server
 
        this.authService.verificarEmail({email:control.value})
      .subscribe((data:any) => {


          if(data.length>0){
            this.loaderValidator=false;
            this.emailTaken = false;
            this.cdr.detectChanges();
            resolve({
            "username taken": true
            });
          }
          else{
            this.loaderValidator=false;
            this.emailTaken = true;
            this.cdr.detectChanges();
            resolve(null);
          }


        },err => {
                console.log(err);
               this.cdr.detectChanges();
               console.log('someError');
  
            });
       /*      
      setTimeout(() => {
        if(true){
         console.log('here2');
          this.loaderValidator=false;
          this.emailTaken = false;
              this.cdr.detectChanges();

          resolve({
            "username taken": true
          });
 

        } else {
         console.log('here3');
          this.loaderValidator=false;
          this.emailTaken = true;
              this.cdr.detectChanges();

          resolve(null);
        }
      }, 2000);
 */
    });
    
  }


editStaff(staff,ind,content){
    this.indexStaff = ind;
    this.tipoStaff = staff.tipo;
    this.editarStaff = true;

    this.modalReference = this.modalService.open(content,{ centered: true });

   this.addFormGroup.setValue({
    nombreStaff: staff.nombre,
    puestoStaff: staff.descripcion,
    telefonoStaff: staff.telefono,
    correoStaff: staff.email
  });

}

eliminarS(index){
  this.serviciosAgregados.splice(index, 1);

}



editStaffDo(){
  
  this.empleadosAgregados[this.indexStaff] = {
          "nombre":this.addFormGroup.value.nombreStaff,
          "tipo": this.tipoStaff,
          "descripcion":this.addFormGroup.value.puestoStaff,
          "telefono":this.addFormGroup.value.telefonoStaff,
          "email":this.addFormGroup.value.correoStaff,
          "idCentro" : this.centroId
          };
  this.modalReference.close();
}


addStaff(tipo){
  
       this.empleadosAgregados.push({
          "nombre":this.addFormGroup.value.nombreStaff,
          "tipo": 2,
          "descripcion":this.addFormGroup.value.puestoStaff,
          "telefono":this.addFormGroup.value.telefonoStaff,
          "email":this.addFormGroup.value.correoStaff,
          "idCentro" : this.centroId
          });

          if(tipo==1){
          this.addFormGroup.reset();
          this.modalReference.close();
          }
          else{this.addFormGroup.reset()}
}
ddddsss(ss){console.log(ss);}

goForward2(stepper: MatStepper){
  this.loadingScreen=true;

      this.authService.addStaffNC(this.empleadosAgregados)
      .subscribe((data:any) => {

          this.loadingScreen=false;
          this.cdr.detectChanges();
      
      
        if(data.affectedRows>0){
          console.log(data);
          this.avanceSteper+=15;
          stepper.next();
          this.cdr.detectChanges();
        }
        else{
        alert('Ups! Algo ha salido mal');
        }



        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });
}






goForward4(stepper: MatStepper){
  this.loadingScreen=true;

  if(this.urlImg){

      const uploadData = new FormData();
      
      uploadData.append('idCentro', this.centroId.toString());
      uploadData.append('imageU', this.selectedFile, this.selectedFile.name);

        this.authService.actualizarBannerNC(uploadData)
      .subscribe((data:any )=> {

          this.loadingScreen=false;
          this.cdr.detectChanges();
      
      
        if(data.affectedRows>0){
          console.log(data);
          this.avanceSteper+=15;
          stepper.next();
          this.cdr.detectChanges();
        }
        else{
        alert('Ups! Algo ha salido mal');
        }



        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


  }
  else{
    this.loadingScreen=false;
    this.avanceSteper+=15;
    stepper.next();
    this.cdr.detectChanges();
  }



}

goForward42(stepper: MatStepper){
  this.loadingScreen=true;

  if(this.urlImg2){

      const uploadData = new FormData();
      
      uploadData.append('idCentro', this.centroId.toString());
      uploadData.append('imageU', this.selectedFile2, this.selectedFile2.name);

        this.authService.actualizarBannerNC2(uploadData)
      .subscribe((data:any )=> {

          this.loadingScreen=false;
          this.cdr.detectChanges();
      
      
        if(data.affectedRows>0){
          console.log(data);
          this.avanceSteper+=15;
          stepper.next();
          this.cdr.detectChanges();
        }
        else{
        alert('Ups! Algo ha salido mal');
        }



        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


  }
  else{
    this.loadingScreen=false;
    this.avanceSteper+=15;
    stepper.next();
    this.cdr.detectChanges();
  }



}


onFileChanged(event) {

    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e:any) => {
            var src = e.target.result;
            this.urlImg = src;
            this.cdr.detectChanges();
        };
     reader.readAsDataURL(event.target.files[0]);
  }



onFileChanged2(event) {

    this.selectedFile2 = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e:any) => {
            var src = e.target.result;
            this.urlImg2 = src;
            this.cdr.detectChanges();
        };
     reader.readAsDataURL(event.target.files[0]);
  }



goForward5(stepper: MatStepper){
  this.loadingScreen=true;

      
      //var dataEnviar:any = {};
      //dataEnviar.servicios = this.serviciosAgregados;
      //dataEnviar.idCentro =  this.centroId;  
      //console.log(dataEnviar);
    
        this.authService.updateStep({idCentro:this.centroId,step:6})
        .subscribe((data:any) => {
        console.log(data);
        });

      this.serviciosAgregados.forEach(item=>{

        var datE = {idCentro:this.centroId,
                    nombreServicio:item.nombreServicio,
                    idCategoria:item.categoriaServicio,
                    idSubcategoria:item.subcategoriaServicio,
                    duracionH:item.horaServicio,
                    duracionM:item.minutoServicio,
                    precio:item.precioServicio,
                    empleados:item.empleados};


        this.authService.addServicioNC(datE)
        .subscribe((data:any) => {
        
        console.log(data);
 
        },err => {
        this.loadingScreen = false;
        this.cdr.detectChanges();
        console.log('someError');
        alert('Ups! Algo ha salido mal');
        });

      });

      this.loadingScreen = false;
      this.avanceSteper+=15;
      stepper.next();
      this.cdr.detectChanges();

    /*
      this.authService.addServiciosNC(dataEnviar)
      .subscribe((data:any) => {

          this.loadingScreen=false;
          this.cdr.detectChanges();
      
      
        if(data.affectedRows>0){
          console.log(data);
          this.avanceSteper+=15;
          stepper.next();
          this.cdr.detectChanges();
        }
        else{
        alert('Ups! Algo ha salido mal');
        }



        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });
          */
}


goForward6(stepper: MatStepper){
  this.loadingScreen=true;
  console.log(this.cred);

  console.log(this.configuracion);
  this.configuracion.confAuto = this.configuracion.confirmacionAutomatica ? 1 : 0;
  this.configuracion.idCentro =  this.centroId; 

      this.authService.configuracionCentroNC(this.configuracion)
      .subscribe((data:any) => {

        if(data.affectedRows>0){
                this.loadingScreen = false;
      this.avanceSteper+=10;
      stepper.next();
      this.cdr.detectChanges();
      }
      
      


        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



}



goForward7(stepper: MatStepper, seleccion){
  this.loadingScreen=true;
  console.log(this.cred);

      this.authService.configuracionPrecioNC({idCentro:this.centroId, plan:seleccion})
      .subscribe((data:any) => {

          this.loadingScreen=false;
          this.cdr.detectChanges();
      
      
        if(data.affectedRows>0){
        
              this.authService.login(this.cred).subscribe(response => {
                this.loadingScreen=false;
              if (typeof response !== 'undefined') {
                this.router.navigate(['/calendario'], {queryParams:{p: 1}});
              } else {
                alert('Uuupss... ha ocurrido un error');
              }
              //this.spinner.active = false;
              this.cdr.detectChanges();
            });
        }

        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



}



getLen(){
var horarioDefinido=true;
      Object.keys(this.horarioGuardado).forEach(key => {
      if(this.horarioGuardado[key].open){ 
        horarioDefinido = false;
      }
      });

  return horarioDefinido;
}
goForward3(stepper: MatStepper){
  this.loadingScreen=true;

      let dataEnviar = this.infoFormGroup.value;
      dataEnviar.horario=[];
      dataEnviar.nombreCentro = this.nombreCentroGlobal; 
      dataEnviar.idCentro = this.centroId; 
      

      Object.keys(this.horarioGuardado).forEach(key => {
      if(this.horarioGuardado[key].open){ 
        dataEnviar.horario.push(this.horarioGuardado[key]);
      }
      });

      console.log(dataEnviar);
     
      this.authService.addInfoCentroNC(dataEnviar)
      .subscribe((data:any) => {

          this.loadingScreen=false;
          this.cdr.detectChanges();
      
      
        if(data.affectedRows>0){
          console.log(data);
          this.avanceSteper+=15;
          stepper.next();
          this.cdr.detectChanges();
        }
        else{
        alert('Ups! Algo ha salido mal');
        }



        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });
          
}






  goForward(stepper: MatStepper){
  console.log(stepper);
   if( this.firstFormGroup.valid){

   this.loadingScreen=true;

      var ddd = this.firstFormGroup.value;
      //ddd.accesoweb = this.firstFormGroup.value.nombreNegocio.split(' ').join('');
      ddd.accesoweb = this.getVal22(this.firstFormGroup.value.nombreNegocio);
      
      this.authService.nuevoUsuarioNC(ddd)
      .subscribe((data:any) => {


          this.loadingScreen=false;
          this.cdr.detectChanges();
      
        console.log(data);

        if(data.affectedRows>0){
          this.avanceSteper+=15;
          this.centroId = data['insertId'];
          this.nombreCentroGlobal = this.firstFormGroup.value.nombreNegocio;
          this.cred = { email: this.firstFormGroup.value.correoElectronico,
           password: this.firstFormGroup.value.password };

          this.empleadosAgregados.push({
          "nombre":this.firstFormGroup.value.nombreUsuario,
          "tipo": 1,
          "descripcion":'Administrador del Negocio',
          "telefono":'',
          "email":this.firstFormGroup.value.correoElectronico,
            idCentro : this.centroId
          });

          stepper.next();
        }
        else{
        alert('Ups! Algo ha salido mal');
        }


        },err => {
               this.loadingScreen=false;
               this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


      //this.avanceSteper+=15;
      //stepper.next();
  }

   
}



	loginPage(event: Event) {
		event.preventDefault();
		this.action = 'login';
		this.actionChange.next(this.action);
	}

  editServicio(servicio, index){
  console.log(servicio, index);
  }

  openDialogService() {

    /*
    var dataServicio:{nombre:'',
                      precio:'',
                      categoria:'',
                      subcategoria:'',
                      duracionH:'',
                      duracionM:'',
                      empleados:[]
                      };
    */

    const dialogRefS = this.dialog.open(Modal4Component,{data:this.centroId});

    const sub = dialogRefS.componentInstance.onAdd3.subscribe((data) => {
      console.log(data);
      this.serviciosAgregados.push(data);
              this.cdr.detectChanges();
    });


}
	openDialog3() {
		const dialogRef = this.dialog.open(Modal3Component,{data:this.horarioGuardado});
    const sub = dialogRef.componentInstance.onAdd2.subscribe((data) => {
      console.log(data);

              this.cdr.detectChanges();
    });

	}
	goBack() {
		this.action = 'login';
				this.actionChange.next(this.action);
	}

	open3(content) {
		 this.editarStaff = false;
      this.addFormGroup.reset();
  this.modalReference = this.modalService.open(content,{ centered: true });
	}



	openDialog4() {
		const dialogRef2 = this.dialog.open(ModalContentComponent);

    const sub = dialogRef2.componentInstance.onAdd.subscribe((data) => {
      console.log(data);

      if(!!data.latitud && !!data.longitud){
        console.log('ok');
        
        this.direccionText = (data.direccion || '');
        this.infoFormGroup.controls['latitud'].setValue(data.latitud);
        this.infoFormGroup.controls['longitud'].setValue(data.longitud);
        this.infoFormGroup.controls['direccion'].setValue((data.direccion || ''));
         this.cdr.detectChanges();


      }

    });

		/*
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
		*/


	}


	open4() {
var mRf = this.modalService.open(ModalContentComponent);

mRf.result.then((data) => {

	var cols =     document.getElementsByClassName('pac-container');
	  cols[0].parentNode.removeChild(cols[0]);

}, (reason) => {

	var cols =     document.getElementsByClassName('pac-container');
	  cols[0].parentNode.removeChild(cols[0]);

});

	}


	validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
		}

		this.errors = [];
		if (objectPath.get(f, 'form.controls.fullname.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', {name: this.translate.instant('AUTH.INPUT.FULLNAME')}));
		}

		if (objectPath.get(f, 'form.controls.email.errors.email')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', {name: this.translate.instant('AUTH.INPUT.EMAIL')}));
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', {name: this.translate.instant('AUTH.INPUT.EMAIL')}));
		}

		if (objectPath.get(f, 'form.controls.password.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', {name: this.translate.instant('AUTH.INPUT.PASSWORD')}));
		}
		if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.MIN_LENGTH', {name: this.translate.instant('AUTH.INPUT.PASSWORD'), min: 4}));
		}

		if (objectPath.get(f, 'form.controls.rpassword.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', {name: this.translate.instant('AUTH.INPUT.CONFIRM_PASSWORD')}));
		}

		if (objectPath.get(f, 'form.controls.agree.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.AGREEMENT_REQUIRED'));
		}

		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		}

		return false;
	}
}









@Component({
  selector: 'modal-content',
  template: `
<mat-dialog-content style='width: 600px !important;'>
  
      <div class="modal-body" style="padding: 0px !important">
        <div class="row">

        <div class="col-xl-12" >

            <div > <label class='labelBy'>Busca un lugar y mueve el pin a la ubicación de tu negocio</label></div>
            <div >

            <div class="form-group">
            <input style='width: 75% !important;display: inline-block;' placeholder="busca por lugar" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl" >

        <button style='float: right;' type="button" class="btn" mat-raised-button color="primary" (click)='addCoords()'>Guardar</button>

     

            </div>

            <agm-map style='height: 400px; width: 100%' 
            [latitude]="dataCentro.latitud"
            [longitude]="dataCentro.longitud"
            [zoom]="zoom"
            [disableDefaultUI]="false"
            [zoomControl]="true"
            [mapDraggable]="true"
            (mapClick)="mapClicked($event)">


                       <agm-marker 
            *ngFor="let m of markers; let i = index"
            (markerClick)="clickedMarker(m.label, i)"
            [latitude]="m.lat"
            [longitude]="m.lng"
            [label]="m.label"
            [markerDraggable]="m.draggable"
            (dragEnd)="markerDragEnd(m, $event)">

            <agm-info-window>
            <strong>InfoWindow content</strong>
            </agm-info-window>

            </agm-marker> 


            </agm-map>
            </div>

          </div>
        </div>
      </div>
 
      </mat-dialog-content>
  `,
   styleUrls: ['./register.component.scss']
})

//@Injectable()
export class ModalContentComponent implements OnInit {

 form: FormGroup;
 public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;
dataCentro =<any>[];
editarOn = false;
 markers= <any>[];
  zoom: number = 13;

onAdd = new EventEmitter();

  closeBtnName: string;

  @ViewChild('div') div: ElementRef;


  constructor(		private authService: AuthenticationService,private modalService: NgbModal,
		public authNoticeService: AuthNoticeService,
    private dialogRef:MatDialogRef<ModalContentComponent>,
				public dialog: MatDialog,
		private translate: TranslateService,private _formBuilder: FormBuilder,
		private mapsAPILoader: MapsAPILoader,private cdr: ChangeDetectorRef) {
		 this.searchControl = new FormControl();
/*
		  if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
console.log(pos);
      	           this.dataCentro['longitud'] = pos.coords.longitude;
          this.dataCentro['latitud'] = pos.coords.latitude;
this.cdr.detectChanges();

        //this.lng = +pos.coords.longitude;
        //this.lat = +pos.coords.latitude;
      });
    }

*/        


        



		}

  ngOnInit() {

          this.dataCentro['longitud'] =  -79.51982668465575;
        this.dataCentro['latitud'] = 8.982303363336248;
        this.cdr.detectChanges();



          this.mapsAPILoader.load().then(() => {
          console.log('dd');
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          componentRestrictions: {country: "pa"}
      });
      autocomplete.addListener("place_changed", () => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place.formatted_address);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.dataCentro['latitud'] = place.geometry.location.lat();
          this.dataCentro['longitud'] = place.geometry.location.lng();
          this.dataCentro['direccion'] = place.formatted_address;
          this.zoom = 16;


          this.markers[0]={
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            label: 'Ubicacion',
            draggable: true
          };


          this.cdr.detectChanges();

      });
    });


/*
setTimeout(()=>{  
     this.fixPac();
 }, 500);

*/

  }


/*
cerrarM(){
this.activeModal.close();
	//var cols =     document.getElementsByClassName('pac-container');
    	
	 // cols[0].parentNode.removeChild(cols[0]);
}

*/


  mapClicked($event: MouseEvent) {
console.log($event);
//dd
var request:any;
 let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng($event.coords.lat, $event.coords.lng);
      request = { latLng: latlng };
       var address=''; 
  geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0].formatted_address;
          if (result != null) {
          console.log(results);
           console.log(result);
           this.dataCentro['direccion']=result;

           
           this.searchElementRef.nativeElement.value=result;
                this.cdr.detectChanges();
          } else {
            //alert('No address available!');

          }
        }
      });
//dd
  if(true){
  this.dataCentro['longitud'] =$event.coords.lng;
  this.dataCentro['latitud']=$event.coords.lat;


    this.markers[0]={
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: 'Ubicacion',
      draggable: true
    };
    }

     this.cdr.detectChanges();
  }


  addCoords(){
  this.onAdd.emit(this.dataCentro);
   this.dialogRef.close();
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
    markerDragEnd(marker, $event: MouseEvent) {
    console.log('dragEnd');


    var request:any;
 let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng($event.coords.lat, $event.coords.lng);
      request = { latLng: latlng };
       var address=''; 
  geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0].formatted_address;
          if (result != null) {
          console.log(results);
           console.log(result);
           this.dataCentro['direccion']=result;

           
           this.searchElementRef.nativeElement.value=result;
                this.cdr.detectChanges();
          } else {
            //alert('No address available!');

          }
        }
      });


  }





}






