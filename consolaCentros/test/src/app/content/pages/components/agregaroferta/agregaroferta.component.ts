
import {Location} from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';


import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./agregaroferta.component.scss']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  onYClick(): void {
    this.dialogRef.close(1);
  }
}



@Component({
  selector: 'm-agregaroferta',
  templateUrl: './agregaroferta.component.html',
  styleUrls: ['./agregaroferta.component.scss']
})
export class AgregarofertaComponent implements OnInit {

loadingScreen=false;
idCentro:any;
selected2=false;
keys:any=[];
itemMarcado:any;
valorOferta:any;
serviciosValues:any=[];
  constructor(private _location: Location,private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef, public dialog: MatDialog) {

    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;

   }

  ngOnInit() {

        this.authService.serviciosGroupNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
		this.keys = Object.keys(data);
		this.serviciosValues = Object.values(data);
          //this.serviciosC = data;
         // this.cdr.detectChanges();
    this.cdr.detectChanges();
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



  }
//marcarEnOfertaNC



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

      data: {name: this.valorOferta, animal: ''},
       // height: '144px',
        width: '30%',
         panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if(result == 1){
      this.macarcarOferta();
      }

    });
  }



macarcarOferta(){

	console.log(this.selected2);
	console.log(this.valorOferta);
	this.loadingScreen = true;
	
	var dataEnv = {idServicio:this.selected2,precioOferta:this.valorOferta};
	this.authService.marcarEnOfertaNC(dataEnv)
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
	//	let _backUrl = 'servicios';

		//this.router.navigateByUrl(_backUrl);
	}


	OnChange($event,i, item){
	
	$event.checked ? (this.selected2=i) : (this.selected2=undefined);
	this.valorOferta=undefined;

	if($event.checked){
	this.itemMarcado = item;
	}
	else{
	this.itemMarcado = {};
	}
    //MatCheckboxChange {checked,MatCheckbox}
}





}
