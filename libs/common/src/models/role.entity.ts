import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../database";

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;

  constructor(obj = {}) {
    super(obj);
    Object.assign(this, obj)
  }
}