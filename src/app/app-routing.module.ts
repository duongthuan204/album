import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './component/list.component';
import { DetailComponent } from './component/detail.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'list', component: ListComponent},
  { path: 'album/:index', component: DetailComponent},
  { path: 'delete/:index', component: ListComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
