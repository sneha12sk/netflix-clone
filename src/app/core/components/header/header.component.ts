import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navList = [" Home ", " Tv Shows ", " Movies ", " New and Popular ", " My List ", " Browse by Language "];
  menuOpen = false;
  isDesktopView: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', [])
  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktopView = window.innerWidth >= 768;
    }
  }
}
