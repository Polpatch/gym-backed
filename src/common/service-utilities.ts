import axios from "axios";
import { createHeader } from "./utils";
import { HttpException, HttpStatus } from "@nestjs/common";

async function create<T>(data: T, jwt: string, endpoint: string, name_service: string) {
    try {
        const response = await axios.post(
        `${endpoint}/api/${name_service}`,
        { data },
        createHeader(jwt),
        );

        console.log(`Richiesta eseguita con successo: ${response.data.id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Errore durante l'inserimento del dato: ${error.message}`);
        throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
  

async function findAll(jwt: string, endpoint: string, name_service: string, getAll: boolean = false) {
try{
    const config = {
        params: getAll ? { populate: '*' } : {},
        ...createHeader(jwt)
    }

    const response = await axios.get(
        `${endpoint}/api/${name_service}`,
        config
    )

    return response.data.data;

} catch (error) {
    console.error(`Errore durante l'inserimento del dato: ${error.message}`);
    throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
}
}

async function findOne(id: number, jwt: string, endpoint: string, name_service: string, getAll: boolean = false) {
try{
    const config = {
        params: getAll ? { populate: '*' } : {},
        ...createHeader(jwt)
    }

    const response = await axios.get(
        `${endpoint}/api/${name_service}/${id}`,
        createHeader(jwt),
    )

    return response.data.data;

} catch (error) {
    if(error.response.status === HttpStatus.NOT_FOUND)
    throw new HttpException(`Record ${id} non trovato`, HttpStatus.NOT_FOUND);

    console.error(`Errore durante l'inserimento del dato: ${error.message}`);
    throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
}
}

async function update<T>(id: number, data: T, jwt: string, endpoint: string, name_service: string) {
    try {
    const response = await axios.put(
        `${endpoint}/api/${name_service}/${id}`,
        { data },
        createHeader(jwt),
    );

    console.log(`Richiesta eseguita con successo: ${response.data.id}`);
    return response.data.data;
    } catch (error) {
    if(error.response.status === HttpStatus.NOT_FOUND)
        throw new HttpException(`Record ${id} non trovato`, HttpStatus.NOT_FOUND);
    
    console.error(`Errore durante l'inserimento del dato: ${error.message}`);
    throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function remove(id: number, jwt: string, endpoint: string, name_service: string) {
    try{
        const response = await axios.delete(
        `${endpoint}/api/${name_service}/${id}`,
        createHeader(jwt),
        )

        return response.data.data;

    } catch (error) {
        if(error.response.status === HttpStatus.NOT_FOUND)
        throw new HttpException(`Record ${id} non trovato`, HttpStatus.NOT_FOUND);

        console.error(`Errore durante l'inserimento del dato: ${error.message}`);
        throw new HttpException('Errore interno del server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {create, findAll, findOne, update, remove};