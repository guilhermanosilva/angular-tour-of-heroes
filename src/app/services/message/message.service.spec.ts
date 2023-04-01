import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a message', () => {
    const message = 'new message added';
    const spyedComponent = spyOn(service, 'add').and.callThrough();

    service.add(message);

    expect(spyedComponent).toHaveBeenCalledTimes(1);
    expect(service.messages).toEqual([message]);
  });

  it('should clear messages', () => {
    const spyedComponent = spyOn(service, 'clear').and.callThrough();

    service.clear();

    expect(spyedComponent).toHaveBeenCalledTimes(1);
    expect(service.messages).toEqual([]);
  });
});
