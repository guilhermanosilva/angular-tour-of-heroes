import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { MessageService } from '../message/message.service';
import { HeroService } from './hero.service';

const heroesUrl = 'api/heroes';
const heroesMock: Hero[] = [
  { id: 1, name: 'Hero 1' },
  { id: 2, name: 'Hero 2' },
];

describe('HeroService', () => {
  let httpMock: HttpTestingController;
  let heroService: HeroService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
    messageService = TestBed.inject(MessageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should return heroes from the api', () => {
    heroService.getHeroes().subscribe((res) => {
      expect(res).toEqual(heroesMock);
    });

    const req = httpMock.expectOne(heroesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(heroesMock);
  });

  it('should return a hero from the api', () => {
    const hero = heroesMock[0];

    heroService.getHero(hero.id).subscribe((res) => {
      expect(res).toEqual(hero);
    });

    const req = httpMock.expectOne(`${heroesUrl}/${hero.id}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(`${heroesUrl}/${hero.id}`);
    req.flush(hero);
  });

  it('should add a hero', () => {
    const newHero: Hero = { id: 3, name: 'Hero 3' };

    heroService.addHero(newHero).subscribe((res) => {
      expect(res).toEqual(newHero);
    });

    const req = httpMock.expectOne(heroesUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newHero);
    req.flush(newHero);
  });

  it('should update a hero', () => {
    const updatedHero: Hero = { id: 0, name: 'Hero Updated' };
    const spy = spyOn(messageService, 'add');

    heroService.updateHero(updatedHero).subscribe();
    // expect(spy).toHaveBeenCalledWith(`updated hero id=${updatedHero.id}`)

    const req = httpMock.expectOne(heroesUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedHero);
  });

  it('shoud delete a hero', () => {
    const hero = heroesMock[0];

    heroService.deleteHero(hero.id).subscribe((res) => {
      expect(res).toEqual(hero);
    });

    const req = httpMock.expectOne(`${heroesUrl}/${hero.id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.url).toEqual(`${heroesUrl}/${hero.id}`);
    req.flush(hero);
  });

  it('should return heroes by search term', () => {
    const searchTerm = 'Hero 1';
    const response = [heroesMock[0]];

    heroService.searchHeroes(searchTerm).subscribe((res) => {
      expect(res).toEqual(response);
      expect(res.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${heroesUrl}/?name=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(`${heroesUrl}/?name=${searchTerm}`);
  });

  it('should return an empty array when searchTerm is empty', () => {
    heroService.searchHeroes('').subscribe((res) => {
      expect(res).toEqual([]);
      expect(res.length).not.toBeGreaterThan(0);
    });

    const req = httpMock.expectNone(`${heroesUrl}/?name=`);
    expect(req).not.toBeDefined();
  });
});
