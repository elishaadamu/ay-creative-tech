export const sessionManager = {
  startSession(userData) {
    const sessionData = {
      ...userData,
      loginTime: new Date().getTime(),
      expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours
    };
    secureStorage.set("session", sessionData);
  },

  checkSession() {
    const session = secureStorage.get("session");
    if (!session) return false;

    if (new Date().getTime() > session.expiresAt) {
      this.endSession();
      return false;
    }
    return true;
  },

  endSession() {
    secureStorage.clear();
  },
};
