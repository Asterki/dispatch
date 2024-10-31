import express from 'express';
import { z } from 'zod';
import validator from 'validator';

import accountsRegister from '../controllers/accounts/register';
import accountsLogin from '../controllers/accounts/login';
import accountsFetch from '../controllers/accounts/fetch';
import accountsLogout from '../controllers/accounts/logout';

import { validateRequestBody } from '../utils/validation';

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(24)
    .refine((username) => {
      return validator.isAlphanumeric(username, 'en-US', { ignore: '_.' });
    }),
  password: z
    .string()
    .min(8)
    .max(100)
    .refine((pass) => {
      return validator.isStrongPassword(pass);
    }),
});
router.post('/register', validateRequestBody(registerSchema), accountsRegister);

const loginSchema = z.object({
  emailOrUsername: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
  tfaCode: z.string().optional(),
});
router.post('/login', validateRequestBody(loginSchema), accountsLogin);

// Body-less routes
router.get('/fetch', accountsFetch);
router.get('/logout', accountsLogout);

export default router;