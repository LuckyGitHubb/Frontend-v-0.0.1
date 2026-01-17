export const globalApi = async(method,data,endpoint,headers={})=>{
    try {
        const options = {
            method,
            headers:{}
        }
        if(["POST","PUT","PATCH","DELETE"].includes(method) && data){
            options.headers["Content-Type"]="application/json"
            options.body=JSON.stringify(data)
        }
        const response = await fetch(endpoint,options)
        const res = await response.json()
        return res;
    } catch (error) {
        console.log(error)
        return error;   
    }
}