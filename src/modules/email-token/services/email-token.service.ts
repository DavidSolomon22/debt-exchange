import { Injectable, Inject, forwardRef } from '@nestjs/common'
import {EmailTokenRepository} from '../repositories'
import { EmailToken } from '../schemas';
import {EmailTokenCreateDto} from '../dtos'
import {UserService} from 'src/modules/user/services'
@Injectable()
export class EmailTokenService {
    constructor(
        private emailTokenRepository: EmailTokenRepository,
        @Inject(forwardRef(()=>UserService))
        private userService: UserService) {}
    async createEmailToken(email: string):Promise<EmailToken>{
        return await this.emailTokenRepository.createEmailToken(
            this.createTokenPayload(email)
        )
    };
    async confirmUser (id: string, email: string):Promise<Boolean>{
        const emailToken = await this.emailTokenRepository.getByIdAndEmail(id,email)
        if(emailToken){
            this.userService.confirmEmail(email)
            await this.emailTokenRepository.deleteToken(emailToken._id)
            return true
        } else {
            return false
        }
    }

    async resetPassword (id: string, email: string):Promise<Boolean>{
        const emailToken = await this.emailTokenRepository.getByIdAndEmail(id,email)
        if(emailToken){
            this.userService.resetPassword(email)
            await this.emailTokenRepository.deleteToken(emailToken._id)
            return true
        } else {
            return false
        }
    }
    private createTokenPayload(email: string):EmailTokenCreateDto{
        return{
            email,
            hash: this.makeid(30),
            validTo: this.makeExpirationTime()
        }
    }
    makeid(length:number):string {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    private makeExpirationTime():Date {
        let expiration = new Date()
        expiration.setTime(expiration.getTime() + (600 * 1000));
        return expiration
    }

}