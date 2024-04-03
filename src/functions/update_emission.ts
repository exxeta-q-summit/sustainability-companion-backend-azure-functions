import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Emission, findOne, updateById } from "../../db/emissions";

export async function update_emission(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const updateEmission = await request.json() as Emission
    const id = request.params.id;

    try {
        if (!findOne(id)) {
            throw new Error(`User with ID ${id} not found`)
        }
        if (!updateEmission.name || updateEmission.name.trim() === "") {
            throw new Error("Could not update emission, because [name] is missing")
        }
        const emission = updateById(id, updateEmission.name)
        return { body: JSON.stringify(emission) };
    } catch (error) {
        context.log(error);
        return { body: error };
    };
};

app.http('update_emission', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'update_emission/{id}',
    handler: update_emission
});
