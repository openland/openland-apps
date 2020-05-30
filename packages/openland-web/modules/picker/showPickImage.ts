
const fileListToArray = (files?: FileList) => {
    let res = [];
    if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
            res.push(files[i]);
        }
    }
    return res;
};

export interface PickedImage {
    file: File;
    width: number;
    height: number;
}

export function showPickImage(callback: (image: PickedImage) => void) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        if (e.target) {
            var files = fileListToArray((e.target as any).files);
            if (files.length !== 1) {
                return;
            }
            let file = files[0];
            let img = new Image();
            img.onload = () => {
                callback({
                    file,
                    width: img.width,
                    height: img.height
                });
            };
            img.onerror = () => {
                console.warn('Inavlid image: ignoring');
            };
            img.src = URL.createObjectURL(file);
        }
    };
    input.click();
}