import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
export const AuthService = {
    async signIn<T extends {email: string, password: string}>(data: T): Promise<User | null> {
        const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
            email: data.email,
            password: data.password
        });
        return result.user;
    },

    async loginEmail<T extends {email: string, password: string}>(data: T): Promise<User | null> {
        const result = await FirebaseAuthentication.signInWithEmailAndPassword({
            email: data.email,
            password: data.password
        });
        return result.user;
    },

    async loginGoogle(): Promise<User | null> {
        const result = await FirebaseAuthentication.signInWithGoogle();
        return result.user;
    },

    async getCurrentUser(): Promise<User | null> {
        const { user } = await FirebaseAuthentication.getCurrentUser();
        return user;
    },

    async logout(): Promise<void> {
        await FirebaseAuthentication.signOut();
    }

};