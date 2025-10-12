import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { Role, User } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    console.log('Creating user:', createUserDto);
    await this.validateCreatedUser(createUserDto)
    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      roles: createUserDto.roles?.map(roleDto => new Role(roleDto)),
    });

    console.log('Created user:', user);
    return this.usersRepository.create(user);
    
  }

  async verifyUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto, {roles: true});
  }

  async validateCreatedUser(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnauthorizedException('User with this email already exists');
  }
}