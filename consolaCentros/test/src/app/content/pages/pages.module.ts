import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PartialsModule } from '../partials/partials.module';
import { ActionComponent } from './header/action/action.component';
import { ProfileComponent } from './header/profile/profile.component';
import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoadingModule } from 'ngx-loading';

import { DropdownModule } from 'angular-custom-dropdown';


import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { InnerComponent } from './components/inner/inner.component';
import { ServiciosComponent,CallbackPipe } from './components/servicios/servicios.component';
import { EditservicioComponent } from './components/editservicio/editservicio.component';
import { AgregarofertaComponent } from './components/agregaroferta/agregaroferta.component';
import { DialogOverviewExampleDialog } from './components/agregaroferta/agregaroferta.component';

import { AgregarpaqueteComponent } from './components/agregarpaquete/agregarpaquete.component';
import { DialogOverviewExampleDialog2 } from './components/agregarpaquete/agregarpaquete.component';

import { ConfiguracionComponent } from './components/configuracion/configuracion.component';


import { StaffComponent } from './components/staff/staff.component';
import { EditstaffComponent } from './components/editstaff/editstaff.component';
import { PerfilnegocioComponent } from './components/perfilnegocio/perfilnegocio.component';
import { AgregarservicioComponent } from './components/agregarservicio/agregarservicio.component';
import { AddstaffComponent } from './components/addstaff/addstaff.component';
import { DetallecitaComponent } from './components/detallecita/detallecita.component';
import { ReviewComponent } from './components/review/review.component';
import { ReprogramacionComponent } from './components/reprogramacion/reprogramacion.component';
import { SoporteComponent } from './components/soporte/soporte.component';




import { PerfectScrollbarModule }          from 'ngx-perfect-scrollbar';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { HorarioComponent } from './components/horario/horario.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ModalcalenComponent } from './components/calendario/calendario.component';

import { NuevareservaComponent } from './components/nuevareserva/nuevareserva.component';


import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule,MatIconModule,MatSelectModule,MatListModule,MatCheckboxModule,MatTableModule,MatPaginatorModule,MatStepperModule,MatFormFieldModule, MatDatepickerModule,MatNativeDateModule,MatInputModule,MatDialogModule} from '@angular/material';

import { CustomDateAdapter } from './custom-date-adapter';

import { RegisterComponent,Modal3Component,ModalContentComponent,Modal4Component} from './auth/register/register.component';

import { MAT_DATE_LOCALE } from '@angular/material';

import {MatButtonModule,MatCardModule,MatSlideToggleModule, DateAdapter} from '@angular/material';


import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);


@NgModule({
exports:[CallbackPipe],
	declarations: [
	Modal3Component,
	CallbackPipe,
	ModalContentComponent,Modal4Component,
	RegisterComponent,
		PagesComponent,
		ActionComponent,
		ConfiguracionComponent,
		ProfileComponent,
		ErrorPageComponent,
		InnerComponent,
		ServiciosComponent,
		EditservicioComponent,
		AgregarofertaComponent,
		AgregarpaqueteComponent,
		DialogOverviewExampleDialog,
		DialogOverviewExampleDialog2,
		StaffComponent,AddstaffComponent,
		AgregarservicioComponent,
		EditstaffComponent,
		NuevareservaComponent,
		ReprogramacionComponent,
		CalendarioComponent,
		PerfilnegocioComponent,
		ReviewComponent,
		DetallecitaComponent,
		SoporteComponent,
		HorarioComponent,EstadisticaComponent,ModalcalenComponent
	],
	imports: [
	MatButtonModule,MatCardModule,MatSlideToggleModule,
	PerfectScrollbarModule,
NgxMatSelectSearchModule,
		CommonModule,
		DropdownModule,
		MatSelectModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		CoreModule,
		LoadingModule,MatInputModule,
		NgbModule,
		LayoutModule,MatNativeDateModule,
		PartialsModule,
		AngularEditorModule,MatDialogModule,MatProgressSpinnerModule,
		MatStepperModule,MatFormFieldModule,
		MatCheckboxModule,MatTableModule,MatPaginatorModule,MatListModule,MatDatepickerModule,
		ReactiveFormsModule,MatIconModule,
		 AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAT-tTbOja69paXaiAgAtNi9nGHRh75bzk',
       libraries: ['geometry', 'places']
    })
	],
	entryComponents: [ModalcalenComponent,Modal3Component,
	ModalContentComponent,Modal4Component,DialogOverviewExampleDialog,DialogOverviewExampleDialog2],
	providers: [{provide: LOCALE_ID, useValue: 'es'},{provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
	 { provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class PagesModule {
}
