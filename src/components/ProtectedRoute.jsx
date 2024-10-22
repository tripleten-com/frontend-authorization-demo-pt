import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";
  // Se o usuário estiver logado, vamos redirecioná-lo
  // para longe das rotas anônimas.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  // Se o usuário não estiver logado e tentar acessar uma rota que
  // requer autorização, vamos redirecioná-lo para a rota /login.
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Caso contrário, exiba os elementos filhos da rota atual.
  return children;
}
