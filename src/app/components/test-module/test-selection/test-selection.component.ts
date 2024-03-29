import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-selection',
  templateUrl: './test-selection.component.html',
  styleUrls: ['./test-selection.component.css'],
})
export class TestSelectionComponent {
  selectedCategory: string = 'Kategorija B';
  selectedTest: string = 'Test 1';

  categories: string[] = [
    'Kategorija A',
    'Kategorija B',
    'Kategorija C',
    'Kategorija D',
  ];

  // Define a map of categories to tests
  categoryToTests: { [key: string]: string[] } = {
    'Kategorija A': ['Test 1'],
    'Kategorija B': [
      'Test 1',
      'Test 2',
      'Test 3',
      'Test 4',
      'Test 5',
      'Test 6',
      'Test 7',
      'Test 8',
      'Test 9',
      'Test 10',
      'Test 11',
      'Test 12',
      'Test 13',
      'Test 14',
      'Test 15',
      'Test 16',
      'Test 17',
      'Test 18',
      'Test 19',
    ],
    'Kategorija C': ['Test 1'],
    'Kategorija D': ['Test 1'],
  };

  constructor(private router: Router) {}

  onContinue() {
    let testNumber = '1';
    if (this.selectedCategory == 'Kategorija B')
      testNumber = this.selectedTest.replace(/\D/g, '');
    else if (this.selectedCategory == 'Kategorija A') testNumber = '20';
    else if (this.selectedCategory == 'Kategorija C') testNumber = '21';
    else testNumber = '22';
    this.router.navigate(['/testovi', testNumber]);
  }
}
