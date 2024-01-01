import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
  {
    path:'', component: CentersComponent
  },
  {
    path: 'session/:center_id', component:SessionsComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
