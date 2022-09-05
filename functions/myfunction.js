exports.handler = async ()=>{
console.log("function ran");
    return {
        statusCcode:200,
        body:JSON.stringify({name:"raj",age:"24"})
    }
}