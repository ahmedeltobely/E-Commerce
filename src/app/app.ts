import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header,NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App{
  protected readonly title = signal('e-commerce');
}
