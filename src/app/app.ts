import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , Login, FormsModule , NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  userName: string = 'dsdsxssssss';

}
