import { Component, OnInit } from '@angular/core';
import tests from './tests.json';
@Component({
  selector: 'app-test-module',
  templateUrl: './test-module.component.html',
  styleUrls: ['./test-module.component.css'],
})
export class TestModuleComponent implements OnInit {
  current_test: any = tests[0];
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

  points: number = 120;

  ngOnInit(): void {}

  selectAnswer(answer: any) {
    answer.checked = !answer.checked;
  }

  nextQuestion() {
    if (this.results_shown) this.updateQuestion();
    else this.showQuestionResult();
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
    if (number_of_correct_answers != number_of_answers || incorrect_answer)
      this.points -= this.current_question.points;
    this.results_shown = true;
  }

  updateQuestion() {
    if (this.current_question_number + 1 < this.number_of_questions) {
      this.current_question_number++;
      this.current_question =
        this.current_test.questions[this.current_question_number];
      this.current_question_number_text = (
        this.current_question_number + 1
      ).toString();
      this.answers = this.current_question.answers;
      this.answers.forEach((answer: any) => {
        answer.class = '';
      });
      this.results_shown = false;
    } else this.finishTest();
  }

  finishTest() {
    alert('Završen test\nBroj osvojenih bodova: ' + this.points);
    location.reload();
  }
}
