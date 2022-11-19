import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'zone-patch';

  onClick() {
    Zone.disableZone();
    setTimeout(() => {
      console.log(
        'current zone in timeout after disable zone',
        Zone.current.name
      );
    });

    Promise.resolve(1).then(() => {
      console.log(
        'current zone in Promise resolve after disable zone',
        Zone.current.name
      );
    });

    Zone.enableZone();
    setTimeout(() => {
      console.log(
        'current zone in timeout after enable zone',
        Zone.current.name
      );
    });

    Promise.resolve(1).then(() => {
      console.log(
        'current zone in Promise resolve after enable zone',
        Zone.current.name
      );
    });
  }
}
