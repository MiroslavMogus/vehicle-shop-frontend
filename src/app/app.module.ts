import { QueryOptions } from './models/query-options';
import { ResourceService } from './services/resource.service';
import { VehicleTestService } from './services/vehicletest.service';

import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VehicleMakeService } from './services/vehiclemake.service';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleInputComponent } from './components/vehicleinput/vehicleinput.component';
import { VehicleEditComponent } from './components/vehicleedit/vehicleedit.component';
import { VehicleTableComponent } from './components/vehicletable/vehicletable.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleInputComponent,
    VehicleEditComponent,
    VehicleTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleInputComponent },
      { path: 'vehicles/:id', component: VehicleEditComponent },
      { path: 'vehicles', component: VehicleTableComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [VehicleMakeService, VehicleService, ResourceService, VehicleTestService, QueryOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
