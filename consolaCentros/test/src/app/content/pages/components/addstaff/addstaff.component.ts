
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import {Location} from '@angular/common';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'm-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss']
})
export class AddstaffComponent implements OnInit {

loaderValidator=false;
emailTaken=false;
	idCentro:any;
  addFormGroup: FormGroup;
 empleado:any={};
loadingScreen=false;

  constructor(private router: Router,private _location: Location,private activatedRoute: ActivatedRoute, private subheaderService: SubheaderService,
  private authService: AuthenticationService,private cdr: ChangeDetectorRef,
  private _formBuilder: FormBuilder) {


    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;



   }

	ngOnInit() {



       this.addFormGroup = this._formBuilder.group({
      nombreStaff: ['', Validators.required],
      desc: [''],
      telefonoStaff: ['', [Validators.pattern(/^\d{7}$|^\d{8}$/)]],
      correoStaff: ['', Validators.required,  this.checkUsername2.bind(this)]
    });


	}




 checkUsername2(control: FormControl): any {
  console.log(control.value);
 this.loaderValidator=true;

    return new Promise(resolve => {

        this.authService.verificarEmail2({email:control.value})
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

    });
    
  }


		guardarStaff() {
this.loadingScreen = true;
		
			var dataEnv = this.empleado;
	dataEnv.idCentro = this.idCentro;


			      this.authService.addStaffNC2(dataEnv)
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
		   this._location.back();
	//	let _backUrl = 'servicios';

		//this.router.navigateByUrl(_backUrl);
	}

}
