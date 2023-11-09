import { useEffect, useState } from 'react'
import { FAILURE, SUCCESS, TOP10_USER_LIBRARY, get } from '../utils/ApiUtil';

export default function useAPI(url) {
    const [ toRet, setToRet ] = useState(null);

    const parseResponse = (url, response) => {
        let toRet = {};
        switch(url) {
            case TOP10_USER_LIBRARY :
                toRet = {
                    items: response.items.map((item) => {
                        return {
                            id: item.id,
                            image_url: item.images[0].url,
                            name: item.name,
                            type: item.type,
                        }
                    })
                }
                break;
            default:
                return null;
        }
        return toRet;
    }

    useEffect(() => {
        get(url).then((response) => {
            if(response.error === undefined) {
                setToRet({ status: SUCCESS, result: parseResponse(url, response)});
            } else {
                setToRet({status: FAILURE, result: response.error});
            }
        }).catch(exception => {
            setToRet({status: FAILURE, exception: exception});
        })
    }, [url]);

    return toRet;
}
