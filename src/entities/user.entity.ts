import * as Joi from "joi";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({
    type: "varchar",
  })
  readonly id?: string;
  @Column({
    type: "varchar",
  })
  readonly name: string;
  @Column({
    type: "varchar",
  })
  readonly email: string;
  @Column({
    type: "varchar",
  })
  readonly password: string;

  constructor(data: User) {
    if (data) {
      this.id = data?.id;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
    }
  }
}

export const CoffeeSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
});
