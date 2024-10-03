import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppService } from './app.service';
import { IUser } from '../model/user.interface';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a user', () => {
    const mockUser: IUser = {
      id: 1,
      userName: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      department: 'Marketing',
    };

    service.createUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should update a user', () => {
    const mockUser: IUser = {
      id: 1,
      userName: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      department: 'Marketing',
    };

    service.updateUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/users/${mockUser.id}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

  it('should get user list', () => {
    const mockUsers: IUser[] = [
      {
        id: 1,
        userName: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        isAdmin: false,
        department: 'Marketing',
      },
      {
        id: 2,
        userName: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        isAdmin: true,
        department: 'Management',
      },
    ];

    service.getUserList().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get a user by ID', () => {
    const mockUser: IUser = {
      id: 1,
      userName: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      department: 'Engineering',
    };

    service.getUserBy(mockUser.id).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/users/${mockUser.id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should delete a user by ID', () => {
    const mockUser: IUser = {
      id: 1,
      userName: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      isAdmin: false,
      department: 'Engineering',
    };

    service.deleteUserBy(mockUser.id).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/users/${mockUser.id}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockUser);
  });
});
