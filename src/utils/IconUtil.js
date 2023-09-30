const PATH = './assets/icons'

export function getIcon(name, state = '', ext = 'png') {

    if(state !== null && typeof state === 'string') {
        state = `-${state}`;
    }

    let filePath = `${PATH}/${name}${state}.${ext}`;

    return filePath;
}