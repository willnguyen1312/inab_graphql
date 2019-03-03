import { Request, Response } from 'express';
import { FRONTEND_HOST } from '../config';
import { User } from '../entity/User';
import { redis } from '../redis';

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    res.redirect(`${FRONTEND_HOST}/login`);
  } else {
    res.send('invalid');
  }
};
