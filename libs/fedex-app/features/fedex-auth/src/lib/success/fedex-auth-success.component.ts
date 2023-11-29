import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { APP_BASE_HREF, CommonModule, NgOptimizedImage, PlatformLocation } from '@angular/common';
import { getBaseHref } from '@operations/util-common';
@Component({
     selector: 'operations-auth-success',
     standalone: true,
     providers: [
          {
               provide: APP_BASE_HREF,
               useFactory: getBaseHref,
               deps: [PlatformLocation],
          },
     ],
     imports: [CommonModule, NgOptimizedImage],
     templateUrl: './fedex-auth-success.component.html',
     styleUrls: ['./fedex-auth-success.component.css'],
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSuccessComponent {
     constructor(@Inject(APP_BASE_HREF) public baseHref: string) {}
}
