import {APIGatewayEvent, APIGatewayProxyResult, Callback, Context, Handler} from 'aws-lambda';
import {renderSigninPage} from "./google_signin/signin_page";
import {env} from "./env";

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    cb(null, response);
};

const htmlHeaders = () => {
    return { 'Content-Type': "text/html" }
}

export const signinPage: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const body = renderSigninPage(env.googClientId);
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: body,
        headers: htmlHeaders(),
    };

    cb(null, response);
}


export const tokenSignin: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    console.log("FUUUU");
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: "cool",
        headers: htmlHeaders(),
    };

    cb(null, response);
}