import { Component, OnDestroy } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, finalize } from 'rxjs';
import { News } from 'src/app/shared/news';
import { NewsService } from 'src/app/shared/services/news.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
})
export class EditNewsComponent {
  news: News;
  newsForm: FormGroup;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;

  placeholderPath: string = 'placeholder-image.png';
  placeholderUrl: string =
    'https://firebasestorage.googleapis.com/v0/b/autoskolaas-d6187.appspot.com/o/placeholder-image.png?alt=media&token=aa776ff6-4983-4a2b-9fa4-6f7c2f02c656';
  images: { filepath: string; url: string }[] = [];

  removedIimages: any[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private afStorage: AngularFireStorage,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
    });
    this.route.paramMap.subscribe((params) => {
      const newsId = params.get('id');
      this.loadNews(newsId);
    });
  }

  loadNews(newsId: string) {
    this.newsService.getNewsById(newsId).subscribe((news) => {
      this.news = news;
      this.newsForm.setValue({
        title: this.news.title,
        content: this.news.content.replace(/<br>/g, '\n'),
      });
      this.images = this.news.images;
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
      for (const image of this.removedIimages) {
        const imageRef = this.afStorage.ref(image.filepath);
        const subscription = imageRef.delete().subscribe(
          () => {},
          (error) => {
            this.toastr.error('Greška u brisanju slike', 'Greška');
          }
        );
        this.subscriptions.push(subscription);
      }
      const newsData = {
        key: this.news.key,
        title: this.newsForm.value.title,
        content: this.newsForm.value.content.replace(/\n/g, '<br>'),
        date: this.news.date,
        author: this.news.author,
        images: this.images,
      };
      console.log(newsData);
      try {
        await this.newsService.updateNews(newsData);
        this.toastr.success('Novost uspješno ažurirana');
        this.router.navigateByUrl(`/novosti/${this.news.key}`);
      } catch (error) {
        this.toastr.error('Greška u ažuriranju novosti', 'Greška');
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
    const index = this.images.findIndex(
      (x) => x.filepath == image.filepath && x.url == image.url
    );
    this.removedIimages.push(this.images[index]);
    this.images.splice(index, 1);
  }

  removeAllSelectedImages() {
    for (const image of this.images) {
      this.removeSelectedImage(image);
    }
  }

  back() {
    this.router.navigateByUrl(`/novosti/${this.news.key}`);
  }
}
