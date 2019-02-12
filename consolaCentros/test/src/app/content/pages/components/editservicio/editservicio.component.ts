import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import {Location} from '@angular/common';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'm-editservicio',
  templateUrl: './editservicio.component.html',
  styleUrls: ['./editservicio.component.scss']
})
export class EditservicioComponent implements OnInit {

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
          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


  }

	ngOnInit() {
			
		//this.loadingSubject.next(true);
		this.activatedRoute.queryParams.subscribe(params => {
			
			
			const id = params.id;
			console.log(id);
			if (id && id > 0) {

				this.authService.getServicioNC({idServicio:id, idCentro:this.idCentro})
				.subscribe((data:any) => {
			console.log(data);
				this.servicio = data.servicio[0];
				this.empleados = data.empleados;

				this.servicio.duracionH = ( Math.floor(this.servicio.duracion/60))*60;
				this.servicio.duracionM = this.servicio.duracion%60;

					


				this.getSubs2(this.servicio.idCategoria);
				this.cdr.detectChanges();
				//console.log(data);
				},err => {
				console.log('someError');
				alert('Ups! Algo ha salido mal');
				});



			} else {
			console.log('error no data');
			/*
				const newProduct = new ProductModel();
				newProduct.clear();
				this.product = newProduct;
				this.oldProduct = Object.assign({}, newProduct);
				this.initProduct();
				*/
			}
			


		});
		/*
		for (let i = 2018; i > 1945; i--) {
			this.availableYears.push(i);
		}
		*/
	}
      getSubs(eve){
      console.log(eve);
      //this.categoriaName = (eve.source.selected._element.nativeElement.innerText.trim());
            this.authService.getSubcategorias({idCategoria:eve.value})
      .subscribe((data:any) => {
          this.subcategorias = data;
          this.servicio.idSubcategoria = undefined;
          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

      }




      eliminarServicio(){
      this.loadingScreen = true;
      console.log(this.servicio);

		this.authService.eliminarServicio({idServicio:this.servicio.idServicio})
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


      editarServicio(){
      this.loadingScreen = true;

      this.servicio.empleados = this.empleados;
      console.log(this.servicio);
      //updateServicioNC

		this.authService.updateServicioNC(this.servicio)
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

      getSubs2(id){

            this.authService.getSubcategorias({idCategoria:id})
      .subscribe((data:any) => {
          this.subcategorias = data;
          this.cdr.detectChanges();
          console.log(data);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

      }



		goBack() {
		   this._location.back();
	//	let _backUrl = 'servicios';

		//this.router.navigateByUrl(_backUrl);
	}



}
