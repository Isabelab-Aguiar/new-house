import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface SendInviteEmailParams {
  guestName: string;
  guestEmail: string;
  giftName: string;
  giftPrice: number;
  paymentMethod: "pix" | "stripe";
  transactionId: string;
}

export async function sendGiftConfirmationEmail({
  guestName,
  guestEmail,
  giftName,
  giftPrice,
  paymentMethod,
  transactionId,
}: SendInviteEmailParams) {
  const paymentLabel = paymentMethod === "pix" ? "Pix" : "Cartão de Crédito";

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Presente Confirmado – Chá de Casa Nova</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;min-height:100vh;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6B4423 0%,#A67C52 100%);border-radius:16px 16px 0 0;padding:48px 40px;text-align:center;">
              <p style="color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:4px;text-transform:uppercase;margin:0 0 16px;">Chá de Casa Nova</p>
              <h1 style="color:#FDFAF6;font-size:36px;margin:0;font-weight:300;letter-spacing:-0.5px;">Isabella <span style="color:#E8C89A">&</span> Rafael</h1>
              <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:16px 0 0;">Sábado, 12 de Abril · 15h00</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:48px 40px;border-left:1px solid #EDE3D4;border-right:1px solid #EDE3D4;">
              <p style="color:#A67C52;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Presente Confirmado 🎁</p>
              <h2 style="color:#2C1A0E;font-size:28px;font-weight:600;margin:0 0 24px;">Que lindo, ${guestName}!</h2>
              <p style="color:#5C3D2E;font-size:16px;line-height:1.7;margin:0 0 32px;">
                Que alegria ter você nessa celebração! Seu presente foi confirmado com sucesso e vai fazer parte do nosso novo lar. Muito obrigada por esse carinho imenso! 💛
              </p>

              <!-- Gift Card -->
              <div style="background:#FAF7F2;border:1px solid #EDE3D4;border-radius:12px;padding:24px;margin-bottom:32px;">
                <p style="color:#A67C52;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Detalhes do Presente</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color:#2C1A0E;font-size:18px;font-weight:600;">${giftName}</td>
                    <td align="right" style="color:#6B4423;font-size:18px;font-weight:700;">R$ ${giftPrice.toFixed(2).replace(".", ",")}</td>
                  </tr>
                  <tr>
                    <td style="padding-top:8px;color:#8B5E3C;font-size:13px;">Pagamento via ${paymentLabel}</td>
                    <td align="right" style="padding-top:8px;color:#A67C52;font-size:12px;">ID: ${transactionId.slice(0, 12)}...</td>
                  </tr>
                </table>
              </div>

              <!-- Event Info -->
              <div style="background:linear-gradient(135deg,#FAF7F2,#F5EFE6);border:1px solid #EDE3D4;border-radius:12px;padding:24px;margin-bottom:32px;">
                <p style="color:#A67C52;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Informações do Evento</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:6px 0;">
                    <span style="color:#8B5E3C;font-size:13px;">📅</span>
                    <span style="color:#2C1A0E;font-size:14px;margin-left:8px;">Sábado, 12 de Abril de 2025 às 15h00</span>
                  </td></tr>
                  <tr><td style="padding:6px 0;">
                    <span style="color:#8B5E3C;font-size:13px;">📍</span>
                    <span style="color:#2C1A0E;font-size:14px;margin-left:8px;">Rua das Acácias, 128 – Apto 72</span>
                  </td></tr>
                  <tr><td style="padding:6px 0;">
                    <span style="color:#8B5E3C;font-size:13px;">🏙️</span>
                    <span style="color:#2C1A0E;font-size:14px;margin-left:8px;">Jardim Europa, São Paulo – SP</span>
                  </td></tr>
                  <tr><td style="padding:6px 0;">
                    <span style="color:#8B5E3C;font-size:13px;">👗</span>
                    <span style="color:#2C1A0E;font-size:14px;margin-left:8px;">Dress code: Casual Elegante</span>
                  </td></tr>
                </table>
              </div>

              <p style="color:#8B5E3C;font-size:14px;text-align:center;font-style:italic;margin:0;">
                "Uma casa se faz com tijolos e argamassa, mas um lar se constrói com amor e carinho."
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#2C1A0E;border-radius:0 0 16px 16px;padding:32px 40px;text-align:center;">
              <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">
                Com amor, Isabella &amp; Rafael ✨<br/>
                <span style="font-size:11px;margin-top:8px;display:block;">Este é um e-mail automático, não é necessário responder.</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "convite@resend.dev",
    to: guestEmail,
    subject: `🏠 Seu presente foi confirmado! – Chá de Casa Nova`,
    html,
  });
}
