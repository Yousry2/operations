import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FedexAuthApiService } from '@operations/fedex-data-access';

@Component({
     selector: 'operations-fedex-auth',
     standalone: true,
     imports: [CommonModule, RouterModule, NgOptimizedImage, HttpClientModule],
     providers: [FedexAuthApiService],
     templateUrl: './fedex-auth.component.html',
     styleUrls: ['./fedex-auth.component.scss'],
     changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FedexAuthComponent {}
