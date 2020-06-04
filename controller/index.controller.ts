
import {Request, Response, Body} from 'https://deno.land/x/oak/mod.ts'
import {v4} from 'https://deno.land/std/uuid/mod.ts'
import {User} from '../model/user.ts'


let users:User[]= [
    {
        id:v4.generate(),
        name:'leonardo'
    },
    {
        id:v4.generate(),
        name:'fazt'
    }
]


export const getUsers =({response}:{response:Response})=>{
   response.body ={
       message:'successfully query',
       users
   }
}
export const getOneUsers =({request,response,params}:{request:Request, response:Response, params:{id:string}})=>{
    const id =  params.id
    const user = users.find(u => u.id === id)
    
    if(user) {
        response.status=200
        response.body ={
            message:'you get a single user',
            user
        }
    }else {
        response.status=404
        response.body ={
            message:'user not found',
            
        } 
    }
   
}

export const createUser = async ({request, response}:{request:Request, response:Response})=>{
    const {value}:Body = await request.body();
    if(!request.hasBody){
        response.status=500
        response.body ={
            message:'the field name is required'
          }
          return;

    }
     users.push({
         id:v4.generate(),
         name:value.name
     })
     response.status=200
     response.body ={
        message:'user was added successfully'
      }
}

export const deleteUser =({params,response}:{params:{id:string},response:Response})=>{
     const id = params.id;
     users= users.filter(u=> u.id != id)
     response.status=200
     response.body ={
        message:'user was removed successfully'
      }
}

export const updateUser = async ({request, response, params}:{request:Request, response:Response,params:{id:string}})=>{
    const id = params.id;
    const body = await request.body();
    const updateUser = body.value;

    const userFound = users.find(user=>user.id===id);
    if(!userFound){
        response.status=404,
        response.body={
            message:'user not found'
        }
    }else{
        users = users.map(user=>user.id===id?{...user, ...updateUser}:user)
        response.status=200,
        response.body={
            message:'user was updated'
        }
    }

//   otroa forna de updated 
    // const {value}:Body = await request.body()
    // const userFound = users.find(u =>u.id === id)
    //  if(!userFound){
    //      response.status=404
    //      response.body= {
    //          message:'user no found'
    //      }
    //  }else{
    //      users.map(user=>{
    //        if(user.id===id){
    //            user.name=value.name
    //        }
    //    })
    //    response.status=200
    //      response.body= {
    //          message:'user updated'
    //      }
    //  }
    
}

