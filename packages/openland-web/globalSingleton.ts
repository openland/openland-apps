let isEditMessageVal = false;

export const global = {
    getIsEditMessage: (): boolean => isEditMessageVal,
    setIsEditMessage: (isEditMessage: boolean) =>
        (isEditMessageVal = isEditMessage)
};
