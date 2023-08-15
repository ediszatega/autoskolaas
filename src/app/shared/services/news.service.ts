import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { News } from '../news';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private db: AngularFireDatabase) {}

  getNews(): Observable<News[]> {
    return this.db
      .list<News>('news')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((action) => {
            const key = action.payload.key; // Get the key from snapshot
            const data = action.payload.val() as News;
            return { key, ...data } as News;
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
          return news;
        })
      );
  }

  async createNews(news: any): Promise<void> {
    await this.db.list<News>('news').push(news);
  }

  async updateNews(news: News): Promise<void> {
    await this.db.object<News>(`news/${news.key}`).update(news);
  }
  async deleteNews(newsId: string): Promise<void> {
    await this.db.object(`news/${newsId}`).remove();
  }
}
