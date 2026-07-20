import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put } from "@vercel/blob";

const ALLOWED_CATEGORIES = ["corretores", "depoimentos", "imoveis"] as const;
type Category = (typeof ALLOWED_CATEGORIES)[number];

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Uploads de servidor na Vercel têm limite de 4.5MB de corpo de request.
const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4MB

// A Vercel nomeia o token do Blob como BLOB_READ_WRITE_TOKEN por padrão, mas
// se o store foi conectado com um prefixo (ex: "PHOTOS"), vira
// PHOTOS_READ_WRITE_TOKEN. Aqui achamos o token seja qual for o nome.
function findBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith("READ_WRITE_TOKEN") && value) return value;
  }
  return undefined;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const category = formData.get("category");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo não enviado." }, { status: 400 });
  }

  if (typeof category !== "string" || !ALLOWED_CATEGORIES.includes(category as Category)) {
    return NextResponse.json({ error: "Categoria inválida." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Formato não suportado. Envie JPG, PNG ou WebP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Imagem maior que 4MB. Reduza e tente de novo." }, { status: 400 });
  }

  const filename = `${category}/${crypto.randomUUID()}.${extension}`;
  const blobToken = findBlobToken();

  // Em produção (Vercel), guarda no Vercel Blob — armazenamento permanente.
  // Em desenvolvimento sem token, cai no disco local pra não travar o dev.
  if (blobToken) {
    try {
      const blob = await put(filename, file, {
        access: "public",
        contentType: file.type,
        token: blobToken,
      });
      return NextResponse.json({ url: blob.url });
    } catch (error) {
      console.error("Erro ao enviar para o Vercel Blob:", error);
      return NextResponse.json(
        {
          error:
            "Falha ao guardar a imagem no armazenamento. Confira se o store de fotos (Blob) é PÚBLICO e está conectado ao projeto, e refaça o deploy.",
        },
        { status: 500 },
      );
    }
  }

  // Sem token de Blob: em produção (Vercel) o disco é somente-leitura, então
  // isso só funciona em desenvolvimento local. Em produção, devolve erro claro.
  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "Armazenamento de fotos não configurado. Crie um Blob Store PÚBLICO na Vercel, conecte ao projeto e refaça o deploy.",
      },
      { status: 500 },
    );
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads", category);
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const localName = filename.split("/")[1];
    await writeFile(path.join(uploadDir, localName), buffer);
    return NextResponse.json({ url: `/uploads/${category}/${localName}` });
  } catch (error) {
    console.error("Erro ao salvar imagem localmente:", error);
    return NextResponse.json(
      { error: "Falha ao salvar a imagem." },
      { status: 500 },
    );
  }
}
