import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-selection',
  templateUrl: './test-selection.component.html',
  styleUrls: ['./test-selection.component.css'],
})
export class TestSelectionComponent {
  selectedTest: string = 'Test 1';
  tests: string[] = [
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
  ];

  constructor(private router: Router) {}

  onContinue() {
    const testNumber = this.selectedTest.replace(/\D/g, '');
    this.router.navigate(['/testovi', testNumber]);
  }
}
