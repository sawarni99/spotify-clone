export const post = async (url, body) => {
    const payload = {
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body),
    }

    try {
        const data = await fetch(url, payload);
        return data.json();
    } catch(exception) {
        console.log(exception);
        return Promise.reject(exception);
    }

}