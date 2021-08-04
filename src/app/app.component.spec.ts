import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatIconModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the main element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main')).toBeTruthy();
  });

  it('should toggle between modes', () => {
    const localStorageSetSpy = spyOn(localStorage, 'setItem');

    const element: HTMLElement = fixture.nativeElement;
    const toggle = element.querySelector<HTMLInputElement>(
      'input[type="checkbox"]'
    )!;
    toggle.click();
    fixture.detectChanges();

    expect(localStorageSetSpy).toHaveBeenCalledOnceWith('theme', 'true');

    toggle.click();
    fixture.detectChanges();

    expect(localStorageSetSpy).toHaveBeenCalledWith('theme', 'false');
  });
});
