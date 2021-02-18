import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AutheticateUsersService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';



describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();


        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            );
        const authenticateUsers  =  new AutheticateUsersService(
            fakeUsersRepository,
             fakeHashProvider,);
       
            await createUser.execute({
            name: 'Danylo Oliveira',
            email: 'john@example.com',
            password: '123456',

            });
                
        const response = await authenticateUsers.execute({
            email: 'john@example.com',
            password: '123456',
            });

      await   expect(response).toHaveProperty('token');
            
    });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUsers  =  new AutheticateUsersService(
            fakeUsersRepository,
             fakeHashProvider,
             );
       
     await    expect(authenticateUsers.execute({
                email: 'john@example.com',
                password: '123456',
                })).rejects.toBeInstanceOf(AppError)        
    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();


        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            );
        const authenticateUsers  =  new AutheticateUsersService(
            fakeUsersRepository,
             fakeHashProvider,);
       
            await createUser.execute({
            name: 'Danylo Oliveira',
            email: 'john@example.com',
            password: '123456',

            });
                
      await   expect(authenticateUsers.execute({
                email: 'john@example.com',
                password: 'wrong-password',
                })).rejects.toBeInstanceOf(AppError);
            
    });
    
    
});