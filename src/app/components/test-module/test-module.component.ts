import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import tests from './tests.json';
@Component({
  selector: 'app-test-module',
  templateUrl: './test-module.component.html',
  styleUrls: ['./test-module.component.css'],
})
export class TestModuleComponent implements OnInit {
  current_test_number: number = 0;
  current_test: any = tests[this.current_test_number];
  number_of_questions: number = this.current_test.questions.length;
  number_of_questions_text: string = this.number_of_questions.toString();
  current_question_number: number = 0;
  current_question_number_text: string = (
    this.current_question_number + 1
  ).toString();
  current_question: any =
    this.current_test.questions[this.current_question_number];
  answers: any = this.current_question.answers;
  current_question_text: string = this.current_question.question;

  results_shown: boolean = false;

  points: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      let testId = paramMap.get('id');
      if (testId != null) {
        this.current_question_number = parseInt(testId) - 1;
        this.current_test = tests[this.current_question_number];
        this.resetAnswers(this.current_test);
        this.number_of_questions = this.current_test.questions.length;
        this.number_of_questions_text = this.number_of_questions.toString();
        this.current_question_number = 0;
        this.current_question_number_text = (
          this.current_question_number + 1
        ).toString();
        this.current_question =
          this.current_test.questions[this.current_question_number];
        this.answers = this.current_question.answers;
        this.current_question_text = this.current_question.question;
        this.results_shown = false;
        this.points = 0;
      }
    });
  }

  resetAnswers(current_test: any): void {
    current_test.questions.forEach((question: any) => {
      question.answers.forEach((answer: any) => {
        answer.class = '';
        answer.checked = false;
      });
    });
  }

  selectAnswer(answer: any) {
    answer.checked = !answer.checked;
  }

  nextQuestion() {
    if (this.results_shown) this.updateQuestionNext();
    else this.showQuestionResult();
  }

  previousQuestion() {
    this.updateQuestionPrevious();
  }

  showQuestionResult() {
    let number_of_answers = this.current_question.answer.length;
    let number_of_correct_answers = 0;
    let incorrect_answer = false;
    this.answers.forEach((answer: any) => {
      if (
        this.current_question.answer.includes(this.answers.indexOf(answer) + 1)
      ) {
        answer.class = 'correct';
        if (answer.checked) number_of_correct_answers++;
      } else if (answer.checked) {
        answer.class = 'incorrect';
        incorrect_answer = true;
      }
    });
    if (!(number_of_correct_answers != number_of_answers || incorrect_answer))
      this.points += this.current_question.points;
    this.results_shown = true;
  }

  updateQuestionNext() {
    if (this.current_question_number + 1 < this.number_of_questions) {
      this.current_question_number++;
      this.current_question =
        this.current_test.questions[this.current_question_number];
      this.current_question_number_text = (
        this.current_question_number + 1
      ).toString();
      this.answers = this.current_question.answers;
      this.results_shown = this.answers.some(
        (answer: any) => answer.class !== ''
      );
    } else this.finishTest();
  }

  updateQuestionPrevious() {
    if (this.current_question_number > 0) {
      this.current_question_number--;
      this.current_question =
        this.current_test.questions[this.current_question_number];
      this.current_question_number_text = (
        this.current_question_number + 1
      ).toString();
      this.answers = this.current_question.answers;
      this.results_shown = this.answers.some(
        (answer: any) => answer.class !== ''
      );
    }
  }

  updateQuesiton(question_number: number) {
    if (!this.results_shown && question_number > this.current_question_number) {
      this.showQuestionResult();
      return;
    }
    if (question_number >= 0 && question_number < this.number_of_questions) {
      this.current_question_number = question_number;
      this.current_question =
        this.current_test.questions[this.current_question_number];
      this.current_question_number_text = (
        this.current_question_number + 1
      ).toString();
      this.answers = this.current_question.answers;
      this.results_shown = this.answers.some(
        (answer: any) => answer.class !== ''
      );
    }
  }

  finishTest() {
    alert('Završen test\nBroj osvojenih bodova: ' + this.points);
    this.router.navigate(['/testovi']);
  }
}
