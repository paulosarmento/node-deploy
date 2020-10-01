import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });


  it('should be able update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Paulo Sarmento',
      email: 'fulano@example.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Paulo Jr',
      email: 'fulano1@example.com',
    });

    expect(updatedUser.name).toBe('Paulo Jr');
    expect(updatedUser.email).toBe('fulano1@example.com');

  });
  it('shold not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Paulo Sarmento',
      email: 'fulano@example.com',
      password: '123456',
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'fulano@example.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Paulo Sarmento',
        email: 'fulano@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Paulo Sarmento',
      email: 'fulano@example.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Paulo Jr',
      email: 'fulano1@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');

  });
  it('should not be able to update the password without old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Paulo Sarmento',
      email: 'fulano@example.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Paulo Jr',
        email: 'fulano1@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });
  it('should not be able to update the password with wrong old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Paulo Sarmento',
      email: 'fulano@example.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Paulo Jr',
        email: 'fulano1@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });
});