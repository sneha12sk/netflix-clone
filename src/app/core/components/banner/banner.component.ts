import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnChanges {
 
  @Input() bannerTitle!: string;
  @Input() bannerOverview!: string;
  @Input() key: string = 'hR1-ihzff3I';

  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.updateVideoUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.updateVideoUrl();
    }
  }

  private updateVideoUrl(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`
    );
    
  }
}
