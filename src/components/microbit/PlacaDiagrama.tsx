/**
 * Desenho esquemático da placa, frente e verso.
 *
 * Não é foto e não finge ser: é um desenho vetorial, e isso é uma vantagem
 * aqui. Uma foto de micro:bit mostra sombra, reflexo no cobre e um monte de
 * componente sem nome que compete com o que importa. O professor que nunca
 * segurou a placa precisa de duas respostas — "onde fica" e "isso é frente ou
 * verso" — e as duas se leem melhor num desenho limpo com o nome escrito ao
 * lado do que numa fotografia.
 *
 * Sem marcadores numerados sobre a figura: foi por isso que o hotspot do
 * tabuleiro caiu. Todo rótulo aqui é texto visível ligado por uma linha.
 */

const BOARD = { x: 130, y: 70, w: 220, h: 180 } as const;
const CENTRO_X = BOARD.x + BOARD.w / 2; // 240

/**
 * O quadro começa em -20 e vai até 520 para sobrar margem dos dois lados sem
 * mexer em nenhuma coordenada da placa. Rótulo comprido — "Matriz de LEDs",
 * "Alto-falante" — estourava a borda quando o quadro começava em zero.
 */
const VIEW_BOX = "-20 0 540 310";

/** Corpo do texto do desenho. Ver a nota sobre tamanho em `Rotulo`. */
const CORPO = 20;

/**
 * Trecho da linha-guia que corre por fora da placa, sobre o fundo claro.
 *
 * A guia é partida em dois de propósito. Ela é navy, a placa é navy: desenhada
 * de uma vez só, some no instante em que entra no corpo da placa e o rótulo
 * fica boiando sem ligação nenhuma com a peça que nomeia. Cada guia atravessa
 * a borda, então cada uma precisa dos dois trechos.
 */
function GuiaFora({ d }: { d: string }) {
  return <path d={d} fill="none" stroke="#0C1D38" strokeOpacity={0.6} strokeWidth={1.5} />;
}

/** Trecho que corre por dentro da placa, sobre o navy. */
function GuiaDentro({ d }: { d: string }) {
  return <path d={d} fill="none" stroke="#FDF9F1" strokeOpacity={0.55} strokeWidth={1.5} />;
}

/**
 * O desenho encolhe junto com a tela: num celular de 375px o SVG fica com 335,
 * ou seja 0,62 do quadro de 540. A 20 o rótulo fecha em 12,4px no celular e
 * cerca de 20px no desktop — na casa do corpo de texto do resto do site.
 */
function Rotulo({
  x,
  y,
  ancora = "middle",
  children,
}: {
  x: number;
  y: number;
  ancora?: "start" | "middle" | "end";
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={ancora}
      fontSize={CORPO}
      fontWeight={700}
      fill="#0C1D38"
      className="font-sans"
    >
      {children}
    </text>
  );
}

/**
 * Corpo da placa e o conector dourado. Igual nas duas faces: os pinos
 * atravessam a placa, então aparecem dos dois lados.
 */
function Chassi() {
  const padsGrandes = [149, 194, 240, 286, 331];
  const padsPequenos = [172, 178, 184, 217, 223, 229, 263, 269, 275, 308, 314, 320];

  return (
    <g>
      <rect
        x={BOARD.x}
        y={BOARD.y}
        width={BOARD.w}
        height={BOARD.h}
        rx={10}
        fill="#0C1D38"
        stroke="#0C1D38"
        strokeWidth={2}
      />
      {padsPequenos.map((x) => (
        <rect key={x} x={x - 2} y={236} width={4} height={14} fill="#F2B02A" />
      ))}
      {padsGrandes.map((x) => (
        <g key={x}>
          <rect x={x - 12} y={222} width={24} height={28} fill="#F2B02A" />
          <circle cx={x} cy={238} r={6} fill="#0C1D38" />
        </g>
      ))}
    </g>
  );
}

/** O coração clássico do primeiro programa de todo mundo. */
const CORACAO = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];

function Frente() {
  return (
    <svg
      viewBox={VIEW_BOX}
      role="img"
      aria-label="Desenho da frente da placa micro:bit: no alto ficam o conector de bateria, a entrada USB e o microfone; abaixo, o logotipo sensível ao toque; no centro, a matriz de 5 por 5 LEDs acesa em forma de coração, com o botão A à esquerda e o botão B à direita; na borda de baixo, o conector dourado com os pinos 0, 1, 2, 3V e GND."
      className="h-auto w-full"
    >
      <Chassi />

      {/* Peças da borda de cima: bateria e USB ficam na quina, meio para fora. */}
      <rect x={145} y={60} width={22} height={14} rx={2} fill="#FDF9F1" stroke="#0C1D38" />
      <rect x={225} y={56} width={30} height={18} rx={2} fill="#FDF9F1" stroke="#0C1D38" />

      {/* Microfone: furo mais o LED que acende quando ele escuta. */}
      <circle cx={328} cy={88} r={7} fill="none" stroke="#FDF9F1" strokeWidth={2} />
      <circle cx={328} cy={88} r={2.5} fill="#FDF9F1" />

      {/* Logotipo sensível ao toque — dourado porque é contato exposto. */}
      <circle cx={231} cy={97} r={6.5} fill="none" stroke="#F2B02A" strokeWidth={2.5} />
      <circle cx={249} cy={97} r={6.5} fill="none" stroke="#F2B02A" strokeWidth={2.5} />

      {/* Matriz 5x5: 10 de lado, 6 de folga. 203..277 na horizontal. */}
      {CORACAO.map((linha, l) =>
        linha.map((aceso, c) => (
          <rect
            key={`${l}-${c}`}
            x={203 + c * 16}
            y={128 + l * 16}
            width={10}
            height={10}
            rx={2}
            fill={aceso ? "#FF3B30" : "none"}
            stroke={aceso ? "#FF3B30" : "#FDF9F1"}
            strokeOpacity={aceso ? 1 : 0.45}
            strokeWidth={1.5}
          />
        )),
      )}

      <rect x={157} y={152} width={26} height={26} rx={4} fill="#FDF9F1" stroke="#0C1D38" />
      <rect x={297} y={152} width={26} height={26} rx={4} fill="#FDF9F1" stroke="#0C1D38" />

      <GuiaFora d="M156,50 L156,60" />
      <GuiaFora d="M240,50 L240,56" />
      <GuiaFora d="M328,50 L328,70" />
      <GuiaDentro d="M328,70 L328,81" />
      <GuiaFora d="M124,166 L130,166" />
      <GuiaDentro d="M130,166 L157,166" />
      <GuiaFora d="M356,97 L350,97" />
      <GuiaDentro d="M350,97 L256,97" />
      <GuiaFora d="M356,212 L350,212" />
      <GuiaDentro d="M350,212 L290,212 L277,202" />
      <GuiaFora d="M356,166 L350,166" />
      <GuiaDentro d="M350,166 L323,166" />
      <GuiaFora d={`M${CENTRO_X},276 L${CENTRO_X},252`} />

      <Rotulo x={156} y={44}>
        Bateria
      </Rotulo>
      <Rotulo x={240} y={44}>
        USB
      </Rotulo>
      <Rotulo x={328} y={44}>
        Microfone
      </Rotulo>
      <Rotulo x={120} y={171} ancora="end">
        Botão A
      </Rotulo>
      <Rotulo x={360} y={102} ancora="start">
        Logo (toque)
      </Rotulo>
      <Rotulo x={360} y={171} ancora="start">
        Botão B
      </Rotulo>
      <Rotulo x={360} y={217} ancora="start">
        Matriz de LEDs
      </Rotulo>
      <Rotulo x={CENTRO_X} y={294}>
        Pinos 0, 1, 2, 3V e GND
      </Rotulo>
    </svg>
  );
}

function Verso() {
  return (
    <svg
      viewBox={VIEW_BOX}
      role="img"
      aria-label="Desenho do verso da placa micro:bit: no alto, a antena do rádio à esquerda e o botão de reset à direita; no centro, o processador; embaixo à esquerda, o alto-falante redondo; à direita dele, o chip do acelerômetro e da bússola; na borda de baixo, o mesmo conector dourado da frente."
      className="h-auto w-full"
    >
      <Chassi />

      {/* Antena: trilha impressa no canto, não um fio. */}
      <path
        d="M142,86 l10,-8 l10,8 l10,-8 l10,8"
        fill="none"
        stroke="#FDF9F1"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      <rect x={309} y={93} width={18} height={14} rx={3} fill="#FDF9F1" stroke="#0C1D38" />

      <rect
        x={219}
        y={129}
        width={42}
        height={42}
        rx={3}
        fill="#FDF9F1"
        fillOpacity={0.18}
        stroke="#FDF9F1"
        strokeWidth={2}
      />
      <circle cx={226} cy={136} r={2.5} fill="#FDF9F1" />

      <circle cx={170} cy={200} r={20} fill="none" stroke="#FDF9F1" strokeWidth={2} />
      <circle cx={170} cy={200} r={7} fill="#FDF9F1" fillOpacity={0.5} />

      <rect
        x={282}
        y={182}
        width={16}
        height={16}
        rx={2}
        fill="#FDF9F1"
        fillOpacity={0.18}
        stroke="#FDF9F1"
        strokeWidth={2}
      />

      <GuiaFora d="M160,50 L160,70" />
      <GuiaDentro d="M160,70 L160,76" />
      <GuiaFora d="M318,50 L318,70" />
      <GuiaDentro d="M318,70 L318,93" />
      <GuiaFora d="M356,148 L350,148" />
      <GuiaDentro d="M350,148 L261,148" />
      <GuiaFora d="M124,201 L130,201" />
      <GuiaDentro d="M130,201 L150,200" />
      <GuiaFora d="M290,278 L290,250" />
      <GuiaDentro d="M290,250 L290,198" />

      <Rotulo x={160} y={44}>
        Antena do rádio
      </Rotulo>
      <Rotulo x={318} y={44}>
        Reset
      </Rotulo>
      <Rotulo x={360} y={153} ancora="start">
        Processador
      </Rotulo>
      <Rotulo x={120} y={206} ancora="end">
        Alto-falante
      </Rotulo>
      <Rotulo x={CENTRO_X} y={294}>
        Acelerômetro e bússola
      </Rotulo>
    </svg>
  );
}

export function PlacaDiagrama() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <figure>
        <Frente />
        <figcaption className="mt-2 font-sans text-[12.5px] leading-snug text-navy/70">
          <strong className="font-bold text-navy">Frente.</strong> É o lado que a turma vê. Tudo o
          que responde a toque, som ou luz está aqui.
        </figcaption>
      </figure>
      <figure>
        <Verso />
        <figcaption className="mt-2 font-sans text-[12.5px] leading-snug text-navy/70">
          <strong className="font-bold text-navy">Verso.</strong> Desenhado na mesma orientação da
          frente para comparar lado a lado — na placa de verdade, virar troca esquerda e direita, e
          o reset cai do outro lado.
        </figcaption>
      </figure>
    </div>
  );
}
