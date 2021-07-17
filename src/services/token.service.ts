export class TokenService {
   static keyName = 'token'

   static get() {
      return localStorage.getItem(this.keyName)
   }

   static set(token: any) {
      localStorage.setItem(this.keyName, token)
   }

   static delete() {
      localStorage.removeItem(this.keyName)
   }
}
