import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { InnerComponent } from "./components/inner/inner.component";

import { ServiciosComponent } from "./components/servicios/servicios.component";
import { EditservicioComponent } from './components/editservicio/editservicio.component';
import { AgregarofertaComponent } from './components/agregaroferta/agregaroferta.component';
import { StaffComponent } from './components/staff/staff.component';
import { EditstaffComponent } from './components/editstaff/editstaff.component';
import { PerfilnegocioComponent } from './components/perfilnegocio/perfilnegocio.component';
import { HorarioComponent } from './components/horario/horario.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { AgregarservicioComponent } from './components/agregarservicio/agregarservicio.component';

import { AgregarpaqueteComponent } from './components/agregarpaquete/agregarpaquete.component';
import { SoporteComponent } from './components/soporte/soporte.component';

import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { AddstaffComponent } from './components/addstaff/addstaff.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DetallecitaComponent } from './components/detallecita/detallecita.component';
import { ReviewComponent } from './components/review/review.component';
import { NuevareservaComponent } from './components/nuevareserva/nuevareserva.component';



import { RegisterComponent } from './auth/register/register.component';
import { ReprogramacionComponent } from './components/reprogramacion/reprogramacion.component';





const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		// Remove comment to enable login
	 canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['ADMIN', 'USER'],
				except: ['GUEST'],
				redirectTo: '/login'
			}
		},
		children: [
			{
				path: '',
					component: CalendarioComponent
			},
			{
				path: 'servicios',
				component: ServiciosComponent
			},
			{
				path: 'nuevareserva',
				component: NuevareservaComponent
			},
			{
				path: 'horario',
				component: HorarioComponent
			},
				{
				path: 'addstaff',
				component: AddstaffComponent
			},
			{
				path: 'reprogramacion',
				component: ReprogramacionComponent
			},

			{
				path: 'soporte',
				component: SoporteComponent
			},

							{
				path: 'estadistica',
				component: EstadisticaComponent
			},
									{
				path: 'review',
				component: ReviewComponent
			},
			
						{
				path: 'configuracion',
				component: ConfiguracionComponent
			},
			{
				path: 'staff',
				component: StaffComponent
			},		
			{
				path: 'staff',
				component: StaffComponent
			},
			{
				path: 'detallecita',
				component: DetallecitaComponent
			},
			{
				path: 'perfilnegocio',
				component: PerfilnegocioComponent
			},

				{
				path: 'calendario',
				component: CalendarioComponent
			},

			{
				path: 'editstaff',
				component: EditstaffComponent
			},
			{
				path: 'agregarservicio',
				component: AgregarservicioComponent
			},

			{
				path: 'editservicio',
				component: EditservicioComponent
			},
			{
				path: 'agregarpaquete',
				component: AgregarpaqueteComponent
			},
			{
				path: 'agregaroferta',
				component: AgregarofertaComponent
			},
			{
				path: 'builder',
				loadChildren: './builder/builder.module#BuilderModule'
			},
			{
				path: 'header/actions',
				component: ActionComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
			{
				path: 'inner',
				component: InnerComponent
			},
		]
	},
	{
		path: 'login',
		// canActivate: [NgxPermissionsGuard],
		loadChildren: './auth/auth.module#AuthModule',
		data: {
			permissions: {
				except: 'ADMIN'
			}
		},
	},

		{
		path: 'registro',
		// canActivate: [NgxPermissionsGuard],
		//loadChildren: './auth/auth.module#AuthModule',
		component:RegisterComponent,
		data: {
			permissions: {
				except: 'ADMIN'
			}
		},
	},


	{
		path: '404',
		component: ErrorPageComponent
	},
	{
		path: 'error/:type',
		component: ErrorPageComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
