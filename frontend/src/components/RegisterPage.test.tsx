import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterPage } from "./RegisterPage";

// Mock LanguageProvider
jest.mock('./LanguageProvider', () => ({
  useLanguage: () => ({
    t: {
      back_to_home: "Voltar",
      register_title: "Criar Conta",
      register_subtitle: "Preencha os dados abaixo",
      register_name: "Nome",
      register_name_placeholder: "Digite seu nome",
      register_email: "Email",
      register_email_placeholder: "Digite seu email",
      register_phone: "Telefone",
      register_phone_placeholder: "Digite seu telefone",
      register_password: "Senha",
      register_password_placeholder: "Digite sua senha",
      register_confirm_password: "Confirmar Senha",
      register_confirm_password_placeholder: "Confirme sua senha",
      register_submit: "Cadastrar",
      register_loading: "Cadastrando...",
      register_terms_text: "Ao continuar você aceita os",
      register_terms: "Termos",
      register_privacy: "Política de Privacidade",
    }
  })
}));

describe("RegisterPage", () => {

  test("renderiza campos e botões principais", () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cadastrar/i })).toBeInTheDocument();
  });

  test("permite digitar nos inputs", async () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    const nameInput = screen.getByPlaceholderText("Digite seu nome");
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const phoneInput = screen.getByPlaceholderText("Digite seu telefone");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmInput = screen.getByPlaceholderText("Confirme sua senha");

    await userEvent.type(nameInput, "Giovana");
    await userEvent.type(emailInput, "teste@teste.com");
    await userEvent.type(phoneInput, "11999999999");
    await userEvent.type(passwordInput, "123456");
    await userEvent.type(confirmInput, "123456");

    expect(nameInput).toHaveValue("Giovana");
    expect(emailInput).toHaveValue("teste@teste.com");
    expect(phoneInput).toHaveValue("11999999999");
    expect(passwordInput).toHaveValue("123456");
    expect(confirmInput).toHaveValue("123456");
  });

  test("alternar visibilidade da senha e confirmar senha", () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmInput = screen.getByPlaceholderText("Confirme sua senha");

    const togglePassword = screen.getByLabelText("Mostrar senha");
    const toggleConfirm = screen.getByLabelText("Mostrar senha");

    fireEvent.click(togglePassword);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(togglePassword);
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleConfirm);
    expect(confirmInput).toHaveAttribute("type", "text");
    fireEvent.click(toggleConfirm);
    expect(confirmInput).toHaveAttribute("type", "password");
  });

  test("validação de email e senha obrigatórios", async () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });
    fireEvent.click(submitButton);

    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  test("não aceita email inválido ou telefone inválido", async () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const phoneInput = screen.getByPlaceholderText("Digite seu telefone");
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    await userEvent.type(emailInput, "email-invalido");
    await userEvent.type(phoneInput, "abc123");
    fireEvent.click(submitButton);

    expect(emailInput).toBeInvalid();
    expect(phoneInput).toBeInvalid();
  });

  test("não permite senhas diferentes", async () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmInput = screen.getByPlaceholderText("Confirme sua senha");
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    await userEvent.type(passwordInput, "123456");
    await userEvent.type(confirmInput, "654321");
    fireEvent.click(submitButton);

    expect((passwordInput as HTMLInputElement).value).not.toEqual((confirmInput as HTMLInputElement).value);
  });

  test("mostra loading ao enviar formulário válido", async () => {
    render(<RegisterPage onBack={() => {}} onLoginClick={() => {}} />);
    const nameInput = screen.getByPlaceholderText("Digite seu nome");
    const emailInput = screen.getByPlaceholderText("Digite seu email");
    const phoneInput = screen.getByPlaceholderText("Digite seu telefone");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmInput = screen.getByPlaceholderText("Confirme sua senha");
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    await userEvent.type(nameInput, "Giovana");
    await userEvent.type(emailInput, "teste@teste.com");
    await userEvent.type(phoneInput, "11999999999");
    await userEvent.type(passwordInput, "123456");
    await userEvent.type(confirmInput, "123456");

    fireEvent.click(submitButton);

    expect(await screen.findByText("Cadastrando...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: /Cadastrar/i })).toBeInTheDocument());
  });

  test("chama onBack ao clicar em 'Voltar'", () => {
    const onBackMock = jest.fn();
    render(<RegisterPage onBack={onBackMock} onLoginClick={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /Voltar/i }));
    expect(onBackMock).toHaveBeenCalled();
  });

});
