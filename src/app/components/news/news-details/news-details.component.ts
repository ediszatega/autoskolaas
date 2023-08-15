import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/shared/news';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit {
  newsId: string;
  news: News;
  currentImage: string;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.newsId = params.get('id');
      this.loadNews();
    });
  }

  loadNews() {
    this.newsService.getNewsById(this.newsId).subscribe((news) => {
      this.news = news;
      console.log(this.news);
      this.currentImage = this.news.imageUrls[0]; // Show the first image initially
    });
  }

  prevImage() {
    const currentIndex = this.news.imageUrls.indexOf(this.currentImage);
    if (currentIndex > 0) {
      this.currentImage = this.news.imageUrls[currentIndex - 1];
    }
  }

  nextImage() {
    const currentIndex = this.news.imageUrls.indexOf(this.currentImage);
    if (currentIndex < this.news.imageUrls.length - 1) {
      this.currentImage = this.news.imageUrls[currentIndex + 1];
    }
  }
}
