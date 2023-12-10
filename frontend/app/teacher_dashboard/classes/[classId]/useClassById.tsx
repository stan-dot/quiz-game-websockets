export function useClassById(id: string) {
  prisma?.quiz.findFirst({ select: { id: id } });
}
