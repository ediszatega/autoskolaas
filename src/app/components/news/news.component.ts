import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/shared/news';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private newsService: NewsService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    this.newsService.getNews().subscribe((news) => {
      news.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      this.newsList = news.map((newsItem) => {
        return { ...newsItem, date: new Date(newsItem.date) };
      });
      console.log(this.newsList);
    });
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.newsList.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  navigateToNewsDetail(newsId: string) {
    this.router.navigate(['/novosti', newsId]);
  }
}
