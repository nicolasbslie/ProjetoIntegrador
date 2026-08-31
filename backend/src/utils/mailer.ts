import nodemailer from "nodemailer";

// Só cria o transporter de verdade se as credenciais de email estiverem
// configuradas no .env. Assim o projeto continua funcionando em ambiente
// de desenvolvimento mesmo sem um SMTP configurado (o link é impresso no
// console do servidor nesse caso).
const emailConfigurado = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

const transporter = emailConfigurado
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    : null;

export async function enviarEmailRedefinicaoSenha(
    destinatario: string,
    nome: string,
    link: string
) {

    if (!transporter) {
        console.log("\n===== EMAIL DE REDEFINIÇÃO DE SENHA (SMTP não configurado - modo dev) =====");
        console.log(`Para: ${destinatario}`);
        console.log(`Link de redefinição: ${link}`);
        console.log("=============================================================================\n");
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"EcoSpending" <${process.env.EMAIL_USER}>`,
        to: destinatario,
        subject: "Redefinição de senha - EcoSpending",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
                <h2 style="color:#1fa463;">EcoSpending</h2>
                <p>Olá, ${nome}!</p>
                <p>Recebemos uma solicitação para redefinir a sua senha. Clique no botão abaixo para criar uma nova senha:</p>
                <p style="text-align:center; margin: 24px 0;">
                    <a href="${link}" style="background:#1fa463; color:#fff; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; display:inline-block;">
                        Redefinir senha
                    </a>
                </p>
                <p>Ou copie e cole o link a seguir no seu navegador:</p>
                <p><a href="${link}">${link}</a></p>
                <p style="color:#666; font-size:13px;">Esse link expira em 1 hora. Se você não solicitou essa alteração, apenas ignore este email.</p>
            </div>
        `
    });
}
