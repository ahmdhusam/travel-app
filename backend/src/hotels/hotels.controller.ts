import { Controller, Get } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import {
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(HotelsController.name.replace('Controller', ''))
@ApiNotImplementedResponse({ description: 'Not Implemented' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  // TODO: set type.
  @ApiOkResponse({ type: null })
  @Get('search')
  search() {
    return this.hotelsService.search();
  }

  // TODO: set type.
  @ApiOkResponse({ type: null })
  @Get('filter')
  filter() {
    return this.hotelsService.filter();
  }
}
