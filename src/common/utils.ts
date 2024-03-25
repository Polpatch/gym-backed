import { AxiosRequestConfig } from "axios";
import { request } from "express";

const getJwt = (request: Request) => {
    return request.headers['authorization']?.split(' ')[1];

}


const createHeader = (jwt: string): AxiosRequestConfig => {
    return {
      headers:{ 
        'authorization': `Bearer ${jwt}`
      }
    }
  }

export {getJwt, createHeader};