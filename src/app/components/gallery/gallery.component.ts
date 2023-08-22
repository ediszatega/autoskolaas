import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, finalize } from 'rxjs';
import { Image } from 'src/app/shared/image';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  showFullImg: boolean = false;
  imgId: any = '';
  images: any[] = [];
  private subscriptions: Subscription[] = [];
  downloadURL;
  /* isScrollEnabled: boolean = true; */
  /* @Output() openImage = new EventEmitter<boolean>(); */

  constructor(
    public authService: AuthService,
    private galleryService: GalleryService,
    private afStorage: AngularFireStorage,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImagesFromDb();
  }

  loadImagesFromDb() {
    const subscription = this.galleryService
      .GetImageList()
      .subscribe((images) => {
        this.images = images;
      });
    this.subscriptions.push(subscription);
  }

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

  onFilesSelected(event) {
    for (const file of event.target.files) {
      var n = `${Date.now}-${uuidv4()}`;
      const filePath = `GalleryImages/${uuidv4()}-${file.name}`;
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, file);
      const subscription = task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            const subscription = this.downloadURL.subscribe((url) => {
              if (url) {
                const newImage = { filepath: filePath, url: url };
                this.galleryService.AddImage(newImage);
              }
            });
            this.subscriptions.push(subscription);
          })
        )
        .subscribe();
      this.subscriptions.push(subscription);
    }
    this.loadImagesFromDb();
  }

  removeSelectedImage(image: any) {
    const imageRef = this.afStorage.ref(image.filepath);
    const subscription = imageRef.delete().subscribe(
      () => {
        this.galleryService.DeleteImage(image.key);
        this.loadImagesFromDb();
      },
      (error) => {
        this.toastr.error('Greška u brisanju slike', 'Greška');
      }
    );
    this.subscriptions.push(subscription);
  }

  removeAllSelectedImages() {
    for (const image of this.images) {
      this.removeSelectedImage(image);
    }
  }
}
