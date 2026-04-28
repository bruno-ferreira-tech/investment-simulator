import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../app.module";
import { redisClient } from "../infra/cache/redis.client";

jest.mock("../infra/cache/cdi.cache.service", () => ({
  getCdiRate: jest.fn().mockResolvedValue(14.65),
}));

describe("SimulationController (integration)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
    await redisClient.quit();
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, 30000);

  it("POST /simulations — deve retornar resultado com montante final", async () => {
    const response = await request(app.getHttpServer())
      .post("/simulations")
      .send({
        aporteInicial: 1000,
        aporteMensal: 500,
        taxaAnual: 12,
        tempoInvestimento: 1,
        inflacao: 5,
        reajusteAnual: 0,
        tipoInvestimento: "CDB",
      });

    expect(response.status).toBe(201);
    expect(response.body.montanteFinal).toBeGreaterThan(0);
    expect(response.body.montanteLiquido).toBeGreaterThan(0);
    expect(response.body.comparativoCDI).toBeDefined();
  }, 15000);

  it("POST /simulations — deve retornar 400 com dados inválidos", async () => {
    const response = await request(app.getHttpServer())
      .post("/simulations")
      .send({
        aporteInicial: -1000,
        aporteMensal: 500,
        taxaAnual: 12,
        tempoInvestimento: 1,
        reajusteAnual: 0,
        tipoInvestimento: "CDB",
      });

    expect(response.status).toBe(400);
  }, 15000);
});
