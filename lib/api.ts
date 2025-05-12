const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function post<T>(endpoint: string, data: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  return res.json();
}

export async function verifyOtp<T>(email: string, otp: string): Promise<T> {
  const res = await fetch(
    `${BASE_URL}/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to verify OTP: ${res.statusText}`);
  }

  return res.json();
}
