"use client";
import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "./db";

export async function addNewQuiz(quiz: Prisma.QuizCreateArgs) {
  // todo must use Mongo db connector here. or a facade
  // ... you will write your Prisma Client queries here

  prisma.quiz.create({ data: quiz });
  throw new Error("Function not implemented.");
}

export async function readAllQuizzes() {
  const allQuizzes = await prisma.quiz.findMany();
  console.log(allQuizzes);
  return allQuizzes;
}
