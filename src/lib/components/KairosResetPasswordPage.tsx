import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Asumiendo react-router-dom para leer token y navegar
import { Button } from './ui/button'; // Ajustar ruta si es necesario
import { Input } from './ui/input';   // Ajustar ruta si es necesario
import { Label } from './ui/label';   // Ajustar ruta si es necesario
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card'; // Para envolver el formulario

// URL del backend de Kairos Creative (leer de variable de entorno si es posible)
const KAIROS_BACKEND_URL = process.env.REACT_APP_KAIROS_WEBHOOK_URL || 'https://kairos-creative-webhook-lf2l.onrender.com'; // Asegúrate de que esta URL sea correcta

export function KairosResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Para redirigir después del reseteo
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      console.log("Reset token found in URL:", resetToken.substring(0, 10) + "...");
    } else {
      setError('No reset token found in URL. Please use the link from your email.');
      console.error("No reset token found in URL.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (!token) {
      setError('Missing reset token.');
      setIsLoading(false);
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      console.log(`Attempting to reset password with token ${token.substring(0, 10)}...`);
      const response = await fetch(`${KAIROS_BACKEND_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Failed to reset password.');
      }

      console.log("Password reset successful:", result.message);
      setMessage('Password has been reset successfully! Redirecting to login...');
      // Redirigir a la página de login de Kairos Creative (o a donde corresponda) después de un breve retraso
      setTimeout(() => {
        // Idealmente, la URL de la app Chainlit debería venir de una variable de entorno
        const chainlitAppUrl = process.env.REACT_APP_KAIROS_CHAINLIT_URL || 'https://kairos-creative-app-pr6z7.onrender.com';
        window.location.href = chainlitAppUrl; // Redirección simple
        // O usar navigate('/kairos-login') si hay una ruta interna en VanguarHive
      }, 3000);

    } catch (err: any) {
      console.error("Password reset failed:", err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Kairos Creative Password</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}

          {!token && !error && (
             <p>Loading token...</p>
          )}

          {token && !message && ( // Mostrar formulario solo si hay token y no hay mensaje de éxito
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
         {message && (
             <CardFooter>
                 <p className="text-sm text-gray-500 dark:text-gray-400">You will be redirected shortly...</p>
             </CardFooter>
         )}
      </Card>
    </div>
  );
}
