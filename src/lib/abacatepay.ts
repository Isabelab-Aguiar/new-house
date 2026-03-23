// AbacatePay API Client
// Docs: https://abacatepay.com/docs

const ABACATEPAY_BASE_URL = "https://api.abacatepay.com/v1";

interface AbacatePayPixPaymentRequest {
  amount: number; // valor em centavos
  externalId: string;
  description: string;
  customer: {
    name: string;
    email: string;
    taxId?: string;
    phone?: string;
  };
  expiresIn?: number; // segundos
}

interface AbacatePayPixPaymentResponse {
  id: string;
  status: "PENDING" | "COMPLETED" | "EXPIRED" | "FAILED";
  amount: number;
  pixCode: string;
  pixQrCode: string;
  expiresAt: string;
  externalId: string;
}

export async function createPixPayment(
  data: AbacatePayPixPaymentRequest
): Promise<AbacatePayPixPaymentResponse> {
  const res = await fetch(`${ABACATEPAY_BASE_URL}/billing/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ABACATEPAY_API_KEY}`,
    },
    body: JSON.stringify({
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [
        {
          externalId: data.externalId,
          name: data.description,
          description: data.description,
          quantity: 1,
          price: data.amount,
        },
      ],
      customer: data.customer,
      metadata: {
        externalId: data.externalId,
      },
      completionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/obrigado`,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`AbacatePay error: ${error}`);
  }

  const json = await res.json();
  return json.data;
}

export async function getPixPaymentStatus(
  paymentId: string
): Promise<{ status: string }> {
  const res = await fetch(`${ABACATEPAY_BASE_URL}/billing/check-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ABACATEPAY_API_KEY}`,
    },
    body: JSON.stringify({ id: paymentId }),
  });

  if (!res.ok) throw new Error("Failed to check payment status");
  const json = await res.json();
  return json.data;
}
