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
            return action.payload.val() as News;
          })
        )
      );
  }

  async createNews(news: any): Promise<void> {
    await this.db.list<News>('news').push(news);
  }

  async updateNews(news: News): Promise<void> {
    await this.db.object<News>(`news/${news.$key}`).update(news);
  }
  async deleteNews(newsId: string): Promise<void> {
    await this.db.object(`news/${newsId}`).remove();
  }
}
