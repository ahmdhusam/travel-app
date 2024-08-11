import { Test, TestingModule } from '@nestjs/testing';
import { FlightsSearchService } from './flights-search.service';

describe('FlightsSearchService', () => {
  let service: FlightsSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightsSearchService],
    }).compile();

    service = module.get<FlightsSearchService>(FlightsSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
