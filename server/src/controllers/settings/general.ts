
import UserModel from '../../models/Users';

import { NextFunction, Request, Response } from 'express';
import { GeneralResponseData as ResponseData, GeneralRequestData as RequestData } from '../../../../shared/types/api/settings';
import { User } from '../../../../shared/types/models';

import Logger from 'file-error-logging/dist/cjs';

// Settings General
const handler = async (req: Request<{}, {}, RequestData>, res: Response<ResponseData>, next: NextFunction) => {
  const { theme, language } = req.body;
  const currentUser = req.user as User;

  try {
    await UserModel.updateOne(
      { userID: currentUser.userID },
      {
        $set: {
          'preferences.general.theme': theme,
          'preferences.general.language': language,
        },
      },
    ).exec();

    return res.status(200).send({
      status: 'success',
    });
  } catch (error: unknown) {
    res.status(500).send({
      status: 'internal-error',
    });
    Logger.log("error", (error as Error).message);
  }
};

export default handler;
