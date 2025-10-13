import { z } from 'zod';

export const parseModel = (model: any) => {
    const schema = z.object({
        // Define your Zod schema based on the model structure
        // Example:
        id: z.string(),
        name: z.string(),
        // Add more fields as necessary
    });

    return schema.parse(model);
};