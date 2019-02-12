import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import { UtilsService } from '../services/utils.service';
import { AccessData } from './access-data';
import { Credential } from './credential';

@Injectable()
export class AuthenticationService implements AuthService {
	API_URL = 'https://centro.yourbeauty.com.pa:8282';
	API_ENDPOINT_LOGIN = '/loginNC2';
	API_ENDPOINT_REFRESH = '/refresh';
	API_ENDPOINT_REGISTER = '/register';

	public onCredentialUpdated$: Subject<AccessData>;

	constructor(
		private http: HttpClient,
		private tokenStorage: TokenStorage,
		private util: UtilsService
	) {
		this.onCredentialUpdated$ = new Subject();
	}

	/**
	 * Check, if user already authorized.
	 * @description Should return Observable with true or false values
	 * @returns {Observable<boolean>}
	 * @memberOf AuthService
	 */
	public isAuthorized(): Observable<boolean> {
		return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
	}

	/**
	 * Get access token
	 * @description Should return access token in Observable from e.g. localStorage
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {
		return this.tokenStorage.getAccessToken();
	}

	/**
	 * Get user roles
	 * @returns {Observable<any>}
	 */
	public getUserRoles(): Observable<any> {
		return this.tokenStorage.getUserRoles();
	}

	/**
	 * Function, that should perform refresh token verifyTokenRequest
	 * @description Should be successfully completed so interceptor
	 * can execute pending requests or retry original one
	 * @returns {Observable<any>}
	 */
	public refreshToken(): Observable<AccessData> {
		return this.tokenStorage.getRefreshToken().pipe(
			switchMap((refreshToken: string) => {
				return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_REFRESH + '?' + this.util.urlParam(refreshToken));
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(err => {
				this.logout();
				return throwError(err);
			})
		);
	}

	/**
	 * Function, checks response of failed request to determine,
	 * whether token be refreshed or not.
	 * @description Essentialy checks status
	 * @param {Response} response
	 * @returns {boolean}
	 */
	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		return response.status === 401;
	}

	/**
	 * Verify that outgoing request is refresh-token,
	 * so interceptor won't intercept this request
	 * @param {string} url
	 * @returns {boolean}
	 */
	public verifyTokenRequest(url: string): boolean {
		return url.endsWith(this.API_ENDPOINT_REFRESH);
	}

	/**
	 * Submit login request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public login(credential: Credential): Observable<any> {
		// Expecting response from API
		// {"id":1,"username":"admin","password":"demo","email":"admin@demo.com","accessToken":"access-token-0.022563452858263444","refreshToken":"access-token-0.9348573301432961","roles":["ADMIN"],"pic":"./assets/app/media/img/users/user4.jpg","fullname":"Mark Andre"}

		/**
		return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential)).pipe(
			map((result: any) => {
				if (result instanceof Array) {
					return result.pop();
				}
				return result;
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(this.handleError('login', []))
		);
		*/
		console.log(credential);
		return this.http.post(this.API_URL + this.API_ENDPOINT_LOGIN , credential).pipe(
			map((result: any) => {

				console.log(result);
				if(result.completo){
				localStorage.setItem('userADby2as', JSON.stringify(result));
				}

				return result;
				
			}),tap(this.saveAccessData.bind(this)),
			
			catchError(this.handleError('login', []))
		);


	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return from(result);
		};
	}

	/**
	 * Logout
	 */
	public logout(refresh?: boolean): void {
		this.tokenStorage.clear();
		if (refresh) {
			location.reload(true);
		}
	}

	/**
	 * Save access data in the storage
	 * @private
	 * @param {AccessData} data
	 */
	private saveAccessData(accessData: AccessData) {
		if (typeof accessData !== 'undefined') {
			this.tokenStorage
				.setAccessToken(accessData.accessToken)
				.setRefreshToken(accessData.refreshToken)
				.setUserRoles(accessData.roles);
			this.onCredentialUpdated$.next(accessData);
		}
	}

	/**
	 * Submit registration request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public register(credential: Credential): Observable<any> {
		// dummy token creation
		credential = Object.assign({}, credential, {
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random(),
			roles: ['USER'],
		});
		return this.http.post(this.API_URL + this.API_ENDPOINT_REGISTER, credential)
			.pipe(catchError(this.handleError('register', []))
		);
	}


		public nuevoUsuarioNC(dataUser){
		return this.http.post(this.API_URL + '/nuevoUsuarioNC', dataUser);
	}

		public addStaffNC(staff){
		return this.http.post(this.API_URL + '/addStaffNC', staff);
		}

public cambiarServicioCitaNCREPRO(staff){
		return this.http.post(this.API_URL + '/cambiarServicioCitaNCREPRO', staff);
		}
		
		public addInfoCentroNC(horario){
		return this.http.post(this.API_URL + '/addInfoCentroNC', horario);
		}

		public addServiciosNC(serv){
		return this.http.post(this.API_URL + '/addServiciosNC', serv);
		}
			public updateStep(serv){
		return this.http.post(this.API_URL + '/updateStep', serv);
		}

		public actualizarBannerNC(image){
		return this.http.post(this.API_URL + '/actualizarBannerNC', image);
		}

		public actualizarBannerNC21(image){
		return this.http.post(this.API_URL + '/actualizarBannerNC21', image);
		}
		


		public actualizarBannerNC2(image){
		return this.http.post(this.API_URL + '/actualizarBannerNC2', image);
		}


				public actualizarFotoNC(image){
		return this.http.post(this.API_URL + '/actualizarFotoNC', image);
		}

		public getCategorias(){
		return this.http.get(this.API_URL + '/categoriasHome2');
		}

		public getSubcategorias(data){
		return this.http.post(this.API_URL + '/getSubcategorias', data);
		}

			public getCalendarioDayNC(data){
		return this.http.post(this.API_URL + '/getCalendarioDayNC', data);
		}
		
			public completasssrCita(data){
		return this.http.post(this.API_URL + '/completasssrCita', data);
		}
				public getCategoriasCentro(data){
		return this.http.post(this.API_URL + '/getCategoriasCentro', data);
		}

					public goReserva(data){
		return this.http.post(this.API_URL + '/goReserva', data);
		}

						public getActualizacionMes(data){
		return this.http.post(this.API_URL + '/getActualizacionMes', data);
		}
							public getActualizacionMes2(data){
		return this.http.post(this.API_URL + '/getActualizacionMes2', data);
		}
		
		

					public getSubcategoriasCentro(data){
		return this.http.post(this.API_URL + '/getSubcategoriasCentro', data);
		}


						public configuracionPrecioNC(data){
		return this.http.post(this.API_URL + '/configuracionPrecioNC', data);
		}
		
	
						public agregarHEENC(data){
		return this.http.post(this.API_URL + '/agregarHEENC', data);
		}
		
							public eliminarHE(data){
		return this.http.post(this.API_URL + '/eliminarHE', data);
		}
				
		

				public getDataCita(data){
		return this.http.post(this.API_URL + '/getDataCita', data);
		}

				public reprogramarCitaNC(data){
		return this.http.post(this.API_URL + '/reprogramarCitaNC', data);
		}
		

		public eliminarServicio(data){
		return this.http.post(this.API_URL + '/eliminarServicio', data);
		}

				public getCentroServicios2(data){
		return this.http.post(this.API_URL + '/getCentroServicios2', data);
		}
		

			public cambiarPaqueteNC(data){
		return this.http.post(this.API_URL + '/cambiarPaqueteNC', data);
		}
		

			public serviciosC(data){
		return this.http.post(this.API_URL + '/serviciosC', data);
		}

				public cambiarServicioCitaNC(data){
		return this.http.post(this.API_URL + '/cambiarServicioCitaNC', data);
		}
					public recuperarPassNC(data){
		return this.http.post(this.API_URL + '/recuperarPassNC', data);
		}
							public mensajeSoporte(data){
		return this.http.post(this.API_URL + '/mensajeSoporte', data);
		}
		
		

				public cambiarOfertaNC(data){
		return this.http.post(this.API_URL + '/cambiarOfertaNC', data);
		}
		
		public getServicioNC(data){
		return this.http.post(this.API_URL + '/getServicioNC', data);
		}

		public updateServicioNC(data){
		return this.http.post(this.API_URL + '/updateServicioNC', data);
		}

			public getConfiguracionNC(data){
		return this.http.post(this.API_URL + '/getConfiguracionNC', data);
		}
					public getStaffBasicNC(data){
		return this.http.post(this.API_URL + '/getStaffBasicNC', data);
		}


		public getStaff(data){
		return this.http.post(this.API_URL + '/getStaff', data);
		}

				public getHorasDispo(data){
		return this.http.post(this.API_URL + '/getHorasDispo', data);
		}
					public getEmpleadosDisponibles(data){
		return this.http.post(this.API_URL + '/getEmpleadosDisponibles', data);
		}
							public addCita(data){
		return this.http.post(this.API_URL + '/addCita', data);
		}

								public addCitaManual(data){
		return this.http.post(this.API_URL + '/addCitaManual', data);
		}
		
		

	public addServicioNC(data){
		return this.http.post(this.API_URL + '/addServicioNC', data);
		}

			public serviciosGroupNC(data){
		return this.http.post(this.API_URL + '/serviciosGroupNC', data);
		}

			public marcarEnOfertaNC(data){
		return this.http.post(this.API_URL + '/marcarEnOfertaNC', data);
		}

					public getPaquetes(data){
		return this.http.post(this.API_URL + '/getPaquetes', data);
		}

					public getInfoEmpleadoNC(data){
		return this.http.post(this.API_URL + '/getInfoEmpleadoNC', data);
		}

						public cambiarEstadoSE(data){
		return this.http.post(this.API_URL + '/cambiarEstadoSE', data);
		}

		public guardarHorarioNC(data){
		return this.http.post(this.API_URL + '/guardarHorarioNC', data);
		}

		public addDiasLibresNC(data){
		return this.http.post(this.API_URL + '/addDiasLibresNC', data);
		}

		
		public configuracionCentroNC(data){
		return this.http.post(this.API_URL + '/configuracionCentroNC', data);
		}

		public getInfoEvaNC(data){
		return this.http.post(this.API_URL + '/getInfoEvaNC', data);
		}
		

		public getEvaluacionesPeriodoNC(data){
		return this.http.post(this.API_URL + '/getEvaluacionesPeriodoNC', data);
		}

		public responderOpinion(data){
		return this.http.post(this.API_URL + '/responderOpinion', data);
		}
		public deleteLibresNC(data){
		return this.http.post(this.API_URL + '/deleteLibresNC', data);
		}
		public getEvaluacionesNC(data){
		return this.http.post(this.API_URL + '/getEvaluacionesNC', data);
		}
			public getStaffIndi(data){
		return this.http.post(this.API_URL + '/getStaffIndi', data);
		}
				public editarStafNC(data){
		return this.http.post(this.API_URL + '/editarStafNC', data);
		}

				public eliminarStaff(data){
		return this.http.post(this.API_URL + '/eliminarStaff', data);
		}
			public addStaffNC2(data){
		return this.http.post(this.API_URL + '/addStaffNC2', data);
		}

		public getCentroInfoNC(data){
		return this.http.post(this.API_URL + '/getCentroInfoNC', data);
		}

		public updateCICN(data){
		return this.http.post(this.API_URL + '/updateCICN', data);
		}

				public getHorarioNC(data){
		return this.http.post(this.API_URL + '/getHorarioNC', data);
		}

				public getHorario(data){
		return this.http.post(this.API_URL + '/getHorario', data);
		}
				public guardarHorarioCentroNC(data){
		return this.http.post(this.API_URL + '/guardarHorarioCentroNC', data);
		}
			public agregarPaqueteNC(data){
		return this.http.post(this.API_URL + '/agregarPaqueteNC', data);
		}

		public borrarFechaEspecial(data){
		return this.http.post(this.API_URL + '/borrarFechaEspecial', data);
		}


		public getInfoCentroNC(data){
		return this.http.post(this.API_URL + '/getInfoCentroNC', data);
		}
		

				public getInfoCentro(data){
		return this.http.post(this.API_URL + '/getInfoCentro', data);
		}

					public UpdateconfiguracionCentroNC(data){
		return this.http.post(this.API_URL + '/UpdateconfiguracionCentroNC', data);
		}
		
		
		
			public agregarHENC(data){
		return this.http.post(this.API_URL + '/agregarHENC', data);
		}

			public verificarEmail(data){
		return this.http.post(this.API_URL + '/verificarEmail', data);
		}

				public verificarEmail2(data){
		return this.http.post(this.API_URL + '/verificarEmail2', data);
		}


	public getCitaDetalleNC(data){
		return this.http.post(this.API_URL + '/getCitaDetalleNC', data);
		}
		
							public serviciosCitaNC(data){
		return this.http.post(this.API_URL + '/serviciosCitaNC', data);
		}
					public getCalendarioNC(data){
		return this.http.post(this.API_URL + '/getCalendarioNC', data);
		}

	/**
	 * Submit forgot password request
	 * @param {Credential} credential
	 * @returns {Observable<any>}
	 */
	public requestPassword(credential: Credential): Observable<any> {
		return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
			.pipe(catchError(this.handleError('forgot-password', []))
		);
	}

}
