import {APIGatewayEvent, APIGatewayProxyResult, Callback, Context, Handler} from 'aws-lambda';
import {renderSigninPage} from "./google_signin/signin_page";
import {env} from "./env";
import {verifyGoogleToken} from "./google_signin/verify_token";

export const hello: Handler = async (event: APIGatewayEvent, context: Context) => {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    return response;
};

const htmlHeaders = () => {
    return { 'Content-Type': "text/html" }
}

export const signinPage: Handler = async (event: APIGatewayEvent, context: Context) => {
    const body = renderSigninPage(env.googClientId);
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: body,
        headers: htmlHeaders(),
    };

    return response;
}


export const tokenSignin: Handler = async (event: APIGatewayEvent, context: Context) => {
    const tokenFromFrontend = JSON.parse(event.body)['tokenFromFrontend'];

    const verifyResult = await verifyGoogleToken(tokenFromFrontend);

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: "cool",
        headers: htmlHeaders(),
    };

    return response;
}