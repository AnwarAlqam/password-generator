import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatSliderModule, MatInputModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'password-generator';
  password = "";
  disabled = false;
  max = 32;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 16;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.onPasswordRetrieval();
  }

  async getPassword(): Promise<string> {
    const response = await fetch(`https://go-password-generator.azurewebsites.net/api/getPassword?passwordLength=${this.value}`);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return data.message; // Assuming the response is text-based
  }

  onPasswordRetrieval() {
    this.getPassword().then(password => this.password = password).catch(console.error);
  }

  async onPasswordCopy() {
    await navigator.clipboard.writeText(this.password);
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Copied to clipboard.', 'Dimiss', {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 3000
    });
  }


}
