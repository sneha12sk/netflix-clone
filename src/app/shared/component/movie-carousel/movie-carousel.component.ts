import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { IVideoContent } from '../../models/view-content.interface';
import { DescriptionPipePipe } from '../../pipes/description-pipe.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [NgFor, CommonModule, DescriptionPipePipe, ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
handleImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() videoContents: IVideoContent[] = [];
  @Input() movieTitle!: string;
  expandedMovies: Set<number> = new Set(); 

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initSwiper();
    }, 0); // Ensure the DOM is updated before initializing Swiper
  }

  initSwiper(): void {
    if (!this.swiperContainer?.nativeElement) {
      console.error('Swiper container not found!');
      return;
    }
  
    const swiperEl = this.swiperContainer.nativeElement;
  
    // Ensure the container has child elements before initializing Swiper
    if (!swiperEl.children || swiperEl.children.length === 0) {
      console.error('Swiper container has no child elements!');
      return;
    }
  
    const swiperConfig: SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: true,
      pagination: { clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
      }
    };
  
    new Swiper(swiperEl, swiperConfig);
  }
  toggleOverview(movieId: number): void {
    if (this.expandedMovies.has(movieId)) {
      this.expandedMovies.delete(movieId); // Collapse if already expanded
    } else {
      this.expandedMovies.add(movieId); // Expand if collapsed
    }
  }

  isExpanded(movieId: number): boolean {
    return this.expandedMovies.has(movieId); // Returns true if expanded, false otherwise
  }
  
  }

