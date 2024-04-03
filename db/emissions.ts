export const emissionMap = new Map<String, Emission>();

export interface Emission {
    id?: String;
    name: String;
    createdAt: Date;
}

export function addEmission(newEmission: Emission): Emission {
    newEmission.createdAt = new Date();

    let id = (Math.random() + 1).toString(36).substring(2);
    newEmission.id = id

    emissionMap.set(id, newEmission);
    return newEmission
}

export function deleteById(id: String): void {
    emissionMap.delete(id)
}

export function findAll(): Emission[] {
    return Array.from(emissionMap.values())
}

export function findOne(id: String): Emission {
    return emissionMap.get(id);
}


export function updateById(id: String, newName: String): Emission {
    const newEmission = emissionMap.get(id);
    newEmission.name = newName

    emissionMap.set(id, newEmission)
    return newEmission
}
