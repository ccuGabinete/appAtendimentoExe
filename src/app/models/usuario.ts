export class Usuario {
    login: number = null;
    senha: string = "";

    isLoggedIn(): boolean {
        return true;
    }

    getUsuario(){
        return this.login;
    }

    setUsuario(login: number){
        this.login = login;
    }
}