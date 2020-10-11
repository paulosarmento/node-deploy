import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;
describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
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
