import { Component, OnDestroy } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, finalize } from 'rxjs';
import { NewsService } from 'src/app/shared/services/news.service';
import { User } from 'src/app/shared/user';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent {
  newsForm: FormGroup;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;

  images: { filepath: string; url: string }[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private afStorage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
    });
  }

  get title() {
    return this.newsForm.get('title');
  }

  get content() {
    return this.newsForm.get('content');
  }

  async submitNewsData() {
    if (this.newsForm.valid) {
      const user: User = JSON.parse(localStorage.getItem('user')!);
      const currentDate = new Date();

      const newsData = {
        title: this.newsForm.value.title,
        content: this.newsForm.value.content,
        date: currentDate.toLocaleDateString(),
        author: user.displayName,
        imageUrls: this.images.map((image) => image.url),
      };

      try {
        await this.newsService.createNews(newsData);
        this.toastr.success('Novost uspješno kreirana', 'Uspjeh');
        this.newsForm.reset();
        this.images = [];
      } catch (error) {
        this.toastr.error('Greška u kreiranju novosti', 'Greška');
      }
    }
  }

  onFilesSelected(event) {
    for (const file of event.target.files) {
      var n = `${Date.now}-${uuidv4()}`;
      const filePath = `NewsImages/${uuidv4()}-${file.name}`;
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, file);
      const subscription = task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            const subscription = this.downloadURL.subscribe((url) => {
              if (url) {
                this.images.push({ filepath: filePath, url: url });
              }
            });
            this.subscriptions.push(subscription);
          })
        )
        .subscribe();
      this.subscriptions.push(subscription);
    }
  }

  removeSelectedImage(image: any) {
    const imageRef = this.afStorage.ref(image.filepath);
    const subscription = imageRef.delete().subscribe(
      () => {
        const index = this.images.findIndex(
          (x) => x.filepath == image.filepath && x.url == image.url
        );
        this.images.splice(index, 1);
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

  resetForm() {
    this.newsForm.reset();
    this.removeAllSelectedImages();
    this.images = [];
  }
}
