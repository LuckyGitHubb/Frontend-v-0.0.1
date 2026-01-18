export const globalApi = async(method,data,endpoint,params={},headers={})=>{
    try {
        const url = new URL(endpoint);
        Object.keys(params).forEach((key)=>{
            if(params[key]!==undefined && params[key]!=null){
                url.searchParams.append(key,params[key])
            }
        })
        const options = {
            method,
            headers: {
                ...headers
            }
        };
        if(['POST','PUT','PATCH','DELETE'].includes(method) && data){
            options.headers["Content-Type"] = 'application/json';
            options.body = JSON.stringify(data)
        }
        const response = await fetch(url,options)
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error:", error);
        return {
            message: "Something went wrong",
            error
        };
    }
}