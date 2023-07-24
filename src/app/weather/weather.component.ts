import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { WeatherService } from '../weather.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, AfterViewInit {
  weatherData: any;
  weatherforcast: any;
  cityName = 'pakistan';
  weatherForecasts: any = [];
  loading = false;
  searchValue: any;
  video: any;
  selectedVideo: any;
  newArraydaydata: any[] = [];
  videoUrl: any;
  constructor(
    private weatherService: WeatherService,
    private _changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {}

  changeVideo(data: any) {
    console.log('selecetd video', data);
    const videoPath = 'assets/images/' + this.selectedVideo;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoPath);
  }
  ngOnInit(): void {
    this.getWeatherByCountry();
    this.weatherService.getWeatherData('lahore').subscribe(
      (data) => {
        this.weatherData = data;
        console.log('-->', data);
        this.loading = false;
        if (this.weatherData?.weather[0]?.main == 'Clouds') {
          const videoPath1 = 'assets/images/smoke.mp4';
          this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
        } else if (this.weatherData?.weather[0]?.main == 'Rain') {
          const videoPath1 = 'assets/images/rrain.mp4';
          this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
        } else if (this.weatherData?.weather[0]?.main == 'Clear') {
          const videoPath1 = 'assets/images/shins.mp4';
          this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
        } else if (this.weatherData?.weather[0]?.main == 'Smoke') {
          const videoPath1 = 'assets/images/smoke.mp4';
          this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
        } else {
          const videoPath1 = 'assets/images/shine.mp4';
          this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
        }
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.loading = false;
      }
    );
  }
  search(): any {
    if (this.searchValue) {
      this.weatherService.getWeatherData(this.searchValue).subscribe(
        (data) => {
          console.log('---->', data);
          this.weatherData = data;
          if (this.weatherData?.weather[0]?.main == 'Clouds') {
            const videoPath1 = 'assets/images/ppp.mp4';
            this.videoUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
          } else if (this.weatherData?.weather[0]?.main == 'Rain') {
            const videoPath1 = 'assets/images/rain.mp4';
            this.videoUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
          } else if (this.weatherData?.weather[0]?.main == 'Clear') {
            const videoPath1 = 'assets/images/shins.mp4';
            this.videoUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
          } else if (this.weatherData?.weather[0]?.main == 'Smoke') {
            const videoPath1 = 'assets/images/smoke.mp4';
            this.videoUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
          } else {
            const videoPath1 = 'assets/images/shine.mp4';
            this.videoUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(videoPath1);
          }
        },
        (error) => {
          this.toastr.error('Country or city not found!', 'Error');
          this.loading = false;
        }
      );
    }
  }

  getWeatherByCountry() {
    this.weatherService
      .getWeatherByCountry(this.cityName)
      .subscribe((data: any) => {
        this.weatherforcast = data.list;
        const currentDate = new Date();
        const nextThreeDaysDate = new Date(currentDate);
        nextThreeDaysDate.setDate(currentDate.getDate() + 4);

        this.newArraydaydata = this.weatherforcast.filter((item: any) => {
          const [datePart, timePart] = item.dt_txt.split(' ');
          const forecastDate = new Date(datePart);
          const forecastTime = timePart.slice(0, 5);
          return (
            forecastDate >= currentDate &&
            forecastDate < nextThreeDaysDate &&
            forecastTime === '15:00'
          );
        });
        console.log('------------', this.newArraydaydata);
      });
  }
}
