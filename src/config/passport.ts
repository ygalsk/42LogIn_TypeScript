import passport from 'passport';
import { Strategy as FortyTwoStrategy } from 'passport-42';
import { AuthService } from '../services/auth.services';
import { User } from '../entities/User';

const authService = new AuthService();

interface Profile {
    id: string;
    username: string;
    emails?: Array<{ value: string }>;
    _json: any;
}

const initializePassport = (): void => {
    passport.use('42',
        new FortyTwoStrategy(
            {
                clientID: process.env.CLIENT_ID || '',
                clientSecret: process.env.CLIENT_SECRET || '',
                callbackURL: process.env.REDIRECT_URI || ''
            },
            async (accessToken: string, refreshToken: string, profile: Profile, done: any) => {
                try {
                    console.log('OAuth callback received:', {
                        id: profile.id,
                        username: profile.username
                    });

                    const user = await authService.validateUser(profile);
                    return done(null, user);
                } catch (error) {
                    console.error('Authentication error:', error);
                    return done(error, null);
                }
            }
        )
    );

    passport.serializeUser((user: any, done) => {
        console.log('Serializing user:', user.id);
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            console.log('Deserializing user:', id);
            const user = await authService.getUserById(id);
            done(null, user);
        } catch (error) {
            console.error('Deserialization error:', error);
            done(error, null);
        }
    });
};

export default initializePassport;