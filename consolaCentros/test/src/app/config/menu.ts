// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
	public config: any = {};

/*
{
						title: 'Dashboard',
						desc: 'Some description goes here',
						root: true,
						icon: 'flaticon-line-graph',
						page: '/',
						badge: {type: 'm-badge--danger', value: '2'},
						translate: 'MENU.DASHBOARD'
					},
*/


	constructor() {
		this.config = {
			header: {
				self: {},
				items: []
			},
			aside: {
				self: {},
				items: [

					{
						title: 'Yourbeauty',
						desc: '',
						function: 'logo'
			
						
					},

					{
						title: 'Calendario',
						desc: 'Calendario',
						root: true,
						icon: '	flaticon-event-calendar-symbol',
						page: '/calendario',
						allRoles:true
					},

					{
						title: 'Servicios',
						desc: 'Servicios administrar',
						root: true,
						icon: 'flaticon-signs',
						page: '/servicios',
						allRoles:true
					},

					{
						title: 'Staff',
						desc: 'Staff administrar',
						root: true,
						icon: 'flaticon-profile',
						page: '/staff',
						allRoles:true
					},




					{
						title: 'Pefil Negocio',
						desc: 'Pefil Negocio',
						root: true,
						icon: 'flaticon-map-location',
						page: '/perfilnegocio'
					},
										{
						title: 'Valoraciones',
						desc: 'reviews',
						root: true,
						icon: 'flaticon-star',
						page: '/review'
					},

					{
						title: 'Horario',
						desc: 'Horario',
						root: true,
						icon: 'flaticon-clock-1',
						page: '/horario'
					},
					{
						title: 'Estadística',
						desc: 'estadistica',
						root: true,
						icon: 'flaticon-statistics',
						page: '/estadistica'
					},
					{
						title: 'Configuración',
						desc: 'Configuracion',
						root: true,
						icon: 'flaticon-cogwheel',
						page: '/configuracion'
					},


					{
						title: 'Soporte',
						desc: 'soporte',
						root: true,
						icon: 'flaticon-support',
						function: 'sopor'
					},
					{
						title: 'FAQ',
						desc: 'cerrar sesion',
						root: true,
						icon: 'flaticon-questions-circular-button',
						page: 'https://yourbeauty.ladesk.com/',
						function: 'faq'
					},


					{
						title: 'Cerrar Sesion',
						desc: 'cerrar sesion',
						root: true,
						icon: 'flaticon-logout',
						page: '',
						function: 'logout'
					},

	





				]
			}
		};
	}
}
