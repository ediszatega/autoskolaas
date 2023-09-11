import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  more_less: boolean = false;
  more_less_label: string = 'Prikaži više';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  readMoreLess() {
    if (this.more_less === false) {
      this.more_less_label = 'Prikaži manje';
    } else {
      this.more_less_label = 'Prikaži više';
    }
    this.more_less = !this.more_less;
  }

  questions = document.querySelectorAll('.questions-answers');
}
