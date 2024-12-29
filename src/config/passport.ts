import passport from 'passport';
import { Strategy as FortyTwoStrategy } from 'passport-42';
import { UserService } from '../services/user.services';

const userService = new UserService();

const initializePassport = (): void => {
  passport.use('42',
    new FortyTwoStrategy(
      {
        clientID: process.env.CLIENT_ID || '',
        clientSecret: process.env.CLIENT_SECRET || '',
        callbackURL: process.env.REDIRECT_URI || '',
        authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
        tokenURL: 'https://api.intra.42.fr/oauth/token'
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void
      ) => {
        try {
          const user = await userService.findOrCreate({
            id: profile.id,
            username: profile.username,
            email: profile.emails?.[0]?.value
          });
          return done(null, user);
        } catch (error) {
          return done(error, undefined);
        }
      }
    )
  );

  passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = await userService.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default initializePassport;