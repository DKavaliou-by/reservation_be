import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepository.create({...createUserDto, password: hashedPassword});
  }

  async verifyUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}