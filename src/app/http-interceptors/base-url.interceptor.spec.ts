import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BaseUrlInterceptor } from './base-url.interceptor';

describe('BaseUrlInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BaseUrlInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor = TestBed.inject(BaseUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should append the url and api key to requests', async () => {
    const interceptor = TestBed.inject(BaseUrlInterceptor);
    const nextHandler = jasmine.createSpyObj<HttpHandler>('HttpHandler', [
      'handle',
    ]);
    nextHandler.handle.and.returnValue(of(new HttpResponse()));

    await expectAsync(
      interceptor
        .intercept(new HttpRequest<unknown>('GET', '/search.php'), nextHandler)
        .toPromise()
    );
    expect(nextHandler.handle).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
      })
    );
  });
});
