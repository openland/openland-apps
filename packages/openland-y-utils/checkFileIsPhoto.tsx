export let checkFileIsPhoto = (path: string) => {
    let fileExtension = path.split('.').pop();

    if (fileExtension) {
        let ext = fileExtension.toLowerCase();

        return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'heic';
    }

    return false;
}