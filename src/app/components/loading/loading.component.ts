import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [CommonModule, LottieComponent],
    template: `
    <div class="loading-container" *ngIf="visible">
        <ng-lottie 
        [options]="lottieConfig" 
        width="200px"
        height="200px">
        </ng-lottie>
    </div>
    `,
    styles: [`
    .loading-container {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255,255,255,0.8);
        z-index: 9999;
    }
    `]
})
export class LoadingComponent {
    @Input() visible = false;

    lottieConfig = {
    path: 'assets/comidaani.json',
    loop: true,
    autoplay: true,
    };
}
