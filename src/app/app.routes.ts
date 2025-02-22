import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'detail/:id', component: DetailComponent
    },
    {
        path: 'create', component: CreateComponent
    },
    {
        path: 'delete/id', component: DeleteComponent
    }

];

