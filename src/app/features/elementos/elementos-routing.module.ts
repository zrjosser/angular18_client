import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementosListComponent } from './components/elementos-list/elementos-list.component';

const routes: Routes = [
  { path: '', component: ElementosListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementosRoutingModule {}
