import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { EntityManager, FindOptions, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {
    // this.logger = new Logger(AbstractRepository.name);
  }

  async create(entity: T): Promise<T> { 
    return this.entityManager.save<T>(entity);
  }

  async findOne(
    where: FindOptionsWhere<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });
    
    if (!entity) {
      this.logger.warn(`Entity was not found with where: ${JSON.stringify(where)}`);
      throw new NotFoundException('Entity was not found');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(where, partialEntity);

    if (!updateResult) {
      this.logger.warn(`Entity was not found with where: ${JSON.stringify(where)}`);
      throw new NotFoundException('Entity was not found');
    }

    return this.findOne(where);
  }

  async find(
    where: FindOptionsWhere<T>,
  ): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  async findOneAndDelete(
    where: FindOptionsWhere<T>,
  ): Promise<void> {
    await this.entityRepository.delete(where);
  }
}