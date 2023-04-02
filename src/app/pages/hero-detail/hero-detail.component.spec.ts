import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from 'src/app/services/hero/hero.service';
import { of } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let service: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    service = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a hero data', () => {
    const hero: Hero = { id: 1, name: 'Hero 1' };
    spyOn(service, 'getHero').and.returnValue(of(hero));
    component.getHero();
    fixture.detectChanges();
    expect(component.hero).toEqual(hero);
  });

  it('should back page', () => {
    spyOn(component, 'goBack').and.callThrough();
    component.goBack();
    expect(component.goBack).toHaveBeenCalled();
  });

  it('should update a hero', () => {
    const hero = { id: 1, name: 'Hero 1' };

    const spyUpdate = spyOn(service, 'updateHero').and.returnValue(of(hero));
    const spyGoBack = spyOn(component, 'goBack');

    component.hero = hero;
    component.save();

    expect(spyUpdate).toHaveBeenCalledWith(hero);
    expect(spyGoBack).toHaveBeenCalled();
  });
});
