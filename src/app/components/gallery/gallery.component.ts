import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  showFullImg: boolean = false;
  imgId: any = '';
  isScrollEnabled: boolean = true;

  closeFullImg() {
    this.showFullImg = false;
    document.body.style.overflow = 'auto';
  }

  openFullImg(imgId: number, event: Event) {
    this.showFullImg = true;
    this.imgId = imgId;
    this.isScrollEnabled = !this.isScrollEnabled;

    /*     const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;

    if (pageWrapper) {
      pageWrapper.style.overflow = this.isScrollEnabled ? 'auto' : 'hidden';
    }

    event.preventDefault(); */

    document.body.style.overflow = 'hidden';
  }

  fullImgClick(event: Event) {
    event.stopPropagation();
  }
}
