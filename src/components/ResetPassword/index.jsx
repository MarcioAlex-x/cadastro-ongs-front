import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({ icon: "error", title: "Token inválido", text: "O token não foi encontrado." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Senha redefinida!",
          text: "Agora você pode fazer login com sua nova senha.",
        }).then(() => navigate("/login"));
      } else {
        Swal.fire({ icon: "error", title: "Erro", text: data.message || "Não foi possível redefinir a senha." });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Erro", text: "Ocorreu um problema ao redefinir a senha." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <form onSubmit={handleSubmit} className="border rounded p-4 w-100 p-sm-5 bg-light">
        <h2>Redefinir senha</h2>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Nova senha</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir senha"}
        </button>
      </form>
    </div>
  );
};
