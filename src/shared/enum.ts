export enum EnumErrors {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
  MISSING_PASSWORD = 'auth/missing-password',
  INVALID_LOGIN_CREDENTIAL = 'auth/invalid-login-credentials'
}

export enum EnumImportance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum MyRoutes {
  LOGIN_ROUTE = '/login',
  REGISTER_ROUTE = '/register',
  HOME_ROUTE = '/',
  Ai_ROUTE = '/ai',
  PROJECT_ROUTE = '/project/:projectId',
  NOTFOUND_ROUTE = '*'
}
