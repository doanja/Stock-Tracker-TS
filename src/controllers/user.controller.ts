import { Request, Response } from 'express';
import { User } from '../models';
import { compareSync, hashSync } from 'bcryptjs';

export const updatePassword = (req: Request, res: Response) => {
  const { password, newPassword } = req.body;

  User.findById({ _id: req.accessToken?._id }).then(user => {
    // finding user _id fails
    if (!user) res.status(400).json({ error: 'Cannot find user.' });
    // decrypt password fails
    else if (!compareSync(password, user.password)) res.status(400).json({ error: 'Password incorrect.' });
    // update the password
    else
      User.findOneAndUpdate({ _id: req.accessToken?._id }, { password: hashSync(newPassword) })
        .then(user => res.status(200).json({ message: 'Password updated.' }))
        .catch(err => res.status(400).json({ error: 'Password cannot be updated.' }));
  });
};

export const updateEmail = (req: Request, res: Response) => {
  const { password, newEmail } = req.body;

  User.findById({ _id: req.accessToken?._id }).then(user => {
    // finding user _id fails
    if (!user) res.status(400).json({ error: 'Cannot find user.' });
    // decrypt password fails
    else if (!compareSync(password, user.password)) res.status(400).json({ error: 'Password incorrect.' });
    // update the email
    else
      User.findOneAndUpdate({ _id: req.accessToken?._id }, { email: newEmail })
        .then(user => res.status(200).json({ message: 'Email updated.' }))
        .catch(err => res.status(400).json({ error: 'Email cannot be updated.' }));
  });
};
