import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_BASE_HREF, CommonModule, PlatformLocation } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FedexAuthApiService } from '@operations/fedex-data-access';
import { getBaseHref } from '@operations/util-common';
import { Inject } from '@angular/core';

@Component({
     selector: 'operations-fedex-auth',
     standalone: true,
     imports: [CommonModule, RouterModule, NgOptimizedImage, HttpClientModule],
     providers: [
          FedexAuthApiService,
          {
               provide: APP_BASE_HREF,
               useFactory: getBaseHref,
               deps: [PlatformLocation],
          },
     ],
     templateUrl: './fedex-auth.component.html',
     styleUrls: ['./fedex-auth.component.scss'],
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FedexAuthComponent {
     constructor(@Inject(APP_BASE_HREF) public baseHref: string) {}
}
