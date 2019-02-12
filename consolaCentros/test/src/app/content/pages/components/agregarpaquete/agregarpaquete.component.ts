
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
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'dialog-overview-example-dialog2.html',
    styleUrls: ['./agregarpaquete.component.scss']
})
export class DialogOverviewExampleDialog2 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  onYClick(): void {
    this.dialogRef.close(1);
  }
}



@Component({
  selector: 'm-agregarpaquete',
  templateUrl: './agregarpaquete.component.html',
  styleUrls: ['./agregarpaquete.component.scss']
})
export class AgregarpaqueteComponent implements OnInit {

loadingScreen=false;
idCentro:any;
selected2=false;
keys:any=[];
itemMarcado:any;
duracion:any={};
valorOferta:any;
serviciosValues:any=[];
itemsPaquete:any=[];

  constructor(private _location: Location,private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef, public dialog: MatDialog) {

    var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;

   }

  ngOnInit() {
      this.duracion.totalTiempo=0;
        this.authService.serviciosGroupNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
		this.keys = Object.keys(data);
		this.serviciosValues = Object.values(data);
          //this.serviciosC = data;
         this.cdr.detectChanges();
          console.log(this.keys);
          console.log(this.serviciosValues);
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



  }
//marcarEnOfertaNC


getHoras(hora){
  
  
  return Math.floor(hora/60);
}



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
        //height: '144px',
        width: '30%',
        panelClass: 'custom-dialog-container',
      data: {name: this.valorOferta, animal: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if(result == 1){
      //this.macarcarOferta();
    

        this.loadingScreen = true;
            this.cdr.detectChanges();
      var dataEnv = {duracion:this.duracion.totalTiempo,
                      nombrePaquete :this.duracion.nombre,
                     servicios:this.itemsPaquete,
                     precio:this.valorOferta,
                      idCentro:this.idCentro};
        console.log(dataEnv);
        this.macarcarOferta(dataEnv);
      }

    });
  }



macarcarOferta(daaata){



	this.authService.agregarPaqueteNC(daaata)
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
	

	//$event.checked ? (this.selected2=i) : (this.selected2=undefined);
	//this.valorOferta=undefined;
console.log(item.duracion);
	if($event.checked){
	this.itemsPaquete.push(item);
  this.duracion.totalTiempo += item.duracion;
	}
	else{
    this.duracion.totalTiempo -= item.duracion;
    var index = this.itemsPaquete.map(x => {

    return x.idServicio;
    }).indexOf(i);

    this.itemsPaquete.splice(index, 1);
	}
  console.log(this.itemsPaquete);
    //MatCheckboxChange {checked,MatCheckbox}
}





}
