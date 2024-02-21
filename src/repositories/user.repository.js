export class UserRepositories {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findByEmail = async (email) => {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return findUser;
  };
  // 유저 생성
  createUser = async (email, password, name) => {
    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    return createdUser;
  };
}
