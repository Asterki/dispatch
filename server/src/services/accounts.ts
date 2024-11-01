import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import { v4 as uuidv4 } from 'uuid';

import UserModel from '../models/Users';
import { HydratedDocument } from 'mongoose';

import Logger from '../utils/logger';

import type { User } from '../../../shared/types/models';

class AccountService {
  private static instance: AccountService;

  private constructor() {}

  public static getInstance(): AccountService {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }
    return AccountService.instance;
  }

  public async registerUser(email: string, username: string, password: string) {
    try {
      const isUsernameOrEmailTaken = await UserModel.findOne({
        $or: [{ 'profile.email.value': email }, { 'profile.username': username }],
      });
      if (isUsernameOrEmailTaken) return { status: 'user-exists' };

      // Create the user
      const user = new UserModel({
        userID: uuidv4(),
        pubKey: Buffer.from(''),
        created: Date.now(),
        email: {
          value: email,
          verified: false,
        },
        profile: {
          username,
        },
        preferences: {
          security: {
            password: bcrypt.hashSync(password, 10),
          },
        },
      });
      await user.save();

      return {
        status: 'success',
        user: user as unknown as User,
      };
    } catch (error) {
      console.log(error);
      Logger.error((error as Error).message, true);
      return {
        status: 'internal-error',
      };
    }
  }

  public async deleteUser(userID: string, password: string, tfaCode?: string) {
    try {
      const user: HydratedDocument<User> | null = await UserModel.findOne({ userID });
      if (!user) return { status: 'internal-error' };

      // Check passwords and TFA CODE
      if (!bcrypt.compareSync(password, user.preferences.security.password)) return { status: 'invalid-password' };
      if (user.preferences.security.twoFactor.active) {
        if (
          tfaCode &&
          !speakeasy.totp.verify({
            secret: user.preferences.security.twoFactor.secret as string,
            encoding: 'base32',
            token: tfaCode,
          })
        )
          return { status: 'invalid-tfa' };
      }

      // Delete the user and their related documents
      await UserModel.deleteOne({
        userID,
      });

      return {
        status: 'success',
      };
    } catch (error) {
      Logger.error((error as Error).message, true);
      return {
        status: 'internal-error',
      };
    }
  }
}

export default AccountService.getInstance();