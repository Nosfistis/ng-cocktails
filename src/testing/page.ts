import { ComponentFixture } from '@angular/core/testing';

import { changeInputValue, getInputValue } from './input-helpers';

export class BasePage<C> {
  constructor(protected readonly fixture: ComponentFixture<C>) {}

  sanitizeSelector(selector: string): string {
    return selector.replace(/\./g, '\\.');
  }

  query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll<T>(selector: string): T[] {
    return Array.from(this.fixture.nativeElement.querySelectorAll(selector));
  }

  getInputValue<T = string>(selector: string | HTMLInputElement): T {
    return selector instanceof Element
      ? selector.value
      : getInputValue(this.fixture, this.sanitizeSelector(selector));
  }

  setInputValue<T = string>(selector: string, value: T): void {
    changeInputValue(this.fixture, this.sanitizeSelector(selector), value);
  }
}
