import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'a1dacf624ea2f492155304cd575e63bc';
  // private apiKey2 = '851ba7af5f5e01d91e77bfca7165277c';
  // private apiKey3 = '851ba7af5f5e01d91e77bfca7165277c';

  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiUrl3 = 'https://api.openweathermap.org/data/2.5/forecast';
  // private apiUrl2 = 'http://api.weatherstack.com/forecast';
  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }
  getWeatherByCountry(country: string): Observable<any> {
    const url = `${this.apiUrl3}?q=${country}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
