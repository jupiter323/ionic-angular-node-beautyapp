

import {ElementRef, ViewChild, NgZone,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { MouseEvent } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

import { AuthenticationService } from '../../../../core/auth/authentication.service';


import {} from '@types/googlemaps';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';
import {Location} from '@angular/common';

@Component({
  selector: 'm-perfilnegocio',
  templateUrl: './perfilnegocio.component.html',
  styleUrls: ['./perfilnegocio.component.scss']
})
export class PerfilnegocioComponent implements OnInit {






//dasd
selectedFile: File;
selectedFile2: File;
  centroInfo:any={};
loadingScreen=false;
idCentro:any;
 form: FormGroup;
 public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;
dataCentro =<any>[];
editarOn = false;
 markers: marker[] = [];
  zoom: number = 16;
//asd
  constructor(private router: Router,private _location: Location,private activatedRoute: ActivatedRoute, private subheaderService: SubheaderService,public fb: FormBuilder,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private cdr: ChangeDetectorRef,
  private authService: AuthenticationService) { 


  	 this.searchControl = new FormControl();


          var retrievedObject = JSON.parse(localStorage.getItem('userADby2as'));
          this.idCentro = retrievedObject.idCentro;

  	      this.dataCentro['latitud'] = 51.673858;
          this.dataCentro['longitud'] = 7.815982;


  	 }

	ngOnInit() {



      this.loadingScreen = true;
        this.authService.getCentroInfoNC({idCentro:this.idCentro})
      .subscribe((data:any) => {
            this.loadingScreen = false;
          this.centroInfo = data[0];

                this.markers[0]={
      lat: this.centroInfo.latitud,
      lng: this.centroInfo.longitud,
      label: 'Ubicacion',
      draggable: true
    };
          this.cdr.detectChanges();
          console.log(data);
        },err => {
              this.loadingScreen = false;
                    this.cdr.detectChanges();

               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });



      this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          componentRestrictions: {country: "pa"}
      });
      autocomplete.addListener("place_changed", () => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.centroInfo.latitud = place.geometry.location.lat();
          this.centroInfo.longitud  = place.geometry.location.lng();
          this.centroInfo.direccion  = place.formatted_address;

          this.markers[0]={
          lat: this.centroInfo.latitud,
          lng: this.centroInfo.longitud,
          label: 'Nueva Ubicacion',
          draggable: true
          };


          this.zoom = 16;
          this.cdr.detectChanges();

      });
    });

	}



		goBack() {
		   this._location.back();
	//	let _backUrl = 'servicios';

		//this.router.navigateByUrl(_backUrl);
	}

editarCentroInfo(){
this.loadingScreen = true;

  console.log(this.centroInfo);

          this.authService.updateCICN(this.centroInfo)
      .subscribe((data:any) => {


        this.loadingScreen = false;
        this.cdr.detectChanges();

        this.ngOnInit();

        },err => {
         this.loadingScreen = false;
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });


}

onFileChanged(event) {
    
    this.loadingScreen=true;
    this.selectedFile = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('idCentro', this.centroInfo.idCentro);
    uploadData.append('imageU', this.selectedFile, this.selectedFile.name);

      this.authService.actualizarBannerNC21(uploadData)
      .subscribe((data:any )=> {

          this.loadingScreen=false;
            this.ngOnInit();
      

        },err => {
               this.loadingScreen=false;
                this.ngOnInit();
               
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

  }


  onFileChanged2(event) {
    
    this.loadingScreen=true;
    this.selectedFile2 = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('idCentro', this.centroInfo.idCentro);
    uploadData.append('imageU', this.selectedFile2, this.selectedFile2.name);

      this.authService.actualizarFotoNC(uploadData)
      .subscribe((data:any )=> {

          this.loadingScreen=false;
            this.ngOnInit();
      

        },err => {
               this.loadingScreen=false;
                this.ngOnInit();
               
               console.log('someError');
                alert('Ups! Algo ha salido mal');
            });

  }





  
  mapClicked($event: MouseEvent) {



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
           this.centroInfo['direccion']=result;
              this.cdr.detectChanges();
          } else {
            //alert('No address available!');

          }
        }
      });


  if(true){
  this.centroInfo['longitud'] =$event.coords.lng;
  this.centroInfo['latitud']=$event.coords.lat;


    this.markers[0]={
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: 'Nueva Ubicacion',
      draggable: true
    };
    }
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
    markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);


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
           this.centroInfo['direccion']=result;
              this.cdr.detectChanges();
          } else {
            //alert('No address available!');

          }
        }
      });

      
  }


    createForm() {
    this.form = this.fb.group({
      imageU: null,
      imageB: null
    });
  }



}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
