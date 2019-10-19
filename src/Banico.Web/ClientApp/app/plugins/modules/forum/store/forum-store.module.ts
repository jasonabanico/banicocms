import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxDataModule } from 'ngrx-data';
//import { environment } from '../../../../environments/environment';
import { entityConfig } from './entity-metadata';

@NgModule({
  imports: [
    NgrxDataModule.forRoot(entityConfig),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
    //,
    //environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class ForumStoreModule { }
