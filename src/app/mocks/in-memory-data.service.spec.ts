import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { Hero } from '../models/hero.model';

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
