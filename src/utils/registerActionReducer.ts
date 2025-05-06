type Step = 'email' | 'password' | 'confirmPassword' | 'profile';

type Profile = {
  bio: string;
  avatar: string;
};

interface State {
  step: Step;
  email: string;
  password: string;
  confirmPassword: string;
  profile: Profile;
}

type Action =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_PROFILE'; payload: Profile }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'RESET' };

// const [state, dispatch] = useReducer(
//   registerActionReducer,
//   registerFormInitialState,
// );

export const registerFormInitialState: State = {
  step: 'email',
  email: '',
  password: '',
  confirmPassword: '',
  profile: {
    bio: '',
    avatar: '',
  },
};

export const registerActionReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'NEXT_STEP':
      return {
        ...state,
        step:
          state.step === 'email'
            ? 'password'
            : state.step === 'password'
              ? 'confirmPassword'
              : state.step === 'confirmPassword'
                ? 'profile'
                : state.step,
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        step:
          state.step === 'password'
            ? 'email'
            : state.step === 'confirmPassword'
              ? 'password'
              : state.step === 'profile'
                ? 'confirmPassword'
                : state.step,
      };
    case 'RESET':
      return registerFormInitialState;
    default:
      throw new Error('Unknown action type');
  }
};
