import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'password-generator';
  password = "Click the button to generate password :)";

  number = 1;

  ngOnInit() {
    // ...
  }

  async getPassword(): Promise<string> {
    const response = await fetch('https://go-password-generator.azurewebsites.net/api/getPassword');
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return data.message; // Assuming the response is text-based
  }

  testFunction() {
    this.getPassword().then(password => this.password = password).catch(console.error);
  }


}
