import { fireEvent, render, screen, waitFor, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from '../Login';
import axios from "axios";
import nock from 'nock';
import { NavigationClient } from "@azure/msal-browser";


describe('Test login component', () => {

//       const fetchData = async () => {
//     const response = await fetch(
//         'https://api.fake-rest.refine.dev/users/1'
//     );
//     const result = await response.json();
//     return result;
//   };
//   React.useEffect(() => {
//     (async () => {
//         const data = await fetchData();
//         setState(data);
//     })();
// }, []);



//     afterAll(() => {
//         nock.cleanAll();
//         nock.restore();
//     });
//     beforeAll(() => {
//       nock('https://api.fake-rest.refine.dev')
//       .get('/users')  
//     });
//     it('testing with query params', () => {
//         nock('https://api.fake-rest.refine.dev')
//         .get('/users')
//         .query({
//             username: 'test',
//             status: true,
//         })
//         .reply(200);
//     });
//     it('checks if returned data from API rendered into component', async () => {
//         nock('https://api.fake-rest.refine.dev')
//             .defaultReplyHeaders({
//                 'access-control-allow-origin': '*',
//             })
//             .get('/users/1')
//             .reply(200, {
//                 id: 1,
//                 firstName: "Sri",
//             });
//         render(<Login />);
//         await waitFor(() => {
//             expect(screen.getByText(/Sri/i)).toBeInTheDocument();
//         });
//     });
//     it('checks if returned data from API rendered into component', async () => {
//         nock('https://api.fake-rest.refine.dev')
//         .post('/users', {
//             username: 'test',
//             status: true,
//         })
//         .reply(201);
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

    it('checks if returned data from API rendered into component', async () => {
      const spy =jest.spyOn(Login, 'fetchData').mockImplementation(() => {
        return promise.Resolve({id: 1, firstName: 'sri'});
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

    test("clicking on the OK button to delete", async () => {
        render(<Login />);
        await screen.findByRole("heading", { name: /sri/i });
        await screen.findAllByRole("button", { name: "Delete" });
        
        fireEvent.click(
          screen.getAllByRole("button", { name: "Delete" })[0]
        );
        fireEvent.click(await screen.findByText("OK"));
        
        await waitForElementToBeRemoved(() =>
          screen.queryByRole("heading", { name: /sri/i })
        );
    });
});