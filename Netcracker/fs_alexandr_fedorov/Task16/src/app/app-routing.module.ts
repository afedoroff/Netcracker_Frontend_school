import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditFormComponent} from "./modules/animals/components/edit-form/edit-form.component";
import {HomePageComponent} from "./modules/animals/components/home-page/home-page.component";
import {NotFoundComponent} from "./modules/animals/components/not-found/not-found.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'pet/:id', component: EditFormComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
