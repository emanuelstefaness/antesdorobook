import { describe, expect, it } from "vitest";
import {
  BOARD_ACROSS_CURRICULUM_ACTIVITIES,
  BOARD_SUBJECTS,
  type BoardCommand,
  type BoardDirection,
} from "./boardAcrossCurriculum";

type Position = { column: number; row: number; direction: BoardDirection };
const DELTA: Record<BoardDirection, [number, number]> = { norte: [0, 1], sul: [0, -1], leste: [1, 0], oeste: [-1, 0] };
const RIGHT: Record<BoardDirection, BoardDirection> = { norte: "leste", leste: "sul", sul: "oeste", oeste: "norte" };
const LEFT: Record<BoardDirection, BoardDirection> = { norte: "oeste", oeste: "sul", sul: "leste", leste: "norte" };

function parseCoordinate(coordinate: string) {
  return { column: coordinate.charCodeAt(0) - 65, row: Number(coordinate[1]) };
}

function formatCoordinate(position: Pick<Position, "column" | "row">) {
  return `${String.fromCharCode(65 + position.column)}${position.row}`;
}

function execute(commands: BoardCommand[], start: { coordinate: string; direction: BoardDirection }) {
  const parsed = parseCoordinate(start.coordinate);
  const position: Position = { ...parsed, direction: start.direction };
  const visited: string[] = [start.coordinate];
  for (let index = 0; index < commands.length; index += 1) {
    const command = commands[index];
    if (command === "INÍCIO" || command === "FIM") continue;
    if (command === "VIRE À DIREITA") { position.direction = RIGHT[position.direction]; continue; }
    if (command === "VIRE À ESQUERDA") { position.direction = LEFT[position.direction]; continue; }
    const repeat = command === "REPITA 2×" ? 2 : command === "REPITA 3×" ? 3 : 1;
    const movement = repeat > 1 ? commands[++index] : command;
    expect(movement).toBe("AVANCE");
    for (let step = 0; step < repeat; step += 1) {
      const [dc, dr] = DELTA[position.direction];
      position.column += dc;
      position.row += dr;
      visited.push(formatCoordinate(position));
    }
  }
  return { position, visited };
}

describe("tabuleiro em todas as áreas", () => {
  it("oferece 50 atividades e cobre todas as nove áreas anunciadas", () => {
    expect(BOARD_ACROSS_CURRICULUM_ACTIVITIES).toHaveLength(50);
    expect(BOARD_SUBJECTS).toHaveLength(9);
    expect(new Set(BOARD_ACROSS_CURRICULUM_ACTIVITIES.map((activity) => activity.id)).size).toBe(50);
    for (const subject of BOARD_SUBJECTS) {
      expect(BOARD_ACROSS_CURRICULUM_ACTIVITIES.filter((activity) => activity.subject === subject).length, subject).toBeGreaterThanOrEqual(3);
    }
  });

  it("mantém todas as atividades completas para aplicação direta", () => {
    for (const activity of BOARD_ACROSS_CURRICULUM_ACTIVITIES) {
      expect(activity.stages, activity.id).toHaveLength(4);
      expect(activity.materials.length, activity.id).toBeGreaterThanOrEqual(8);
      expect(activity.preparation.length, activity.id).toBeGreaterThanOrEqual(7);
      expect(activity.lessonFlow, activity.id).toHaveLength(6);
      expect(activity.mediatingQuestions.length, activity.id).toBeGreaterThanOrEqual(6);
      expect(activity.commonErrors.length, activity.id).toBeGreaterThanOrEqual(5);
      expect(activity.assessment.length, activity.id).toBeGreaterThanOrEqual(5);
      expect(activity.priorKnowledgeTeaching.length, activity.id).toBe(activity.priorKnowledge.length);
      expect(activity.finalAnswer.trim().length, activity.id).toBeGreaterThan(25);
    }
  });

  it("prova que a sequência de cada atividade visita as quatro etapas em ordem e chega ao final", () => {
    for (const activity of BOARD_ACROSS_CURRICULUM_ACTIVITIES) {
      const { position, visited } = execute(activity.commands, activity.start);
      expect(formatCoordinate(position), activity.id).toBe(activity.finish);
      let previousIndex = -1;
      for (const stage of activity.stages) {
        const visitIndex = visited.indexOf(stage.coordinate);
        expect(visitIndex, `${activity.id}: ${stage.coordinate}`).toBeGreaterThan(previousIndex);
        previousIndex = visitIndex;
      }
      for (const obstacle of activity.obstacles) {
        expect(visited, `${activity.id}: atravessa ${obstacle.coordinate}`).not.toContain(obstacle.coordinate);
      }
      for (const coordinate of visited) {
        const { column, row } = parseCoordinate(coordinate);
        expect(column, activity.id).toBeGreaterThanOrEqual(0);
        expect(column, activity.id).toBeLessThan(6);
        expect(row, activity.id).toBeGreaterThanOrEqual(1);
        expect(row, activity.id).toBeLessThanOrEqual(6);
      }
    }
  });

  it("não repete coordenadas essenciais dentro da mesma atividade", () => {
    for (const activity of BOARD_ACROSS_CURRICULUM_ACTIVITIES) {
      const essential = [activity.start.coordinate, activity.finish, ...activity.stages.map((stage) => stage.coordinate), ...activity.obstacles.map((item) => item.coordinate)];
      expect(new Set(essential).size, activity.id).toBe(essential.length);
    }
  });
});
