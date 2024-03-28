import { ObjectId } from "mongodb";

export const emissionMap = new Map<String, Emission>();

export interface Emission {
    id?: String
    name: string;
    createdAt: Date;
}

export function addEmission(newEmission: Emission): Emission {
    newEmission.createdAt = new Date();
    let id = new ObjectId().toString();
    newEmission.id = id

    emissionMap.set(id, newEmission);
    return newEmission
}

export function findAll(): Emission[] {
    return Array.from(emissionMap.values())
}

export function findOne(id: String): Emission {
    return emissionMap.get(id);
}

