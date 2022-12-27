import { isAllLetters, isValidEmail } from './validators.js';

/**
 * The username property has to be a string that only contains of letters, and is at least 3 characters long
 * The email property has to be a valid email address.
 * The age property has to be a number, and has to be at least 18
 * When a property is retrieved, change the output to ${new Date()} | The value of ${property}} is ${target[property]}. For example if we get user.name, it needs to log 2022-05-31T15:29:15.303Z | The value of name is John
 */

const user = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  age: 42,
  email: 'john@doe.com',
};

const userProxy = new Proxy(user, {
  get: (target, property) => {
    console.log(
      `${new Date()}| The value of the ${property} is ${Reflect.get(
        target,
        property
      )}`
    );
  },
  set: (target, property, value) => {
    if (property === 'username') {
      if (!isAllLetters(value)) {
        throw new Error('username must be letters');
      }

      if (value.length < 3) {
        throw new Error('username must be atleast 3 letters');
      }
    }

    if (property === 'email') {
      if (!isValidEmail(value)) {
        throw new Error('email is not valid Email');
      }
    }

    if (property === 'age') {
      if (typeof value !== 'number') {
        throw new Error('age should be a valid age');
      }

      if (value < 18) {
        throw new Error('user should be atleast 18 years of age');
      }
    }

    return Reflect.set(target, property, value);
  },
});

userProxy.email = 'j@gmial.com';
userProxy.username = 'hhaf';
userProxy.age = 19;
console.log(user);
