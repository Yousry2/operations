import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
     standalone: true,
     imports: [RouterModule],
     selector: 'operations-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.scss'],
})
export class AppComponent {
     title = 'Fedex';
}
