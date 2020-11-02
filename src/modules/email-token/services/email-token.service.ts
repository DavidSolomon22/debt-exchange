import { Injectable } from '@nestjs/common'
import {EmailTokenRepository} from '../repositories'
import { EmailToken } from '../schemas';
import {EmailTokenCreateDto} from '../dtos'

@Injectable()
export class EmailTokenService {
    constructor(private emailTokenRepository: EmailTokenRepository) {}
    async createEmailToken(email: string):Promise<EmailToken>{
        return await this.emailTokenRepository.createEmailToken(
            this.createTokenPayload(email)
        )
    };
    createTokenPayload(email: string):EmailTokenCreateDto{
        return{
            email,
            hash: makeid(30),
            validTo: makeExpirationTime()
        }
    }

}

const makeid = (length:number):string => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const makeExpirationTime = ():Date => {
    let expiration = new Date()
    expiration.setTime(expiration.getTime() + (600 * 1000));
    return expiration
}