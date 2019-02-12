import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';


import { AuthenticationService } from '../../../../core/auth/authentication.service';



import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'callback',
    pure: false
})
export class CallbackPipe implements PipeTransform {
    transform(items: any[], callback: (item: any) => boolean): any {
        if (!items || !callback) {
            return items;
        }
        return items.filter(item => callback(item));
    }
}


@Component({
  selector: 'm-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})




export class ServiciosComponent implements OnInit {

dataSource:any;


dataSource5:any;

textFilter:any;
/*
 interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
*/
//const ELEMENT_DATA: Element[] = [

 ELEMENT_DATA = [];

 ELEMENT_DATA2 = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},


];
  displayedColumns = ['nombre','precioOferta', 'fechaCaducidad', 'estado'];

  displayedColumns5 = ['nombre','precioTotal', 'fechaVencimiento', 'estado'];

  //dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    dataSource2 = new MatTableDataSource(this.ELEMENT_DATA2);


  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatPaginator) paginator2: MatPaginator;


@ViewChild(MatPaginator) paginator5: MatPaginator;


idCentro:any;
serviciosC=[];
ofertas:any=[];
loadingScreen=false;
paquetes:any=[];
  constructor( private authService: AuthenticationService, 
  private cdr: ChangeDetectorRef) { 

  var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
  this.idCentro = retrievedObject.idCentro;
  console.log(this.idCentro);
  this.textFilter='';
  }

  ngOnInit() {

      this.loadingScreen = true;
      this.authService.serviciosC({idCentro:this.idCentro})
      .subscribe((data:any) => {
            this.loadingScreen = false;
          this.serviciosC = data;
          this.cdr.detectChanges();
          console.log(data);
        },err => {
               this.loadingScreen = false;
                         this.cdr.detectChanges();
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

      this.authService.getPaquetes({idCentro:this.idCentro})
      .subscribe((data:any) => {

          console.log(data);
          this.ofertas = data.ofertas;
          this.paquetes = data.paquetes;
          this.ELEMENT_DATA = data.ofertas;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource5 = new MatTableDataSource( data.paquetes);
             this.dataSource.paginator = this.paginator;
             this.dataSource5.paginator = this.paginator5;
          this.cdr.detectChanges();
         
        },err => {
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

             this.paginator._intl.itemsPerPageLabel = 'ofertas por pagina';

      }

   filterUser = (user)=> {
 // console.log(this.textFilter);
    return user.nombre.toLowerCase().includes(this.textFilter.toLowerCase());
  }






cambiarPaquete(estado, id){
  
  console.log(estado, id);

        this.loadingScreen = true;
      this.authService.cambiarPaqueteNC({idPaqueteCentro:id, estado:estado})
      .subscribe((data:any) => {
       
       this.ngOnInit();
 
        },err => {
              this.loadingScreen = false;
              this.cdr.detectChanges();
              console.log('someError');
              alert('Ups! Algo ha salido mal');
            });


}



cambiarOferta(estado, id){
  
  console.log(estado, id);

        this.loadingScreen = true;
      this.authService.cambiarOfertaNC({idOferta:id, estado:estado})
      .subscribe((data:any) => {
       
       this.ngOnInit();
 
        },err => {
              this.loadingScreen = false;
              this.cdr.detectChanges();
              console.log('someError');
              alert('Ups! Algo ha salido mal');
            });


}


getHoras(hora){
  
  
  return Math.floor(hora/60);
}

    ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
    // this.dataSource2.paginator = this.paginator2;
  }


}
