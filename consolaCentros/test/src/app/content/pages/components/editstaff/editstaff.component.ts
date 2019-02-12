
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import {Location} from '@angular/common';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';



@Component({
  selector: 'm-editstaff',
  templateUrl: './editstaff.component.html',
  styleUrls: ['./editstaff.component.scss']
})
export class EditstaffComponent implements OnInit {

empleado:any={};
loadingScreen=false;
empleado2:any={};

  constructor(private router: Router,private _location: Location,private activatedRoute: ActivatedRoute, private subheaderService: SubheaderService,
  private authService: AuthenticationService,private cdr: ChangeDetectorRef,
  private _formBuilder: FormBuilder) { }

	ngOnInit() {
//getStaffIndi
	
		this.activatedRoute.queryParams.subscribe(params => {
			console.log(params);

			this.empleado2=params;
			this.empleado.nombre = this.empleado2.nombre;
				this.empleado.telefono = this.empleado2.telefono;
					this.empleado.email = this.empleado2.email;
						this.empleado.descripcion = this.empleado2.descripcion;
							this.empleado.tipo = this.empleado2.tipo;
								this.empleado.idFoto = this.empleado2.idFoto;
								this.empleado.idEmpleado = this.empleado2.idEmpleado;
								this.empleado.pass = this.empleado2.pass;


		});

	}




		guardarStaff() {
this.loadingScreen = true;
			console.log(this.empleado);

			      this.authService.editarStafNC(this.empleado)
      .subscribe((data:any) => {

          console.log(data);
          if(data.affectedRows>0){

          this.loadingScreen = false;
          this.goBack();
          }
        },err => {
            this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



		}


		borrarStaff() {
console.log(this.empleado.idEmpleado);
var idE=this.empleado.idEmpleado;
		this.loadingScreen = true;
	

			      this.authService.eliminarStaff({idEmpleado:idE})
      .subscribe((data:any) => {

          console.log(data);
          if(data.affectedRows>0){

          this.loadingScreen = false;
          this.goBack();
          }
        },err => {
            this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });





	}


		goBack() {

		this.router.navigate(['/staff']);

		 //  this._location.back();
	//	let _backUrl = 'servicios';

		//this.router.navigateByUrl(_backUrl);
	}

}
