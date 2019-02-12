import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/*
import { RegisterComponent,Modal3Component,ModalContentComponent,Modal4Component} from './register/register.component';

import { Modal3Component,ModalContentComponent,Modal4Component} from './register/register.component';

*/
import { LoadingModule } from 'ngx-loading';


import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {
	MatButtonModule,
	MatFormFieldModule,MatSelectModule,MatDialogModule,
	MatInputModule,MatCardModule,MatSlideToggleModule,
	MatCheckboxModule,MatStepperModule,MatIconModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerButtonModule } from '../../partials/content/general/spinner-button/spinner-button.module';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';

import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	imports: [
		CommonModule,
		LoadingModule,
		FormsModule,ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,MatDialogModule,
		MatFormFieldModule,
		NgbModule,
		MatIconModule,MatSelectModule,
		MatCheckboxModule,MatCardModule,MatSlideToggleModule,
		MatStepperModule,
		TranslateModule.forChild(),
		SpinnerButtonModule,


				 AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAT-tTbOja69paXaiAgAtNi9nGHRh75bzk',
       libraries: ['geometry', 'places']
    }),

		RouterModule.forChild([
			{
				path: '',
				component: AuthComponent
			}
		])
	],
	  entryComponents: [],
	providers: [],
	declarations: [
		AuthComponent,
		LoginComponent,

		ForgotPasswordComponent,
		AuthNoticeComponent
	]
})
export class AuthModule {}
