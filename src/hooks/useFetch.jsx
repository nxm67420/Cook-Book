import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => { 
    //Constants
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)

    const postData = (postData) => { 
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }
    
    //useEffect()
    useEffect(() => { 

        //Abort Fetch When Going to Dofferent Page 
        const controller = new AbortController()

        //Asynchronous Method()
        const fetchData = async (fetchOptions) => { 
            setLoading(true);
            try {
                const response = await fetch(url, {...fetchOptions, signal: controller.signal});
                if (!response.ok) { 
                    throw new Error(response.statusText)
                }
                const json = await response.json();
                setLoading(false);
                setData(json);
                setError(null)
            }
            catch (err) { 
                if (err.name === "AbortError") {
                    console.log("Fetch Was Aborted")
                }
                else { 
                    setLoading(false);
                    setError('Could Not Fetch The Data')
                    console.log(err.message);
                }
            }
        }//end of fetchData Function 
        
        if (method === "GET") {
            fetchData();//Call function to fetch Data, Triggers useEffect()
        }
        if (method === "POST" && options) { 
            fetchData(options)
        }


        //abort fetch request 
        return () => { 
            controller.abort();
        }
        
    }, [url, options, method])//Array Dependency to watch for Changes
    return { data, isLoading, error, postData} //Return Response Data to useFetch(props)
}