import { Module } from '@nestjs/common';
import { CreateTestController } from './features/create-test';
import { CreateTestService } from './features/create-test/CreateTest.service';
import { TestOrmEntity } from './entities/Test.orm-entity';
import { TestRepository } from './repository/Test.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([TestOrmEntity])],
    controllers: [CreateTestController],
    providers: [CreateTestService, TestRepository],
    exports: []
})
export class ExampleModule {
}