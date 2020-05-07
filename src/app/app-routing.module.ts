import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CometchatEmbeddedComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-embedded/cometchat-embedded.component';


const routes: Routes = [
    {
        path: 'embeded-app',
        component: CometchatEmbeddedComponent
    },
    {
        path: '',
        component: CometchatEmbeddedComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
