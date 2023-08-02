import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMakerComponent } from './quiz-maker.component';

describe('QuizMakerComponent', () => {
  let component: QuizMakerComponent;
  let fixture: ComponentFixture<QuizMakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizMakerComponent]
    });
    fixture = TestBed.createComponent(QuizMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
