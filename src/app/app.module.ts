import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import { PrimeIconsModule } from 'primeicons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    ToastrModule.forRoot({
      timeOut: 3000, // Set the time (in milliseconds) for the toast to auto-dismiss
      positionClass: 'toast-top-right', // Set the position of the toast notification
      preventDuplicates: true, // Prevent duplicate toast messages
    }),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
