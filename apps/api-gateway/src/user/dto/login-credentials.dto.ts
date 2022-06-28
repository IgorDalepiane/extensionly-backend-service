export class LoginCredentialsDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  toString() {
    return JSON.stringify({
      email: this.email,
      password: this.password,
    });
  }
}
