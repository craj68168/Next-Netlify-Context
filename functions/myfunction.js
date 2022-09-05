exports.handler = async ()=>{
console.log("function ran");
    return {
        statusCode:200,
        body:JSON.stringify({name:"raj",age:"24"})
    }
}