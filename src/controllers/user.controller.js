// UserController 클래스 정의 후 usersService라는 서비스를 의존성으로 받아 생성하기
export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
}

// 회원가입 컨트롤러
signUp = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm, name } = req.body;
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
    const createUser = await this.userService.createUser(email, password, name);

    return res.status(201).json({ data: createUser });
  } catch (err) {
    next(err);
  }
};

// 로그인 컨트롤러
signIN = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: '이메일은 필수값 입니다.' });
    }
    if (!password) {
      return res.status(400).json({ message: '비밀번호는 필수값 입니다.' });
    }

    const logInUser = await this.userService.logInUser(email, password);
    res.cookie('accessToken', logInUser.accessToken);
    res.cookie('refreshToken', logInUser.refreshToken);
    return res.status(201).json({ data: logInUser });
  } catch (err) {
    next(err);
  }
};

// 내정보 조회 컨트롤러
myInfo = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await this.userService.getUserById(id);

    return res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};
