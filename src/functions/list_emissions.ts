import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { findAll } from "../../db/emissions";

export async function list_emissions(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const emissions = findAll();
    return { body: JSON.stringify(emissions) };
};

app.http('list_emissions', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: list_emissions
});


