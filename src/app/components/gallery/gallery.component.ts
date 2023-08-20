import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  showFullImg: boolean = false;
  imgId: any = '';
  /* isScrollEnabled: boolean = true; */
  /* @Output() openImage = new EventEmitter<boolean>(); */

  closeFullImg() {
    /* this.showFullImg = false;
    document.body.style.overflow = 'auto'; */
  }

  openFullImg(imgId: number) {
    /* this.showFullImg = true;
    this.imgId = imgId;
    this.isScrollEnabled = !this.isScrollEnabled;
    this.openImage.emit(this.showFullImg);
    this.galleryService.setBoolean(this.showFullImg); */
    /*     const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;

    if (pageWrapper) {
      pageWrapper.style.overflow = this.isScrollEnabled ? 'auto' : 'hidden';
    }

    event.preventDefault(); */
    /* document.body.style.overflow = 'hidden'; */
  }

  fullImgClick(event: Event) {
    /* event.stopPropagation(); */
  }
}
