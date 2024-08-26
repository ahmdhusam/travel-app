import { Test, TestingModule } from '@nestjs/testing';
import { FlightsController } from './flights-search.controller';
import { FlightsSearchService } from './flights-search.service';

describe('FlightsController', () => {
  let flightsController: FlightsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlightsController],
      providers: [FlightsSearchService],
    }).compile();

    flightsController = app.get<FlightsController>(FlightsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(flightsController.getHello()).toBe('Hello World!');
    });
  });
});
