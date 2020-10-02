import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersSerice from './ListProvidersSerice';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersSerice;
describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersSerice(fakeUsersRepository);
  });


  it('should be able to list to providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'Fulano Doe',
      email: 'fulanodoe@example.com',
      password: '123456',
    });

    const users2 = await fakeUsersRepository.create({
      name: 'Fulano Trê',
      email: 'fulanotre@example.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Fulano Qua',
      email: 'fulanoqua@example.com',
      password: '123456',
    });



    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, users2]);


  });

});
