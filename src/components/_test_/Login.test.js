import { fireEvent, render, screen, waitFor, wait, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from '../Login';
import axios from "axios";


describe('Test login component', () => {

    beforeAll(() => {
        jest.spyOn(axios,'get').mockResolvedValueOnce({id: 1, firstName: 'sri'}).
        mockRejectedValueOnce('Something went wrong')
    });

    afterAll(cleanup);


    test('two buttons should present', async () => {
        render(<Login />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList.length).toBe(2);
    });

    test("password input should have type password", () => {
        render(<Login />);
        const password = screen.getByPlaceholderText("Password");
        expect(password).toHaveAttribute("type","password");
    });


    test("email input field should accept email", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        userEvent.type(email,"sri@gmail.com");
        expect(email.value).toMatch("sri@gmail.com");
    });

    test("User with invalid mail id should not be able to login", async () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        userEvent.type(email,"sri.com");
        const submitButton = screen.getByTestId("submit");
        userEvent.click(submitButton);
        expect(screen.getByText(/not valid/i)).toBeInTheDocument();
    });

    test("admin should be able to login the form and reset password", async () => {
        render(<Login />);
        const submitButton = screen.getByTestId("submit");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const passwordInputNode = screen.getByPlaceholderText("Password");

        userEvent.type(emailInputNode, "sriadmin@gmail.com");
        userEvent.type(passwordInputNode, "123445");
        userEvent.click(submitButton);
        const userInfo = screen.getByText("sriadmin@gmail.com");
        const buttonList = await screen.findAllByRole("button");

        expect(userInfo).toBeInTheDocument();
        expect(buttonList.length).toBe(3);
    });

    test("user mailId should not be able to access password reset button", async () => {
        render(<Login />);
        const submitButton = screen.getByTestId("submit");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const passwordInputNode = screen.getByPlaceholderText("Password");

        userEvent.type(emailInputNode, "sriuser@gmail.com");
        userEvent.type(passwordInputNode, "123445");
        userEvent.click(submitButton);
        const userInfo = screen.getByText("sriuser@gmail.com");
        const buttonList = await screen.findAllByRole("button");

        expect(userInfo).toBeInTheDocument();
        expect(buttonList.length).toBe(3);
        const passwordResetButton = screen.getByTestId("passwordResetDisabled");
        expect(passwordResetButton).toHaveAttribute("disabled");
    });

    test("user with personal mailId shouldn't see the option to reset password", async () => {
        render(<Login />);
        const submitButton = screen.getByTestId("submit");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const passwordInputNode = screen.getByPlaceholderText("Password");

        userEvent.type(emailInputNode, "sri@gmail.com");
        userEvent.type(passwordInputNode, "123445");
        userEvent.click(submitButton);
        const userInfo = screen.getByText("sri@gmail.com");
        const buttonList = await screen.findAllByRole("button");

        expect(userInfo).toBeInTheDocument();
        expect(buttonList.length).toBe(2);
    });

    test("user should be able to reset the form", () => {
        const {getByTestId} = render(<Login />);
        const resetButton = getByTestId("reset");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const passwordInputNode = screen.getByPlaceholderText("Password");

        fireEvent.click(resetButton);
        expect(emailInputNode.value).toMatch("");
        expect(passwordInputNode.value).toMatch("");
    });
});