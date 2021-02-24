import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import CreateTestRequestDto from './dtos/CreateTestRequest.dto';
import { CreateTestService } from './CreateTest.service';

@Controller('test')
export class CreateTestController {

    constructor(private testService: CreateTestService) {
    }

    @Post()
    @HttpCode(201)
    async createTest(@Body() testReq: CreateTestRequestDto) {
        return this.testService.createTest(testReq);
    }

}