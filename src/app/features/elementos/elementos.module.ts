import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ElementosRoutingModule } from './elementos-routing.module';
import { ElementosListComponent } from './components/elementos-list/elementos-list.component';
import { ElementosService } from './services/elementos.service';

/**
 * Feature module for the Elementos domain.
 * Encapsulates all components, services and routing related to Elementos.
 */
@NgModule({
  declarations: [ElementosListComponent],
  imports: [CommonModule, HttpClientModule, ElementosRoutingModule],
  providers: [ElementosService],
})
export class ElementosModule {}
