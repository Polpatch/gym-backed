import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
    private readonly secretKey: Buffer = crypto.createHash('sha256').update(this.configService.get('SECRET_KEY')).digest();
    private readonly secretjwt: Buffer = crypto.createHash('sha256').update(this.configService.get('SECRET_JWT')).digest();
    private readonly IV_SECRET = this.configService.get('IV_INIT');
    private iv = Buffer.from(this.IV_SECRET, 'hex');

    constructor(private readonly configService: ConfigService){}

    // Funzione per criptare il JWT di Strapi
    encryptJwt(strapiJwt: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.secretKey, this.iv);

        let encryptedStrapiJwt = cipher.update(strapiJwt, 'utf-8', 'hex');
        encryptedStrapiJwt += cipher.final('hex');
        return jwt.sign({ strapiJwt: encryptedStrapiJwt }, this.secretjwt);
    }

    // Funzione per decodificare il JWT criptato e ottenere il JWT di Strapi
    decryptJwt(encryptedJwt: string): string {
        try {
            const payload = jwt.verify(encryptedJwt, this.secretjwt) as any;
            const decipher = crypto.createDecipheriv('aes-256-cbc', this.secretKey, this.iv);
            
            let decryptedStrapiJwt = decipher.update(payload.strapiJwt, 'hex', 'utf-8');
            decryptedStrapiJwt += decipher.final('utf-8');
            return decryptedStrapiJwt;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}