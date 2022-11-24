import { Component } from '@angular/core';
import { AuthClientConfig } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'asp-net-api',
  templateUrl: './asp-net-api.component.html',
  styleUrls: ['./asp-net-api.component.css'],
})
export class AspNetApiComponent {
  responseJson: string;
  audience = this.configFactory.get()?.audience;
  hasApiError = false;

  constructor(
    private api: ApiService,
    private configFactory: AuthClientConfig
  ) {}

  getWeather() {
    this.api.getWeather$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.responseJson = JSON.stringify(res, null, 2).trim();
      },
      error: () => this.hasApiError = true,
    });
  }
}
