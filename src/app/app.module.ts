import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VehiclemakeService } from './services/vehiclemake.service';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleInputComponent } from './components/vehicleinput/vehicleinput.component';
import { VehicleTableComponent } from './components/vehicletable/vehicletable.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    VehicleInputComponent,
    VehicleTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleInputComponent },
      { path: 'vehicles/:id', component: VehicleInputComponent },
      { path: 'vehicles', component: VehicleTableComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [VehiclemakeService, VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
