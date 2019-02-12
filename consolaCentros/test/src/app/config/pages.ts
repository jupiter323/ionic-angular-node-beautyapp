import { ConfigModel } from '../core/interfaces/config';

export class PagesConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			'/': {
				page: {
					title: 'Dashboard',
					desc: 'Latest updates and statistic charts'
				}
			},
			servicios: {
				page: { title: 'Servicios', desc: 'Servicios Page' }
			},
			staff: {
				page: { title: 'Staff', desc: 'staff Page' }
			},	
				configuracion: {
				page: { title: 'Configuracion', desc: 'configuracion' }
			},	
			estadistica: {
				page: { title: 'estadistica', desc: 'estadistica' }
			},
			perfilnegocio: {
				page: { title: 'perfilnegocio', desc: 'perfilnegocio' }
			},

						horario: {
				page: { title: 'horario', desc: 'horario' }
			},

								review: {
				page: { title: 'review', desc: 'review' }
			},

							calendario: {
				page: { title: 'calendario', desc: 'calendario' }
			},

			editservicio: {
				page: { title: 'Editar Servicio', desc: 'Editar Page' }
			},
			addstaff: {
				page: { title: 'addstaff', desc: 'addstaff' }
			},
			agregarservicio: {
				page: { title: 'AgregarservicioComponent', desc: 'AgregarservicioComponent' }
			},
			agregaroferta: {
				page: { title: 'agregaroferta', desc: 'agregaroferta' }
			},
			editstaff: {
				page: { title: 'edit staff', desc: 'edit staff' }
			},

					soporte: {
				page: { title: 'soporte', desc: 'soporte' }
			},

			
			builder: {
				page: { title: 'Layout Builder', desc: 'Layout builder' }
			},
			header: {
				actions: {
					page: { title: 'Actions', desc: 'actions example page' }
				}
			},
			profile: {
				page: { title: 'User Profile', desc: '' }
			},
			404: {
				page: { title: '404 Not Found', desc: '', subheader: false }
			}
		};
	}
}
