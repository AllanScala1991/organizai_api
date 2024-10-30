import { PrismaClient } from "@prisma/client";
import prisma from "./prisma";

describe('Prisma instance', () => {
    it('should be an instance of PrismaClient', () => {
      expect(prisma).toBeInstanceOf(PrismaClient);
    });
  });