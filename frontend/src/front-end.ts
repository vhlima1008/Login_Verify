/// <reference types="vite/client" />

// Configurações
const BACKEND_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface JwtResponse { access_token: string }
interface Profile { userId: string; email: string }

type View = "register" | "login" | "profile";

// Variáveis de Módulo
let view: View = "register";
let token: string | null = localStorage.getItem("token");
let profile: Profile | null = null;
let message: string | null = null;

// Função utilitária de fetch
async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, init);
  if (!res.ok) throw new Error((await res.text()) || res.statusText);
  return res.json() as Promise<T>;
}

// Handlers principais
async function handleRegister(email: string, password: string) {
  try {
    await api("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    message = "Usuário registrado! Faça login.";
    view = "login";
  } catch (err) {
    message = `Erro ao registrar: ${(err as Error).message}`;
  }
  render();
}

async function handleLogin(email: string, password: string) {
  try {
    const { access_token } = await api<JwtResponse>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", access_token);
    token = access_token;
    await loadProfile();
    view = "profile";
    message = null;
  } catch {
    message = "Credenciais inválidas";
  }
  render();
}

async function loadProfile() {
  if (!token) return;
  try {
    profile = await api<Profile>("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    message = "Token expirado ou inválido. Faça login novamente.";
    logout();
  }
}

function logout() {
  localStorage.removeItem("token");
  token = null;
  profile = null;
  view = "login";
  render();
}

// Render
function render() {
  const app = document.getElementById("app")!;
  app.innerHTML = `
    <div style="max-width:360px;margin:40px auto;font-family:Arial, sans-serif;">
      <h2 style="text-align:center">Demo JWT</h2>
      ${view !== "profile" ? formHTML() : profileHTML()}
      ${message ? `<p style='color:crimson;margin-top:12px'>${message}</p>` : ""}
    </div>`;

  if (view !== "profile") {
    document.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;
      view === "register" ? handleRegister(email, password) : handleLogin(email, password);
    });
    document.getElementById("switchLink")?.addEventListener("click", (e) => {
      e.preventDefault();
      view = view === "register" ? "login" : "register";
      message = null;
      render();
    });
  } else {
    document.getElementById("logout")?.addEventListener("click", logout);
  }
}

function formHTML() {
  return `
    <form>
      <label>Email</label>
      <input id="email" type="email" required style="width:100%;padding:8px;margin:8px 0" />
      <label>Senha</label>
      <input id="password" type="password" required style="width:100%;padding:8px;margin:8px 0" />
      <button type="submit" style="width:100%;padding:10px;margin-top:12px">${view === "register" ? "Registrar" : "Login"}</button>
      <p style="text-align:center;margin-top:12px">
        ${view === "register" ? "Já tem conta?" : "Não tem conta?"}
        <a href="#" id="switchLink">${view === "register" ? " Entrar" : " Registrar"}</a>
      </p>
    </form>`;
}

function profileHTML() {
  return profile
    ? `<div>
         <h3>Bem‑vindo, ${profile.email}</h3>
         <p>ID: ${profile.userId}</p>
         <button id="logout" style="padding:10px;margin-top:12px">Sair</button>
       </div>`
    : "<p>Carregando…</p>";
}

// Inicialização
(async function init() {
  if (token) await loadProfile();
  render();
})();

import "./front-end";
