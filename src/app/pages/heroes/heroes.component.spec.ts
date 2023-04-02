import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from 'src/app/services/hero/hero.service';
import { Hero } from 'src/app/models/hero.model';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const heroesMock: Hero[] = [
  { id: 1, name: 'Hero 1' },
  { id: 2, name: 'Hero 2' },
  { id: 3, name: 'Hero 3' },
  { id: 4, name: 'Hero 4' },
  { id: 5, name: 'Hero 5' },
  { id: 6, name: 'Hero 6' },
];

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let service: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    service = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get heroes on init', () => {
    const getHeroesSpy = spyOn(service, 'getHeroes').and.returnValue(
      of(heroesMock)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(getHeroesSpy).toHaveBeenCalled();
    expect(component.heroes).toEqual(heroesMock);
  });

  it('should not be called add hero', () => {
    spyOn(service, 'addHero').and.callThrough();
    component.add('');
    expect(service.addHero).not.toHaveBeenCalled();
  });

  it('should add a new hero', () => {
    const buttonElement = fixture.nativeElement.querySelector('#add-button');
    const inputElement = fixture.nativeElement.querySelector('#new-hero');

    const name = 'New Hero';
    const hero: Hero = { id: 7, name };

    const addSpy = spyOn(component, 'add').and.callThrough();
    const addHeroSpy = spyOn(service, 'addHero').and.returnValue(of(hero));

    component.heroes = heroesMock;

    inputElement.value = name;
    buttonElement.click(name);
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith(name);
    expect(addHeroSpy).toHaveBeenCalledWith({ name } as Hero);

    expect(component.heroes.length).toEqual(7);
    expect(component.heroes[6]).toEqual(hero);
    expect(component.heroes[6].name).toEqual('New Hero');
  });

  it('should delete a hero', () => {
    const heroes = [{ id: 1, name: 'Hero 1' }];
    component.heroes = heroes;

    spyOn(component, 'delete').and.callThrough();
    spyOn(service, 'deleteHero').and.callThrough();

    component.delete(heroes[0]);
    expect(component.heroes.length).toEqual(0);
    expect(service.deleteHero).toHaveBeenCalledWith(heroes[0].id);
  });
});
