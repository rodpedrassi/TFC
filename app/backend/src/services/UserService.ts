import * as bcrypt from 'bcryptjs';
import { createToken } from '../authentication/jwt';
import UserModel from '../database/models/UserModel';
import { IUserCredentials } from './interfaces/IUser';
// import UserValidation from './validations/UserValidation';

export default class UserService {
  static async login(user: IUserCredentials) {
    const { email, password } = user;

    const findingUser = await UserModel.findOne({ where: { email } });
    // console.log('user', findingUser?.dataValues);
    if (!findingUser) { return { type: 'USER_NOT_FOUND', message: 'Incorrect email or password' }; }

    const checkPassword = bcrypt.compareSync(password, findingUser.password);
    if (!checkPassword) {
      return { type: 'USER_NOT_FOUND', message: 'Incorrect email or password' };
    }

    const { password: _pass, ...userWithoutPassword } = findingUser.dataValues;
    const token = createToken(userWithoutPassword);
    return { type: null, message: token };
  }
}
