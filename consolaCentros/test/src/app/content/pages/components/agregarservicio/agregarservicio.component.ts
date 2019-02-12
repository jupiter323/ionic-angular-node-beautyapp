import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import {Location} from '@angular/common';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';



@Component({
  selector: 'm-agregarservicio',
  templateUrl: './agregarservicio.component.html',
  styleUrls: ['./agregarservicio.component.scss']
})




export class AgregarservicioComponent implements OnInit {




	idCentro : any;
	loadingScreen = false;
	subcategorias: any = [];
	categorias : any = [];
	servicio : any = {};
	empleados : any = [];
	firstFormGroup: FormGroup;



  constructor(private router: Router,private _location: Location,private activatedRoute: ActivatedRoute, private subheaderService: SubheaderService,
  private authService: AuthenticationService,private cdr: ChangeDetectorRef,
  private _formBuilder: FormBuilder) { 

   var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;


    	 this.firstFormGroup = this._formBuilder.group({
		nombreServicio: ['', Validators.required],
		precio: ['', Validators.required],
		duracionH: ['', Validators.required],
		duracionM: ['', Validators.required],
		idCategoria: ['', Validators.required],
		idSubcategoria: ['', Validators.required]

    });


          this.authService.getCategorias()
      .subscribe((data:any) => {
          this.categorias = data;
              this.cdr.detectChanges();

          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



      this.authService.getStaff({idCentro:this.idCentro})
      .subscribe((data:any) => {
          this.empleados = data;
              this.cdr.detectChanges();
          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });





  }

	ngOnInit() {

	}


      getSubs(eve){
      console.log(eve);

            this.authService.getSubcategorias({idCategoria:eve.value})
      .subscribe((data:any) => {
          this.subcategorias = data;
          //this.servicio.idSubcategoria = undefined;

		this.firstFormGroup.patchValue({
		idSubcategoria: undefined 
		});


          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

      }


getStaffSelect(){
  return this.empleados.filter(word => word.checke==true).length;
}
      guardarServicio(){
          
     this.loadingScreen = true;

      var dataEnv = this.firstFormGroup.value;
      dataEnv.idCentro = this.idCentro;
      dataEnv.empleados = this.empleados.filter(word => word.checke==true);
      console.log(dataEnv);

      //updateServicioNC
		this.authService.addServicioNC(dataEnv)
		.subscribe((data:any) => {
			this.loadingScreen = false;
			console.log(data);
			this.goBack();
		},err => {
		this.loadingScreen = false;
		this.cdr.detectChanges();
		console.log('someError');
		alert('Ups! Algo ha salido mal');
		});


      }


		goBack() {
		   this._location.back();
		}



}
