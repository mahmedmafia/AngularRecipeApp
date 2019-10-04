import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [FormsModule,
        SharedModule, RouterModule.forChild([
            { path: '', component: AuthComponent },

        ])],
    exports: [AuthComponent],
})
export class AuthModule { }