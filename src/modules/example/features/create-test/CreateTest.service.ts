import { TestRepository } from '../../repository/Test.repository';
import CreateTestRequestDto from './dtos/CreateTestRequest.dto';
import { TestEntity } from '../../entities/Test.entity';
import CreateTestResponseDto from './dtos/CreateTestResponse.dto';
import { Injectable } from '@nestjs/common';
import { DateVO, Id } from '../../../core-domain/valueObject';

@Injectable()
export class CreateTestService {

    constructor(private _repository: TestRepository) {
    }

    async createTest(testReq: CreateTestRequestDto): Promise<CreateTestResponseDto> {
        const test = new TestEntity({
            id: Id.generateId(),
            message: testReq.message,
            createdAt: DateVO.now(),
            updatedAt: DateVO.now()
        });
        const res = await this._repository.insert(test);
        return new CreateTestResponseDto(res.props.id.value, res.props.message);
    }

}