import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practico-angular';
}
// addHoursToDate(date: Date, hours: number): Date {
//   return new Date(new Date(date).setHours(date.getHours() + hours));
// }
// myDate = new Date();