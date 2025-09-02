import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "./LoginPage";

// Mock LanguageProvider
jest.mock('./LanguageProvider', () => ({
  useLanguage: () => ({
    t: {
      back_to_home: "Voltar",
      login_title: "Entrar",
      login_subtitle: "Acesse sua conta",
      login_email: "Email",
      login_email_placeholder: "Digite seu email",
      login_password: "Senha",
      login_password_placeholder: "Digite sua senha",
      login_forgot_password: "Esqueceu a senha?",
      login_submit: "Entrar",
      login_loading: "Entrando...",
      login_social_divider: "Ou continue com",
      login_apple: "Entrar com Apple",
      login_google: "Entrar com Google",
      login_no_account: "Não tem conta?",
      login_create_account: "Criar conta",
      login_terms_text: "Ao continuar você aceita os",
      login_terms: "Termos",
      login_privacy: "Política de Privacidade",
    }
  })
}));

describe("LoginPage", () => {

  test("renderiza campos e botões principais", () => {
    render(<LoginPage onBack={() => {}} />);
    expect(screen.getByText("Entrar")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  test("permite digitar email e senha", async () => {
    render(<LoginPage onBack={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    await userEvent.type(emailInput, "teste@teste.com");
    await userEvent.type(passwordInput, "123456");
    expect(emailInput).toHaveValue("teste@teste.com");
    expect(passwordInput).toHaveValue("123456");
  });

  test("alternar visibilidade da senha usando aria-label", async () => {
    render(<LoginPage onBack={() => {}} />);
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");

    // botão deve ter aria-label
    const toggleButton = screen.getByLabelText("Mostrar senha");
    expect(passwordInput).toHaveAttribute("type", "password");
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // volta ao tipo password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("mostra loading ao enviar formulário", async () => {
    render(<LoginPage onBack={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /Entrar/i });

    await userEvent.type(emailInput, "teste@teste.com");
    await userEvent.type(passwordInput, "123456");
    fireEvent.click(submitButton);

    expect(await screen.findByText("Entrando...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument());
  });

  test("chama onBack ao clicar em 'Voltar'", () => {
    const onBackMock = jest.fn();
    render(<LoginPage onBack={onBackMock} />);
    fireEvent.click(screen.getByRole("button", { name: /Voltar/i }));
    expect(onBackMock).toHaveBeenCalled();
  });

  test("validação de email e senha obrigatórios", async () => {
    render(<LoginPage onBack={() => {}} />);
    const submitButton = screen.getByRole("button", { name: /Entrar/i });
    fireEvent.click(submitButton);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  test("não aceita email inválido", async () => {
    render(<LoginPage onBack={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /Entrar/i });

    await userEvent.type(emailInput, "email-invalido");
    await userEvent.type(passwordInput, "123456");
    fireEvent.click(submitButton);

    expect(emailInput).toBeInvalid();
  });

  test("não quebra ao clicar em 'Esqueceu a senha?'", () => {
    render(<LoginPage onBack={() => {}} />);
    const forgotButton = screen.getByRole("button", { name: /Esqueceu a senha/i });
    fireEvent.click(forgotButton);
    expect(forgotButton).toBeInTheDocument();
  });

});
