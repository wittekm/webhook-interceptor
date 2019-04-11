import {OAuth2Client} from 'google-auth-library';
import {LoginTicket, TokenPayload} from "google-auth-library/build/src/auth/loginticket";
import {env} from "../env";

const client = new OAuth2Client(env.googClientId);

export async function verifyGoogleToken(tokenFromFrontend: string): Promise<TokenPayload | undefined> {
    const ticket: LoginTicket = await client.verifyIdToken({
        idToken: tokenFromFrontend,
        audience: env.googClientId,
    });
    return ticket.getPayload();
}
