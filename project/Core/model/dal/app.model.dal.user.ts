export class User {

    constructor(email, passwordHash, salt) {
        this.Email = email;
        this.PasswordHash = passwordHash;
        this.Salt = salt;
    }

    public Email: string;
    
    public PasswordHash: string;
    
    public Salt: string;

}