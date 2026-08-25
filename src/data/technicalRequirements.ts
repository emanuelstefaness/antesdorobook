import type { GuiaTecnicoMicrobit } from "./microbitTechnicalGuides";

export type TechnicalRequirement = {
  kind: "placa" | "conexao" | "componente" | "alimentacao" | "condicional" | "opcional";
  item: string;
  quantity: string;
  purpose: string;
  caution: string;
};

export function guideUsesRadio(guide: GuiaTecnicoMicrobit) {
  return guide.blocks.some((block) => block.category === "Rádio") || /\bradio\./.test(guide.code);
}

export function guideProducesSound(guide: GuiaTecnicoMicrobit) {
  return guide.blocks.some(
    (block) => block.category === "Música" && /\b(?:tocar|iniciar melodia)\b/i.test(block.block),
  );
}

function externalPowerText(guide: GuiaTecnicoMicrobit) {
  return [
    guide.wiring.component,
    ...guide.wiring.connections.flatMap((connection) => [connection.from, connection.to, connection.purpose]),
    ...guide.wiring.notes,
  ].join(" ");
}

export function technicalRequirementsFor(guide: GuiaTecnicoMicrobit): TechnicalRequirement[] {
  const radio = guideUsesRadio(guide);
  const requirements: TechnicalRequirement[] = [
    {
      kind: "placa",
      item: guide.board,
      quantity: radio ? "2 placas por grupo para o teste físico" : "1 placa por grupo",
      purpose: radio
        ? "Uma placa envia e a outra recebe; com apenas uma, use a simulação orientada e não prometa o teste físico entre placas."
        : "Executar o programa e observar entradas, processamento e saídas.",
      caution: "Segure pelas bordas e desligue a alimentação antes de alterar qualquer conexão.",
    },
    {
      kind: "conexao",
      item: "Cabo USB de dados",
      quantity: radio ? "1 por placa durante a transferência, ou use o mesmo cabo em sequência" : "1 por grupo",
      purpose: "Transferir o arquivo do MakeCode; cabo somente de carga não funciona.",
      caution: "Aguarde o LED traseiro parar de piscar antes de desconectar.",
    },
  ];

  if (guide.wiring.kind === "externo") {
    requirements.push(
      {
        kind: "componente",
        item: guide.wiring.component,
        quantity: "1 unidade ou conjunto por grupo",
        purpose: "Componente externo obrigatório: não existe dentro do micro:bit e precisa ser providenciado.",
        caution: guide.wiring.notes[0] ?? "Confira modelo, tensão e polaridade antes de energizar.",
      },
      {
        kind: "conexao",
        item: "Cabos e conectores compatíveis",
        quantity: `${guide.wiring.connections.length} ligações por montagem`,
        purpose: "Realizar exatamente as conexões indicadas no esquema da aula.",
        caution: "Monte e confira com tudo desligado; não inverta alimentação e GND.",
      },
    );

    if (/fonte externa|alimentação externa/i.test(externalPowerText(guide))) {
      requirements.push({
        kind: "alimentacao",
        item: "Fonte de alimentação externa compatível",
        quantity: "1 por montagem",
        purpose: "Alimentar o atuador ou módulo sem exigir corrente excessiva da placa.",
        caution: "Siga a tensão do fabricante, una os GNDs quando indicado e nunca injete o positivo da fonte externa no micro:bit.",
      });
    }
  }

  if (guideProducesSound(guide) && /\bV1\b/i.test(guide.board)) {
    requirements.push({
      kind: "condicional",
      item: "Alto-falante, fone ou piezo compatível para micro:bit V1",
      quantity: "1 por grupo somente se a placa for V1",
      purpose: "A V1 executa os blocos de música, mas não possui alto-falante integrado. A V2 já reproduz o som na própria placa.",
      caution: "Para uma aula totalmente iniciante, prefira a V2. Na V1, a saída de áudio precisa de ligação e pode exigir adaptação de pino quando P0 já estiver ocupado.",
    });
  }

  requirements.push({
    kind: "opcional",
    item: "Suporte de pilhas 2 × AAA",
    quantity: "1 por placa se o projeto funcionar longe do computador",
    purpose: "Usar a montagem sem permanecer conectada ao cabo USB.",
    caution: "Use pilhas em bom estado e retire o suporte antes de alterar ligações externas.",
  });

  return requirements;
}
