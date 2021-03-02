import firebase from 'firebase/app';
import ForgotPassword from '../../user/ForgotPassword';


jest.mock('../../firebase-client-config', () => ({
    auth: {
        sendPasswordResetEmail: jest
            .fn()
            .mockImplementation((email) =>
                Promise.resolve({
                    email: email
                })
            )
    }
}));

describe("Forgot Password Component Test",() => {
    
    test("test password reset email", async () => {
        const res = await firebase.auth().sendPasswordResetEmail('example@gmail.com')
        .then(function() {
            return ("Email Sent!");
          }).catch(function(error) {
            return("Email Not Sent!");
          });
        expect(res).toEqual("Email Sent!");
    });
});