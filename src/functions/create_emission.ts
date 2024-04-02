import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { addEmission, Emission } from "../../db/emissions";

export async function create_emission(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const newEmission = await request.json() as Emission

    try {
        if (!newEmission.name || newEmission.name.trim() === "") {
            throw new Error("Could not create emission, because [name] is missing")
        }
        const emission = addEmission(newEmission)
        return { body: JSON.stringify(emission) };
    } catch (error) {
        context.log(error);
        return { body: error };
    };


};

app.http('create_emission', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: create_emission
});
