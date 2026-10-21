import { useEffect, useRef, useState } from "react";
import { FileUp, Headset, MailCheck, PackageCheck } from "lucide-react";
import { Footer, SiteHeader } from "@/components/dossenza-ui";
import { PHARMA_EMAIL, PHARMA_FORM_ENDPOINT, asset } from "@/data/produtos";
import { createPedido, newId, pharmaBackendEnabled, saveQuizLead, uploadPrescription, type LeadPayload } from "@/lib/pharma-backend";
import { useHead } from "@/lib/head";

/* Página Dossenza Pharma — mesmo layout e fluxo da /pharma da Bersch Health, com a estética Dossenza. */

const MAX_FILE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];
const FRETES = {
  pac: { label: "PAC", preco: "R$ 22,50" },
  sedex: { label: "Sedex", preco: "R$ 37,50" },
} as const;
const MARQUEE = ["Manipulação certificada", "Atendimento rápido", "Envio nacional", "Fórmula sob medida", "Resposta em até 24h úteis"];

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}
function isValidCPF(v: string) {
  return onlyDigits(v).length === 11;
}
function isValidRG(v: string) {
  return v.trim().length >= 5;
}
function isValidDate(v: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v);
  return !isNaN(d.getTime()) && d < new Date();
}

export function PharmaPage() {
  useHead({
    title: "Dossenza Pharma — Sua fórmula, manipulada com cuidado",
    description:
      "Anexe sua receita e receba um orçamento personalizado, manipulado com a precisão e o cuidado da Dossenza. Resposta em até 24h úteis.",
    path: "/pharma",
    ogImage: "/og-image.jpg",
  });

  const [open, setOpen] = useState(false);
  const marquee = [...MARQUEE, ...MARQUEE];

  return (
    <div className="min-h-screen bg-dz-creme text-dz-tinta">
      {/* Faixa do topo (como no cabeçalho da Bersch no /pharma) + cabeçalho padrão */}
      <div className="sticky top-0 z-40">
        <div className="flex h-7 items-center justify-center overflow-hidden bg-dz-espinafre px-4">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {marquee.map((t, i) => (
              <span key={i} className="label-caps text-[10px] text-dz-trigo sm:text-xs" aria-hidden={i >= MARQUEE.length}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <SiteHeader />
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <section className="grid items-center gap-6 rounded-[1.75rem] border border-dz-trigo/60 bg-dz-areia/70 p-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:p-10">
          <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
            <span className="label-caps inline-flex items-center gap-2 rounded-full border border-dz-trigo/60 bg-white/60 px-3 py-1 text-[0.66rem] text-dz-espinafre">
              <span className="h-1.5 w-1.5 rounded-full bg-dz-trigo" aria-hidden="true" />
              Resposta em até 24h úteis
            </span>
            <h1 className="mt-4 text-4xl font-medium leading-[1.05] text-dz-espinafre md:text-5xl">
              Cuidado <span className="italic text-dz-terracota">exclusivo.</span>
            </h1>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-dz-tinta/80">
              Anexe sua receita e receba um orçamento personalizado, manipulado com a precisão e o cuidado da nossa
              farmácia parceira.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group mt-6 inline-flex w-full max-w-[396px] items-center justify-center gap-3 rounded-full bg-dz-espinafre px-6 py-3.5 text-sm font-semibold text-dz-creme transition-colors hover:bg-dz-musgo"
            >
              Anexar minha receita
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <img
              src={asset("/photos/pharma-frasco.webp")}
              alt="Frasco personalizado Dossenza Pharma"
              width={583}
              height={1000}
              className="h-auto max-h-[300px] w-auto object-contain drop-shadow-2xl md:max-h-[400px]"
            />
          </div>
        </section>

        <section className="mt-12">
          <p className="label-caps text-center text-dz-espinafre">Como funciona</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                i: FileUp,
                t: "Envie sua receita",
                d: "Anexe o PDF ou imagem da prescrição médica, ou digite a fórmula, se preferir. Seu documento fica em ambiente privado.",
              },
              {
                i: MailCheck,
                t: "Receba seu orçamento",
                d: "Nossa farmácia parceira analisa e retorna com o valor personalizado em até 24h úteis, pelo e-mail informado.",
              },
              {
                i: PackageCheck,
                t: "Manipulação e envio",
                d: "Após aprovação e pagamento, sua fórmula é manipulada e enviada para todo o Brasil por PAC ou Sedex, com código de rastreio.",
              },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl bg-dz-espinafre p-6 text-center text-dz-creme">
                <s.i className="mx-auto h-6 w-6 text-dz-trigo" aria-hidden="true" />
                <h3 className="mt-2 text-2xl font-medium text-dz-creme">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dz-creme/70">{s.d}</p>
              </div>
            ))}
          </div>
          <a
            href="/sac"
            className="mt-3 flex items-center justify-center gap-3 rounded-2xl bg-dz-espinafre px-6 py-4 text-dz-creme transition-colors hover:bg-dz-musgo"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-dz-creme/10 text-dz-trigo">
              <Headset className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="block font-semibold">Ainda com dúvidas?</span>
              <span className="block text-sm text-dz-creme/70">Fale com a nossa equipe</span>
            </span>
          </a>
        </section>
      </main>

      <Footer />


      {open && <PharmaModal onClose={() => setOpen(false)} />}
    </div>
  );
}

type Step = 1 | 2 | 3 | "done";

function PharmaModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviadoPor, setEnviadoPor] = useState<"endpoint" | "mailto">("endpoint");

  const [rxMode, setRxMode] = useState<"upload" | "typed">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [typed, setTyped] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);

  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [nasc, setNasc] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [referencia, setReferencia] = useState("");
  const [frete, setFrete] = useState<keyof typeof FRETES>("pac");
  const [filePath, setFilePath] = useState<string | null>(null);

  /* Backend central (como na Bersch): sessão do rascunho, id fixo do pedido (reenviar após falha não
     duplica) e arquivo já enviado numa tentativa anterior. */
  const sessionIdRef = useRef<string>(newId());
  const pedidoIdRef = useRef<string>(newId());
  const uploadedRef = useRef<{ file: File; path: string } | null>(null);

  function snapshot(extra: Partial<LeadPayload> = {}): LeadPayload {
    return {
      session_id: sessionIdRef.current,
      last_step: step === "done" ? 4 : step,
      prescription_type: rxMode,
      prescription_file_path: filePath,
      prescription_text: rxMode === "typed" ? typed : null,
      nome,
      email,
      whatsapp,
      rg,
      cpf,
      data_nascimento: nasc,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf: uf.toUpperCase(),
      referencia,
      frete,
      ...extra,
    };
  }

  // Autosave do rascunho (carrinho abandonado) assim que houver qualquer dado digitado.
  const savedRef = useRef("");
  useEffect(() => {
    if (!pharmaBackendEnabled || step === "done") return;
    const anyData = [nome, email, whatsapp, rg, cpf, nasc, cep, logradouro, numero, bairro, cidade, uf, typed].some((v) => v.trim().length > 0);
    if (!anyData) return;
    const payload = snapshot();
    const key = JSON.stringify(payload);
    if (key === savedRef.current) return;
    const t = setTimeout(() => {
      savedRef.current = key;
      void saveQuizLead(payload);
    }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, email, whatsapp, rg, cpf, nasc, cep, logradouro, numero, complemento, bairro, cidade, uf, referencia, frete, typed, rxMode, filePath, step]);

  async function lookupCep(v: string) {
    const clean = v.replace(/\D/g, "");
    setCep(clean);
    if (clean.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const d = (await r.json()) as { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string };
      if (d.erro) return;
      setLogradouro(d.logradouro ?? "");
      setBairro(d.bairro ?? "");
      setCidade(d.localidade ?? "");
      setUf(d.uf ?? "");
    } catch {
      /* preenchimento manual */
    }
  }

  function next1() {
    setError(null);
    if (rxMode === "upload" && !file) return setError("Anexe a receita (PDF ou imagem) ou escolha 'Digitar fórmula'.");
    if (rxMode === "typed" && typed.trim().length < 5) return setError("Digite a fórmula (mínimo 5 caracteres).");
    setStep(2);
  }
  function next2() {
    setError(null);
    if (nome.trim().length < 2) return setError("Digite seu nome completo.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("E-mail inválido.");
    if (onlyDigits(whatsapp).length < 10) return setError("Informe seu WhatsApp com DDD.");
    if (!consent) return setError("É necessário concordar com o uso dos dados para prosseguir.");
    setStep(3);
  }

  async function submit() {
    setError(null);
    if (!isValidRG(rg)) return setError("RG inválido.");
    if (!isValidCPF(cpf)) return setError("CPF inválido: deve ter 11 dígitos.");
    if (!isValidDate(nasc)) return setError("Data de nascimento inválida.");
    if (onlyDigits(cep).length !== 8) return setError("CEP inválido: deve ter 8 dígitos.");
    if (!logradouro.trim() || !numero.trim() || !bairro.trim() || !cidade.trim() || !uf.trim())
      return setError("Preencha endereço, número, bairro, cidade e UF.");
    if (uf.trim().length !== 2) return setError("UF deve ter 2 letras (ex.: RS).");
    if (numero.trim().length > 20) return setError("Número muito longo: use o complemento para o restante.");

    setSubmitting(true);
    const campos: [string, string][] = [
      ["Tipo de receita", rxMode === "upload" ? "Arquivo anexado" : "Fórmula digitada"],
      ["Fórmula digitada", rxMode === "typed" ? typed.trim() : "—"],
      ["Nome", nome.trim()],
      ["E-mail", email.trim()],
      ["WhatsApp", whatsapp.trim()],
      ["RG", rg.trim()],
      ["CPF", cpf.trim()],
      ["Data de nascimento", nasc],
      ["CEP", onlyDigits(cep)],
      ["Endereço", `${logradouro.trim()}, ${numero.trim()}${complemento.trim() ? ` — ${complemento.trim()}` : ""}`],
      ["Bairro", bairro.trim()],
      ["Cidade/UF", `${cidade.trim()} / ${uf.trim().toUpperCase()}`],
      ["Referência", referencia.trim() || "—"],
      ["Frete", `${FRETES[frete].label} — ${FRETES[frete].preco}`],
    ];
    const subject = `[Dossenza Pharma] Nova solicitação — ${nome.trim()}`;
    try {
      if (pharmaBackendEnabled) {
        // 1) receita → storage (só uma vez por arquivo); 2) pedido → banco; 3) rascunho marcado como completo
        let path: string | null = null;
        if (rxMode === "upload" && file) {
          if (uploadedRef.current?.file === file) {
            path = uploadedRef.current.path;
          } else {
            path = await uploadPrescription(file);
            uploadedRef.current = { file, path };
          }
          setFilePath(path);
        }
        await createPedido({
          id: pedidoIdRef.current,
          prescription_type: rxMode,
          prescription_file_path: path,
          prescription_text: rxMode === "typed" ? typed.trim() : null,
          nome: nome.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim() || null,
          rg: rg.trim(),
          cpf: cpf.trim(),
          data_nascimento: nasc,
          cep: onlyDigits(cep),
          logradouro: logradouro.trim(),
          numero: numero.trim(),
          complemento: complemento.trim() || null,
          bairro: bairro.trim(),
          cidade: cidade.trim(),
          uf: uf.trim().toUpperCase(),
          referencia: referencia.trim() || null,
          frete,
        });
        await saveQuizLead(snapshot({ status: "completo", last_step: 4, prescription_file_path: path }));
        setEnviadoPor("endpoint");
      } else if (PHARMA_FORM_ENDPOINT) {
        const fd = new FormData();
        fd.append("_subject", subject);
        campos.forEach(([k, v]) => fd.append(k, v));
        if (rxMode === "upload" && file) fd.append("receita", file, file.name);
        const res = await fetch(PHARMA_FORM_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("Não foi possível enviar. Confira os dados e tente novamente. Se persistir, fale conosco no WhatsApp.");
        setEnviadoPor("endpoint");
      } else {
        // Sem backend configurado: abre o e-mail do cliente com a solicitação preenchida.
        const body = [
          ...campos.map(([k, v]) => `${k}: ${v}`),
          rxMode === "upload" && file ? `\n(Anexe a receita a este e-mail: ${file.name})` : "",
        ].join("\n");
        window.location.href = `mailto:${PHARMA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setEnviadoPor("mailto");
      }
      setStep("done");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Não foi possível enviar. Confira os dados e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileSelect(f: File | null) {
    setError(null);
    if (!f) return setFile(null);
    if (!ACCEPTED_TYPES.includes(f.type) && !/\.(pdf|jpe?g|png|webp|heic)$/i.test(f.name)) {
      setFile(null);
      return setError("Formato não aceito. Envie PDF, JPG, PNG, WebP ou HEIC.");
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setFile(null);
      return setError(`Arquivo muito grande: o limite é ${MAX_FILE_MB} MB.`);
    }
    setFile(f);
  }

  const toggle = (active: boolean) =>
    `flex-1 rounded-full border py-2 text-sm transition-colors ${active ? "border-dz-espinafre bg-dz-espinafre text-dz-creme" : "border-dz-linha text-dz-tinta hover:bg-dz-areia"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dz-tinta/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-dz-linha px-6 py-4">
          <p className="label-caps text-dz-espinafre">{step === "done" ? "Enviado" : `Etapa ${step} de 3`}</p>
          <button type="button" onClick={onClose} className="text-xl leading-none text-dz-tinta/50 hover:text-dz-tinta" aria-label="Fechar">
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-dz-espinafre">Sua receita</h2>

              <div className="flex gap-2">
                <button type="button" onClick={() => setRxMode("upload")} className={toggle(rxMode === "upload")}>
                  Anexar arquivo
                </button>
                <button type="button" onClick={() => setRxMode("typed")} className={toggle(rxMode === "typed")}>
                  Digitar fórmula
                </button>
              </div>

              {rxMode === "upload" ? (
                <div>
                  <label className="block cursor-pointer rounded-lg border border-dashed border-dz-linha p-8 text-center transition-colors hover:border-dz-trigo">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                    />
                    {file ? (
                      <div className="text-sm">
                        <p className="truncate font-medium text-dz-tinta">{file.name}</p>
                        <p className="mt-1 text-xs text-dz-tinta/60">{(file.size / 1024 / 1024).toFixed(2)} MB · clique para trocar</p>
                      </div>
                    ) : (
                      <div className="text-sm text-dz-tinta/60">
                        <p>Clique para anexar a receita</p>
                        <p className="mt-1 text-xs">PDF, JPG, PNG, WebP ou HEIC · até {MAX_FILE_MB} MB</p>
                      </div>
                    )}
                  </label>
                  {file && (
                    <button type="button" onClick={() => handleFileSelect(null)} className="mt-2 text-xs text-dz-tinta/60 underline hover:text-dz-tinta">
                      Remover arquivo
                    </button>
                  )}
                </div>
              ) : (
                <textarea
                  rows={6}
                  maxLength={10000}
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder="Digite a fórmula prescrita…"
                  className="w-full rounded-md border border-dz-linha bg-dz-creme/40 p-3 text-sm outline-none focus:border-dz-trigo"
                />
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-dz-espinafre">Seu contato</h2>
              <Field label="Nome completo" value={nome} onChange={setNome} autoComplete="name" />
              <Field label="E-mail" value={email} onChange={setEmail} type="email" autoComplete="email" />
              <Field label="WhatsApp (com DDD)" value={whatsapp} onChange={setWhatsapp} type="tel" autoComplete="tel" />

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-dz-linha p-3">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-dz-espinafre" />
                <span className="text-xs leading-relaxed text-dz-tinta/70">
                  Concordo com o uso dos meus dados para contato e orçamento desta solicitação, conforme a LGPD.
                </span>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h2 className="mb-2 text-2xl font-medium text-dz-espinafre">Endereço e envio</h2>
              <div className="grid grid-cols-2 gap-3">
                <Field label="RG" value={rg} onChange={setRg} />
                <Field label="CPF" value={cpf} onChange={setCpf} inputMode="numeric" />
              </div>
              <Field label="Data de nascimento" value={nasc} onChange={setNasc} type="date" />
              <Field label="CEP" value={cep} onChange={lookupCep} inputMode="numeric" />
              <Field label="Endereço" value={logradouro} onChange={setLogradouro} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Número" value={numero} onChange={setNumero} />
                <Field label="Complemento" value={complemento} onChange={setComplemento} />
              </div>
              <Field label="Bairro" value={bairro} onChange={setBairro} />
              <div className="grid grid-cols-[1fr_80px] gap-3">
                <Field label="Cidade" value={cidade} onChange={setCidade} />
                <Field label="UF" value={uf} onChange={(v) => setUf(v.toUpperCase())} maxLength={2} />
              </div>
              <Field label="Referência" value={referencia} onChange={setReferencia} />

              <div>
                <span className="label-caps text-dz-espinafre">Frete</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(Object.keys(FRETES) as (keyof typeof FRETES)[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setFrete(k)}
                      className={`rounded-md border p-3 text-left text-sm transition-colors ${
                        frete === k ? "border-dz-espinafre bg-dz-trigo/30" : "border-dz-linha hover:bg-dz-areia"
                      }`}
                    >
                      <div className="font-medium text-dz-tinta">{FRETES[k].label}</div>
                      <div className="text-xs text-dz-tinta/60">{FRETES[k].preco}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="py-8 text-center">
              <h2 className="text-3xl font-medium text-dz-espinafre">Recebemos sua solicitação</h2>
              <p className="mt-4 text-dz-tinta/70">
                {enviadoPor === "endpoint" ? (
                  "Nossa equipe vai analisar sua receita e retornar com o orçamento em até 24h úteis, pelo e-mail que você informou."
                ) : (
                  <>
                    Abrimos o seu aplicativo de e-mail com a solicitação preenchida: é só enviar
                    {rxMode === "upload" && file ? " e anexar a receita" : ""}. Se ele não abriu, escreva para{" "}
                    <a href={`mailto:${PHARMA_EMAIL}`} className="font-semibold text-dz-espinafre underline underline-offset-4">
                      {PHARMA_EMAIL}
                    </a>
                    . Retornamos com o orçamento em até 24h úteis.
                  </>
                )}
              </p>
              <button type="button" onClick={onClose} className="mt-8 rounded-full bg-dz-espinafre px-6 py-3 text-sm text-dz-creme hover:bg-dz-musgo">
                Fechar
              </button>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-dz-pitaya">
              {error}
            </p>
          )}
        </div>

        {step !== "done" && (
          <div className="flex justify-between border-t border-dz-linha px-6 py-4">
            <button
              type="button"
              onClick={() => (step === 1 ? onClose() : setStep(((step as number) - 1) as Step))}
              className="text-sm text-dz-tinta/60 hover:text-dz-tinta"
            >
              {step === 1 ? "Cancelar" : "Voltar"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => (step === 1 ? next1() : step === 2 ? next2() : submit())}
              className="rounded-full bg-dz-espinafre px-6 py-2.5 text-sm text-dz-creme hover:bg-dz-musgo disabled:opacity-60"
            >
              {step === 3 ? (submitting ? "Enviando…" : "Enviar solicitação") : "Continuar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="label-caps text-dz-espinafre">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-dz-linha bg-dz-creme/40 px-3 py-2 text-sm outline-none focus:border-dz-trigo"
        {...rest}
      />
    </label>
  );
}
