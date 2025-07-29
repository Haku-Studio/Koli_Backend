import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Missing required Google OAuth configuration');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      emails: { value: string }[];
      name: { givenName: string; familyName: string };
      photos: { value: string }[];
    },
  ) {
    const { emails, name, photos } = profile;
    const firstName = name.givenName;
    const lastName = name.familyName;

    return {
      email: emails[0].value,
      name: firstName + ' ' + lastName || '',
      picture: photos[0].value,
      provider: 'google',
      //   accessToken,
      //   refreshToken,
    };
  }
}
