import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { deleteById, findOne } from "../../db/emissions";

export async function delete_emission(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const id = request.params.id
    const emission = findOne(id);
    if (!emission) { return { body: `User with ID ${id} not found` } };

    deleteById(id);
    return { body: "Deleted successfully" };

};

app.http('delete_emission', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'delete_emission/{id}',
    handler: delete_emission
});
