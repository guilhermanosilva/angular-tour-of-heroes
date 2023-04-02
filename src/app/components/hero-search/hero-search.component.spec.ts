import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { Observable, of } from 'rxjs';
import { HeroService } from 'src/app/services/hero/hero.service';
import { Hero } from 'src/app/models/hero.model';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let service: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSearchComponent);
    service = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should heroes$ be of type Observale', () => {
    expect(component.heroes$).toEqual(jasmine.any(Observable));
  });

  it('shold searchTerms.next be called correctly', fakeAsync(() => {
    const term = 'Hero';
    const response: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
    ];

    const searchSpy = spyOn(component, 'search').and.callThrough();
    const searchHeroesSpy = spyOn(service, 'searchHeroes').and.returnValue(
      of(response)
    );

    component.search(term);
    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith(term);

    tick(300);
    expect(searchHeroesSpy).toHaveBeenCalledTimes(1);
    expect(searchHeroesSpy).toHaveBeenCalledWith(term);

    component.heroes$.subscribe((res) => expect(res).toEqual(response));
  }));
});
