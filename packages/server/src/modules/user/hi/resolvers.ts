import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    hi: () => ({
      message: 'Hi back',
    }),
  },
};
