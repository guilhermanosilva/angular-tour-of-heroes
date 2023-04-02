import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { Hero } from '../models/hero.model';

const heroesMock: Hero[] = [
  { id: 1, name: 'Hero 1' },
  { id: 2, name: 'Hero 2' },
  { id: 3, name: 'Hero 3' },
  { id: 4, name: 'Hero 4' },
  { id: 5, name: 'Hero 5' },
  { id: 6, name: 'Hero 6' },
];

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createDb', () => {
    const db = service.createDb();
    expect(db.heroes.length).toBeGreaterThan(0);
  });

  it('should return an id greater than the largest id in the array', () => {
    const heroes: Hero[] = [
      { id: 12, name: 'Hero 12' },
      { id: 13, name: 'Hero 13' },
    ];

    const id = service.getId(heroes);
    expect(id).toEqual(14);
  });

  it('should return id 11 if the array is empty', () => {
    const id = service.getId([]);
    expect(id).toEqual(11);
  });
});
