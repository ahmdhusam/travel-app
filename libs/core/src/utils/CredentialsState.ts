export class CredentialsState {
  private expiresIn: Date = new Date();

  isExpired(): boolean {
    return this.expiresIn.getTime() < Date.now();
  }

  extendExpirationBy(seconds: number): void {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + seconds - 5);
    this.expiresIn = currentDate;
  }
}
