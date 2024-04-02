import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { findOne } from "../../db/emissions";

export async function get_emission(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const id = request.params.id;
    const emission = findOne(id);
    if (!emission) { return { body: `User with ID ${id} not found` } };

    return { body: JSON.stringify(emission) };
};

app.http('get_emission', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'get_emission/{id}',
    handler: get_emission
});
