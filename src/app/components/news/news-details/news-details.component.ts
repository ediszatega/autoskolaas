import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { News } from 'src/app/shared/news';
import { NewsService } from 'src/app/shared/services/news.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit {
  newsId: string;
  news: News;
  currentImage: string;

  currentNumber: number;
  maxNumber: number;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
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
      if (news.images) {
        this.currentImage = this.news.images[0].url; // Show the first image initially
        this.currentNumber = 1;
        this.maxNumber = this.news.images.length;
      }
    });
  }

  prevImage() {
    const currentIndex = this.news.images
      .map((x) => x.url)
      .indexOf(this.currentImage);
    if (currentIndex > 0) {
      this.currentImage = this.news.images[currentIndex - 1].url;
      this.currentNumber = currentIndex;
    }
  }

  nextImage() {
    const currentIndex = this.news.images
      .map((x) => x.url)
      .indexOf(this.currentImage);
    if (currentIndex < this.news.images.length - 1) {
      this.currentImage = this.news.images[currentIndex + 1].url;
      this.currentNumber = currentIndex + 2;
    }
  }

  deleteNews() {
    try {
      this.newsService.deleteNews(this.news.key).subscribe();
      this.toastr.success('Uspješno izbrisana novost');
      this.router.navigateByUrl('/novosti');
    } catch (error) {
      this.toastr.error('Greška u brisanju novosti');
    }
  }

  back() {
    this.router.navigateByUrl('/novosti');
  }
}
