import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { News } from '../news';
import { Observable, map, of, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(
    private db: AngularFireDatabase,
    private afStorage: AngularFireStorage
  ) {}

  getNews(): Observable<News[]> {
    return this.db
      .list<News>('news')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((action) => {
            const key = action.payload.key; // Get the key from snapshot
            const data = action.payload.val() as News;
            return { key, ...data, date: new Date(data.date) } as News;
          })
        )
      );
  }

  getNewsById(id: string): Observable<News> {
    return this.db
      .object<News>('news/' + id)
      .valueChanges()
      .pipe(
        map((news) => {
          return { key: id, ...news, date: new Date(news.date) };
        })
      );
  }

  async createNews(news: any): Promise<void> {
    await this.db.list<News>('news').push(news);
  }

  async updateNews(news: News): Promise<void> {
    await this.db.object<News>(`news/${news.key}`).update(news);
  }
  deleteNews(id: string): Observable<void> {
    return this.db
      .object<News>('news/' + id)
      .valueChanges()
      .pipe(
        switchMap((news) => {
          if (!news.images || news.images.length === 0) {
            return of(null);
          }
          const imageDeletionObservables = [];
          for (const image of news.images) {
            const imageRef = this.afStorage.ref(image.filepath);
            imageDeletionObservables.push(imageRef.delete());
          }
          return imageDeletionObservables;
        }),
        switchMap(() => {
          return this.db.object(`news/${id}`).remove();
        })
      );
  }
}
