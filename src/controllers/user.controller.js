// UserController 클래스 정의 후 usersService라는 서비스를 의존성으로 받아 생성하기
export class UserController {
  constructor(usersService) {
    this.usersService = usersService;
  }
}

// 회원가입 컨트롤러
signUp = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm, userName } = req.body;
    // 유효성 검사하기
    if (!email) {
      return res.status(400).json({ message: '이메일은 필수값입니다.' });
    }
    if (!password) {
      return res.status(400).json({ message: '비밀번호는 필수값입니다.' });
    }
    if (!passwordConfirm) {
      return res.status(400).json({ message: '비밀번호 확인은 필수값입니다.' });
    }
    if (!name) {
      return res.status(400).json({ message: '이름은 필수값입니다.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: '비밀번호는 최소 6자 이상입니다.' });
    }
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: '비밀번호와 비밀번호 확인값이 일치하지 않습니다.' });
    }
    // 유저 생성
    const createUser = await this.usersService.createUser(email, password, userName);

    return res.status(201).json({ data: createUser });
  } catch (err) {
    next(err);
  }
};
