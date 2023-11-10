export const findChangedFields = (originalObject: any, modifiedObject: any) => {
    const changedFields: Record<any, any> = {};

    for (const key in originalObject) {
        if (originalObject.hasOwnProperty(key)) {
            if (originalObject[key] !== modifiedObject[key]) {
                changedFields[key] = modifiedObject[key];
            }
        }
    }

    return changedFields;
};