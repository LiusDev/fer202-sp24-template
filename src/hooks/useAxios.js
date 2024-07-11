import { useEffect, useState } from "react"
import { instance } from "../ultils"

const useAxios = ({ url, params }) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        instance
            .get(url, {
                params: params ? params : {},
            })
            .then((res) => setData(res.data))
            .catch((err) => {
                setError(err)
                setIsError(true)
            })
            .finally(() => setIsLoading(false))
    }, [url])

    return { data, isLoading, error, isError }
}

export default useAxios
