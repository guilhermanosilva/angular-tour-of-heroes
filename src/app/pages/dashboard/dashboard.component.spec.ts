import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from '../../components/hero-search/hero-search.component';

import { DashboardComponent } from './dashboard.component';
import { Hero } from 'src/app/models/hero.model';
import { of } from 'rxjs';
import { HeroService } from 'src/app/services/hero/hero.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    service = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return heroes top heroes', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
      { id: 3, name: 'Hero 3' },
      { id: 4, name: 'Hero 4' },
      { id: 5, name: 'Hero 5' },
      { id: 6, name: 'Hero 6' },
    ];

    spyOn(service, 'getHeroes').and.returnValue(of(heroes));

    component.getHeroes();
    fixture.detectChanges();

    expect(component.heroes).toEqual(heroes.slice(1, 5));
    expect(component.heroes[0]).toEqual(heroes[1]);
    expect(component.heroes[3]).toEqual(heroes[4]);
    expect(component.heroes.length).toEqual(4);
  });
});
