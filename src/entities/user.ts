export class User {
  constructor(
    public userId: string,
    public login: string,
    public password: string,
    public role: string,
    public bossId: string | null
  ) {}
}
