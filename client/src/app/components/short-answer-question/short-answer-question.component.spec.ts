import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswerQuestionComponent } from './short-answer-question.component';

describe('ShortAnswerQuestionComponent', () => {
  let component: ShortAnswerQuestionComponent;
  let fixture: ComponentFixture<ShortAnswerQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortAnswerQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortAnswerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
