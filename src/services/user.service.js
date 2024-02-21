export class UserServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
}

//회원가입
createUser = async(email,password,name) => {
    const isExistUser = await this.userRepository.findByEmail(email);
    if(!isExistUser){
        throw new Error("이미 존재하는 이메일 입니다.");
    }

    const createdUser = await this.userRepository.createUser(
        email,
        password,
        name,
    );
    return{
        id:createdUser.id,
        email:createdUser.email,
        name:createdUser.name,
    };
}
