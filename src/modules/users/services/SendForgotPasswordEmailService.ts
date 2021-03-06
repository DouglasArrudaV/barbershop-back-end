import {injectable, inject} from 'tsyringe';

//import User from '../infra/typeorm/entities/user'
//import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({email}: IRequest): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(!checkUserExists) {
            throw new AppError('User does not exists');
        }

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }
}

export default SendForgotPasswordEmailService;