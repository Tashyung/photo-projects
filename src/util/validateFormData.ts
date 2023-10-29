const validateFormData = (formData: FormData): ValidationResult => {
  let errors: ValidationErrors = {};
  let isValid: boolean = true;

  // 이메일 유효성 검사
  if (formData.email.trim() === '') {
    errors.email = '이메일을 입력해주세요';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
    isValid = false;
  }

  // 비밀번호 유효성 검사
  if (formData.password.trim() === '') {
    errors.password = '비밀번호를 입력해주세요';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    isValid = false;
  }

  // 비밀번호 일치 검사
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다';
    isValid = false;
  }

  // 닉네임 유효성 검사
  if (formData.nickname.trim() === '') {
    errors.nickname = '닉네임을 입력해주세요';
    isValid = false;
  } else if (formData.nickname.length < 2 || formData.nickname.length > 20) {
    errors.nickname = '닉네임은 2자에서 20자 사이어야 합니다';
    isValid = false;
  } else if (!/^[a-zA-Z0-9가-힣]+$/.test(formData.nickname)) {
    errors.nickname = '닉네임은 특수문자를 포함할수없습니다';
    isValid = false;
  }

  return { errors, isValid };
};

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  nickname: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  nickname?: string;
}

interface ValidationResult {
  errors: ValidationErrors;
  isValid: boolean;
}

export default validateFormData;
