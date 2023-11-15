import { useEffect, useState } from 'react'
import { FAILURE, SUCCESS, get, getReplacedUrl, parseResponse } from '../utils/ApiUtil';
import { logout } from '../utils/AuthUtil';

export default function useAPI(url, query=null, replacer='') {
    const [ toRet, setToRet ] = useState(null);
    url = getReplacedUrl(url, replacer);
    useEffect(() => {
        get(url, query).then((response) => {
            if(response.error === undefined) {
                setToRet({ status: SUCCESS, result: parseResponse(url, response, replacer)});
            } else {
                if(response.error.status === 401) {
                    logout();
                } else {
                    setToRet({status: FAILURE, result: response.error});
                }
            }
        }).catch(exception => {
            setToRet({status: FAILURE, exception: exception});
        })
    }, [url, query, replacer]);

    return toRet;
}
