import { fireEvent, render, screen, waitFor, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from '../Login';
import nock from 'nock';


describe('Test login component', () => {
    it('checks if returned data from API rendered into component', async () => {
        nock('https://api.fake-rest.refine.dev')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/users/1')
            .reply(200, {
                id: 1,
                firstName: "Sri",
            });
        render(<Login />);
        await waitFor(() => {
            expect(screen.getByText(/Sri/i)).toBeInTheDocument();
        });
    });
    test('two buttons should present', async () => {
        render(<Login />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList.length).toBe(2);
    });

    test("should failed on email validation", () => {
        const testEmail = "sri.com";
        expect(validateEmail(testEmail)).not.toBe(true); 
    });

    test("email input field should accept email", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        userEvent.type(email,"sri@gmail.com");
        expect(email.value).toMatch("sri@gmail.com");
    });

    test("passport input should have type passport", () => {
        render(<Login />);
        const password = screen.getByPlaceholderText("Password");
        expect(password).toHaveAttribute("type","password");
    });

    test("should be able to login the form", () => {
        render(<Login />);
        const submitButton = screen.getByTestId("submit");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const passwordInputNode = screen.getByPlaceholderText("Password");
        userEvent.type(emailInputNode, "sri@gmail.com");
        userEvent.type(passwordInputNode, "123445");

        userEvent.click(submitButton);
        const userInfo = screen.getByText("sri@gmail.com");
        expect(userInfo).toBeInTheDocument();
    })

    test("should be able to reset the form", () => {
        const {getByTestId} = render(<Login />);
        const resetButton = getByTestId("reset");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const passwordInputNode = screen.getByPlaceholderText("Password");

        fireEvent.click(resetButton);
        expect(emailInputNode.value).toMatch("");
        expect(passwordInputNode.value).toMatch("");
    });
});