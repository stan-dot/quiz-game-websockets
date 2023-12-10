export function useQuizById(id: string) {
  const q = prisma?.quiz.findFirst({ select: { id: id } });
  return q;
}
