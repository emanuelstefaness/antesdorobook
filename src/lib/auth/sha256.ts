/**
 * SHA-256 em TypeScript puro, sem dependência nenhuma.
 *
 * Por que não usar `crypto.subtle`, que já vem no navegador: a Web Crypto só
 * existe em contexto seguro (https ou localhost). O professor abrindo o site
 * pelo IP da rede local — http://192.168.x.x — receberia `crypto.subtle`
 * indefinido e a tela de acesso quebraria exatamente no cenário do celular,
 * que é onde ela mais vai ser usada. Esta versão funciona em qualquer lugar.
 *
 * A correção não depende de eu ter escrito o algoritmo certo de cabeça: o
 * teste ao lado compara a saída desta função com a do `node:crypto` para uma
 * bateria de entradas, além dos vetores oficiais do NIST.
 */

// prettier-ignore
const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

function rotr(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n));
}

/**
 * Texto em bytes UTF-8, à mão. `TextEncoder` resolveria, mas nem todo ambiente
 * de teste com jsdom o expõe, e depender dele tornaria esta função impura sem
 * necessidade — a conversão cabe em quinze linhas.
 */
export function bytesUtf8(texto: string): number[] {
  const bytes: number[] = [];

  for (let i = 0; i < texto.length; i += 1) {
    const cp = texto.codePointAt(i)!;
    // Um emoji ou caractere fora do plano básico ocupa duas posições da
    // string; `codePointAt` já devolveu o ponto de código inteiro, então a
    // segunda metade do par substituto precisa ser pulada.
    if (cp > 0xffff) i += 1;

    if (cp < 0x80) {
      bytes.push(cp);
    } else if (cp < 0x800) {
      bytes.push(0xc0 | (cp >> 6), 0x80 | (cp & 0x3f));
    } else if (cp < 0x10000) {
      bytes.push(0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
    } else {
      bytes.push(
        0xf0 | (cp >> 18),
        0x80 | ((cp >> 12) & 0x3f),
        0x80 | ((cp >> 6) & 0x3f),
        0x80 | (cp & 0x3f),
      );
    }
  }

  return bytes;
}

export function sha256Hex(texto: string): string {
  const dados = bytesUtf8(texto);
  const bits = dados.length * 8;

  // Mensagem preenchida: os bytes, um 0x80, zeros, e o comprimento em bits
  // num inteiro de 64 bits ao final — tudo múltiplo de 64 bytes.
  const total = ((dados.length + 9 + 63) >> 6) << 6;
  const buffer = new Uint8Array(total);
  buffer.set(dados);
  buffer[dados.length] = 0x80;

  const view = new DataView(buffer.buffer);
  view.setUint32(total - 8, Math.floor(bits / 0x100000000));
  view.setUint32(total - 4, bits >>> 0);

  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const w = new Uint32Array(64);

  for (let bloco = 0; bloco < total; bloco += 64) {
    for (let i = 0; i < 16; i += 1) w[i] = view.getUint32(bloco + i * 4);

    for (let i = 16; i < 64; i += 1) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let a = h[0];
    let b = h[1];
    let c = h[2];
    let d = h[3];
    let e = h[4];
    let f = h[5];
    let g = h[6];
    let x = h[7];

    for (let i = 0; i < 64; i += 1) {
      const s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const escolha = (e & f) ^ (~e & g);
      const t1 = (x + s1 + escolha + K[i] + w[i]) >>> 0;
      const s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maioria = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (s0 + maioria) >>> 0;

      x = g;
      g = f;
      f = e;
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) >>> 0;
    }

    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + x) >>> 0;
  }

  return Array.from(h, (n) => n.toString(16).padStart(8, "0")).join("");
}
