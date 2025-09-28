import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly usersService: UsersService,
      private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {

          const authentication = request?.cookies?.Authentication
            || request?.Authentication
            || request?.headers?.Authentication;
          console.log('jwt from request', authentication);
          return authentication;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate({userId}: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}