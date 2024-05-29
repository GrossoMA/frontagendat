// Esta url luego se debe modificar con la de la api real, esta es solo la de prueba

export const API_BASE_URL = "https://grosso4le.pythonanywhere.com";
// "http://127.0.0.1:4500/";
// 'https://m4legrosso.pythonanywhere.com/'

export const ENDPOINTS = {
  login: "login",
  signIn: "users",
  eventos: (userId) => `user/${userId}/eventos`, // Agregamos un endpoint dinámico
  municipios: (userId) => `user/${userId}/municipios`,
  localidades: (userId) => `user/${userId}/localidades`,
};
