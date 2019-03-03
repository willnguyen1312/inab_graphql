import * as yup from 'yup';
import { User } from '../../../entity/User';
import { ResolverMap } from '../../../types/graphql-utils';
import { formatYupError } from '../../../utils/formatYupError';
import { sendEmail } from '../../../utils/sendEmail';
import { registerPasswordValidation } from '../../../yupSchemas';
import { createConfirmEmailLink } from './createConfirmEmailLink';
import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
} from './errorMessages';

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: registerPasswordValidation,
});

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const isUserAlreadyExists = await User.findOne({
        where: { email },
        select: ['id'],
      });

      if (isUserAlreadyExists) {
        return [
          {
            path: 'email',
            message: duplicateEmail,
          },
        ];
      }

      const user = User.create({
        email,
        password,
      });

      await user.save();

      // if (IS_PROD) {
      await sendEmail(
        email,
        await createConfirmEmailLink(url, user.id, redis),
        'confirm email'
      );
      // }

      return null;
    },
  },
};
