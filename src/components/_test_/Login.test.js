import { fireEvent, render, screen, waitFor, wait, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from '../Login';
import axios from "axios";
import nock from 'nock';
import { NavigationClient } from "@azure/msal-browser";


describe('Test login component', () => {

    beforeAll(() => {
        jest.spyOn(axios,'get').mockResolvedValueOnce({id: 1, firstName: 'sri'}).
        mockRejectedValueOnce('Something went wrong')
    });

    afterAll(cleanup);

    it('checking post', () => {
        jest.spyOn(axios,'post').mockResolvedValueOnce({id: 1, firstName: 'sri'}).
        mockRejectedValueOnce('Something went wrong')
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