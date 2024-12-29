declare module 'passport-42' {
    import { Strategy as OAuth2Strategy, StrategyOptions as OAuth2StrategyOptions } from 'passport-oauth2';
    import { Request } from 'express';
  
    export interface Profile {
      id: string;
      username: string;
      displayName: string;
      emails?: Array<{ value: string }>;
      _json: any;
    }
  
    export interface StrategyOptions extends OAuth2StrategyOptions {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    }
  
    export type VerifyFunction = (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => void | Promise<void>;
  
    export type VerifyFunctionWithRequest = (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => void | Promise<void>;
  
    export class Strategy extends OAuth2Strategy {
      constructor(options: StrategyOptions, verify: VerifyFunction);

    }
  }